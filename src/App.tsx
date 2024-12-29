import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import AllocationCard from "./components/allocation-card";

export default function App() {
  const data = {
    income: 5000,
    allocations: [
      {
        name: "Savings",
        percentage: 10,
      },
      {
        name: "Checking",
        percentage: 70,
      },
      {
        name: "HYSA",
        percentage: 20,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Incoming</h1>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Monthly Income
            </label>
            <Input
              type="number"
              placeholder="Enter your monthly income"
              className="w-full"
              value={data.income}
            />
          </div>
          <Button className="mb-0.5">Set Income</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {data.allocations.map((all) => {
          return (
            <AllocationCard allocation={all} monthlyIncome={data.income} />
          );
        })}
      </div>

      <Button className="w-full md:w-auto">
        <Plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>

      <div className="mt-8 p-4 bg-secondary text-secondary-foreground rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Allocated</p>
            <p className="text-xl font-semibold">
              {data.allocations.reduce((acc, val) => acc + val.percentage, 0)}%
            </p>
          </div>
          <div>
            <p className="text-sm">Remaining</p>
            <p className="text-xl font-semibold">
              {100 -
                data.allocations.reduce((acc, val) => acc + val.percentage, 0)}
              %
            </p>
          </div>
          <div>
            <p className="text-sm">Total Allocated</p>
            <p className="text-xl font-semibold">
              $
              {data.allocations.reduce(
                (acc, val) => acc + data.income * (val.percentage / 100),
                0
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
