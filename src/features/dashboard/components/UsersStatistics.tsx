import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { date: "10/17", active: 186, inactive: 300 },
  { date: "10/18", active: 305, inactive: 253 },
  { date: "10/19", active: 237, inactive: 132 },
  { date: "10/20", active: 73, inactive: 313 },
  { date: "10/21", active: 209, inactive: 53 },
  { date: "10/22", active: 214, inactive: 300 },
  { date: "10/23", active: 210, inactive: 280 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const UsersStatistics = () => {
  return (
    <div className="col-span-1 bg-gray-darker p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-lighter font-semibold">
          System user statistics
        </p>

        <div className="text-xs">
          Active:
          <span className="text-green font-bold"> 20561</span>
        </div>
        <div className="text-xs">
          Inactive:
          <span className="text-red font-bold"> 294</span>
        </div>
      </div>

      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
        >
          <CartesianGrid vertical={false} />
          {/* <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={8}
            tickFormatter={(value) => value}
            className="w-full"
          /> */}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="active"
            type="linear"
            stroke="var(--color-green)"
            strokeWidth={2}
            dot={false}
          />
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
  );
};
