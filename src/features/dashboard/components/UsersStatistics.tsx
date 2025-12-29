import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { usersChartItems } from "../constants";

const chartConfig = {
  date: {
    label: "date",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const UsersStatistics = () => {
  return (
    <div className="bg-gray-darker p-6 rounded-2xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        {/* Title of chart */}
        <p className="text-sm text-gray-lighter font-semibold">
          System user statistics
        </p>

        {/* Data of chart */}
        <div className="text-xs">
          Active:
          <span className="text-green font-bold"> 20561 </span>
        </div>
        <div className="text-xs">
          Inactive:
          <span className="text-red font-bold"> 294 </span>
        </div>
      </div>

      {/* Line chart */}
      <div className="flex-1 flex items-center justify-center">
        <ChartContainer config={chartConfig} className="size-full">
            <LineChart
              accessibilityLayer
              data={usersChartItems}
              margin={{ top: 17, right: 17, left: 3, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                height={30}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis width={32} tickLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              {/* Active user line chart */}
              <Line
                dataKey="active"
                type="linear"
                stroke="var(--color-green)"
                strokeWidth={2}
                dot={false}
              />

              {/* Inactive user line chart */}
              <Line
                dataKey="inactive"
                type="linear"
                stroke="var(--color-red)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
