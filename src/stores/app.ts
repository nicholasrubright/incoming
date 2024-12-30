import type { Allocation, Income } from "@/types";
import { atom } from "jotai";
import { splitAtom, atomWithStorage } from "jotai/utils";
import { focusAtom } from "jotai-optics";

interface AppData {
  monthlyIncome: Income;
  allocations: Allocation[];
}

const initialState: AppData = {
  monthlyIncome: 0,
  allocations: [],
};

export const appDataAtom = atomWithStorage<AppData>(
  "incoming-storage",
  initialState
);

export const monthlyIncomeAtom = focusAtom(appDataAtom, (optic) =>
  optic.prop("monthlyIncome")
);
export const allocationsAtom = focusAtom(appDataAtom, (optic) =>
  optic.prop("allocations")
);

export const allocationAtomsAtom = splitAtom(allocationsAtom);

export const totalAllocatedAtom = atom<number>((get) => {
  const allocations = get(allocationsAtom);
  return allocations.reduce((acc, val) => acc + val.percentage, 0);
});

export const remainingAllocationsAtom = atom<number>((get) => {
  const totalAllocated = get(totalAllocatedAtom);
  return 100 - totalAllocated;
});

export const totalAllocatedAmountAtom = atom<number>((get) => {
  const allocations = get(allocationsAtom);
  const monthlyIncome = get(monthlyIncomeAtom);
  return Math.round(
    allocations.reduce(
      (acc, val) => acc + monthlyIncome * (val.percentage / 100),
      0
    )
  );
});

export const totalAllocatedColorAtom = atom<string>((get) => {
  const totalAllocated = get(totalAllocatedAtom);

  if (totalAllocated === 100) {
    return "text-green-500";
  } else if (totalAllocated > 100) {
    return "text-red-500";
  }

  return "";
});

// export const allocationChartDataAtom = atom<AllocationChartItem[]>((get) => {
//   const MONTHS_IN_ADVANCED = 12;

//   const allocations = get(allocationsAtom);
//   const monthlyIncome = get(monthlyIncomeAtom);

//   //const allocationAmount = Math.round(monthlyIncome * (allocation.percentage / 100))

//   return allocations.map((all) => {
//     const allocationAmount = Math.round(monthlyIncome * (all.percentage / 100));

//     const initialData: AllocationChartItem[] = Array(MONTHS_IN_ADVANCED).fill({
//       month: 0,
//       amount: 0,
//     });

//     // return initialData.reduce((acc, curr) => {
//     //   return {
//     //     month: acc.month + 1, amount:
//     //   }
//     // }, { month: 0, amount: 0})
//   });
// });
