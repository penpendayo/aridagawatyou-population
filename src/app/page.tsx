import React from "react";
import fs from "fs/promises";
import iconv from "iconv-lite";
import Papa from "papaparse";
import { Population } from "./Population.type";
import { ClientTopPage } from "./clientPage";

async function getPopulations() {
  const path = "./src/populationCSV/";
  const fileNames = await fs.readdir(path);

  const csvs = await Promise.all(
    fileNames.map(async (fileName) => {
      const res = await fs.readFile(`${path}/${fileName}`);
      const sjis = iconv.decode(res, "Shift_JIS");
      const csv = Papa.parse<Population>(sjis, { header: true });
      return csv.data;
    })
  );
  return csvs.flat();
}

async function App() {
  const populations = await getPopulations();
  return <ClientTopPage populations={populations} />;
}

export default App;
