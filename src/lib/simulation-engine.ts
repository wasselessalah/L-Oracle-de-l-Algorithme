import { Post, AlgorithmWeights, UserProfile, SimulationMetrics, SimulationResult } from "@/types";
import { calculateScore } from "./scoring";
import { calculateMetrics } from "./metrics";

export function runSimulation(
    posts: Post[],
    weights: AlgorithmWeights,
    userProfile: UserProfile
): SimulationResult {
    // 1. Score and Sort
    // We use [...posts] to avoid mutating the original array
    const scoredPosts = [...posts].map(post => ({
        ...post,
        _score: calculateScore(post, weights, userProfile)
    }));

    const sortedFeed = scoredPosts.sort((a, b) => b._score - a._score);

    // 2. Calculate Metrics on the new top 20
    const metrics = calculateMetrics(sortedFeed, 20);

    return {
        feed: sortedFeed,
        metrics
    };
}
