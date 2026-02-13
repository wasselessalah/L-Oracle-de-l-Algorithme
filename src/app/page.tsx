"use client";

import { useSimulation } from "@/hooks/use-simulation";
import { useSyncUrlParams } from "@/hooks/use-sync-url-params";
import { AlgorithmControls } from "@/components/controls/AlgorithmControls";
import { FeedList } from "@/components/feed/FeedList";
import { DiversityChart } from "@/components/viz/DiversityChart";
import { IdeologyPie } from "@/components/viz/IdeologyPie";
import { BubbleGauge } from "@/components/viz/BubbleGauge";
import { Suspense, useCallback } from "react";
import { Download } from "lucide-react";

function HomeContent() {
  const {
    posts,
    weights,
    metrics,
    history,
    updateWeight,
    setWeights,
    resetSimulation
  } = useSimulation();

  // Sync state with URL params
  useSyncUrlParams(weights, setWeights);

  const handleExport = useCallback(() => {
    const report = {
      timestamp: new Date().toISOString(),
      configuration: weights,
      metrics: {
        bubble_intensity: metrics.bubble_intensity,
        diversity_score: metrics.diversity_score,
      },
      category_distribution: metrics.category_distribution
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oracle-report-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [weights, metrics]);

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M22 12H2" /><path d="m17 7 5 5-5 5" /><path d="m7 17-5-5 5-5" /></svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            L’Oracle de l’Algorithme
          </h1>
        </div>
        <div className="hidden text-sm text-slate-500 sm:block">
          Interactive Simulation Lab v1.1
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid flex-1 grid-cols-1 gap-6 p-6 lg:grid-cols-12 xl:gap-8">

        {/* Left Column: Controls (3 cols) */}
        <div className="lg:col-span-3 xl:col-span-3">
          <div className="sticky top-24 space-y-6">
            <AlgorithmControls
              weights={weights}
              onUpdate={updateWeight}
              onSetWeights={setWeights}
              onReset={resetSimulation}
            />
          </div>
        </div>

        {/* Center Column: Feed (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              Your Personalized Feed
            </h2>
            <span className="text-xs text-slate-400">
              {posts.length} Items - Realtime Sort
            </span>
          </div>

          <FeedList posts={posts} />
        </div>

        {/* Right Column: Visualization (4 cols) */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 space-y-6">

            {/* Bubble Intensity Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-500">
                Cognitive Bubble
              </h3>
              <BubbleGauge intensity={metrics.bubble_intensity} />
              <p className="mt-4 text-center text-xs text-slate-400">
                Are you seeing diverse perspectives?
              </p>
            </div>

            {/* Ideology Distribution Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-500">
                Content Ecosystem
              </h3>
              <div className="h-48 w-full">
                <IdeologyPie distribution={metrics.category_distribution} />
              </div>
            </div>

            {/* Diversity History Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-500">
                Diversity Trend
              </h3>
              <div className="h-32 w-full">
                <DiversityChart history={history} />
              </div>
            </div>

            {/* Educational Footer */}
            <div className="rounded-lg bg-slate-100 p-4 text-xs text-slate-500 dark:bg-slate-900">
              <div className="mb-2 flex items-center justify-between">
                <strong>Simulation Note</strong>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  <Download className="h-3 w-3" />
                  Export Report
                </button>
              </div>
              This simulation uses a client-side algorithm to demonstrate how engagement optimization can inadvertently create filter bubbles.
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Initializing Laboratory...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
