import { Post, Category, SimulationMetrics } from "@/types";

const ALL_CATEGORIES: Category[] = [
    'Tech', 'Politics Left', 'Politics Right', 'Climate', 'Business', 'Wellness', 'Science', 'Entertainment'
];

export function calculateMetrics(feed: Post[], topN: number = 20): SimulationMetrics {
    // Analyze only the top N posts (what user actually sees)
    const visibleFeed = feed.slice(0, topN);

    if (visibleFeed.length === 0) {
        return {
            diversity_score: 100,
            bubble_intensity: 0,
            category_distribution: ALL_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {} as any)
        };
    }

    // 1. Calculate Category Distribution
    const distribution: Record<Category, number> = {} as any;
    ALL_CATEGORIES.forEach(cat => distribution[cat] = 0);

    visibleFeed.forEach(post => {
        distribution[post.category] = (distribution[post.category] || 0) + 1;
    });

    // Convert to percentages
    const distributionPercent: Record<Category, number> = {} as any;
    ALL_CATEGORIES.forEach(cat => {
        distributionPercent[cat] = Math.round((distribution[cat] / visibleFeed.length) * 100);
    });

    // 2. Calculate Diversity Score
    // Simple metric: (Unique Categories Present / Total Categories) * 100
    const uniqueCategories = new Set(visibleFeed.map(p => p.category)).size;
    const diversityScore = Math.round((uniqueCategories / ALL_CATEGORIES.length) * 100);

    // 3. Calculate Bubble Intensity
    // Inverse of diversity
    const bubbleIntensity = 100 - diversityScore;

    return {
        diversity_score: diversityScore,
        bubble_intensity: bubbleIntensity,
        category_distribution: distributionPercent
    };
}
