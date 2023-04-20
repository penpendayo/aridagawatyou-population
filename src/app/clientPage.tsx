"use client";
import { FC, useEffect } from "react";
import React, { useState } from "react";
import { PopulationGraph } from "./PopulationGraph";
import { Poplation } from "./Poplation.type";
import { PopulationGrid } from "./PopulationGrid";
import { SelectDate } from "./SelectDate";
import { poplationsAtom } from "./globalState";
import { useSetAtom } from "jotai";

type Props = {
  poplations: Poplation[];
};
export const ClientTopPage: FC<Props> = ({ poplations }) => {
  const setPoplations = useSetAtom(poplationsAtom);
  useEffect(() => {
    setPoplations(poplations);
  }, [poplations, setPoplations]);
  return (
    <div>
      <h1>和歌山県有田川町の人口動態</h1>
      <h2>総人口推移</h2>
      <PopulationGraph />
      <h2>地域別の人口推移</h2>
      <SelectDate />
      <PopulationGrid />
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
