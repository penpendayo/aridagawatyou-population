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
import { toLineGraphData } from "./toGraphData";
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
  const data = toLineGraphData(populationProcessor);

  return (
    <div className="max-w-full w-[800px]">
      <Line options={options} data={data} width={800} height={300} />
    </div>
  );
};
