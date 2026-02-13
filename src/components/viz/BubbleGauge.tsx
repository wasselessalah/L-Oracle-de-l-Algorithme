import { cn } from "@/utils/cn";

interface BubbleGaugeProps {
    intensity: number; // 0 to 100
}

const GET_STATUS = (intensity: number) => {
    if (intensity < 30) return {
        text: "Balanced Exposure",
        subtext: "You are in a balanced information space.",
        color: "text-emerald-500",
        bg: "bg-emerald-500"
    };
    if (intensity < 70) return {
        text: "Polarizing Feed",
        subtext: "Your feed is becoming specialized.",
        color: "text-amber-500",
        bg: "bg-amber-500"
    };
    return {
        text: "Cognitive Bubble",
        subtext: "You are trapped in an echo chamber.",
        color: "text-rose-500",
        bg: "bg-rose-500"
    };
};

export function BubbleGauge({ intensity }: BubbleGaugeProps) {
    const status = GET_STATUS(intensity);

    // Calculate rotation for gauge needle (-90deg to 90deg)
    const rotation = (intensity / 100) * 180 - 90;

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="relative h-32 w-64 overflow-hidden">
                {/* Gauge Background */}
                <div className="absolute top-0 h-full w-full rounded-t-full bg-slate-100 dark:bg-slate-800" />

                {/* Gradient Arc (Simulated with CSS mask or just keep it simple) */}
                {/* Let's use a conic gradient background masked to a circle? Too complex. */}
                {/* Simple approach: Colored arc segments */}
                <div className="absolute top-0 h-full w-full rounded-t-full opacity-20"
                    style={{
                        background: 'conic-gradient(from 270deg, #22c55e 0%, #eab308 50%, #f43f5e 100%)'
                    }}
                />

                {/* Needle */}
                <div
                    className="absolute bottom-0 left-1/2 h-1 w-32 origin-left bg-slate-800 transition-transform duration-500 will-change-transform dark:bg-slate-200"
                    style={{ transform: `rotate(${rotation}deg)` }}
                />

                {/* Center Hub */}
                <div className="absolute bottom-0 left-1/2 h-4 w-8 -translate-x-1/2 rounded-t-full bg-slate-900 dark:bg-slate-50" />
            </div>

            {/* Status Text Area */}
            <div className="mt-4 flex flex-col items-center justify-center text-center">
                <div className={`text-lg font-bold ${status.color}`}>
                    {status.text}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-medium">
                    {Math.round(intensity)}% Intensity
                </div>
                <p className="mt-2 text-xs text-slate-500 max-w-[180px]">
                    {status.subtext}
                </p>
            </div>
        </div>
    );
}
