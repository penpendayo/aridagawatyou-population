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

const INK = "#1c1a17";
const INK_SOFT = "#4d473f";
const RULE_SOFT = "#e7dfca";
const INDIGO = "#2b3a5a";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: { top: 8, right: 12, bottom: 0, left: 0 } },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: INK,
      titleColor: "#f6f1e6",
      bodyColor: "#f6f1e6",
      padding: 10,
      titleFont: { family: '"Shippori Mincho", serif', size: 12, weight: 600 },
      bodyFont: { family: '"JetBrains Mono", monospace', size: 12 },
      cornerRadius: 2,
      displayColors: false,
      borderColor: INK,
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { color: INK },
      ticks: {
        color: INK_SOFT,
        font: { family: '"JetBrains Mono", monospace', size: 10 },
        maxRotation: 0,
        autoSkipPadding: 16,
      },
    },
    y: {
      grid: { color: RULE_SOFT, drawTicks: false },
      border: { display: false },
      ticks: {
        color: INK_SOFT,
        font: { family: '"JetBrains Mono", monospace', size: 10 },
        padding: 8,
        callback: (val: string | number) => Number(val).toLocaleString(),
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
    if (!selectDate) return { labels: allDates, dataPoints: allPopulations };
    const fromIndex = allDates.indexOf(selectDate.from);
    const toIndex = allDates.indexOf(selectDate.to);
    if (fromIndex === -1 || toIndex === -1)
      return { labels: allDates, dataPoints: allPopulations };
    return {
      labels: allDates.slice(fromIndex, toIndex + 1),
      dataPoints: allPopulations.slice(fromIndex, toIndex + 1),
    };
  }, [allDates, allPopulations, selectDate]);

  const first = dataPoints[0];
  const last = dataPoints[dataPoints.length - 1];
  const diff = last - first;
  const sign = diff > 0 ? "+" : "";

  const data = {
    labels,
    datasets: [
      {
        label: "総人口",
        data: dataPoints,
        borderColor: INDIGO,
        backgroundColor: "rgba(43, 58, 90, 0.06)",
        fill: true,
        tension: 0.25,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#f6f1e6",
        pointBorderColor: INDIGO,
        pointBorderWidth: 1.5,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 pb-6 border-b border-rule-soft">
        <Stat label="期首" value={first?.toLocaleString() ?? "—"} sublabel={labels[0] ?? ""} />
        <Stat label="期末" value={last?.toLocaleString() ?? "—"} sublabel={labels[labels.length - 1] ?? ""} />
        <Stat
          label="増減"
          value={`${sign}${diff.toLocaleString()}`}
          sublabel="人"
          accent={diff < 0 ? "vermillion" : "indigo"}
        />
      </div>
      <div className="w-full h-[320px] md:h-[400px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

const Stat: FC<{
  label: string;
  value: string;
  sublabel: string;
  accent?: "vermillion" | "indigo";
}> = ({ label, value, sublabel, accent }) => (
  <div>
    <div className="font-display text-[0.65rem] md:text-xs tracking-[0.3em] text-ink-faint uppercase mb-1.5">
      {label}
    </div>
    <div
      className={`font-mono text-2xl md:text-3xl font-medium tabular-nums leading-none ${
        accent === "vermillion"
          ? "text-vermillion"
          : accent === "indigo"
          ? "text-indigo"
          : "text-ink"
      }`}
    >
      {value}
    </div>
    <div className="font-mono text-[0.65rem] md:text-xs text-ink-faint mt-1.5">
      {sublabel}
    </div>
  </div>
);
