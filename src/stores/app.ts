import { Allocation } from "@/types";
import { atom } from "jotai";

export const monthlyIncomeAtom = atom<number>(0);
export const allocationAtom = atom<Allocation[]>([]);

export const totalAllocatedAtom = atom<number>((get) => {
  const allocations = get(allocationAtom);
  return allocations.reduce((acc, val) => acc + val.percentage, 0);
});

export const remainingAllocationsAtom = atom<number>((get) => {
  const totalAllocated = get(totalAllocatedAtom);
  return 100 - totalAllocated;
});

export const totalAllocatedAmountAtom = atom<number>((get) => {
  const allocations = get(allocationAtom);
  const monthlyIncome = get(monthlyIncomeAtom);
  return allocations.reduce(
    (acc, val) => acc + monthlyIncome * (val.percentage / 100),
    0
  );
});
