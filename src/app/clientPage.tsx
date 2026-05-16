"use client";
import { FC, useState } from "react";
import { PopulationGraph } from "./PopulationGraph";
import { Population } from "./Population.type";
import { PopulationGrid } from "./PopulationGrid";
import { SelectDate } from "./SelectDate";

type Props = {
  populations: Population[];
};

const SectionHeader: FC<{ numeral: string; title: string; subtitle: string }> = ({
  numeral,
  title,
  subtitle,
}) => (
  <div className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_1fr] gap-x-4 items-baseline mb-8">
    <span
      aria-hidden
      className="font-display text-3xl md:text-4xl text-vermillion font-bold leading-none"
    >
      {numeral}
    </span>
    <div>
      <h2 className="font-display text-xl md:text-2xl font-bold text-ink tracking-tight">
        {title}
      </h2>
      <p className="mt-1.5 text-xs md:text-sm text-ink-soft">{subtitle}</p>
    </div>
  </div>
);

export const ClientTopPage: FC<Props> = ({ populations }) => {
  const [selectDate, setSelectDate] = useState<{ from: string; to: string } | null>(null);

  return (
    <article>
      {/* Masthead */}
      <header className="reveal reveal-1 pb-10 border-b border-rule">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px flex-1 max-w-12 bg-ink" />
          <p className="font-display text-[0.7rem] md:text-xs tracking-[0.4em] text-ink-soft uppercase">
            Wakayama · Aridagawa
          </p>
          <span className="h-px flex-1 max-w-12 bg-ink" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-ink leading-[1.05] tracking-tight text-center">
          和歌山県有田川町
          <br className="md:hidden" />
          <span className="text-vermillion">人口動態</span>
        </h1>
        <p className="mt-4 text-xs md:text-sm text-ink-faint text-center tracking-wider">
          地区別・月次の人口推移グラフ
        </p>
        <p className="mt-8 text-sm md:text-[0.95rem] text-ink-soft leading-loose max-w-xl mx-auto text-center">
          和歌山県有田郡有田川町が公開している人口統計CSVをもとに、町全体の総人口推移と、地区ごとの月次人口・増減を可視化したサイトです。期間を指定して、有田川町の人口動態をグラフと一覧でご覧いただけます。
        </p>
      </header>

      {/* Filter strip */}
      <div className="reveal reveal-2 sticky top-0 z-20 -mx-6 md:-mx-12 px-6 md:px-12 py-4 bg-paper/90 backdrop-blur-sm border-b border-rule">
        <div className="flex items-baseline gap-4 md:gap-6 flex-wrap">
          <span className="font-display text-xs tracking-[0.3em] text-ink-faint uppercase shrink-0">
            表示期間
          </span>
          <div className="flex-1 min-w-[260px] max-w-2xl">
            <SelectDate populations={populations} setSelectDate={setSelectDate} />
          </div>
        </div>
      </div>

      {/* Section I — Total */}
      <section className="reveal reveal-3 py-14 md:py-20 border-b border-rule">
        <SectionHeader
          numeral="Ⅰ"
          title="有田川町 総人口の推移"
          subtitle="町全体の人口の変化を年月日ごとに折れ線グラフでプロット"
        />
        <PopulationGraph populations={populations} selectDate={selectDate} />
      </section>

      {/* Section II — Regional */}
      <section className="reveal reveal-4 py-14 md:py-20 border-b border-rule">
        <SectionHeader
          numeral="Ⅱ"
          title="有田川町 地区別の人口推移"
          subtitle="町内各地区の選択期間における人口と増減を増減順で一覧表示"
        />
        <PopulationGrid populations={populations} selectDate={selectDate} />
      </section>

      {/* Footer */}
      <footer className="pt-10 pb-4 text-xs text-ink-faint">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-display">
          <span className="tracking-wider">出典　有田川町</span>
          <a
            href="https://twitter.com/penpen_dev"
            className="hover:text-vermillion transition-colors tracking-wider"
          >
            X / @penpen_dev
          </a>
          <a
            href="https://github.com/penpendayo/aridagawatyou-population"
            className="hover:text-vermillion transition-colors tracking-wider"
          >
            GitHub / aridagawatyou-population
          </a>
        </div>
      </footer>
    </article>
  );
};
