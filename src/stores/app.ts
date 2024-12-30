import type { Allocation, Income } from "@/types";
import { atom } from "jotai";
import { splitAtom } from "jotai/utils";
import { focusAtom } from "jotai-optics";

interface AppData {
  monthlyIncome: Income;
  allocations: Allocation[];
}

const initialState: AppData = {
  monthlyIncome: 0,
  allocations: [],
};

export const appDataAtom = atom<AppData>(initialState);

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

// export const allocationAtom = atom<Allocation[]>([]);

// export const addAllocationAtom = atom(
//   null,
//   (get, set, newAllocation: Allocation) => {
//     set(allocationAtom, [...get(allocationAtom), newAllocation]);
//   }
// );

// export const updateAllocationAtom = atom(
//   null,
//   (get, set, updateAllocation: Allocation) => {
//     set(
//       allocationAtom,
//       get(allocationAtom).map((all) =>
//         all.id === updateAllocation.id ? { ...all, ...updateAllocation } : all
//       )
//     );
//   }
// );

// export const totalAllocatedAtom = atom<number>((get) => {
//   const allocations = get(allocationAtom);
//   return allocations.reduce((acc, val) => acc + val.percentage, 0);
// });

// export const remainingAllocationsAtom = atom<number>((get) => {
//   const totalAllocated = get(totalAllocatedAtom);
//   return 100 - totalAllocated;
// });

// export const totalAllocatedAmountAtom = atom<number>((get) => {
//   const allocations = get(allocationAtom);
//   const monthlyIncome = get(monthlyIncomeAtom);
//   return allocations.reduce(
//     (acc, val) => acc + monthlyIncome * (val.percentage / 100),
//     0
//   );
// });
