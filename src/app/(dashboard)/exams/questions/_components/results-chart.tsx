"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart";

const chartConfig = {
  correct: {
    label: "Correct",
    color: "#00BC7D",
  },
  incorrect: {
    label: "Incorrect",
    color: "#EF4444",
  },
} satisfies ChartConfig;

type ChartDataProps = {
  chartData: {
    result: string;
    value: number | undefined;
    fill: string;
  }[];
  totalCorrectAnswers: number | undefined;
  totalWrongAnswers: number | undefined;
};

export function ResultsPieChart({
  chartData,
  totalWrongAnswers,
  totalCorrectAnswers,
}: ChartDataProps) {
  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="result"
            innerRadius={60}
          />
        </PieChart>
      </ChartContainer>
      <div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 "
            style={{ backgroundColor: chartConfig.correct.color }}
          />
          <span className="text-sm font-medium text-black">
            {chartConfig.correct.label} : {totalCorrectAnswers}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 "
            style={{ backgroundColor: chartConfig.incorrect.color }}
          />
          <span className="text-sm font-medium text-black">
            {chartConfig.incorrect.label} : {totalWrongAnswers}
          </span>
        </div>
      </div>
    </>
  );
}
