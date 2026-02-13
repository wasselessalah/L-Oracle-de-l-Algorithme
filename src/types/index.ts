export type Category =
    | 'Tech'
    | 'Politics Left'
    | 'Politics Right'
    | 'Climate'
    | 'Business'
    | 'Wellness'
    | 'Science'
    | 'Entertainment';

export interface Post {
    id: string;
    title: string;
    category: Category;
    ideological_score: number; // -1.0 (Left/Anti) to +1.0 (Right/Pro)
    likes: number;
    shares: number;
    reading_time: number; // in minutes
    engagement_rate: number; // derived metric (0-1)
    content_snippet?: string;
    image_color?: string; // for UI visualization
}

export interface AlgorithmWeights {
    w_likes: number;
    w_shares: number;
    w_readTime: number;
    w_similarity: number;
    randomness: number;
}

export interface SimulationMetrics {
    diversity_score: number; // 0-100
    bubble_intensity: number; // 0-100
    category_distribution: Record<Category, number>;
}

export interface UserProfile {
    history: Post[]; // Posts interacted with
    ideological_profile: number; // Average of history
    dominant_categories: Category[];
}

export interface SimulationResult {
    feed: Post[];
    metrics: SimulationMetrics;
}
