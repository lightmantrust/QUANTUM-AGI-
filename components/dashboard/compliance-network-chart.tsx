"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface LegalNetwork {
  id: string
  name: string
  type: string
  compliance: number
  nodes: number
  activeNodes: number
}

interface ComplianceNetworkChartProps {
  networks: LegalNetwork[]
}

export function ComplianceNetworkChart({ networks }: ComplianceNetworkChartProps) {
  const chartData = networks.map((network) => ({
    name: network.type,
    compliance: network.compliance,
    nodeHealth: (network.activeNodes / network.nodes) * 100,
  }))

  return (
    <ChartContainer
      config={{
        compliance: {
          label: "Compliance Score",
          color: "hsl(var(--chart-1))",
        },
        nodeHealth: {
          label: "Node Health",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="compliance" fill="var(--color-compliance)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="nodeHealth" fill="var(--color-nodeHealth)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
