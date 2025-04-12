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
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
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
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="max-w-full w-[800px]">
      <Line options={options} data={data} width={800} height={300} />
    </div>
  );
};
