"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface NetworkResonanceChartProps {
  data: Record<string, number>
}

export function NetworkResonanceChart({ data }: NetworkResonanceChartProps) {
  const chartData = Object.entries(data).map(([network, value]) => ({
    network,
    resonance: value,
    fill: value > 90 ? "hsl(var(--primary))" : value > 85 ? "hsl(var(--accent))" : "hsl(var(--chart-5))",
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="network" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, "Resonance"]}
          />
          <Bar dataKey="resonance" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
