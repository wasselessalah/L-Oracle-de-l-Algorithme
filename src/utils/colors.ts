import { Category } from "@/types";

export const CATEGORY_COLORS: Record<Category, string> = {
    'Tech': '#3b82f6',        // blue-500
    'Politics Left': '#f43f5e', // rose-500
    'Politics Right': '#4f46e5', // indigo-600
    'Climate': '#22c55e',     // green-500
    'Business': '#475569',    // slate-600
    'Wellness': '#2dd4bf',    // teal-400
    'Science': '#a855f7',     // purple-500
    'Entertainment': '#eab308' // yellow-500
};

export const CATEGORY_TAILWIND: Record<Category, string> = {
    'Tech': 'bg-blue-500',
    'Politics Left': 'bg-rose-500',
    'Politics Right': 'bg-indigo-600',
    'Climate': 'bg-green-500',
    'Business': 'bg-slate-600',
    'Wellness': 'bg-teal-400',
    'Science': 'bg-purple-500',
    // Entertainment: 'bg-yellow-500' // Using yellow for pop culture (handled in PostCard logic too)
    'Entertainment': 'bg-yellow-500'
};

export function getIdeologyColor(score: number): string {
    // -1 to +1
    if (score < -0.3) return '#f43f5e';
    if (score > 0.3) return '#4f46e5';
    return '#94a3b8';
}
