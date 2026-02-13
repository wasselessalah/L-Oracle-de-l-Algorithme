import { Post } from "@/types";
import { PostCard } from "./PostCard";

interface FeedListProps {
    posts: Post[];
    loading?: boolean;
}

export function FeedList({ posts, loading }: FeedListProps) {
    if (loading) {
        return (
            <div className="flex flex-col gap-4 p-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-100" />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center p-8 text-center text-slate-500">
                <p>No posts match your current filter bubble.</p>
                <button className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                    Reset Algorithm
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            {posts.map((post, index) => (
                <PostCard key={post.id} post={post} rank={index + 1} />
            ))}
        </div>
    );
}
