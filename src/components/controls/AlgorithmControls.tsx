import { AlgorithmWeights } from "@/types";
import { Slider } from "../ui/Slider";
import { RefreshCcw } from "lucide-react";
import { PresetModes } from "./PresetModes";

interface AlgorithmControlsProps {
    weights: AlgorithmWeights;
    onUpdate: (key: keyof AlgorithmWeights, value: number) => void;
    onSetWeights: (weights: AlgorithmWeights) => void;
    onReset: () => void;
}

export function AlgorithmControls({ weights, onUpdate, onSetWeights, onReset }: AlgorithmControlsProps) {
    return (
        <div className="flex h-full flex-col overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Algorithm DNA
                </h2>
                <button
                    onClick={onReset}
                    className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                    title="Reset to Defaults"
                >
                    <RefreshCcw className="h-4 w-4" />
                </button>
            </div>

            <div className="mb-8">
                <PresetModes onApply={onSetWeights} currentWeights={weights} />
            </div>

            <div className="flex flex-col gap-6">
                <Slider
                    label="Viral Potential (Likes)"
                    description="How much raw popularity boosts visibility."
                    info="Engagement-based ranking often prioritizes content with high immediate reaction counts, regardless of quality or accuracy."
                    value={weights.w_likes}
                    min={0} max={1} step={0.1}
                    onChange={(v) => onUpdate('w_likes', v)}
                />

                <Slider
                    label="Share Velocity"
                    description="Prioritizes content being shared rapidly."
                    info="Virality can cause information cascades, where a post spreads exponentially through networks before it can be verified."
                    value={weights.w_shares}
                    min={0} max={1} step={0.1}
                    onChange={(v) => onUpdate('w_shares', v)}
                />

                <Slider
                    label="Depth Bias (Read Time)"
                    description="Favors long-form content over quick bites."
                    info="Rewarding 'Time on Page' can help counter low-quality clickbait, but may also favor sensationalist deep-dives."
                    value={weights.w_readTime}
                    min={0} max={1} step={0.1}
                    onChange={(v) => onUpdate('w_readTime', v)}
                />

                <hr className="my-2 border-slate-100 dark:border-slate-800" />

                <Slider
                    label="Confirmation Bias"
                    description="Filters for content matching your history."
                    info="Also known as recursive filtering. The algorithm predicts what you agree with, trapping you in a Filter Bubble."
                    value={weights.w_similarity}
                    min={0} max={2} step={0.1} // Allow strong bias
                    startLabel="Open Minded"
                    endLabel="Echo Chamber"
                    onChange={(v) => onUpdate('w_similarity', v)}
                    className="accent-rose-500" // Highlight this dangerous slider
                />

                <Slider
                    label="Chaos Factor"
                    description="Injects random diversity into the feed."
                    info="Algorithmic Serendipity. Randomness breaks the recursive loop and exposes users to 'weak ties' and new viewpoints."
                    value={weights.randomness || 0}
                    min={0} max={1} step={0.1}
                    startLabel="Predictable"
                    endLabel="Random"
                    onChange={(v) => onUpdate('randomness', v)}
                />
            </div>

            <div className="mt-8 rounded-lg bg-indigo-50 p-4 text-xs leading-relaxed text-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-200">
                <strong>Tip:</strong> Increase "Confirmation Bias" to see how quickly the feed narrows. Add "Chaos Factor" to break the bubble.
            </div>
        </div>
    );
}
