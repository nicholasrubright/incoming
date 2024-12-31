import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAtomValue } from "jotai";
import {
  allocationChartConfigAtom,
  allocationChartDataAtom,
} from "@/stores/app";

export function AllocationDonutChart() {
  const allocationChartConfig = useAtomValue(allocationChartConfigAtom);
  const allocationChartData = useAtomValue(allocationChartDataAtom);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Allocation - Donut</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={allocationChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={allocationChartData}
              dataKey="percentage"
              nameKey="allocation"
              innerRadius={60}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="allocation" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
