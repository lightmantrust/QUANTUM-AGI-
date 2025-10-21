"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface NetworkStatus {
  network: "XRP" | "XLM" | "XDC" | "HBAR"
  throughput: number
  latency: number
}

interface NetworkPerformanceChartProps {
  networks: NetworkStatus[]
}

// Mock historical data for demonstration
const generateHistoricalData = (networks: NetworkStatus[]) => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = new Date()
    hour.setHours(hour.getHours() - (23 - i))
    return hour.getHours().toString().padStart(2, "0") + ":00"
  })

  return hours.map((hour) => {
    const data: any = { time: hour }
    networks.forEach((network) => {
      data[`${network.network}_throughput`] = network.throughput + (Math.random() - 0.5) * 200
      data[`${network.network}_latency`] = network.latency + (Math.random() - 0.5) * 1
    })
    return data
  })
}

export function NetworkPerformanceChart({ networks }: NetworkPerformanceChartProps) {
  const data = generateHistoricalData(networks)

  const colors = {
    XRP: "#0891b2",
    XLM: "#6366f1",
    XDC: "#22c55e",
    HBAR: "#a855f7",
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          {networks.map((network) => (
            <Line
              key={network.network}
              type="monotone"
              dataKey={`${network.network}_throughput`}
              stroke={colors[network.network]}
              strokeWidth={2}
              dot={false}
              name={`${network.network} Throughput`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
