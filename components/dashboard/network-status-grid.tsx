"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertTriangle, XCircle, Activity, Clock, Zap } from "lucide-react"

interface NetworkStatus {
  network: "XRP" | "XLM" | "XDC" | "HBAR"
  status: "online" | "degraded" | "offline"
  resonance: number
  latency: number
  throughput: number
  uptime: number
  nodes: number
  activeConnections: number
}

interface NetworkStatusGridProps {
  networks: NetworkStatus[]
}

export function NetworkStatusGrid({ networks }: NetworkStatusGridProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "offline":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "border-green-200 bg-green-50/50"
      case "degraded":
        return "border-yellow-200 bg-yellow-50/50"
      case "offline":
        return "border-red-200 bg-red-50/50"
      default:
        return ""
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {networks.map((network) => (
        <Card key={network.network} className={`${getStatusColor(network.status)}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(network.status)}
                <span>{network.network} Network</span>
              </div>
              <Badge
                variant={
                  network.status === "online" ? "default" : network.status === "degraded" ? "secondary" : "destructive"
                }
              >
                {network.status}
              </Badge>
            </CardTitle>
            <CardDescription>
              {network.nodes} nodes • {network.activeConnections} active connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Resonance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Quantum Resonance</span>
                </div>
                <span className="text-sm font-medium">{network.resonance.toFixed(1)}%</span>
              </div>
              <Progress value={network.resonance} />
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Latency</span>
                </div>
                <p className="text-lg font-semibold">{network.latency.toFixed(1)}s</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Throughput</span>
                </div>
                <p className="text-lg font-semibold">{network.throughput.toLocaleString()}</p>
              </div>
            </div>

            {/* Uptime */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Uptime</span>
                <span className="text-sm font-medium">{network.uptime.toFixed(2)}%</span>
              </div>
              <Progress value={network.uptime} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
