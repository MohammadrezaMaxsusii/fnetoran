import { LabelList, Pie, PieChart, Sector } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart with an active sector";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--chart-1)" },
  { browser: "safari", visitors: 200, fill: "var(--chart-2)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const AccessStatistics = () => {
  return (
    <div className="col-span-1 bg-gray-darker p-6 rounded-2xl">
      <p className="text-sm text-gray-lighter font-semibold">
        Statistics of groups and their accesses
      </p>

      <div className="grid grid-cols-2 pt-8">
        <div className="space-y-6 border-e border-e-default">
          <div className="flex flex-col border-l-4 border-primary ps-3">
            <span className="text-sm">Groups</span>
            <span className="text-5xl text-primary font-bold">1284</span>
          </div>
          <div className="flex flex-col border-l-4 border-orange ps-3">
            <span className="text-sm">Accesses</span>
            <span className="text-5xl text-orange font-bold">1284</span>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={30}
              outerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              {/* <LabelList
              dataKey="visitors"
              position="inside"
              fill="#fff"
              fontSize={12}
            /> */}
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};
