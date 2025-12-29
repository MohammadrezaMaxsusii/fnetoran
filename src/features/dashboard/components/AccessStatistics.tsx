import { Pie, PieChart, Sector } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { accessChartItems } from "../constants";

const chartConfig = {
  counts: {
    label: "counts",
  },
  active: {
    label: "active",
    color: "var(--chart-1)",
  },
  inactive: {
    label: "inactive",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const AccessStatistics = () => {
  return (
    <div className="bg-gray-darker p-6 rounded-2xl">
      {/* Title of chart */}
      <p className="text-sm text-gray-lighter font-semibold">
        Statistics of groups and their accesses
      </p>

      <div className="grid grid-cols-2 place-content-center size-full">
        {/* Data of chart */}
        <div className="space-y-6 border-e border-e-default grid items-center">
          <div className="flex flex-col border-l-4 border-primary ps-3">
            <span className="text-sm">Groups</span>
            <span className="text-5xl text-primary font-bold">1378</span>
          </div>
          <div className="flex flex-col border-l-4 border-orange ps-3">
            <span className="text-sm">Accesses</span>
            <span className="text-5xl text-orange font-bold">1125</span>
          </div>
        </div>

        {/* Pie chart */}
        <ChartContainer config={chartConfig} className="aspect-square ps-7">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={accessChartItems}
              dataKey="counts"
              nameKey="category"
              innerRadius={30}
              outerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};
