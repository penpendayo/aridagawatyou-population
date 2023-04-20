import { PopulationProcessor } from "./PopulationProcessor";

export function toLineGraphData(populationProcessor: PopulationProcessor) {
  return {
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
}
