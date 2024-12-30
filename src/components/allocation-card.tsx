import { Slider } from "./ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Allocation } from "@/types";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { monthlyIncomeAtom } from "@/stores/app";
import { useMemo } from "react";

interface AllocationCardProps {
  allocationAtom: PrimitiveAtom<Allocation>;
}

export default function AllocationCard({
  allocationAtom,
}: AllocationCardProps) {
  const [allocation, setAllocation] = useAtom(allocationAtom);
  const monthlyIncome = useAtomValue(monthlyIncomeAtom);

  const allocationAmount = useMemo(() => {
    return Math.round(monthlyIncome * (allocation.percentage / 100));
  }, [monthlyIncome, allocation.percentage]);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex justify-between items-center">
          <Input
            className="w-40 text-lg font-semibold"
            placeholder="Allocation Name"
            value={allocation.name}
            onChange={(e) =>
              setAllocation((oldValue) => ({
                ...oldValue,
                name: e.target.value,
              }))
            }
          />
          <span className="text-2xl">${allocationAmount}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Slider
              //defaultValue={[allocation.percentage]}
              value={[allocation.percentage]}
              onValueChange={(e) =>
                setAllocation((oldValue) => ({
                  ...oldValue,
                  percentage: e[0],
                }))
              }
              max={100}
              step={1}
              className="flex-1"
            />
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={allocation.percentage}
                onChange={(e) =>
                  setAllocation((oldValue) => ({
                    ...oldValue,
                    percentage: e.target.valueAsNumber,
                  }))
                }
                className="w-16 text-right"
              />
              <span>%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
