"use client";
import Select from "react-select";
import { FC } from "react";
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

  const options = dateOfSurvey.map((s) => {
    return {
      value: s,
      label: s,
    };
  });

  if (!populations.length) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="flex-1 max-w-xs">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          開始日
        </label>
        <Select
          options={options}
          defaultValue={options[0]}
          styles={selectStyles}
          onChange={(e) =>
            setSelectDate((prev) => {
              if (!prev)
                return { to: options[options.length - 1].label, from: e?.label! };
              return { ...prev, from: e?.label! };
            })
          }
        />
      </div>
      <div className="flex-1 max-w-xs">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          終了日
        </label>
        <Select
          options={options}
          defaultValue={options[options.length - 1]}
          styles={selectStyles}
          onChange={(e) =>
            setSelectDate((prev) => {
              if (!prev) return { to: e?.label!, from: options[0].label };
              return { ...prev, to: e?.label! };
            })
          }
        />
      </div>
    </div>
  );
};
