"use client";

import { SimulationHistoryPoint } from "@/hooks/use-simulation";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface DiversityChartProps {
    history: SimulationHistoryPoint[];
}

export function DiversityChart({ history }: DiversityChartProps) {
    const data = {
        labels: history.map(h => h.step),
        datasets: [
            {
                label: 'Diversity Score',
                data: history.map(h => h.diversity_score),
                borderColor: '#22c55e', // Green
                backgroundColor: '#22c55e',
                tension: 0.4,
            },
            {
                label: 'Bubble Intensity',
                data: history.map(h => h.bubble_intensity),
                borderColor: '#f43f5e', // Red
                backgroundColor: '#f43f5e',
                tension: 0.4,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                grid: {
                    color: '#f1f5f9', // slate-100
                }
            },
            x: {
                display: false, // Hide steps to keep it clean
                grid: {
                    display: false
                }
            }
        },
        elements: {
            point: {
                radius: 0, // Hide points for cleaner line
                hitRadius: 10
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return <Line options={options} data={data} />;
}
