"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { FC } from "react";
import { PopulationProcessor } from "./PopulationProcessor";
import { Population } from "./Population.type";

export const PopulationGrid: FC<{
  populations: Population[];
  selectDate: { from: string; to: string } | null;
}> = ({ populations, selectDate }) => {
  const populationProcessor = new PopulationProcessor(populations);
  const dateOfSurvey = populationProcessor.getDateOfSurvey();
  const { columns, rows } = populationProcessor.createGridProps(
    selectDate?.from ?? dateOfSurvey[0],
    selectDate?.to ?? dateOfSurvey[dateOfSurvey.length - 1]
  );

  return (
    <div className="max-w-full h-screen w-[500px]">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: "diffPop", sort: "desc" }],
          },
        }}
      />
    </div>
  );
};
