"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", score: 65, time: 120 },
  { name: "Week 2", score: 72, time: 135 },
  { name: "Week 3", score: 68, time: 110 },
  { name: "Week 4", score: 78, time: 145 },
  { name: "Week 5", score: 82, time: 160 },
  { name: "Week 6", score: 85, time: 140 },
];

export function PerformanceChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" opacity={0.3} />
  <XAxis
    dataKey="name"
    axisLine={false}
    tickLine={false}
    style={{ fontSize: "12px", fill: "#4b5563" } as React.CSSProperties}
    {...({} as any)}
  />
  <YAxis
    axisLine={false}
    tickLine={false}
    style={{ fontSize: "12px", fill: "#4b5563" } as React.CSSProperties}
    {...({} as any)}
  />
  <Tooltip
    contentStyle={{
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    }}
    {...({} as any)}
  />
  <Line
    type="monotone"
    dataKey="score"
    stroke="#3b82f6"
    strokeWidth={3}
    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
    activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
    {...({} as any)}
  />
</LineChart>

      </ResponsiveContainer>
    </div>
  );
}
