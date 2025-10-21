"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Zap } from "lucide-react"

const defiProtocols = [
  {
    id: "aave",
    name: "Aave",
    type: "Lending",
    tvl: 25000,
    apy: 8.5,
    users: 450000,
    volume24h: 2500000,
    status: "active",
  },
  {
    id: "uniswap",
    name: "Uniswap",
    type: "DEX",
    tvl: 18000,
    apy: 12.3,
    users: 380000,
    volume24h: 3200000,
    status: "active",
  },
  {
    id: "curve",
    name: "Curve Finance",
    type: "Stablecoin DEX",
    tvl: 8000,
    apy: 15.7,
    users: 120000,
    volume24h: 1800000,
    status: "active",
  },
  {
    id: "lido",
    name: "Lido",
    type: "Liquid Staking",
    tvl: 22000,
    apy: 3.8,
    users: 280000,
    volume24h: 450000,
    status: "active",
  },
  {
    id: "yearn",
    name: "Yearn Finance",
    type: "Yield Optimizer",
    tvl: 12000,
    apy: 18.2,
    users: 95000,
    volume24h: 320000,
    status: "active",
  },
  {
    id: "compound",
    name: "Compound",
    type: "Lending",
    tvl: 9500,
    apy: 7.2,
    users: 180000,
    volume24h: 890000,
    status: "active",
  },
]

const yieldData = [
  { protocol: "Aave", yield: 8.5 },
  { protocol: "Uniswap", yield: 12.3 },
  { protocol: "Curve", yield: 15.7 },
  { protocol: "Lido", yield: 3.8 },
  { protocol: "Yearn", yield: 18.2 },
  { protocol: "Compound", yield: 7.2 },
]

const tvlDistribution = defiProtocols.map((p) => ({ name: p.name, value: p.tvl }))

export function DeFiProtocolsHub() {
  const totalTVL = defiProtocols.reduce((sum, p) => sum + p.tvl, 0)
  const avgAPY = (defiProtocols.reduce((sum, p) => sum + p.apy, 0) / defiProtocols.length).toFixed(2)
  const totalUsers = defiProtocols.reduce((sum, p) => sum + p.users, 0)

  const colors = ["#5b4eff", "#00d9ff", "#ff9500", "#00d97f", "#ef4444", "#8b5cf6"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total TVL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">${(totalTVL / 1000).toFixed(0)}B</div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Across all protocols</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Average APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{avgAPY}%</div>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Average yield</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              {(totalUsers / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">Total participants</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">Active Protocols</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{defiProtocols.length}</div>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">All operational</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="protocols" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
          <TabsTrigger value="yields">Yields</TabsTrigger>
          <TabsTrigger value="tvl">TVL Distribution</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
        </TabsList>

        <TabsContent value="protocols" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defiProtocols.map((protocol) => (
              <Card key={protocol.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{protocol.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{protocol.type}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TVL:</span>
                      <span className="font-medium">${(protocol.tvl / 1000).toFixed(0)}B</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">APY:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{protocol.apy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Users:</span>
                      <span className="font-medium">{(protocol.users / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">24h Volume:</span>
                      <span className="font-medium">${(protocol.volume24h / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Interact
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yields" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>APY Comparison</CardTitle>
              <CardDescription>Yield rates across protocols</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="protocol" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="yield" fill="#5b4eff" name="APY" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tvl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>TVL Distribution</CardTitle>
              <CardDescription>Total value locked by protocol</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tvlDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}B`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {colors.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}B`} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yield Farming Strategies</CardTitle>
              <CardDescription>Optimized investment strategies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Conservative", protocols: ["Lido", "Aave"], expectedYield: 6.2, risk: "Low" },
                { name: "Balanced", protocols: ["Uniswap", "Curve"], expectedYield: 14.0, risk: "Medium" },
                { name: "Aggressive", protocols: ["Yearn", "Compound"], expectedYield: 22.5, risk: "High" },
              ].map((strategy, idx) => (
                <Card key={idx} className="border-l-4 border-l-accent">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold">{strategy.name}</h5>
                      <Badge variant="outline">{strategy.risk} Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Protocols: {strategy.protocols.join(", ")}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Expected Yield:</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{strategy.expectedYield}%</span>
                    </div>
                    <Button className="w-full mt-3 bg-transparent" size="sm" variant="outline">
                      Deploy Strategy
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
