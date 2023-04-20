import React from "react";
import fs from "fs/promises";
import iconv from "iconv-lite";
import Papa from "papaparse";
import { Poplation } from "./Poplation.type";
import { ClientTopPage } from "./clientPage";
async function getPoplations() {
  const path = "./src/populationCSV/";
  const fileNames = await fs.readdir(path);

  const csvs = await Promise.all(
    fileNames.map(async (fileName) => {
      const res = await fs.readFile(`${path}/${fileName}`);
      const sjis = iconv.decode(res, "Shift_JIS");
      const csv = Papa.parse<Poplation>(sjis, { header: true });
      return csv.data;
    })
  );
  return csvs.flat();
}

async function App() {
  const poplations = await getPoplations();
  return <ClientTopPage poplations={poplations} />;
}

export default App;
