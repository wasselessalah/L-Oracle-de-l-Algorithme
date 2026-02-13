import { AlgorithmWeights } from "@/types";
import { DEFAULT_WEIGHTS } from "@/hooks/use-simulation";
import { Zap, Shield, Repeat, RefreshCcw } from "lucide-react";
import { clsx } from "clsx";

interface PresetModesProps {
    onApply: (weights: AlgorithmWeights) => void;
    currentWeights: AlgorithmWeights;
}

export const PRESETS: Record<string, { label: string, weights: AlgorithmWeights, icon: any, description: string }> = {
    balanced: {
        label: "Balanced",
        description: "A neutral starting point for content discovery.",
        icon: RefreshCcw,
        weights: DEFAULT_WEIGHTS
    },
    engagement: {
        label: "Viral First",
        description: "Prioritizes high likes and shares above all else.",
        icon: Zap,
        weights: {
            w_likes: 0.9,
            w_shares: 0.8,
            w_readTime: 0.2,
            w_similarity: 0.3,
            randomness: 0.1
        }
    },
    polarization: {
        label: "Echo Chamber",
        description: "Maximum confirmation bias. Filters for what you agree with.",
        icon: Repeat,
        weights: {
            w_likes: 0.4,
            w_shares: 0.4,
            w_readTime: 0.2,
            w_similarity: 1.8,
            randomness: 0
        }
    },
    diversity: {
        label: "Diversity First",
        description: "Neutralizes bias and injects random perspectives.",
        icon: Shield,
        weights: {
            w_likes: 0.3,
            w_shares: 0.3,
            w_readTime: 0.6,
            w_similarity: 0.1,
            randomness: 0.8
        }
    }
};

export function PresetModes({ onApply, currentWeights }: PresetModesProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Preset Configurations
            </h3>
            <div className="grid grid-cols-2 gap-2">
                {Object.entries(PRESETS).map(([id, preset]) => {
                    const Icon = preset.icon;
                    // Simple heuristic to check if this preset is active
                    const isActive = preset.weights.w_similarity === currentWeights.w_similarity &&
                        preset.weights.randomness === currentWeights.randomness;

                    return (
                        <button
                            key={id}
                            onClick={() => onApply(preset.weights)}
                            className={clsx(
                                "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all",
                                isActive
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
                            )}
                        >
                            <Icon className={clsx("h-5 w-5", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
                            <span className="text-xs font-bold leading-tight">{preset.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
