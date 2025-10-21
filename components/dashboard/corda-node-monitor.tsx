"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle, Settings, RefreshCw } from "lucide-react"

interface CordaNode {
  id: string
  name: string
  location: string
  status: "online" | "offline" | "syncing"
  version: string
  uptime: number
  transactions: number
  peers: number
  lastSync: Date
}

interface CordaNodeMonitorProps {
  nodes: CordaNode[]
  onSelectNode?: (nodeId: string) => void
}

export function CordaNodeMonitor({ nodes, onSelectNode }: CordaNodeMonitorProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "syncing":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "offline":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "border-green-200 bg-green-50/50"
      case "syncing":
        return "border-yellow-200 bg-yellow-50/50"
      case "offline":
        return "border-red-200 bg-red-50/50"
      default:
        return ""
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {nodes.map((node) => (
        <Card key={node.id} className={`${getStatusColor(node.status)}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(node.status)}
                <div>
                  <p className="text-base">{node.name}</p>
                  <p className="text-xs text-muted-foreground font-normal">{node.location}</p>
                </div>
              </div>
              <Badge
                variant={node.status === "online" ? "default" : node.status === "syncing" ? "secondary" : "destructive"}
              >
                {node.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Version and Uptime */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Version</span>
                <p className="font-mono text-sm font-semibold">{node.version}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Uptime</span>
                <p className="font-semibold">{node.uptime.toFixed(2)}%</p>
              </div>
            </div>

            {/* Uptime Progress */}
            <div className="space-y-2">
              <Progress value={node.uptime} />
            </div>

            {/* Transactions and Peers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Transactions</span>
                <p className="text-lg font-semibold">{node.transactions.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Connected Peers</span>
                <p className="text-lg font-semibold">{node.peers}</p>
              </div>
            </div>

            {/* Last Sync */}
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Last Sync</span>
              <p className="text-sm">{node.lastSync.toLocaleTimeString()}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => onSelectNode?.(node.id)}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Sync
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
