"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Plus, Globe, Shield, Lock } from "lucide-react"
import { LegalNetworkStatusGrid } from "./legal-network-status-grid"
import { NodesManagementPanel } from "./nodes-management-panel"
import { ComplianceNetworkChart } from "./compliance-network-chart"

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

export function LegalNetworksInterface() {
  const [legalNetworks, setLegalNetworks] = useState<LegalNetwork[]>([
    {
      id: "swift_001",
      name: "SWIFT Global Network",
      type: "SWIFT",
      status: "active",
      compliance: 99.8,
      nodes: 45,
      activeNodes: 44,
      latency: 0.8,
      throughput: 5000,
      regulators: ["BIS", "ECB", "FCA"],
      certifications: ["ISO 20022", "ISO 27001", "SOC 2 Type II"],
      lastAudit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: "sepa_001",
      name: "SEPA Payment System",
      type: "SEPA",
      status: "active",
      compliance: 99.9,
      nodes: 28,
      activeNodes: 28,
      latency: 1.2,
      throughput: 3500,
      regulators: ["ECB", "EBA"],
      certifications: ["PSD2", "ISO 20022", "ISO 27001"],
      lastAudit: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      id: "fedwire_001",
      name: "FedWire System",
      type: "FEDWIRE",
      status: "active",
      compliance: 99.95,
      nodes: 12,
      activeNodes: 12,
      latency: 0.5,
      throughput: 8000,
      regulators: ["Federal Reserve", "OCC"],
      certifications: ["GLBA", "ISO 27001", "NIST SP 800-53"],
      lastAudit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "chips_001",
      name: "CHIPS Payment System",
      type: "CHIPS",
      status: "active",
      compliance: 99.85,
      nodes: 35,
      activeNodes: 34,
      latency: 1.5,
      throughput: 4200,
      regulators: ["Federal Reserve", "SEC"],
      certifications: ["ISO 20022", "ISO 27001", "SOC 2 Type II"],
      lastAudit: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
  ])

  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "node_swift_001",
      networkId: "swift_001",
      name: "SWIFT Hub - Frankfurt",
      location: "Frankfurt, Germany",
      status: "online",
      uptime: 99.98,
      capacity: 10000,
      utilization: 65,
      certifications: ["ISO 27001", "ISO 20022"],
    },
    {
      id: "node_swift_002",
      networkId: "swift_001",
      name: "SWIFT Hub - New York",
      location: "New York, USA",
      status: "online",
      uptime: 99.97,
      capacity: 12000,
      utilization: 72,
      certifications: ["ISO 27001", "ISO 20022"],
    },
    {
      id: "node_sepa_001",
      networkId: "sepa_001",
      name: "SEPA Node - Brussels",
      location: "Brussels, Belgium",
      status: "online",
      uptime: 99.99,
      capacity: 8000,
      utilization: 58,
      certifications: ["PSD2", "ISO 27001"],
    },
    {
      id: "node_fedwire_001",
      networkId: "fedwire_001",
      name: "FedWire Node - Washington DC",
      location: "Washington DC, USA",
      status: "online",
      uptime: 99.99,
      capacity: 15000,
      utilization: 45,
      certifications: ["GLBA", "NIST SP 800-53"],
    },
  ])

  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLegalNetworks((prev) =>
        prev.map((network) => ({
          ...network,
          compliance: Math.max(98, Math.min(100, network.compliance + (Math.random() - 0.5) * 0.5)),
          activeNodes: Math.max(
            network.nodes - 2,
            Math.min(network.nodes, network.activeNodes + Math.floor((Math.random() - 0.5) * 2)),
          ),
          latency: Math.max(0.3, network.latency + (Math.random() - 0.5) * 0.3),
          throughput: Math.max(2000, network.throughput + (Math.random() - 0.5) * 500),
        })),
      )

      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          utilization: Math.max(20, Math.min(95, node.utilization + (Math.random() - 0.5) * 5)),
          uptime: Math.max(99, Math.min(100, node.uptime + (Math.random() - 0.5) * 0.1)),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const overallCompliance = legalNetworks.reduce((sum, network) => sum + network.compliance, 0) / legalNetworks.length
  const totalActiveNodes = nodes.filter((n) => n.status === "online").length
  const avgUtilization = nodes.reduce((sum, node) => sum + node.utilization, 0) / nodes.length

  const selectedNetworkData = selectedNetwork ? legalNetworks.find((n) => n.id === selectedNetwork) : null
  const selectedNetworkNodes = selectedNetwork ? nodes.filter((n) => n.networkId === selectedNetwork) : []

  return (
    <div className="space-y-6">
      {/* Compliance Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{overallCompliance.toFixed(2)}%</div>
            <Progress value={overallCompliance} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Regulatory standards met</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Networks</CardTitle>
            <Globe className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {legalNetworks.filter((n) => n.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{legalNetworks.length} total networks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Nodes</CardTitle>
            <Lock className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalActiveNodes}</div>
            <p className="text-xs text-muted-foreground mt-2">{nodes.length} total nodes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Utilization</CardTitle>
            <AlertTriangle className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{avgUtilization.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-2">Network capacity usage</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Interface Tabs */}
      <Tabs defaultValue="networks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="networks">Legal Networks</TabsTrigger>
          <TabsTrigger value="nodes">Node Management</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
        </TabsList>

        <TabsContent value="networks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Regulated Payment Networks</h3>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Network
            </Button>
          </div>
          <LegalNetworkStatusGrid networks={legalNetworks} onSelectNetwork={setSelectedNetwork} />
        </TabsContent>

        <TabsContent value="nodes" className="space-y-6">
          <NodesManagementPanel networks={legalNetworks} nodes={nodes} selectedNetworkId={selectedNetwork} />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Compliance Network Chart
                </CardTitle>
                <CardDescription>Regulatory compliance across all networks</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceNetworkChart networks={legalNetworks} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-accent" />
                  Certifications & Audits
                </CardTitle>
                <CardDescription>Current compliance certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {legalNetworks.map((network) => (
                    <div key={network.id} className="border border-border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{network.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {network.type}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {network.certifications.map((cert) => (
                          <Badge key={cert} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last audit: {network.lastAudit.toLocaleDateString()}
                      </p>
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
