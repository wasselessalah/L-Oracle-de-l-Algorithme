import { useState, useEffect, useCallback, useMemo } from 'react';
import { Post, AlgorithmWeights, SimulationMetrics, UserProfile, SimulationResult } from '@/types';
import { runSimulation } from '@/lib/simulation-engine';
import { INITIAL_POSTS } from '@/data/posts';

export const DEFAULT_WEIGHTS: AlgorithmWeights = {
    w_likes: 0.5,
    w_shares: 0.5,
    w_readTime: 0.3,
    w_similarity: 0.5,
    randomness: 0
};

export const DEFAULT_PROFILE: UserProfile = {
    history: [],
    ideological_profile: 0,
    dominant_categories: []
};

export interface SimulationHistoryPoint {
    step: number;
    diversity_score: number;
    bubble_intensity: number;
}

export function useSimulation() {
    // The source of truth for available content
    const [allPosts] = useState<Post[]>(INITIAL_POSTS);

    // The current state of the feed shown to the user
    const [displayedPosts, setDisplayedPosts] = useState<Post[]>(INITIAL_POSTS);

    // Simulation parameters
    const [weights, setWeights] = useState<AlgorithmWeights>(DEFAULT_WEIGHTS);
    const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);

    // Metrics state
    const [metrics, setMetrics] = useState<SimulationMetrics>({
        diversity_score: 100,
        bubble_intensity: 0,
        category_distribution: {} as any
    });

    // History for charts
    const [history, setHistory] = useState<SimulationHistoryPoint[]>([]);
    const [stepCount, setStepCount] = useState(0);

    // Run simulation when weights change
    useEffect(() => {
        // Run core engine logic
        const result: SimulationResult = runSimulation(allPosts, weights, userProfile);

        setDisplayedPosts(result.feed);
        setMetrics(result.metrics);

        // Update history
        setHistory(prev => {
            const newPoint = {
                step: stepCount,
                diversity_score: result.metrics.diversity_score,
                bubble_intensity: result.metrics.bubble_intensity
            };
            // Keep last 50 points
            const newHistory = [...prev, newPoint];
            return newHistory.slice(-50);
        });

        setStepCount(prev => prev + 1);

    }, [weights, userProfile]);
    // Note: we don't depend on 'allPosts' as it's static for now.

    const updateWeight = useCallback((key: keyof AlgorithmWeights, value: number) => {
        setWeights(prev => ({ ...prev, [key]: value }));
    }, []);

    const resetSimulation = useCallback(() => {
        setWeights(DEFAULT_WEIGHTS);
        setUserProfile(DEFAULT_PROFILE);
        setHistory([]);
        setStepCount(0);
    }, []);

    return {
        posts: displayedPosts,
        weights,
        metrics,
        history,
        updateWeight,
        setWeights,
        resetSimulation
    };
}
