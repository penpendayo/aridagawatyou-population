"use client";
import Select from "react-select";
import { FC } from "react";
import { Poplation } from "./Poplation.type";
import { PopulationProcessor } from "./PopulationProcessor";
import { useAtom } from "jotai";
import { selectDateAtom, poplationsAtom } from "./globalState";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const SelectDate: FC = () => {
  const [selectDate, setSelectDate] = useAtom(selectDateAtom);
  const [poplations] = useAtom(poplationsAtom);
  const populationProcessor = new PopulationProcessor(poplations);
  const dateOfSurvey = populationProcessor.getDateOfSurvey();

  const options = dateOfSurvey.map((s) => {
    return {
      value: s,
      label: s,
    };
  });

  console.log({ selectDate });
  if (!poplations.length) return null;
  return (
    <div className="w-56">
      🕛From:
      <Select
        options={options}
        defaultValue={options[0]}
        onChange={(e) =>
          setSelectDate((prev) => {
            if (!prev) return { to: options[options.length - 1].label, from: e?.label! };
            return { ...prev, from: e?.label! };
          })
        }
      />
      <br />
      🕛To:
      <Select

        options={options}
        defaultValue={options[options.length - 1]}
        onChange={(e) =>
          setSelectDate((prev) => {
            if (!prev) return { to: e?.label!, from: options[0].label };
            return { ...prev, to: e?.label! };
          })
        }
      />
      <br />
    </div>
  );
};
