import { cn } from "@/utils/cn";
import React from "react";
import { Tooltip } from "./Tooltip";
import { Info } from "lucide-react";

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
    className?: string;
    description?: string;
    info?: string;
    startLabel?: string;
    endLabel?: string;
}

export function Slider({
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    className,
    description,
    info,
    startLabel,
    endLabel,
    ...props
}: SliderProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className={cn("w-full py-2", className)}>
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {label}
                    </label>
                    {info && (
                        <Tooltip content={info}>
                            <Info className="h-3.5 w-3.5 text-slate-400 hover:text-indigo-500 cursor-help transition-colors" />
                        </Tooltip>
                    )}
                </div>
                <span className="min-w-[3rem] rounded-md bg-slate-100 px-2 py-0.5 text-right text-xs font-mono font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {value.toFixed(1)}
                </span>
            </div>

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-indigo-600 dark:bg-slate-700"
                {...props}
            />

            {(startLabel || endLabel) && (
                <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-slate-400">
                    <span>{startLabel}</span>
                    <span>{endLabel}</span>
                </div>
            )}

            {description && (
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            )}
        </div>
    );
}
