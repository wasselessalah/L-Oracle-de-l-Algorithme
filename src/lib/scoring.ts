import { Post, AlgorithmWeights, UserProfile } from "@/types";

/**
 * Normalizes a value between 0 and 1 based on expected ranges.
 * - Likes: 0 - 5000 (typical), can go higher
 * - Shares: 0 - 1000
 * - Reading Time: 1 - 15 mins
 */
function normalize(value: number, max: number): number {
    return Math.min(value / max, 1.0);
}

export function calculateScore(
    post: Post,
    weights: AlgorithmWeights,
    userProfile: UserProfile
): number {
    // 1. Normalize Base Metrics
    const normLikes = normalize(post.likes, 2000);
    const normShares = normalize(post.shares, 500);
    const normReadTime = normalize(post.reading_time, 15);

    // 2. Calculate Ideological Proximity (1.0 = identical, 0.0 = opposite spectrum)
    // Distance is absolute difference. Proximity is 1 - distance/2 (since range is -1 to 1, max distance is 2)
    const dist = Math.abs(post.ideological_score - userProfile.ideological_profile);
    const proximity = 1 - (dist / 2);

    // 3. Apply Weights
    let score =
        (weights.w_likes * normLikes) +
        (weights.w_shares * normShares) +
        (weights.w_readTime * normReadTime) +
        (weights.w_similarity * proximity);

    // 4. Add Randomness (Diversity Injection)
    // Randomness factor adds a random value between 0 and the factor strength
    // This allows low-scoring items to occasionally jump up
    score += Math.random() * (weights.randomness || 0);

    return score;
}

export function reorderFeed(
    posts: Post[],
    weights: AlgorithmWeights,
    userProfile: UserProfile
): Post[] {
    return [...posts].sort((a, b) => {
        const scoreA = calculateScore(a, weights, userProfile);
        const scoreB = calculateScore(b, weights, userProfile);
        return scoreB - scoreA; // Descending order
    });
}
