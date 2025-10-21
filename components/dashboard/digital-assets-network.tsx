"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Activity, TrendingUp, Zap, Lock } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface DigitalAssetNetwork {
  id: string
  name: string
  symbol: string
  type: "Layer1" | "Layer2" | "Sidechain" | "DeFi" | "Stablecoin"
  status: "online" | "degraded" | "offline"
  marketCap: number
  tvl: number
  nodes: number
  activeNodes: number
  latency: number
  throughput: number
  gasPrice: number
  validators: number
  uptime: number
  lastUpdate: Date
}

export function DigitalAssetsNetwork() {
  const [digitalAssets, setDigitalAssets] = useState<DigitalAssetNetwork[]>([
    // Layer 1 Networks
    {
      id: "btc_001",
      name: "Bitcoin",
      symbol: "BTC",
      type: "Layer1",
      status: "online",
      marketCap: 1200000000000,
      tvl: 45000000000,
      nodes: 45000,
      activeNodes: 44800,
      latency: 10.5,
      throughput: 7,
      gasPrice: 0,
      validators: 0,
      uptime: 99.98,
      lastUpdate: new Date(),
    },
    {
      id: "eth_001",
      name: "Ethereum",
      symbol: "ETH",
      type: "Layer1",
      status: "online",
      marketCap: 250000000000,
      tvl: 85000000000,
      nodes: 12000,
      activeNodes: 11950,
      latency: 12.8,
      throughput: 15,
      gasPrice: 45.2,
      validators: 950000,
      uptime: 99.95,
      lastUpdate: new Date(),
    },
    {
      id: "sol_001",
      name: "Solana",
      symbol: "SOL",
      type: "Layer1",
      status: "online",
      marketCap: 85000000000,
      tvl: 12000000000,
      nodes: 3200,
      activeNodes: 3180,
      latency: 0.4,
      throughput: 65000,
      gasPrice: 0.00025,
      validators: 3500,
      uptime: 99.87,
      lastUpdate: new Date(),
    },
    {
      id: "pol_001",
      name: "Polygon",
      symbol: "POL",
      type: "Layer2",
      status: "online",
      marketCap: 12000000000,
      tvl: 2500000000,
      nodes: 1200,
      activeNodes: 1195,
      latency: 2.1,
      throughput: 7000,
      gasPrice: 0.5,
      validators: 150,
      uptime: 99.92,
      lastUpdate: new Date(),
    },
    {
      id: "arb_001",
      name: "Arbitrum",
      symbol: "ARB",
      type: "Layer2",
      status: "online",
      marketCap: 8500000000,
      tvl: 3200000000,
      nodes: 800,
      activeNodes: 795,
      latency: 0.25,
      throughput: 40000,
      gasPrice: 0.1,
      validators: 100,
      uptime: 99.94,
      lastUpdate: new Date(),
    },
    {
      id: "opt_001",
      name: "Optimism",
      symbol: "OP",
      type: "Layer2",
      status: "online",
      marketCap: 5200000000,
      tvl: 1800000000,
      nodes: 600,
      activeNodes: 598,
      latency: 0.2,
      throughput: 4000,
      gasPrice: 0.08,
      validators: 80,
      uptime: 99.96,
      lastUpdate: new Date(),
    },
    {
      id: "dot_001",
      name: "Polkadot",
      symbol: "DOT",
      type: "Layer1",
      status: "online",
      marketCap: 15000000000,
      tvl: 2800000000,
      nodes: 2500,
      activeNodes: 2480,
      latency: 6.0,
      throughput: 1000,
      gasPrice: 0.001,
      validators: 300,
      uptime: 99.91,
      lastUpdate: new Date(),
    },
    {
      id: "cos_001",
      name: "Cosmos",
      symbol: "ATOM",
      type: "Layer1",
      status: "online",
      marketCap: 8000000000,
      tvl: 1500000000,
      nodes: 1800,
      activeNodes: 1780,
      latency: 5.5,
      throughput: 10000,
      gasPrice: 0.0025,
      validators: 180,
      uptime: 99.89,
      lastUpdate: new Date(),
    },
    {
      id: "avax_001",
      name: "Avalanche",
      symbol: "AVAX",
      type: "Layer1",
      status: "online",
      marketCap: 18000000000,
      tvl: 3500000000,
      nodes: 1400,
      activeNodes: 1385,
      latency: 1.0,
      throughput: 4500,
      gasPrice: 2.5,
      validators: 1200,
      uptime: 99.93,
      lastUpdate: new Date(),
    },
    {
      id: "usdc_001",
      name: "USD Coin",
      symbol: "USDC",
      type: "Stablecoin",
      status: "online",
      marketCap: 35000000000,
      tvl: 8000000000,
      nodes: 500,
      activeNodes: 500,
      latency: 0.5,
      throughput: 100000,
      gasPrice: 0.01,
      validators: 50,
      uptime: 99.99,
      lastUpdate: new Date(),
    },
    {
      id: "usdt_001",
      name: "Tether",
      symbol: "USDT",
      type: "Stablecoin",
      status: "online",
      marketCap: 120000000000,
      tvl: 25000000000,
      nodes: 800,
      activeNodes: 800,
      latency: 0.3,
      throughput: 150000,
      gasPrice: 0.005,
      validators: 75,
      uptime: 99.98,
      lastUpdate: new Date(),
    },
    {
      id: "aave_001",
      name: "Aave",
      symbol: "AAVE",
      type: "DeFi",
      status: "online",
      marketCap: 12000000000,
      tvl: 15000000000,
      nodes: 400,
      activeNodes: 398,
      latency: 0.8,
      throughput: 50000,
      gasPrice: 0.02,
      validators: 40,
      uptime: 99.97,
      lastUpdate: new Date(),
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDigitalAssets((prev) =>
        prev.map((asset) => ({
          ...asset,
          gasPrice: Math.max(0, asset.gasPrice + (Math.random() - 0.5) * asset.gasPrice * 0.1),
          throughput: Math.max(1, asset.throughput + (Math.random() - 0.5) * asset.throughput * 0.05),
          latency: Math.max(0.1, asset.latency + (Math.random() - 0.5) * asset.latency * 0.1),
          activeNodes: Math.max(
            asset.nodes - 50,
            Math.min(asset.nodes, asset.activeNodes + Math.floor((Math.random() - 0.5) * 10)),
          ),
          uptime: Math.max(99, Math.min(100, asset.uptime + (Math.random() - 0.5) * 0.05)),
          lastUpdate: new Date(),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const totalMarketCap = digitalAssets.reduce((sum, asset) => sum + asset.marketCap, 0)
  const totalTVL = digitalAssets.reduce((sum, asset) => sum + asset.tvl, 0)
  const avgUptime = digitalAssets.reduce((sum, asset) => sum + asset.uptime, 0) / digitalAssets.length
  const totalValidators = digitalAssets.reduce((sum, asset) => sum + asset.validators, 0)

  const layer1Networks = digitalAssets.filter((a) => a.type === "Layer1")
  const layer2Networks = digitalAssets.filter((a) => a.type === "Layer2")
  const stablecoins = digitalAssets.filter((a) => a.type === "Stablecoin")
  const defiProtocols = digitalAssets.filter((a) => a.type === "DeFi")

  const performanceData = digitalAssets.map((asset) => ({
    name: asset.symbol,
    throughput: asset.throughput,
    latency: asset.latency,
    uptime: asset.uptime,
  }))

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Market Cap</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${(totalMarketCap / 1000000000000).toFixed(2)}T</div>
            <p className="text-xs text-muted-foreground mt-2">Across all digital assets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total TVL</CardTitle>
            <Lock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${(totalTVL / 1000000000).toFixed(1)}B</div>
            <p className="text-xs text-muted-foreground mt-2">Value locked in protocols</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Uptime</CardTitle>
            <Activity className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{avgUptime.toFixed(2)}%</div>
            <Progress value={avgUptime} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Network reliability</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Validators</CardTitle>
            <Zap className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalValidators.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-2">Network security nodes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Networks</TabsTrigger>
          <TabsTrigger value="layer1">Layer 1</TabsTrigger>
          <TabsTrigger value="layer2">Layer 2</TabsTrigger>
          <TabsTrigger value="stablecoins">Stablecoins</TabsTrigger>
          <TabsTrigger value="defi">DeFi</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {digitalAssets.map((asset) => (
              <Card key={asset.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-foreground">{asset.name}</h3>
                        <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                      </div>
                      <Badge variant={asset.status === "online" ? "default" : "destructive"}>{asset.type}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${(asset.marketCap / 1000000000).toFixed(1)}B</p>
                      <p className="text-xs text-muted-foreground">Market Cap</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Throughput</p>
                      <p className="font-semibold text-foreground">{asset.throughput.toLocaleString()} TPS</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Latency</p>
                      <p className="font-semibold text-foreground">{asset.latency.toFixed(2)}s</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                      <p className="font-semibold text-foreground">{asset.uptime.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Active Nodes</p>
                      <p className="font-semibold text-foreground">
                        {asset.activeNodes}/{asset.nodes}
                      </p>
                    </div>
                  </div>

                  <Progress value={(asset.activeNodes / asset.nodes) * 100} className="mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="layer1" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {layer1Networks.map((asset) => (
              <Card key={asset.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">{asset.validators} validators</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{asset.throughput.toLocaleString()} TPS</p>
                      <p className="text-sm text-muted-foreground">{asset.uptime.toFixed(2)}% uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="layer2" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {layer2Networks.map((asset) => (
              <Card key={asset.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">TVL: ${(asset.tvl / 1000000000).toFixed(1)}B</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{asset.throughput.toLocaleString()} TPS</p>
                      <p className="text-sm text-muted-foreground">Gas: ${asset.gasPrice.toFixed(4)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stablecoins" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {stablecoins.map((asset) => (
              <Card key={asset.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Market Cap: ${(asset.marketCap / 1000000000).toFixed(1)}B
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{asset.throughput.toLocaleString()} TPS</p>
                      <p className="text-sm text-muted-foreground">{asset.uptime.toFixed(2)}% uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="defi" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {defiProtocols.map((asset) => (
              <Card key={asset.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground">TVL: ${(asset.tvl / 1000000000).toFixed(1)}B</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{asset.throughput.toLocaleString()} TPS</p>
                      <p className="text-sm text-muted-foreground">{asset.uptime.toFixed(2)}% uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Performance Comparison</CardTitle>
              <CardDescription>Throughput and latency across all networks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="throughput" fill="hsl(var(--chart-1))" name="Throughput (TPS)" />
                  <Bar yAxisId="right" dataKey="latency" fill="hsl(var(--chart-2))" name="Latency (s)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
