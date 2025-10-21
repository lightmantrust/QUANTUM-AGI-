"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Wallet {
  id: string
  name: string
  network: string
  balance: number
  quantumSignature: string
}

interface WalletBalanceOverviewProps {
  wallets: Wallet[]
  totalBalance: number
}

export function WalletBalanceOverview({ wallets, totalBalance }: WalletBalanceOverviewProps) {
  const chartData = wallets.map((w) => ({
    name: w.network,
    balance: w.balance,
    percentage: ((w.balance / totalBalance) * 100).toFixed(1),
  }))

  const colors = ["#06b6d4", "#6366f1", "#8b5cf6", "#ec4899"]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div>
        <h3 className="text-sm font-medium mb-4">Balance by Network</h3>
        <ChartContainer
          config={{
            balance: {
              label: "Balance",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="balance" fill="var(--color-balance)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Pie Chart */}
      <div>
        <h3 className="text-sm font-medium mb-4">Portfolio Distribution</h3>
        <ChartContainer
          config={{
            balance: {
              label: "Balance",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="balance"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Summary Stats */}
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        {chartData.map((item, index) => (
          <div key={item.name}>
            <p className="text-xs text-muted-foreground">{item.name}</p>
            <p className="text-lg font-semibold text-foreground">
              {item.balance.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-xs text-muted-foreground">{item.percentage}% of total</p>
          </div>
        ))}
      </div>
    </div>
  )
}
