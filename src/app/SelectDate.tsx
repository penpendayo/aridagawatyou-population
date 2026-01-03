"use client";
import Select from "react-select";
import { FC, useState, useMemo } from "react";
import { PopulationProcessor } from "./PopulationProcessor";
import { Population } from "./Population.type";

const selectStyles = {
  control: (base: object) => ({
    ...base,
    borderRadius: "0.5rem",
    borderColor: "#e2e8f0",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  option: (base: object, state: { isSelected: boolean }) => ({
    ...base,
    backgroundColor: state.isSelected ? "#3b82f6" : "white",
    "&:hover": {
      backgroundColor: state.isSelected ? "#3b82f6" : "#eff6ff",
    },
  }),
};

export const SelectDate: FC<{
  populations: Population[];
  setSelectDate: React.Dispatch<
    React.SetStateAction<{
      from: string;
      to: string;
    } | null>
  >;
}> = ({ populations, setSelectDate }) => {
  const populationProcessor = new PopulationProcessor(populations);
  const dateOfSurvey = populationProcessor.getDateOfSurvey();

  const allOptions = useMemo(
    () =>
      dateOfSurvey.map((s, index) => ({
        value: s,
        label: s,
        index,
      })),
    [dateOfSurvey]
  );

  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(allOptions.length - 1);

  // 開始日のオプション: 終了日以前のもののみ
  const fromOptions = useMemo(
    () => allOptions.filter((opt) => opt.index <= toIndex),
    [allOptions, toIndex]
  );

  // 終了日のオプション: 開始日以降のもののみ
  const toOptions = useMemo(
    () => allOptions.filter((opt) => opt.index >= fromIndex),
    [allOptions, fromIndex]
  );

  if (!populations.length) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="flex-1 max-w-xs">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          開始日
        </label>
        <Select
          options={fromOptions}
          value={allOptions[fromIndex]}
          styles={selectStyles}
          onChange={(e) => {
            if (!e) return;
            setFromIndex(e.index);
            setSelectDate((prev) => {
              if (!prev)
                return { to: allOptions[allOptions.length - 1].label, from: e.label };
              return { ...prev, from: e.label };
            });
          }}
        />
      </div>
      <div className="flex-1 max-w-xs">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          終了日
        </label>
        <Select
          options={toOptions}
          value={allOptions[toIndex]}
          styles={selectStyles}
          onChange={(e) => {
            if (!e) return;
            setToIndex(e.index);
            setSelectDate((prev) => {
              if (!prev) return { to: e.label, from: allOptions[0].label };
              return { ...prev, to: e.label };
            });
          }}
        />
      </div>
    </div>
  );
};
