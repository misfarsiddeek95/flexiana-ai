import { BlogPost, RelatedArticle } from "@/types/blog";

/**
 * Mock blog posts data for development
 * This can be replaced with API calls in production
 */
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ai-transformation-guide",
    title: "The Complete Guide to AI Transformation in Enterprise",
    subtitle: "How leading companies are leveraging AI to drive innovation",
    author: "Jiri Knesl",
    authorImage: "/images/authors/jiri.jpg",
    publishDate: "2024-11-10T10:00:00Z",
    readTime: "12 min read",
    imageUrl: "/images/blog/image1.png",
    imageAlt: "AI Transformation visualization",
    tags: ["AI", "Enterprise", "Digital Transformation", "Machine Learning"],
    content: `
      <h2>Introduction to AI Transformation</h2>
      <p>Artificial Intelligence is revolutionizing how enterprises operate, making processes more efficient and enabling new capabilities that were previously impossible. In this comprehensive guide, we'll explore the key aspects of AI transformation.</p>
      
      <h3>Why AI Matters for Your Business</h3>
      <p>The integration of AI technologies into business operations offers <strong>unprecedented opportunities</strong> for growth and innovation. Companies that embrace AI early gain significant competitive advantages.</p>
      
      <img src="/images/blog/ai-chart.jpg" alt="AI adoption chart" />
      
      <h3>Key Components of AI Implementation</h3>
      <ul>
        <li>Data infrastructure and quality management</li>
        <li>Machine learning model development</li>
        <li>Integration with existing systems</li>
        <li>Team training and change management</li>
      </ul>
      
      <blockquote>AI is not just about technology; it's about transforming how we think about solving problems.</blockquote>
      
      <h3>Code Example: Simple ML Pipeline</h3>
      <pre><code>import pandas as pd
from sklearn.model_selection import train_test_split

# Load and prepare data
data = pd.read_csv('data.csv')
X_train, X_test, y_train, y_test = train_test_split(
    data.drop('target', axis=1),
    data['target'],
    test_size=0.2
)</code></pre>

      <p>This simple example demonstrates the foundation of a machine learning pipeline. In production environments, you'll need more sophisticated approaches.</p>
      
      <h3>Best Practices</h3>
      <ol>
        <li>Start with clear business objectives</li>
        <li>Ensure data quality and governance</li>
        <li>Build cross-functional teams</li>
        <li>Iterate and measure results continuously</li>
      </ol>
      
      <p>For more information, visit our <a href="/resources">resources page</a>.</p>
    `,
    metaDescription:
      "Learn how to successfully implement AI transformation in your enterprise with our comprehensive guide.",
    metaKeywords: [
      "AI transformation",
      "enterprise AI",
      "machine learning",
      "digital transformation",
    ],
    showInHome: true,
  },
  {
    id: "2",
    slug: "machine-learning-best-practices",
    title: "Machine Learning Best Practices for Production Systems",
    author: "Jiri Knesl",
    publishDate: "2024-11-08T14:30:00Z",
    readTime: "9 min read",
    imageUrl: "/images/blog/image2.png",
    imageAlt: "Machine Learning workflow",
    tags: ["Machine Learning", "DevOps", "Best Practices", "AI"],
    content: `
      <h2>Building Production-Ready ML Systems</h2>
      <p>Deploying machine learning models to production requires careful planning and adherence to best practices. This guide covers essential considerations.</p>
      
      <h3>Model Versioning and Tracking</h3>
      <p>Version control isn't just for code. Your ML models need proper versioning too. Tools like <code>MLflow</code> and <code>DVC</code> help manage model versions effectively.</p>
      
      <h3>Monitoring and Observability</h3>
      <p>Once deployed, models need continuous monitoring to detect drift and performance degradation.</p>
      
      <ul>
        <li>Track prediction accuracy over time</li>
        <li>Monitor data distribution changes</li>
        <li>Set up alerting for anomalies</li>
      </ul>
    `,
    metaDescription:
      "Essential best practices for deploying and maintaining machine learning models in production.",
    metaKeywords: ["machine learning", "MLOps", "production", "best practices"],
  },
  {
    id: "3",
    slug: "natural-language-processing-trends",
    title: "Natural Language Processing: 2024 Trends and Innovations",
    author: "Jiri Knesl",
    publishDate: "2024-11-05T09:15:00Z",
    readTime: "11 min read",
    imageUrl: "/images/blog/image3.png",
    imageAlt: "NLP technology visualization",
    tags: ["NLP", "AI", "Language Models", "Innovation"],
    content: `
      <h2>The Evolution of NLP</h2>
      <p>Natural Language Processing has made remarkable strides in recent years, with transformer models leading the charge.</p>
      
      <h3>Large Language Models</h3>
      <p>Models like GPT-4 and Claude have demonstrated unprecedented capabilities in understanding and generating human-like text.</p>
      
      <blockquote>The future of NLP lies in models that can truly understand context and nuance.</blockquote>
      
      <h3>Practical Applications</h3>
      <ul>
        <li>Customer service automation</li>
        <li>Content generation and summarization</li>
        <li>Sentiment analysis at scale</li>
        <li>Multi-language translation</li>
      </ul>
      
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240524132821/nlp-working.webp" alt="NLP architecture diagram" />
    `,
    metaDescription:
      "Explore the latest trends and innovations in Natural Language Processing for 2024.",
    metaKeywords: ["NLP", "language models", "AI trends", "transformers"],
  },
  {
    id: "4",
    slug: "computer-vision-applications",
    title: "Computer Vision Applications in Modern Business",
    author: "Jiri Knesl",
    publishDate: "2024-11-01T11:00:00Z",
    readTime: "10 min read",
    imageUrl: "/images/blog/image4.png",
    imageAlt: "Computer vision technology",
    tags: ["Computer Vision", "AI", "Business Applications", "Deep Learning"],
    content: `
      <h2>Seeing the Future with Computer Vision</h2>
      <p>Computer vision technology is transforming industries by enabling machines to interpret and understand visual information.</p>
      
      <h3>Industry Applications</h3>
      <ol>
        <li>Manufacturing quality control</li>
        <li>Retail inventory management</li>
        <li>Healthcare diagnostics</li>
        <li>Autonomous vehicles</li>
      </ol>
      
      <h3>Technical Implementation</h3>
      <pre><code>import cv2
import numpy as np

# Load and process image
image = cv2.imread('input.jpg')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 50, 150)</code></pre>
    `,
    metaDescription:
      "Discover how computer vision is revolutionizing business operations across industries.",
    metaKeywords: [
      "computer vision",
      "AI applications",
      "deep learning",
      "business automation",
    ],
  },
  {
    id: "5",
    slug: "data-science-workflow",
    title: "Building an Effective Data Science Workflow",
    author: "Jiri Knesl",
    publishDate: "2024-10-28T13:45:00Z",
    readTime: "8 min read",
    imageUrl: "/images/blog/image5.jpg",
    imageAlt: "Data science workflow diagram",
    tags: ["Data Science", "Workflow", "Best Practices", "Analytics"],
    content: `
      <h2>Streamlining Your Data Science Process</h2>
      <p>An efficient workflow is crucial for data science teams to deliver value consistently.</p>
      
      <h3>Key Stages</h3>
      <ul>
        <li>Problem definition and scoping</li>
        <li>Data collection and cleaning</li>
        <li>Exploratory data analysis</li>
        <li>Model development and validation</li>
        <li>Deployment and monitoring</li>
      </ul>
      
      <p>Each stage requires careful attention and the right tools to ensure success.</p>
    `,
    metaDescription:
      "Learn how to build an effective data science workflow for your team.",
    metaKeywords: ["data science", "workflow", "analytics", "best practices"],
  },
  {
    id: "6",
    slug: "ai-ethics-considerations",
    title: "AI Ethics: Building Responsible AI Systems",
    author: "Jiri Knesl",
    publishDate: "2024-10-25T10:30:00Z",
    readTime: "13 min read",
    imageUrl: "/images/blog/image6.jpg",
    imageAlt: "AI ethics concept",
    tags: ["AI Ethics", "Responsible AI", "Governance", "Enterprise"],
    content: `
      <h2>The Importance of Ethical AI</h2>
      <p>As AI systems become more prevalent, ensuring they operate ethically and responsibly is paramount.</p>
      
      <h3>Core Principles</h3>
      <ol>
        <li>Transparency and explainability</li>
        <li>Fairness and bias mitigation</li>
        <li>Privacy and data protection</li>
        <li>Accountability and governance</li>
      </ol>
      
      <blockquote>Building ethical AI is not just a technical challenge—it's a moral imperative.</blockquote>
      
      <h3>Implementation Strategies</h3>
      <p>Organizations must establish clear guidelines and processes for ethical AI development.</p>
    `,
    metaDescription:
      "Explore the critical considerations for building ethical and responsible AI systems.",
    metaKeywords: ["AI ethics", "responsible AI", "governance", "fairness"],
  },
];

/**
 * Get a blog post by slug
 * @param slug - The URL slug of the blog post
 * @returns BlogPost or null if not found
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const post = mockBlogPosts.find((post) => post.slug === slug);
  return post || null;
}

/**
 * Get all blog posts
 * @returns Array of all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  return mockBlogPosts;
}

/**
 * Get related articles based on shared tags
 * @param currentSlug - The slug of the current article
 * @param limit - Maximum number of related articles to return (default: 4)
 * @returns Array of related articles
 */
export function getRelatedArticles(
  currentSlug: string,
  limit: number = 4
): RelatedArticle[] {
  const currentPost = getBlogPostBySlug(currentSlug);

  if (!currentPost) {
    return [];
  }

  // Calculate match score for each post based on shared tags
  const postsWithScores = mockBlogPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      );
      return {
        post,
        score: sharedTags.length,
      };
    });

  // Sort by score (descending) and then by date (most recent first)
  postsWithScores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (
      new Date(b.post.publishDate).getTime() -
      new Date(a.post.publishDate).getTime()
    );
  });

  // Take top N posts and convert to RelatedArticle format
  return postsWithScores.slice(0, limit).map(({ post }) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    author: post.author,
    readTime: post.readTime,
    imageUrl: post.imageUrl,
    tags: post.tags,
  }));
}

/**
 * Get all unique tags from all blog posts
 * @returns Array of unique tags
 */
export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  mockBlogPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

/**
 * Get the featured blog post for the home page
 * @returns The blog post with showInHome: true, or the first post if none found
 */
export function getFeaturedBlogPost(): BlogPost {
  const featuredPost = mockBlogPosts.find((post) => post.showInHome);
  return featuredPost || mockBlogPosts[0];
}
