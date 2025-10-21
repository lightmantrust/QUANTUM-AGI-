"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownLeft, Search } from "lucide-react"

interface Wallet {
  id: string
  name: string
  network: string
  address: string
  balance: number
  quantumSignature: string
}

interface WalletTransactionHistoryProps {
  wallet: Wallet
}

export function WalletTransactionHistory({ wallet }: WalletTransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const transactions = [
    {
      id: "tx-001",
      type: "send",
      amount: 1250.5,
      recipient: "rN7n7otQDd6FczFgLdlqtyMVrn3Rqq5Qvx",
      status: "completed",
      timestamp: "2024-10-21 14:32:00",
      quantumEnergy: 92.3,
      fee: 0.12,
    },
    {
      id: "tx-002",
      type: "receive",
      amount: 5000.0,
      sender: "rU6K7V4Po4snVhBBaU29sesqs2qTQJWDw1",
      status: "completed",
      timestamp: "2024-10-21 12:15:00",
      quantumEnergy: 88.7,
      fee: 0.0,
    },
    {
      id: "tx-003",
      type: "send",
      amount: 750.25,
      recipient: "rN7n7otQDd6FczFgLdlqtyMVrn3Rqq5Qvx",
      status: "pending",
      timestamp: "2024-10-21 10:45:00",
      quantumEnergy: 85.2,
      fee: 0.15,
    },
    {
      id: "tx-004",
      type: "receive",
      amount: 2100.0,
      sender: "rU6K7V4Po4snVhBBaU29sesqs2qTQJWDw1",
      status: "completed",
      timestamp: "2024-10-20 16:20:00",
      quantumEnergy: 91.5,
      fee: 0.0,
    },
    {
      id: "tx-005",
      type: "send",
      amount: 3500.75,
      recipient: "rN7n7otQDd6FczFgLdlqtyMVrn3Rqq5Qvx",
      status: "completed",
      timestamp: "2024-10-20 09:30:00",
      quantumEnergy: 89.8,
      fee: 0.18,
    },
  ]

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.includes(searchTerm) ||
      (tx.type === "send" && tx.recipient.includes(searchTerm)) ||
      (tx.type === "receive" && tx.sender.includes(searchTerm))
    const matchesStatus = filterStatus === "all" || tx.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>All transactions for {wallet.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by transaction ID or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transaction List */}
        <div className="space-y-2">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                    {tx.type === "send" ? (
                      <ArrowUpRight className="w-5 h-5 text-destructive" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-chart-3" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{tx.type === "send" ? "Sent to" : "Received from"}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.type === "send" ? tx.recipient.slice(0, 10) + "..." : tx.sender.slice(0, 10) + "..."}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <p className={`font-semibold ${tx.type === "send" ? "text-destructive" : "text-chart-3"}`}>
                    {tx.type === "send" ? "-" : "+"}
                    {tx.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className="flex items-center gap-2 justify-end">
                    <Badge
                      variant={
                        tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"
                      }
                      className="text-xs"
                    >
                      {tx.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{tx.timestamp}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">No transactions found matching your criteria</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
