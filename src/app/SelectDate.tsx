"use client";
import Select from "react-select";
import { FC, useState, useMemo } from "react";
import { PopulationProcessor } from "./PopulationProcessor";
import { Population } from "./Population.type";

const selectStyles = {
  control: (base: object, state: { isFocused: boolean }) => ({
    ...base,
    minHeight: "32px",
    border: "none",
    borderBottom: state.isFocused
      ? "1px solid #b3361f"
      : "1px solid #1c1a17",
    borderRadius: 0,
    backgroundColor: "transparent",
    boxShadow: "none",
    cursor: "pointer",
    fontFamily: "var(--font-display)",
    fontSize: "0.95rem",
    color: "#1c1a17",
    paddingLeft: 0,
    "&:hover": {
      borderBottom: "1px solid #b3361f",
    },
  }),
  valueContainer: (base: object) => ({
    ...base,
    padding: "0",
  }),
  singleValue: (base: object) => ({
    ...base,
    color: "#1c1a17",
    fontFamily: "var(--font-mono)",
    fontSize: "0.9rem",
  }),
  indicatorsContainer: (base: object) => ({
    ...base,
    height: "32px",
  }),
  dropdownIndicator: (base: object) => ({
    ...base,
    padding: "0 4px",
    color: "#8a8275",
    "&:hover": { color: "#b3361f" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (base: object) => ({
    ...base,
    border: "1px solid #d8cfba",
    borderRadius: "2px",
    boxShadow: "0 4px 16px rgba(28, 26, 23, 0.08)",
    backgroundColor: "#f6f1e6",
    fontFamily: "var(--font-mono)",
    fontSize: "0.85rem",
  }),
  option: (base: object, state: { isSelected: boolean }) => ({
    ...base,
    backgroundColor: state.isSelected ? "#1c1a17" : "transparent",
    color: state.isSelected ? "#f6f1e6" : "#1c1a17",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: state.isSelected ? "#1c1a17" : "#ede5d2",
    },
  }),
};

export const SelectDate: FC<{
  populations: Population[];
  setSelectDate: React.Dispatch<
    React.SetStateAction<{ from: string; to: string } | null>
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

  const fromOptions = useMemo(
    () => allOptions.filter((opt) => opt.index <= toIndex),
    [allOptions, toIndex]
  );
  const toOptions = useMemo(
    () => allOptions.filter((opt) => opt.index >= fromIndex),
    [allOptions, fromIndex]
  );

  if (!populations.length) return null;

  return (
    <div className="flex items-baseline gap-3 md:gap-5 flex-wrap">
      <div className="min-w-[140px] flex-1">
        <Select
          options={fromOptions}
          value={allOptions[fromIndex]}
          styles={selectStyles}
          isSearchable={false}
          onChange={(e) => {
            if (!e) return;
            setFromIndex(e.index);
            setSelectDate((prev) => {
              if (!prev) return { to: allOptions[allOptions.length - 1].label, from: e.label };
              return { ...prev, from: e.label };
            });
          }}
        />
      </div>
      <span className="text-ink-faint text-sm shrink-0">—</span>
      <div className="min-w-[140px] flex-1">
        <Select
          options={toOptions}
          value={allOptions[toIndex]}
          styles={selectStyles}
          isSearchable={false}
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
