import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import AllocationCard from "./components/allocation-card";
import { useAtom, useAtomValue } from "jotai";
import {
  allocationAtomsAtom,
  monthlyIncomeAtom,
  remainingAllocationsAtom,
  totalAllocatedAmountAtom,
  totalAllocatedAtom,
} from "./stores/app";
import { v4 as uuidv4 } from "uuid";
import SummaryCard from "./components/summary-card";
import SettingsOption from "./components/settings-dialog";

export default function App() {
  const totalAllocated = useAtomValue(totalAllocatedAtom);
  const remainingAllocations = useAtomValue(remainingAllocationsAtom);
  const totalAllocatedAmount = useAtomValue(totalAllocatedAmountAtom);

  const [monthlyIncome, setMonthlyIncome] = useAtom(monthlyIncomeAtom);
  const [allocationAtoms, dispatch] = useAtom(allocationAtomsAtom);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl font-bold mb-4">Incoming</h1>
          <SettingsOption />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {allocationAtoms.map((all, index) => {
          return <AllocationCard key={index} allocationAtom={all} />;
        })}
      </div>

      <Button
        className="w-full md:w-auto"
        disabled={!(monthlyIncome > 0)}
        onClick={() =>
          dispatch({
            type: "insert",
            value: { id: uuidv4(), name: "", percentage: 0 },
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Allocation
      </Button>

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
    </div>
  );
}
