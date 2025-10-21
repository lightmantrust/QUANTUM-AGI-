"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Clock, AlertCircle, Zap, TrendingUp } from "lucide-react"
import { TransactionForm } from "./transaction-form"
import { TransactionHistory } from "./transaction-history"
import { QuantumSignatureVisualization } from "./quantum-signature-visualization"

interface Transaction {
  id: string
  network: "XRP" | "XLM" | "XDC" | "HBAR"
  amount: number
  recipient: string
  status: "pending" | "processing" | "completed" | "failed"
  quantumSignature: number
  energyEfficiency: number
  timestamp: Date
  estimatedCompletion?: Date
}

export function TransactionProcessingInterface() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx_001",
      network: "XRP",
      amount: 1250.5,
      recipient: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
      status: "completed",
      quantumSignature: 94.2,
      energyEfficiency: 96.8,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "tx_002",
      network: "XLM",
      amount: 5000.0,
      recipient: "GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37",
      status: "processing",
      quantumSignature: 89.7,
      energyEfficiency: 91.3,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      estimatedCompletion: new Date(Date.now() + 1000 * 60 * 2),
    },
    {
      id: "tx_003",
      network: "HBAR",
      amount: 750.25,
      recipient: "0.0.123456",
      status: "pending",
      quantumSignature: 88.9,
      energyEfficiency: 89.1,
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      estimatedCompletion: new Date(Date.now() + 1000 * 60 * 8),
    },
  ])

  const [activeTransactions, setActiveTransactions] = useState(0)
  const [totalVolume, setTotalVolume] = useState(0)
  const [avgEfficiency, setAvgEfficiency] = useState(0)

  useEffect(() => {
    const active = transactions.filter((tx) => tx.status === "processing" || tx.status === "pending").length
    const volume = transactions.reduce((sum, tx) => sum + tx.amount, 0)
    const efficiency = transactions.reduce((sum, tx) => sum + tx.energyEfficiency, 0) / transactions.length

    setActiveTransactions(active)
    setTotalVolume(volume)
    setAvgEfficiency(efficiency)
  }, [transactions])

  const handleNewTransaction = (
    newTx: Omit<Transaction, "id" | "timestamp" | "status" | "quantumSignature" | "energyEfficiency">,
  ) => {
    const transaction: Transaction = {
      ...newTx,
      id: `tx_${Date.now()}`,
      timestamp: new Date(),
      status: "pending",
      quantumSignature: Math.random() * 10 + 85,
      energyEfficiency: Math.random() * 10 + 85,
      estimatedCompletion: new Date(Date.now() + 1000 * 60 * (5 + Math.random() * 10)),
    }
    setTransactions((prev) => [transaction, ...prev])
  }

  return (
    <div className="space-y-6">
      {/* Transaction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Transactions</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeTransactions}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Efficiency</CardTitle>
            <Zap className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{avgEfficiency.toFixed(1)}%</div>
            <Progress value={avgEfficiency} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Interface */}
      <Tabs defaultValue="process" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="process">Process Transaction</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
          <TabsTrigger value="quantum">Quantum Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="process">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TransactionForm onSubmit={handleNewTransaction} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Active Transactions
                </CardTitle>
                <CardDescription>Real-time processing status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions
                    .filter((tx) => tx.status === "processing" || tx.status === "pending")
                    .slice(0, 5)
                    .map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant={tx.network === "XRP" ? "default" : "secondary"}>{tx.network}</Badge>
                          <div>
                            <p className="font-medium text-sm">${tx.amount.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{tx.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={tx.status === "processing" ? "default" : "secondary"}>
                            {tx.status === "processing" ? (
                              <Clock className="w-3 h-3 mr-1" />
                            ) : (
                              <AlertCircle className="w-3 h-3 mr-1" />
                            )}
                            {tx.status}
                          </Badge>
                          {tx.estimatedCompletion && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ETA: {Math.ceil((tx.estimatedCompletion.getTime() - Date.now()) / (1000 * 60))}m
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  {transactions.filter((tx) => tx.status === "processing" || tx.status === "pending").length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">No active transactions</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <TransactionHistory transactions={transactions} />
        </TabsContent>

        <TabsContent value="quantum">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Quantum Signature Analysis
                </CardTitle>
                <CardDescription>Energy pattern visualization for recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <QuantumSignatureVisualization transactions={transactions.slice(0, 5)} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Optimization</CardTitle>
                <CardDescription>Real-time network performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["XRP", "XLM", "XDC", "HBAR"].map((network) => {
                    const networkTxs = transactions.filter((tx) => tx.network === network)
                    const avgEfficiency =
                      networkTxs.length > 0
                        ? networkTxs.reduce((sum, tx) => sum + tx.energyEfficiency, 0) / networkTxs.length
                        : 0

                    return (
                      <div key={network} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{network}</Badge>
                          <span className="text-sm text-muted-foreground">{networkTxs.length} transactions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={avgEfficiency} className="w-20" />
                          <span className="text-sm font-medium">{avgEfficiency.toFixed(1)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
