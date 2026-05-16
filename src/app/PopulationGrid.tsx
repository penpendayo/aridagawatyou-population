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
    <div className="w-full border-y-2 border-ink">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          sorting: { sortModel: [{ field: "diffPop", sort: "desc" }] },
        }}
        hideFooter
        disableColumnMenu
        disableVirtualization
        sx={{
          border: "none",
          backgroundColor: "transparent",
          height: "auto !important",
          "--DataGrid-containerBackground": "transparent",
          fontFamily: "var(--font-body)",
          color: "#1c1a17",
          "& .MuiDataGrid-main": { height: "auto !important" },
          "& .MuiDataGrid-virtualScroller": {
            height: "auto !important",
            overflow: "visible !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "transparent",
            borderBottom: "1px solid #1c1a17",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "transparent",
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            color: "#1c1a17",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e7dfca",
            outline: "none !important",
            fontSize: "0.9rem",
          },
          "& .MuiDataGrid-cell--textRight, & .MuiDataGrid-cell--textCenter": {
            fontFamily: "var(--font-mono)",
            fontVariantNumeric: "tabular-nums",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(28, 26, 23, 0.04)",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "rgba(43, 58, 90, 0.1)",
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "rgba(43, 58, 90, 0.14)",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none !important",
            },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #1c1a17",
            backgroundColor: "transparent",
            minHeight: "44px",
          },
          "& .MuiTablePagination-root": {
            color: "#4d473f",
            fontFamily: "var(--font-display)",
            fontSize: "0.75rem",
          },
          "& .MuiDataGrid-filler, & .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-sortIcon": { color: "#b3361f" },
        }}
      />
    </div>
  );
};
