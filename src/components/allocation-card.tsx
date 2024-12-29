import { Slider } from "./ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Allocation } from "@/types";

interface AllocationCardProps {
  monthlyIncome: number;
  allocation: Allocation;
}

export default function AllocationCard({
  monthlyIncome,
  allocation,
}: AllocationCardProps) {
  const { name, percentage } = allocation;

  const allocationAmount: number = monthlyIncome * (percentage / 100);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex justify-between items-center">
          <Input
            className="w-40 text-lg font-semibold"
            placeholder="Allocation Name"
            value={name}
          />
          <span className="text-2xl">${allocationAmount}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Slider
              defaultValue={[percentage]}
              max={100}
              step={1}
              className="flex-1"
            />
            <div className="flex items-center gap-1">
              <Input
                type="number"
                value={percentage}
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
