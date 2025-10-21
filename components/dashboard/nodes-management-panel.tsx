"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertTriangle, XCircle, Plus, Trash2, Settings } from "lucide-react"

interface LegalNetwork {
  id: string
  name: string
  type: string
  status: string
}

interface Node {
  id: string
  networkId: string
  name: string
  location: string
  status: "online" | "offline" | "degraded"
  uptime: number
  capacity: number
  utilization: number
  certifications: string[]
}

interface NodesManagementPanelProps {
  networks: LegalNetwork[]
  nodes: Node[]
  selectedNetworkId: string | null
}

export function NodesManagementPanel({ networks, nodes, selectedNetworkId }: NodesManagementPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "offline":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const filteredNodes = selectedNetworkId ? nodes.filter((n) => n.networkId === selectedNetworkId) : nodes
  const selectedNetwork = selectedNetworkId ? networks.find((n) => n.id === selectedNetworkId) : null

  return (
    <div className="space-y-6">
      {selectedNetwork && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedNetwork.name} - Nodes</CardTitle>
            <CardDescription>Manage and monitor nodes for {selectedNetwork.type}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Node
              </Button>
            </div>

            <div className="space-y-4">
              {filteredNodes.map((node) => (
                <Card key={node.id} className="border">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(node.status)}
                          <div>
                            <p className="font-medium">{node.name}</p>
                            <p className="text-sm text-muted-foreground">{node.location}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            node.status === "online"
                              ? "default"
                              : node.status === "degraded"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {node.status}
                        </Badge>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <span className="text-xs text-muted-foreground">Uptime</span>
                          <Progress value={node.uptime} />
                          <p className="text-sm font-medium">{node.uptime.toFixed(2)}%</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs text-muted-foreground">Utilization</span>
                          <Progress value={node.utilization} />
                          <p className="text-sm font-medium">{node.utilization.toFixed(1)}%</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs text-muted-foreground">Capacity</span>
                          <p className="text-sm font-medium">{node.capacity.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">transactions/sec</p>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="space-y-2">
                        <span className="text-xs font-medium">Certifications</span>
                        <div className="flex flex-wrap gap-1">
                          {node.certifications.map((cert) => (
                            <Badge key={cert} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedNetwork && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Select a network to view and manage its nodes</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
