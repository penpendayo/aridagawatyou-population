"use client";
import { DataGrid } from "@mui/x-data-grid";
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
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-slate-200">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: "diffPop", sort: "desc" }],
          },
        }}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            color: "#475569",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f1f5f9",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f8fafc",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
          },
        }}
      />
    </div>
  );
};
