"use client";
import { FC } from "react";
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

export const PopulationGraph: FC<{ populations: Population[] }> = ({
  populations,
}) => {
  const populationProcessor = new PopulationProcessor(populations);

  const data = {
    labels: populationProcessor.getDateOfSurvey(),
    datasets: [
      {
        label: "人口",
        data: populationProcessor.getTotalPopulation(),
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
    <div className="w-full">
      <Line options={options} data={data} />
    </div>
  );
};
