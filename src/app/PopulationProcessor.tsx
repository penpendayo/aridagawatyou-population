"use client";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Poplation } from "./Poplation.type";
export class PopulationProcessor {
  #populations: Poplation[];
  constructor(populations: Poplation[]) {
    this.#populations = populations;
  }

  getDateOfSurvey(): string[] {
    return Array.from(new Set(this.#populations.map((pop) => pop["調査年月日"])))
      .filter((date) => date)
      .sort((date1, date2) => new Date(date1).getTime() - new Date(date2).getTime());
  }

  getTotalPopulation() {
    return this.getDateOfSurvey().map((date) => {
      return this.#populations
        .filter((pop) => pop["調査年月日"] === date)
        .reduce((acc, pop) => {
          acc += Number(pop["総人口"]);
          return acc;
        }, 0);
    });
  }
  createGridProps(col1DateOfSurvey: string, col2DateOfSurvey: string) {
    const col1 = this.#populations.filter((pop) => pop["調査年月日"] === col1DateOfSurvey);
    const col2 = this.#populations.filter((pop) => pop["調査年月日"] === col2DateOfSurvey);

    const rows: GridRowsProp = col1.map((c1, i) => {
      return {
        id: i + 1,
        where: c1["地域名"],
        [col1DateOfSurvey]: c1["総人口"],
        [col2DateOfSurvey]: col2[i]["総人口"],
        diffPop: Number(col2[i]["総人口"]) - Number(c1["総人口"]),
      };
    });
    const columns: GridColDef[] = [
      { field: "where", headerName: "場所", width: 100 },
      { field: col1DateOfSurvey, headerName: `🕛From:${col1DateOfSurvey}`, width: 140 },
      { field: col2DateOfSurvey, headerName: `🕛To:${col2DateOfSurvey}`, width: 140 },
      {
        field: "diffPop",
        headerName: "増減値",
        width: 100,
        renderCell: (params) => (
          <div
            style={{
              backgroundColor: params.row.diffPop < 0 ? "#e8b9b9" : "#a0ecbd",
              color: params.row.diffPop < 0 ? "#af3838" : "#12542b",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center", 
              fontSize: "1.2rem",
            }}
          >
            {params.row.diffPop}
          </div>
        ),
      },
    ];
    return { rows, columns };
  }
}
