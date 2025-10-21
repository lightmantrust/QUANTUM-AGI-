"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { ArrowRightLeft } from "lucide-react"

const crossChainBridges = [
  {
    id: "stargate",
    name: "Stargate Finance",
    from: "Ethereum",
    to: "Arbitrum",
    liquidity: 450000,
    volume24h: 125000,
    fee: 0.05,
    status: "active",
  },
  {
    id: "lifi",
    name: "Li.Fi",
    from: "Polygon",
    to: "Optimism",
    liquidity: 320000,
    volume24h: 98000,
    fee: 0.03,
    status: "active",
  },
  {
    id: "connext",
    name: "Connext",
    from: "Ethereum",
    to: "Polygon",
    liquidity: 280000,
    volume24h: 75000,
    fee: 0.04,
    status: "active",
  },
  {
    id: "axelar",
    name: "Axelar",
    from: "Cosmos",
    to: "Ethereum",
    liquidity: 200000,
    volume24h: 45000,
    fee: 0.06,
    status: "active",
  },
  {
    id: "wormhole",
    name: "Wormhole",
    from: "Solana",
    to: "Ethereum",
    liquidity: 380000,
    volume24h: 110000,
    fee: 0.02,
    status: "active",
  },
  {
    id: "rainbow",
    name: "Rainbow Bridge",
    from: "NEAR",
    to: "Ethereum",
    liquidity: 150000,
    volume24h: 32000,
    fee: 0.05,
    status: "active",
  },
]

const bridgeVolumeData = [
  { time: "00:00", volume: 45000 },
  { time: "04:00", volume: 52000 },
  { time: "08:00", volume: 68000 },
  { time: "12:00", volume: 85000 },
  { time: "16:00", volume: 92000 },
  { time: "20:00", volume: 78000 },
  { time: "24:00", volume: 65000 },
]

export function CrossChainBridge() {
  const totalLiquidity = crossChainBridges.reduce((sum, b) => sum + b.liquidity, 0)
  const total24hVolume = crossChainBridges.reduce((sum, b) => sum + b.volume24h, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Liquidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              ${(totalLiquidity / 1000).toFixed(0)}M
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Across all bridges</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              ${(total24hVolume / 1000).toFixed(0)}M
            </div>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Cross-chain transfers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Active Bridges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{crossChainBridges.length}</div>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">All operational</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bridges" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bridges">Bridges</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="bridges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crossChainBridges.map((bridge) => (
              <Card key={bridge.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{bridge.name}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <span>{bridge.from}</span>
                        <ArrowRightLeft className="w-3 h-3" />
                        <span>{bridge.to}</span>
                      </p>
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
                      <span className="text-muted-foreground">Liquidity:</span>
                      <span className="font-medium">${(bridge.liquidity / 1000).toFixed(0)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">24h Volume:</span>
                      <span className="font-medium">${(bridge.volume24h / 1000).toFixed(0)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee:</span>
                      <span className="font-medium">{bridge.fee}%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    Bridge Assets
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="volume" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Chain Volume (24h)</CardTitle>
              <CardDescription>Real-time bridge transfer volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bridgeVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value / 1000}M`} />
                    <Line type="monotone" dataKey="volume" stroke="#5b4eff" strokeWidth={2} dot={{ fill: "#5b4eff" }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Routes</CardTitle>
              <CardDescription>Most used cross-chain transfer routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { route: "Ethereum → Arbitrum", volume: 45000, percentage: 28 },
                  { route: "Polygon → Optimism", volume: 32000, percentage: 20 },
                  { route: "Ethereum → Polygon", volume: 28000, percentage: 17 },
                  { route: "Solana → Ethereum", volume: 25000, percentage: 15 },
                  { route: "Cosmos → Ethereum", volume: 20000, percentage: 12 },
                  { route: "NEAR → Ethereum", volume: 12000, percentage: 8 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{item.route}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">${(item.volume / 1000).toFixed(0)}M</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
