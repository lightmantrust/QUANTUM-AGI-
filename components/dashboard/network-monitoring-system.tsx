"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, Zap, Clock, TrendingUp, AlertTriangle, Globe } from "lucide-react"
import { NetworkStatusGrid } from "./network-status-grid"
import { NetworkPerformanceChart } from "./network-performance-chart"
import { NetworkLatencyMap } from "./network-latency-map"

interface NetworkStatus {
  network: "XRP" | "XLM" | "XDC" | "HBAR"
  status: "online" | "degraded" | "offline"
  resonance: number
  latency: number
  throughput: number
  uptime: number
  lastUpdate: Date
  nodes: number
  activeConnections: number
}

export function NetworkMonitoringSystem() {
  const [networkStatuses, setNetworkStatuses] = useState<NetworkStatus[]>([
    {
      network: "XRP",
      status: "online",
      resonance: 94.2,
      latency: 1.2,
      throughput: 1500,
      uptime: 99.97,
      lastUpdate: new Date(),
      nodes: 150,
      activeConnections: 1247,
    },
    {
      network: "XLM",
      status: "online",
      resonance: 89.7,
      latency: 2.1,
      throughput: 1200,
      uptime: 99.94,
      lastUpdate: new Date(),
      nodes: 89,
      activeConnections: 892,
    },
    {
      network: "XDC",
      status: "degraded",
      resonance: 78.5,
      latency: 4.8,
      throughput: 800,
      uptime: 98.12,
      lastUpdate: new Date(),
      nodes: 45,
      activeConnections: 567,
    },
    {
      network: "HBAR",
      status: "online",
      resonance: 88.9,
      latency: 1.8,
      throughput: 2000,
      uptime: 99.99,
      lastUpdate: new Date(),
      nodes: 39,
      activeConnections: 1456,
    },
  ])

  const [alerts, setAlerts] = useState([
    {
      id: "alert_001",
      network: "XDC",
      type: "performance",
      message: "Network latency above threshold (4.8s)",
      severity: "warning",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatuses((prev) =>
        prev.map((network) => ({
          ...network,
          resonance: Math.max(70, Math.min(100, network.resonance + (Math.random() - 0.5) * 5)),
          latency: Math.max(0.5, network.latency + (Math.random() - 0.5) * 1),
          throughput: Math.max(500, network.throughput + (Math.random() - 0.5) * 200),
          activeConnections: Math.max(100, network.activeConnections + Math.floor((Math.random() - 0.5) * 50)),
          lastUpdate: new Date(),
          status: network.resonance > 85 ? "online" : network.resonance > 75 ? "degraded" : "offline",
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const overallHealth = networkStatuses.reduce((sum, network) => sum + network.resonance, 0) / networkStatuses.length
  const onlineNetworks = networkStatuses.filter((n) => n.status === "online").length
  const totalThroughput = networkStatuses.reduce((sum, network) => sum + network.throughput, 0)
  const avgLatency = networkStatuses.reduce((sum, network) => sum + network.latency, 0) / networkStatuses.length

  return (
    <div className="space-y-6">
      {/* Network Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Network Health</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{overallHealth.toFixed(1)}%</div>
            <Progress value={overallHealth} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {onlineNetworks}/{networkStatuses.length} networks online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Throughput</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalThroughput.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-2">Transactions per second</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Latency</CardTitle>
            <Clock className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{avgLatency.toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground mt-2">Network response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{alerts.length}</div>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.severity === "warning" ? "default" : "destructive"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{alert.network}:</span> {alert.message}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor((Date.now() - alert.timestamp.getTime()) / (1000 * 60))}m ago
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Main Monitoring Interface */}
      <Tabs defaultValue="status" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="status">Network Status</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="topology">Network Map</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="status">
          <NetworkStatusGrid networks={networkStatuses} />
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Network Performance
                </CardTitle>
                <CardDescription>Real-time throughput and latency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <NetworkPerformanceChart networks={networkStatuses} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Resonance Patterns
                </CardTitle>
                <CardDescription>Quantum energy synchronization across networks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkStatuses.map((network) => (
                    <div key={network.network} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            network.status === "online"
                              ? "default"
                              : network.status === "degraded"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {network.network}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{network.nodes} nodes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={network.resonance} className="w-24" />
                        <span className="text-sm font-medium w-12">{network.resonance.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topology">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Network Topology
              </CardTitle>
              <CardDescription>Global network latency and connection mapping</CardDescription>
            </CardHeader>
            <CardContent>
              <NetworkLatencyMap networks={networkStatuses} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Utilization</CardTitle>
                <CardDescription>Resource usage and capacity planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkStatuses.map((network) => {
                    const utilization = (network.activeConnections / (network.nodes * 10)) * 100
                    return (
                      <div key={network.network} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{network.network}</span>
                          <span className="text-sm text-muted-foreground">{utilization.toFixed(1)}%</span>
                        </div>
                        <Progress value={utilization} />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{network.activeConnections} connections</span>
                          <span>{network.nodes} nodes</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uptime Statistics</CardTitle>
                <CardDescription>Network availability and reliability metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkStatuses.map((network) => (
                    <div
                      key={network.network}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            network.status === "online"
                              ? "bg-green-500"
                              : network.status === "degraded"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">{network.network}</p>
                          <p className="text-xs text-muted-foreground">
                            Last update: {network.lastUpdate.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{network.uptime.toFixed(2)}%</p>
                        <p className="text-xs text-muted-foreground">uptime</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
