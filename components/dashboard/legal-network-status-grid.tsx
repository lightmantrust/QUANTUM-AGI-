"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle, XCircle, Settings, Globe } from "lucide-react"

interface LegalNetwork {
  id: string
  name: string
  type: "SWIFT" | "SEPA" | "FEDWIRE" | "CHIPS" | "TARGET2"
  status: "active" | "inactive" | "maintenance"
  compliance: number
  nodes: number
  activeNodes: number
  latency: number
  throughput: number
  regulators: string[]
  certifications: string[]
  lastAudit: Date
}

interface LegalNetworkStatusGridProps {
  networks: LegalNetwork[]
  onSelectNetwork?: (networkId: string) => void
}

export function LegalNetworkStatusGrid({ networks, onSelectNetwork }: LegalNetworkStatusGridProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "maintenance":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "inactive":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-green-200 bg-green-50/50"
      case "maintenance":
        return "border-yellow-200 bg-yellow-50/50"
      case "inactive":
        return "border-red-200 bg-red-50/50"
      default:
        return ""
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {networks.map((network) => (
        <Card key={network.id} className={`${getStatusColor(network.status)}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(network.status)}
                <div>
                  <p className="text-base">{network.name}</p>
                  <p className="text-xs text-muted-foreground font-normal">{network.type}</p>
                </div>
              </div>
              <Badge
                variant={
                  network.status === "active"
                    ? "default"
                    : network.status === "maintenance"
                      ? "secondary"
                      : "destructive"
                }
              >
                {network.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Compliance Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance Score</span>
                <span className="text-sm font-medium">{network.compliance.toFixed(2)}%</span>
              </div>
              <Progress value={network.compliance} />
            </div>

            {/* Network Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Nodes</span>
                <p className="text-lg font-semibold">
                  {network.activeNodes}/{network.nodes}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Latency</span>
                <p className="text-lg font-semibold">{network.latency.toFixed(1)}s</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Throughput</span>
                <p className="text-lg font-semibold">{network.throughput.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Regulators</span>
                <p className="text-lg font-semibold">{network.regulators.length}</p>
              </div>
            </div>

            {/* Regulators */}
            <div className="space-y-2">
              <span className="text-xs font-medium">Regulatory Bodies</span>
              <div className="flex flex-wrap gap-1">
                {network.regulators.map((regulator) => (
                  <Badge key={regulator} variant="outline" className="text-xs">
                    {regulator}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => onSelectNetwork?.(network.id)}
              >
                <Globe className="w-4 h-4 mr-1" />
                View Details
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
