import { Slider } from "./ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Allocation } from "@/types";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { monthlyIncomeAtom } from "@/stores/app";
import { useMemo } from "react";
import EasyEdit from "react-easy-edit";
import { Input } from "./ui/input";

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
    <Card className="shadow-lg">
      <CardHeader className="pb-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl font-medium">
              <EasyEdit
                saveOnBlur
                placeholder="Click here to name"
                editComponent={
                  <Input
                    autoFocus
                    className="text-lg"
                    onChange={(e) =>
                      setAllocation((oldValue) => ({
                        ...oldValue,
                        name: e.target.value,
                      }))
                    }
                  />
                }
                type="text"
                onSave={(e) =>
                  setAllocation((oldValue) => ({
                    ...oldValue,
                    name: e.target.value,
                  }))
                }
                value={allocation.name}
              />
            </CardTitle>
          </div>
          <span className="text-3xl font-bold text-pretty">
            ${allocationAmount}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Allocation</span>
            <span className="text-xl font-medium">
              {allocation.percentage}%
            </span>
          </div>
          <Slider
            value={[allocation.percentage]}
            max={100}
            step={1}
            className="cursor-pointer"
            onValueChange={(e) =>
              setAllocation((oldValue) => ({
                ...oldValue,
                percentage: e[0],
              }))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
