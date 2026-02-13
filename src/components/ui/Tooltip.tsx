import React, { useState } from 'react';
import { Info } from "lucide-react";
import { clsx } from "clsx";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={clsx(
                    "absolute z-50 w-48 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-sm dark:bg-slate-800",
                    positionClasses[position]
                )}>
                    {content}
                    {/* Arrow */}
                    <div className={clsx(
                        "absolute h-2 w-2 rotate-45 bg-slate-900 dark:bg-slate-800",
                        position === 'top' && "bottom-[-4px] left-1/2 -translate-x-1/2",
                        position === 'bottom' && "top-[-4px] left-1/2 -translate-x-1/2",
                        position === 'left' && "right-[-4px] top-1/2 -translate-y-1/2",
                        position === 'right' && "left-[-4px] top-1/2 -translate-y-1/2",
                    )} />
                </div>
            )}
        </div>
    );
}
