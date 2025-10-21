"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Zap } from "lucide-react"

interface TransactionFormProps {
  onSubmit: (transaction: {
    network: "XRP" | "XLM" | "XDC" | "HBAR"
    amount: number
    recipient: string
  }) => void
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [network, setNetwork] = useState<"XRP" | "XLM" | "XDC" | "HBAR">("XRP")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !recipient) return

    setIsProcessing(true)

    // Simulate quantum processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSubmit({
      network,
      amount: Number.parseFloat(amount),
      recipient,
    })

    // Reset form
    setAmount("")
    setRecipient("")
    setIsProcessing(false)
  }

  const getNetworkPlaceholder = (network: string) => {
    switch (network) {
      case "XRP":
        return "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH"
      case "XLM":
        return "GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37"
      case "XDC":
        return "xdc68b3465833fb72A70ecDF485E0e4C7bD8665Fc45"
      case "HBAR":
        return "0.0.123456"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="w-5 h-5 text-primary" />
          New Transaction
        </CardTitle>
        <CardDescription>Create a quantum-optimized transaction</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="network">Network</Label>
            <Select value={network} onValueChange={(value: "XRP" | "XLM" | "XDC" | "HBAR") => setNetwork(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="XRP">XRP Ledger</SelectItem>
                <SelectItem value="XLM">Stellar (XLM)</SelectItem>
                <SelectItem value="XDC">XDC Network</SelectItem>
                <SelectItem value="HBAR">Hedera (HBAR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder={getNetworkPlaceholder(network)}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Processing Quantum Signature...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Process Transaction
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
