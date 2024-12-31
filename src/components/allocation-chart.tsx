import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// import { allocationsAtom } from "@/stores/app";
// import { useAtomValue } from "jotai";
const chartData = [
  { allocation: "savings", percentage: 50, fill: "var(--color-savings)" },
  { allocation: "checking", percentage: 30, fill: "var(--color-checking)" },
  {
    allocation: "investments",
    percentage: 10,
    fill: "var(--color-investments)",
  },
  { allocation: "hysa", percentage: 10, fill: "var(--color-hysa)" },
  { allocation: "other", percentage: 0, fill: "var(--color-other)" },
];

const chartConfig = {
  allocations: {
    label: "Allocations",
  },
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-1))",
  },
  checking: {
    label: "Checking",
    color: "hsl(var(--chart-2))",
  },
  investments: {
    label: "Investments",
    color: "hsl(var(--chart-3))",
  },
  hysa: {
    label: "HYSA",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function AllocationDonutChart() {
  //const allocations = useAtomValue(allocationsAtom);

  // const allocationsDataPoints = allocations.sort((a, b) => a.percentage - b.percentage).map((all, index) => {

  //   return {
  //     [all.name]: {
  //       label: all.name,
  //       color: `hsl(var(--chart-${index}))`
  //     },
  //   }

  // });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Allocation - Donut</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="allocation"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

