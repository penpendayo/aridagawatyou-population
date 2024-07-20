"use client";
import { atom } from "jotai";
import { Population } from "./Population.type";

export const populationsAtom = atom<Population[]>([]);
export const selectDateAtom = atom<{ from: string; to: string } | null>(null);
