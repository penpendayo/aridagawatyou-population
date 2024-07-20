"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { FC } from "react";
import { PopulationProcessor } from "./PopulationProcessor";
import { Population } from "./Population.type";
import { useAtom } from "jotai";
import { populationsAtom, selectDateAtom } from "./globalState";

export const PopulationGrid: FC = () => {
  const [populations] = useAtom(populationsAtom);
  const [selectDate] = useAtom(selectDateAtom);

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
