"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, Network, Lock, Zap, GitBranch } from "lucide-react"
import { CordaSmartContractPanel } from "./corda-smart-contract-panel"
import { CordaNodeMonitor } from "./corda-node-monitor"
import { CordaTransactionFlow } from "./corda-transaction-flow"

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

interface SmartContract {
  id: string
  name: string
  version: string
  status: "deployed" | "pending" | "failed"
  states: number
  flows: number
  lastUpdated: Date
  audited: boolean
}

interface CordaTransaction {
  id: string
  type: "payment" | "settlement" | "compliance" | "custody"
  status: "recorded" | "notarized" | "finalized"
  participants: string[]
  amount: number
  timestamp: Date
  notary: string
}

export function CordaFrameworkIntegration() {
  const [cordaNodes, setCordaNodes] = useState<CordaNode[]>([
    {
      id: "corda_node_1",
      name: "QFS Primary Node",
      location: "Frankfurt, Germany",
      status: "online",
      version: "5.1.0",
      uptime: 99.98,
      transactions: 15247,
      peers: 12,
      lastSync: new Date(Date.now() - 5000),
    },
    {
      id: "corda_node_2",
      name: "QFS Secondary Node",
      location: "New York, USA",
      status: "online",
      version: "5.1.0",
      uptime: 99.97,
      transactions: 14892,
      peers: 11,
      lastSync: new Date(Date.now() - 8000),
    },
    {
      id: "corda_node_3",
      name: "QFS Notary Node",
      location: "Singapore",
      status: "online",
      version: "5.1.0",
      uptime: 99.99,
      transactions: 18456,
      peers: 13,
      lastSync: new Date(Date.now() - 3000),
    },
  ])

  const [smartContracts, setSmartContracts] = useState<SmartContract[]>([
    {
      id: "contract_001",
      name: "PaymentSettlement",
      version: "2.1.0",
      status: "deployed",
      states: 3,
      flows: 5,
      lastUpdated: new Date(Date.now() - 86400000),
      audited: true,
    },
    {
      id: "contract_002",
      name: "ComplianceVerification",
      version: "1.5.0",
      status: "deployed",
      states: 2,
      flows: 3,
      lastUpdated: new Date(Date.now() - 172800000),
      audited: true,
    },
    {
      id: "contract_003",
      name: "CustodyManagement",
      version: "3.0.0",
      status: "deployed",
      states: 4,
      flows: 6,
      lastUpdated: new Date(Date.now() - 259200000),
      audited: true,
    },
  ])

  const [cordaTransactions, setCordaTransactions] = useState<CordaTransaction[]>([
    {
      id: "tx_corda_001",
      type: "payment",
      status: "finalized",
      participants: ["QFS Primary", "Bank A"],
      amount: 2500000,
      timestamp: new Date(Date.now() - 3600000),
      notary: "QFS Notary Node",
    },
    {
      id: "tx_corda_002",
      type: "settlement",
      status: "finalized",
      participants: ["QFS Secondary", "Bank B"],
      amount: 1800000,
      timestamp: new Date(Date.now() - 1800000),
      notary: "QFS Notary Node",
    },
    {
      id: "tx_corda_003",
      type: "compliance",
      status: "notarized",
      participants: ["QFS Primary", "Regulator"],
      amount: 0,
      timestamp: new Date(Date.now() - 600000),
      notary: "QFS Notary Node",
    },
  ])

  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCordaNodes((prev) =>
        prev.map((node) => ({
          ...node,
          uptime: Math.max(99, Math.min(100, node.uptime + (Math.random() - 0.5) * 0.1)),
          transactions: node.transactions + Math.floor(Math.random() * 10),
          lastSync: new Date(),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const totalTransactions = cordaTransactions.length
  const finalizedTransactions = cordaTransactions.filter((t) => t.status === "finalized").length
  const avgNodeUptime = cordaNodes.reduce((sum, node) => sum + node.uptime, 0) / cordaNodes.length
  const totalPeers = cordaNodes.reduce((sum, node) => sum + node.peers, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
      case "deployed":
      case "finalized":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "syncing":
      case "notarized":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "offline":
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Corda Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Corda Nodes</CardTitle>
            <Network className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{cordaNodes.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {cordaNodes.filter((n) => n.status === "online").length} online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Smart Contracts</CardTitle>
            <Lock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{smartContracts.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {smartContracts.filter((c) => c.status === "deployed").length} deployed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Node Uptime</CardTitle>
            <Zap className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{avgNodeUptime.toFixed(2)}%</div>
            <Progress value={avgNodeUptime} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Network Peers</CardTitle>
            <GitBranch className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalPeers}</div>
            <p className="text-xs text-muted-foreground mt-2">Connected nodes</p>
          </CardContent>
        </Card>
      </div>

      {/* Corda Status Alert */}
      <Alert className="border-green-200 bg-green-50/50">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Corda R3 Framework v5.1.0 is fully operational. All nodes synchronized and consensus achieved.
        </AlertDescription>
      </Alert>

      {/* Main Interface Tabs */}
      <Tabs defaultValue="nodes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nodes">Corda Nodes</TabsTrigger>
          <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="flows">Transaction Flows</TabsTrigger>
        </TabsList>

        <TabsContent value="nodes">
          <CordaNodeMonitor nodes={cordaNodes} onSelectNode={setSelectedNode} />
        </TabsContent>

        <TabsContent value="contracts">
          <CordaSmartContractPanel contracts={smartContracts} />
        </TabsContent>

        <TabsContent value="transactions">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Corda Transactions</CardTitle>
                <CardDescription>Recorded and notarized transactions on the Corda network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cordaTransactions.map((tx) => (
                    <div key={tx.id} className="border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(tx.status)}
                          <div>
                            <p className="font-medium capitalize">{tx.type}</p>
                            <p className="text-sm text-muted-foreground">{tx.id}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            tx.status === "finalized" ? "default" : tx.status === "notarized" ? "secondary" : "outline"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Amount</p>
                          <p className="font-semibold">${(tx.amount / 1000000).toFixed(2)}M</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Notary</p>
                          <p className="font-semibold text-sm">{tx.notary}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Participants</p>
                        <div className="flex flex-wrap gap-1">
                          {tx.participants.map((participant) => (
                            <Badge key={participant} variant="outline" className="text-xs">
                              {participant}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">{tx.timestamp.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="flows">
          <CordaTransactionFlow transactions={cordaTransactions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
