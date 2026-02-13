import { Post } from "@/types";
import { cn } from "@/utils/cn";
import { Heart, Share2, Clock, BarChart2 } from "lucide-react";

interface PostCardProps {
    post: Post;
    rank?: number;
}

export function PostCard({ post, rank }: PostCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
            {/* Rank Indicator */}
            {rank && (
                <div className="absolute right-2 top-2 text-xs font-mono font-bold text-slate-300">
                    #{rank}
                </div>
            )}

            {/* Category Badge */}
            <div className="mb-3 flex items-center gap-2">
                <span className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white shadow-sm",
                    post.image_color || "bg-slate-500"
                )}>
                    {post.category}
                </span>
                <span className="text-xs text-slate-400">
                    {post.engagement_rate > 0.1 ? "Trending" : ""}
                </span>
            </div>

            {/* Content */}
            <h3 className="mb-1 text-lg font-semibold leading-tight text-slate-900 dark:text-slate-50">
                {post.title}
            </h3>

            {/* Abstract Content Placeholder */}
            <div className="mb-4 h-2 w-3/4 rounded-full bg-slate-100 dark:bg-slate-800" />

            {/* Metrics Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        <span>{post.shares.toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.reading_time}m</span>
                </div>
            </div>

            {/* Ideological Indicator (Subtle) */}
            <div
                className="absolute bottom-0 left-0 h-1 w-full opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                    background: `linear-gradient(90deg, transparent, ${itemColorToHex(post.ideological_score)})`
                }}
            />
        </div>
    );
}

// Helper to visualize ideology
function itemColorToHex(score: number): string {
    // -1 (Left/Red) to +1 (Right/Blue)
    if (score < -0.3) return '#f43f5e'; // Rose-500
    if (score > 0.3) return '#4f46e5'; // Indigo-600
    return '#94a3b8'; // Slate-400 (Neutral)
}
