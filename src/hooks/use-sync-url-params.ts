import { useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AlgorithmWeights } from '@/types';

export function useSyncUrlParams(
    weights: AlgorithmWeights,
    setWeights: (weights: AlgorithmWeights) => void
) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Load from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const newWeights: Partial<AlgorithmWeights> = {};

        let hasParams = false;
        params.forEach((value, key) => {
            if (key in weights) {
                newWeights[key as keyof AlgorithmWeights] = parseFloat(value);
                hasParams = true;
            }
        });

        if (hasParams) {
            setWeights({
                ...weights,
                ...newWeights
            });
        }
    }, []); // Only on mount

    // Sync to URL when weights change
    useEffect(() => {
        const params = new URLSearchParams();
        Object.entries(weights).forEach(([key, value]) => {
            params.set(key, value.toString());
        });

        // Use replace to avoid polluting history for every slider nudge
        // though in a lab tool, push might be okay for undo/redo
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [weights, pathname, router]);
}
