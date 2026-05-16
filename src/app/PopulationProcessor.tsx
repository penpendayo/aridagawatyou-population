"use client";
import type { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Population } from "./Population.type";
export class PopulationProcessor {
  #populations: Population[];
  constructor(populations: Population[]) {
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
        [col1DateOfSurvey]: Number(c1["総人口"]),
        [col2DateOfSurvey]: Number(col2.find((c2) => c2["地域名"] === c1["地域名"])?.["総人口"] ?? 0),
        diffPop: Number(col2.find((c2) => c2["地域名"] === c1["地域名"])?.["総人口"] ?? 0) - Number(c1["総人口"]),
      };
    });
    const formatNum = (n: number) => n.toLocaleString();
    const columns: GridColDef[] = [
      {
        field: "where",
        headerName: "地域",
        flex: 1,
        minWidth: 100,
        renderCell: (params) => (
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
            {params.row.where}
          </span>
        ),
      },
      {
        field: col1DateOfSurvey,
        headerName: col1DateOfSurvey,
        flex: 1.4,
        minWidth: 130,
        type: "number",
        align: "right",
        headerAlign: "right",
        valueFormatter: (value: number) => formatNum(value),
      },
      {
        field: col2DateOfSurvey,
        headerName: col2DateOfSurvey,
        flex: 1.4,
        minWidth: 130,
        type: "number",
        align: "right",
        headerAlign: "right",
        valueFormatter: (value: number) => formatNum(value),
      },
      {
        field: "diffPop",
        headerName: "増減",
        flex: 1,
        minWidth: 100,
        type: "number",
        align: "right",
        headerAlign: "right",
        renderCell: (params) => {
          const v = params.row.diffPop as number;
          const color = v < 0 ? "#b3361f" : v > 0 ? "#2b3a5a" : "#8a8275";
          const text = v > 0 ? `+${formatNum(v)}` : formatNum(v);
          return (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
                color,
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            >
              {text}
            </span>
          );
        },
      },
    ];
    return { rows, columns };
  }
}
