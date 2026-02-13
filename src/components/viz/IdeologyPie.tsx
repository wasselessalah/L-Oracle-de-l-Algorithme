"use client";

import { Category, SimulationMetrics } from "@/types";
import { CATEGORY_COLORS } from "@/utils/colors";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IdeologyPieProps {
    distribution: Record<Category, number>;
}

export function IdeologyPie({ distribution }: IdeologyPieProps) {
    const labels = Object.keys(distribution) as Category[];
    const dataValues = labels.map(cat => distribution[cat]);
    const bgColors = labels.map(cat => CATEGORY_COLORS[cat]);

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: bgColors,
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Too many categories for a clean legend
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${Math.round(value)}%`;
                    }
                }
            }
        },
        cutout: '60%', // Donut style
    };

    return <Doughnut data={data} options={options} />;
}
