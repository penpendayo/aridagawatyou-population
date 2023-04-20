"use client";
import { atom, useAtom } from "jotai";
import { Poplation } from "./Poplation.type";
import { PopulationProcessor } from "./PopulationProcessor";

export const poplationsAtom = atom<Poplation[]>([]);
export const selectDateAtom = atom<{ from: string; to: string } | null>(null);
