"use client";
import { FC, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PopulationProcessor } from "./PopulationProcessor";
import { Population } from "./Population.type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(30, 41, 59, 0.9)",
      padding: 12,
      titleFont: { size: 14 },
      bodyFont: { size: 13 },
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748b",
      },
    },
    y: {
      grid: {
        color: "rgba(148, 163, 184, 0.2)",
      },
      ticks: {
        color: "#64748b",
      },
    },
  },
};

export const PopulationGraph: FC<{
  populations: Population[];
  selectDate: { from: string; to: string } | null;
}> = ({ populations, selectDate }) => {
  const populationProcessor = new PopulationProcessor(populations);
  const allDates = populationProcessor.getDateOfSurvey();
  const allPopulations = populationProcessor.getTotalPopulation();

  const { labels, dataPoints } = useMemo(() => {
    if (!selectDate) {
      return { labels: allDates, dataPoints: allPopulations };
    }

    const fromIndex = allDates.indexOf(selectDate.from);
    const toIndex = allDates.indexOf(selectDate.to);

    if (fromIndex === -1 || toIndex === -1) {
      return { labels: allDates, dataPoints: allPopulations };
    }

    return {
      labels: allDates.slice(fromIndex, toIndex + 1),
      dataPoints: allPopulations.slice(fromIndex, toIndex + 1),
    };
  }, [allDates, allPopulations, selectDate]);

  const data = {
    labels,
    datasets: [
      {
        label: "人口",
        data: dataPoints,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full h-64">
      <Line options={{ ...options, maintainAspectRatio: false }} data={data} />
    </div>
  );
};
