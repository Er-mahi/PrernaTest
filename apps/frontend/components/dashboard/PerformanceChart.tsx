"use client";
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", score: 45, time: 120 },
  { name: "Week 2", score: 52, time: 135 },
  { name: "Week 3", score: 58, time: 110 },
  { name: "Week 4", score: 65, time: 145 },
  { name: "Week 5", score: 72, time: 160 },
  { name: "Week 6", score: 78, time: 140 },
];

export function PerformanceChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className={`${isMobile ? 'h-64' : 'h-80'} w-full`}
      role="img"
      aria-label="Performance chart showing weekly progress"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          margin={{
            top: isMobile ? 10 : 20,
            right: isMobile ? 10 : 30,
            left: isMobile ? 10 : 20,
            bottom: isMobile ? 10 : 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#d1d5db" 
            opacity={0.3} 
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            style={{ 
              fontSize: isMobile ? "10px" : "12px", 
              fill: "#4b5563" 
            } as React.CSSProperties}
            interval={isMobile ? 1 : 0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            style={{ 
              fontSize: isMobile ? "10px" : "12px", 
              fill: "#4b5563" 
            } as React.CSSProperties}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              fontSize: isMobile ? "12px" : "14px",
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={isMobile ? 2 : 3}
            dot={{ 
              fill: "#3b82f6", 
              strokeWidth: 2, 
              r: isMobile ? 3 : 4 
            }}
            activeDot={{ 
              r: isMobile ? 5 : 6, 
              stroke: "#3b82f6", 
              strokeWidth: 2 
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
