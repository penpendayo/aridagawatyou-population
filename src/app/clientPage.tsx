"use client";
import { FC, useState } from "react";
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
    <div className="space-y-8">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          和歌山県有田川町の人口動態
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          和歌山県有田川町の人口推移をグラフや表にまとめたサイトです。
          <br className="hidden sm:block" />
          総人口および各地域の人口は、有田川町公式の人口ページのCSVファイルをもとに生成しています。
        </p>
      </header>

      {/* Total Population Graph */}
      <section className="card">
        <h2 className="section-title">総人口推移</h2>
        <PopulationGraph populations={populations} />
      </section>

      {/* Regional Population */}
      <section className="card">
        <h2 className="section-title">地域別の人口推移</h2>
        <div className="mb-6">
          <SelectDate populations={populations} setSelectDate={setSelectDate} />
        </div>
        <PopulationGrid populations={populations} selectDate={selectDate} />
      </section>

      {/* Footer */}
      <footer className="card bg-slate-50">
        <h2 className="section-title">このページについて</h2>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-center gap-2">
            <span className="text-blue-500">X</span>
            <span>連絡先：</span>
            <a
              href="https://twitter.com/penpen_dev"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              @penpen_dev
            </a>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-slate-700">GitHub</span>
            <span>ソース：</span>
            <a
              href="https://github.com/penpendayo/aridagawatyou-population"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              aridagawatyou-population
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
