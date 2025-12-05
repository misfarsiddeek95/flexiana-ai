'use server';

import { prisma } from '@/lib/prisma';
import { CaseStudy, RelatedCaseStudy } from '@/types/caseStudy';

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
 * Transform Prisma CaseStudy to Frontend CaseStudy interface
 */
function transformCaseStudy(dbCaseStudy: any): CaseStudy {
    return {
        id: dbCaseStudy.id,
        slug: dbCaseStudy.slug,
        title: dbCaseStudy.title,
        subtitle: dbCaseStudy.subtitle,
        client: dbCaseStudy.client,
        industry: dbCaseStudy.industry,
        year: dbCaseStudy.year,
        duration: dbCaseStudy.duration,
        heroImage: dbCaseStudy.heroImage,
        heroVideo: dbCaseStudy.heroVideo || '',
        heroImageAlt: dbCaseStudy.heroImageAlt,
        tags: parseJSON(dbCaseStudy.tags, []),
        overview: dbCaseStudy.overview,
        challenge: parseJSON(dbCaseStudy.challenge, { description: '', points: [] }),
        solution: parseJSON(dbCaseStudy.solution, { description: '', approach: [] }),
        techStack: parseJSON(dbCaseStudy.techStack, { categories: [] }),
        results: parseJSON(dbCaseStudy.results, { description: '', metrics: [], outcomes: [] }),
        metaDescription: dbCaseStudy.metaDescription || undefined,
        metaKeywords: parseJSON(dbCaseStudy.metaKeywords, []),
        carouselData: parseJSON(dbCaseStudy.carouselData, undefined),
    };
}

/**
 * Get paginated case studies
 */
export async function getCaseStudies(
    page: number = 1,
    limit: number = 6
): Promise<{ caseStudies: CaseStudy[]; total: number; hasMore: boolean }> {
    try {
        const skip = (page - 1) * limit;

        const [caseStudies, total] = await Promise.all([
            prisma.caseStudy.findMany({
                where: { active: true },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma.caseStudy.count({
                where: { active: true },
            }),
        ]);

        return {
            caseStudies: caseStudies.map(transformCaseStudy),
            total,
            hasMore: skip + caseStudies.length < total,
        };
    } catch (error) {
        console.error('Error fetching case studies:', error);
        return { caseStudies: [], total: 0, hasMore: false };
    }
}

/**
 * Get a case study by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    try {
        const caseStudy = await prisma.caseStudy.findUnique({
            where: { slug, active: true },
        });
        return caseStudy ? transformCaseStudy(caseStudy) : null;
    } catch (error) {
        console.error(`Error fetching case study with slug ${slug}:`, error);
        return null;
    }
}

/**
 * Get related case studies based on shared tags
 */
export async function getRelatedCaseStudies(
    currentSlug: string,
    limit: number = 3
): Promise<RelatedCaseStudy[]> {
    try {
        const currentCase = await prisma.caseStudy.findUnique({
            where: { slug: currentSlug },
            select: { tags: true },
        });

        if (!currentCase) return [];

        const currentTags = parseJSON<string[]>(currentCase.tags, []);

        // Fetch all other active case studies to calculate similarity
        // Note: In a larger DB, we would filter by tags in the query, but since tags are JSON,
        // we fetch all (assuming small number of case studies) or use raw query if needed.
        // For now, fetching all is fine as per mock implementation logic.
        const allCases = await prisma.caseStudy.findMany({
            where: {
                slug: { not: currentSlug },
                active: true,
            },
            select: {
                id: true,
                slug: true,
                title: true,
                heroImage: true,
                tags: true,
            },
        });

        const casesWithScores = allCases.map((cs) => {
            const csTags = parseJSON<string[]>(cs.tags, []);
            const sharedTags = csTags.filter((tag) => currentTags.includes(tag));
            return {
                caseStudy: cs,
                score: sharedTags.length,
                tags: csTags,
            };
        });

        casesWithScores.sort((a, b) => b.score - a.score);

        return casesWithScores.slice(0, limit).map(({ caseStudy, tags }) => ({
            id: caseStudy.id,
            slug: caseStudy.slug,
            title: caseStudy.title,
            imageUrl: caseStudy.heroImage,
            tags: tags,
        }));
    } catch (error) {
        console.error('Error fetching related case studies:', error);
        return [];
    }
}

/**
 * Get featured case studies for the home page
 */
export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
    try {
        const caseStudies = await prisma.caseStudy.findMany({
            where: {
                active: true,
                showInHome: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return caseStudies.map(transformCaseStudy);
    } catch (error) {
        console.error('Error fetching featured case studies:', error);
        return [];
    }
}
