import type {
  Allocation,
  AllocationChartConfig,
  AllocationDataPoint,
  Income,
} from "@/types";
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

export const allocationChartConfigAtom = atom<AllocationChartConfig>((get) => {
  const allocations = get(allocationsAtom);

  const chartConfig: AllocationChartConfig = {};

  chartConfig["other"] = {
    label: "Other",
    color: `hsl(var(--chart-1))`,
  };

  allocations
    .filter((all) => all.percentage > 0)
    .sort((a, b) => a.percentage - b.percentage)
    .forEach((all, index) => {
      chartConfig[all.name] = {
        label: all.name,
        color: `hsl(var(--chart-${index + 2}))`,
      };
    });

  return chartConfig;
});

export const allocationChartDataAtom = atom<AllocationDataPoint[]>((get) => {
  const allocations = get(allocationsAtom);

  const dataPoints = allocations
    .filter((all) => all.percentage > 0)
    .sort((a, b) => a.percentage - b.percentage)
    .map((all) => {
      return {
        allocation: all.name,
        percentage: all.percentage,
        fill: `var(--color-${all.name})`,
      };
    });

  const remainingAllocations = get(remainingAllocationsAtom);

  dataPoints.push({
    allocation: "other",
    percentage: remainingAllocations,
    fill: `var(--color-other)`,
  });

  return dataPoints;
});
