"use client";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { FC } from "react";
import { PopulationProcessor } from "./PopulationProcessor";
import { Poplation } from "./Poplation.type";
import { useAtom } from "jotai";
import { poplationsAtom, selectDateAtom } from "./globalState";

export const PopulationGrid: FC = () => {
  const [poplations] = useAtom(poplationsAtom);
  const [selectDate] = useAtom(selectDateAtom);

  const populationProcessor = new PopulationProcessor(poplations);
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
