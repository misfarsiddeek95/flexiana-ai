'use server';

import { prisma } from '@/lib/prisma';
import { BlogPost, RelatedArticle } from '@/types/blog';

/**
 * Helper to parse JSON fields safely
 * Handles both stringified JSON (SQLite) and pre-parsed objects (Postgres/MySQL)
 */
function parseJSON<T>(json: any, fallback: T): T {
    if (!json) return fallback;

    // If it's already an object/array, return it
    if (typeof json === 'object') {
        return json as T;
    }

    // If it's a string, try to parse it
    if (typeof json === 'string') {
        try {
            return JSON.parse(json) as T;
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return fallback;
        }
    }

    return fallback;
}

/**
 * Transform Prisma Blog to Frontend BlogPost interface
 */
function transformBlog(dbBlog: any): BlogPost {
    return {
        id: dbBlog.id,
        slug: dbBlog.slug,
        title: dbBlog.title,
        subtitle: dbBlog.subtitle || undefined,
        author: dbBlog.author,
        authorImage: dbBlog.authorImage || undefined,
        publishDate: dbBlog.publishDate.toISOString(),
        readTime: dbBlog.readTime,
        imageUrl: dbBlog.imageUrl,
        imageAlt: dbBlog.imageAlt,
        tags: parseJSON(dbBlog.tags, []),
        content: dbBlog.content,
        metaDescription: dbBlog.metaDescription || undefined,
        metaKeywords: parseJSON(dbBlog.metaKeywords, []),
        showInHome: dbBlog.showInHome,
    };
}

/**
 * Get paginated blogs
 */
export async function getBlogs(
    page: number = 1,
    limit: number = 6
): Promise<{ blogs: BlogPost[]; total: number; hasMore: boolean }> {
    try {
        const skip = (page - 1) * limit;

        const [blogs, total] = await Promise.all([
            prisma.blog.findMany({
                where: { active: true },
                orderBy: { publishDate: 'desc' },
                skip,
                take: limit,
            }),
            prisma.blog.count({
                where: { active: true },
            }),
        ]);

        return {
            blogs: blogs.map(transformBlog),
            total,
            hasMore: skip + blogs.length < total,
        };
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return { blogs: [], total: 0, hasMore: false };
    }
}

/**
 * Get a blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const blog = await prisma.blog.findUnique({
            where: { slug, active: true },
        });
        return blog ? transformBlog(blog) : null;
    } catch (error) {
        console.error(`Error fetching blog with slug ${slug}:`, error);
        return null;
    }
}

/**
 * Get related articles based on shared tags
 */
export async function getRelatedArticles(
    currentSlug: string,
    limit: number = 4
): Promise<RelatedArticle[]> {
    try {
        const currentBlog = await prisma.blog.findUnique({
            where: { slug: currentSlug },
            select: { tags: true },
        });

        if (!currentBlog) return [];

        const currentTags = parseJSON<string[]>(currentBlog.tags, []);

        const allBlogs = await prisma.blog.findMany({
            where: {
                slug: { not: currentSlug },
                active: true,
            },
            select: {
                id: true,
                slug: true,
                title: true,
                author: true,
                readTime: true,
                imageUrl: true,
                tags: true,
                publishDate: true,
            },
        });

        const blogsWithScores = allBlogs.map((blog) => {
            const blogTags = parseJSON<string[]>(blog.tags, []);
            const sharedTags = blogTags.filter((tag) => currentTags.includes(tag));
            return {
                blog,
                score: sharedTags.length,
                tags: blogTags,
            };
        });

        // Sort by score (descending) and then by date (most recent first)
        blogsWithScores.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return (
                new Date(b.blog.publishDate).getTime() -
                new Date(a.blog.publishDate).getTime()
            );
        });

        return blogsWithScores.slice(0, limit).map(({ blog, tags }) => ({
            id: blog.id,
            slug: blog.slug,
            title: blog.title,
            author: blog.author,
            readTime: blog.readTime,
            imageUrl: blog.imageUrl,
            tags: tags,
        }));
    } catch (error) {
        console.error('Error fetching related articles:', error);
        return [];
    }
}

/**
 * Get the featured blog post for the home page
 */
export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
    try {
        const featuredBlog = await prisma.blog.findFirst({
            where: { showInHome: true, active: true },
        });

        if (featuredBlog) {
            return transformBlog(featuredBlog);
        }

        // Fallback to the most recent blog if no featured one
        const recentBlog = await prisma.blog.findFirst({
            where: { active: true },
            orderBy: { publishDate: 'desc' },
        });

        return recentBlog ? transformBlog(recentBlog) : null;
    } catch (error) {
        console.error('Error fetching featured blog:', error);
        return null;
    }
}
