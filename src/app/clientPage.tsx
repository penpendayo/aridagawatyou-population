"use client";
import { FC, useEffect, useState } from "react";
import React from "react";
import { PopulationGraph } from "./PopulationGraph";
import { Population } from "./Population.type";
import { PopulationGrid } from "./PopulationGrid";
import { SelectDate } from "./SelectDate";

type Props = {
  populations: Population[];
};
export const ClientTopPage: FC<Props> = ({ populations }) => {
  const [selectDate, setSelectDate] = useState<{ from: string; to: string } | null>(null);

  return (
    <div>
      <h1>和歌山県有田川町の人口動態</h1>
      <p>和歌山県有田川町の人口推移をグラフや表にまとめたサイトです。</p>
      <p>総人口および各地域（下津野など）の人口は、有田川町公式の人口ページのCSVファイルをもとに生成しています。</p>
      <h2>総人口推移</h2>
      <PopulationGraph populations={populations} />
      <h2>地域別の人口推移</h2>
      <SelectDate populations={populations} setSelectDate={setSelectDate} />
      <PopulationGrid populations={populations} selectDate={selectDate} />
      <footer>
        <h2>このページについて</h2>
        <ul>
          <li>
            連絡先：<a href="https://twitter.com/penpen_dev">@penpen_dev</a>
          </li>
          <li>ソース：<a href="https://github.com/penpendayo/aridagawatyou-population">GitHub</a></li>
        </ul>
      </footer>
    </div>
  );
};
