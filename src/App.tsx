import { Input } from "./components/ui/input";
import { useAtom, useAtomValue } from "jotai";
import {
  allocationAtomsAtom,
  monthlyIncomeAtom,
  remainingAllocationsAtom,
  totalAllocatedAmountAtom,
  totalAllocatedAtom,
} from "./stores/app";
import SummaryCard from "./components/summary-card";
import SettingsOption from "./components/settings-dialog";
import AllocationList from "./components/allocation-list";
import { AllocationDonutChart } from "./components/allocation-chart";
import InfoOption from "./components/info-dialog";

export default function App() {
  const totalAllocated = useAtomValue(totalAllocatedAtom);
  const remainingAllocations = useAtomValue(remainingAllocationsAtom);
  const totalAllocatedAmount = useAtomValue(totalAllocatedAmountAtom);

  const [monthlyIncome, setMonthlyIncome] = useAtom(monthlyIncomeAtom);
  const allocationAtoms = useAtomValue(allocationAtomsAtom);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl font-bold mb-4">IncomeSplit</h1>
          <div className="flex flex-row gap-2">
            <SettingsOption />
            <InfoOption />
          </div>
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-lg font-medium mb-2">
              Monthly Income
            </label>
            <Input
              type="number"
              placeholder="Enter your monthly income"
              className="w-full"
              value={monthlyIncome}
              onChange={(e) =>
                setMonthlyIncome(Number.parseInt(e.target.value))
              }
            />
          </div>
        </div>
      </div>

      <AllocationList />

      <div className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard title="Allocated" content={`${totalAllocated}%`} />
          <SummaryCard title="Remaining" content={`${remainingAllocations}%`} />
          <SummaryCard
            title="Total Allocated Amonut"
            content={`$${totalAllocatedAmount}`}
          />
        </div>
      </div>
      <div className="mt-8 space-y-8">
        {allocationAtoms.length > 0 && totalAllocated > 0 && (
          <AllocationDonutChart />
        )}
      </div>
    </div>
  );
}
