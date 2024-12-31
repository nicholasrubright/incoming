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
import { Button } from "./components/ui/button";
import { UserRound } from "lucide-react";

export default function App() {
  const totalAllocated = useAtomValue(totalAllocatedAtom);
  const remainingAllocations = useAtomValue(remainingAllocationsAtom);
  const totalAllocatedAmount = useAtomValue(totalAllocatedAmountAtom);

  const [monthlyIncome, setMonthlyIncome] = useAtom(monthlyIncomeAtom);
  const allocationAtoms = useAtomValue(allocationAtomsAtom);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <main className="container mx-auto p-6 max-w-4xl">
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
            <SummaryCard
              title="Remaining"
              content={`${remainingAllocations}%`}
            />
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
      </main>
      <footer className="py-4 text-center">
        <div className="flex flex-row gap-5 justify-center items-center">
          <p className="text-sm text-muted-foreground">
            Created by Nicholas Rubright
          </p>
          <div className="flex flex-row items-center">
            <Button variant="ghost" size="icon" asChild>
              <a
                target="_blank"
                href="https://github.com/nicholasrubright/incoming"
              >
                <svg
                  role="img"
                  className="fill-primary"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a target="_blank" href="https://nicholasrubright.com/">
                <UserRound className="text-primary" />
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
