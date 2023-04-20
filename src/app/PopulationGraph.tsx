"use client";
import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Poplation } from "./Poplation.type";
import { PopulationProcessor } from "./PopulationProcessor";
import { toLineGraphData } from "./toGraphData";
import { useAtom } from "jotai";
import { poplationsAtom } from "./globalState";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

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

export const PopulationGraph: FC = () => {
  const [poplations] = useAtom(poplationsAtom);
  const populationProcessor = new PopulationProcessor(poplations);
  const data = toLineGraphData(populationProcessor);
  return (
    <div className="max-w-full w-[800px]">
      <Line options={options} data={data} width={800} height={300} />
    </div>
  );
};
