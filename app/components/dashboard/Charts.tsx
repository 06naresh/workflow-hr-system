"use client";

import { useState } from "react";
import { Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { chartData } from "../../lib/DummyData";

interface ChartItem {
  day: string;
  hours: number;
}

interface ChartsProps {
  data: ChartItem[];
}

const DEFAULT_COLOR = "#8884d8";
const HOVER_COLORS = [
  "#ff4444", "#00C49F", "#FFBB28",
  "#FF8042", "#82ca9d", "#ffc658", "#a83279"
];

export default function PieChartDefaultIndex({ data }: ChartsProps) {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);



if (!data || data.length === 0) return (
  <div className="w-full h-full border-2 rounded-lg p-3">No chart data available</div>
);

const chartData = data.map((item, index) => ({
  name: item.day,
  hours: item.hours,
  label: `${item.hours}h`,
  fill: activeIndex === index ? HOVER_COLORS[index % HOVER_COLORS.length] : DEFAULT_COLOR,
}));

  return (
    <>
      <div className="flex flex-col justify-center border-2 rounded-lg p-3 md:w-1/2 w-full">
        <h3 className="text-lg font-semibold text-center">
          Hours Tracked (Last 7 Days)
        </h3>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="hours"
                nameKey="day"
                isAnimationActive={false}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />

              <Tooltip
                // formatter={(value, name, props) => props.payload.label}
                formatter={(value: unknown, name: unknown, props: any) => {
                  const hours = typeof value === "number" ? value : Number(value ?? 0);
                  const label = typeof props?.payload?.name === "string" ? props.payload.name : String(name ?? "");


                  if (hours < 1) {
                    return [`${Math.round(hours * 60)}m`, props.payload.name];
                  }
                  return [`${value}h`, props.payload.name];
              }}
                // formatter={(value, name, props) =>
                //   props?.payload?.label ?? `${value}h`
                // }
              />
              <RechartsDevtools />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
