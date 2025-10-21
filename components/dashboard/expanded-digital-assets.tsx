"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

const digitalAssetNetworks = [
  // Layer 1 Networks
  {
    id: "btc",
    name: "Bitcoin",
    type: "Layer 1",
    tps: 7,
    latency: 600,
    uptime: 99.98,
    validators: 15000,
    marketCap: 1200000,
    tvl: 0,
    color: "#f7931a",
    status: "operational",
  },
  {
    id: "eth",
    name: "Ethereum",
    type: "Layer 1",
    tps: 15,
    latency: 12,
    uptime: 99.95,
    validators: 900000,
    marketCap: 450000,
    tvl: 85000,
    color: "#627eea",
    status: "operational",
  },
  {
    id: "sol",
    name: "Solana",
    type: "Layer 1",
    tps: 65000,
    latency: 400,
    uptime: 99.8,
    validators: 3500,
    marketCap: 180000,
    tvl: 12000,
    color: "#14f195",
    status: "operational",
  },
  {
    id: "ada",
    name: "Cardano",
    type: "Layer 1",
    tps: 250,
    latency: 20,
    uptime: 99.97,
    validators: 3000,
    marketCap: 95000,
    tvl: 5000,
    color: "#0033ad",
    status: "operational",
  },
  {
    id: "dot",
    name: "Polkadot",
    type: "Layer 1",
    tps: 1000,
    latency: 6,
    uptime: 99.96,
    validators: 297,
    marketCap: 85000,
    tvl: 8000,
    color: "#e6007a",
    status: "operational",
  },
  {
    id: "atom",
    name: "Cosmos",
    type: "Layer 1",
    tps: 10000,
    latency: 7,
    uptime: 99.94,
    validators: 180,
    marketCap: 45000,
    tvl: 6000,
    color: "#16aaff",
    status: "operational",
  },
  {
    id: "avax",
    name: "Avalanche",
    type: "Layer 1",
    tps: 4500,
    latency: 2,
    uptime: 99.93,
    validators: 1200,
    marketCap: 65000,
    tvl: 9000,
    color: "#e84142",
    status: "operational",
  },
  {
    id: "near",
    name: "NEAR Protocol",
    type: "Layer 1",
    tps: 100000,
    latency: 1,
    uptime: 99.92,
    validators: 100,
    marketCap: 35000,
    tvl: 4000,
    color: "#000000",
    status: "operational",
  },

  // Layer 2 Networks
  {
    id: "arb",
    name: "Arbitrum",
    type: "Layer 2",
    tps: 40000,
    latency: 0.5,
    uptime: 99.98,
    validators: 0,
    marketCap: 0,
    tvl: 45000,
    color: "#28a0f0",
    status: "operational",
  },
  {
    id: "opt",
    name: "Optimism",
    type: "Layer 2",
    tps: 4000,
    latency: 2,
    uptime: 99.97,
    validators: 0,
    marketCap: 0,
    tvl: 35000,
    color: "#ff0420",
    status: "operational",
  },
  {
    id: "zk",
    name: "zkSync",
    type: "Layer 2",
    tps: 20000,
    latency: 1,
    uptime: 99.96,
    validators: 0,
    marketCap: 0,
    tvl: 12000,
    color: "#8c8dfc",
    status: "operational",
  },
  {
    id: "stk",
    name: "Starknet",
    type: "Layer 2",
    tps: 10000,
    latency: 1.5,
    uptime: 99.95,
    validators: 0,
    marketCap: 0,
    tvl: 8000,
    color: "#ec796b",
    status: "operational",
  },

  // Stablecoins
  {
    id: "usdc",
    name: "USD Coin",
    type: "Stablecoin",
    tps: 65000,
    latency: 1,
    uptime: 99.99,
    validators: 0,
    marketCap: 35000,
    tvl: 0,
    color: "#2775ca",
    status: "operational",
  },
  {
    id: "usdt",
    name: "Tether",
    type: "Stablecoin",
    tps: 65000,
    latency: 1,
    uptime: 99.99,
    validators: 0,
    marketCap: 120000,
    tvl: 0,
    color: "#26a17b",
    status: "operational",
  },
  {
    id: "dai",
    name: "DAI",
    type: "Stablecoin",
    tps: 15,
    latency: 12,
    uptime: 99.95,
    validators: 0,
    marketCap: 8000,
    tvl: 0,
    color: "#f5ac1e",
    status: "operational",
  },

  // DeFi Protocols
  {
    id: "aave",
    name: "Aave",
    type: "DeFi",
    tps: 15,
    latency: 12,
    uptime: 99.95,
    validators: 0,
    marketCap: 15000,
    tvl: 25000,
    color: "#b6509e",
    status: "operational",
  },
  {
    id: "uni",
    name: "Uniswap",
    type: "DeFi",
    tps: 15,
    latency: 12,
    uptime: 99.95,
    validators: 0,
    marketCap: 12000,
    tvl: 18000,
    color: "#ff007a",
    status: "operational",
  },
  {
    id: "curve",
    name: "Curve Finance",
    type: "DeFi",
    tps: 15,
    latency: 12,
    uptime: 99.95,
    validators: 0,
    marketCap: 5000,
    tvl: 8000,
    color: "#4e529a",
    status: "operational",
  },

  // Emerging Networks
  {
    id: "sui",
    name: "Sui",
    type: "Emerging",
    tps: 297000,
    latency: 0.4,
    uptime: 99.9,
    validators: 100,
    marketCap: 12000,
    tvl: 2000,
    color: "#6fbcf0",
    status: "operational",
  },
  {
    id: "aptos",
    name: "Aptos",
    type: "Emerging",
    tps: 160000,
    latency: 0.8,
    uptime: 99.88,
    validators: 100,
    marketCap: 8000,
    tvl: 1500,
    color: "#000000",
    status: "operational",
  },
  {
    id: "sei",
    name: "Sei",
    type: "Emerging",
    tps: 20000,
    latency: 0.4,
    uptime: 99.85,
    validators: 50,
    marketCap: 3000,
    tvl: 800,
    color: "#ff6b35",
    status: "operational",
  },
]

const networkTypeColors = {
  "Layer 1": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Layer 2": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Stablecoin: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  DeFi: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Emerging: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
}

export function ExpandedDigitalAssets() {
  const totalMarketCap = digitalAssetNetworks.reduce((sum, n) => sum + n.marketCap, 0)
  const totalTVL = digitalAssetNetworks.reduce((sum, n) => sum + n.tvl, 0)
  const avgUptime = (digitalAssetNetworks.reduce((sum, n) => sum + n.uptime, 0) / digitalAssetNetworks.length).toFixed(
    2,
  )

  const networksByType = {
    "Layer 1": digitalAssetNetworks.filter((n) => n.type === "Layer 1"),
    "Layer 2": digitalAssetNetworks.filter((n) => n.type === "Layer 2"),
    Stablecoin: digitalAssetNetworks.filter((n) => n.type === "Stablecoin"),
    DeFi: digitalAssetNetworks.filter((n) => n.type === "DeFi"),
    Emerging: digitalAssetNetworks.filter((n) => n.type === "Emerging"),
  }

  const performanceData = digitalAssetNetworks.map((n) => ({
    name: n.name.substring(0, 6),
    tps: n.tps,
    uptime: n.uptime,
  }))

  const marketCapData = Object.entries(networksByType).map(([type, networks]) => ({
    name: type,
    value: networks.reduce((sum, n) => sum + n.marketCap, 0),
  }))

  const tvlData = Object.entries(networksByType).map(([type, networks]) => ({
    name: type,
    value: networks.reduce((sum, n) => sum + n.tvl, 0),
  }))

  const colors = ["#5b4eff", "#00d9ff", "#ff9500", "#00d97f", "#ef4444"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Networks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{digitalAssetNetworks.length}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Active digital asset networks</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Total Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              ${(totalMarketCap / 1000).toFixed(0)}B
            </div>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Combined market capitalization</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Total TVL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              ${(totalTVL / 1000).toFixed(0)}B
            </div>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">Total value locked in DeFi</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">Avg Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">{avgUptime}%</div>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Network reliability</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="marketcap">Market Cap</TabsTrigger>
          <TabsTrigger value="tvl">TVL</TabsTrigger>
          <TabsTrigger value="networks">Networks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Network Distribution by Type</CardTitle>
                <CardDescription>Count of networks by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(networksByType).map(([type, networks]) => ({
                          name: type,
                          value: networks.length,
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {colors.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Network Status Summary</CardTitle>
                <CardDescription>Real-time operational status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(networksByType).map(([type, networks]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${networkTypeColors[type as keyof typeof networkTypeColors]}`}
                      ></div>
                      <span className="font-medium">{type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{networks.length} networks</span>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200"
                      >
                        Operational
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Network Performance Metrics</CardTitle>
              <CardDescription>TPS and Uptime comparison across all networks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="tps" fill="#5b4eff" name="TPS" />
                    <Bar yAxisId="right" dataKey="uptime" fill="#00d9ff" name="Uptime %" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketcap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Cap Distribution</CardTitle>
              <CardDescription>Total market capitalization by network type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketCapData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}B`} />
                    <Bar dataKey="value" fill="#5b4eff" name="Market Cap" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tvl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Value Locked (TVL)</CardTitle>
              <CardDescription>TVL distribution across DeFi networks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tvlData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}B`} />
                    <Bar dataKey="value" fill="#00d97f" name="TVL" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networks" className="space-y-4">
          {Object.entries(networksByType).map(([type, networks]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Badge className={networkTypeColors[type as keyof typeof networkTypeColors]}>{type}</Badge>
                  {networks.length} Networks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {networks.map((network) => (
                    <Card key={network.id} className="border-l-4" style={{ borderLeftColor: network.color }}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{network.name}</h4>
                            <p className="text-xs text-muted-foreground">{network.type}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200"
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">TPS:</span>
                            <span className="font-medium">{network.tps.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Latency:</span>
                            <span className="font-medium">{network.latency}ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Uptime:</span>
                            <span className="font-medium">{network.uptime}%</span>
                          </div>
                          {network.validators > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Validators:</span>
                              <span className="font-medium">{network.validators.toLocaleString()}</span>
                            </div>
                          )}
                          {network.marketCap > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Market Cap:</span>
                              <span className="font-medium">${(network.marketCap / 1000).toFixed(0)}B</span>
                            </div>
                          )}
                          {network.tvl > 0 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">TVL:</span>
                              <span className="font-medium">${(network.tvl / 1000).toFixed(0)}B</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
