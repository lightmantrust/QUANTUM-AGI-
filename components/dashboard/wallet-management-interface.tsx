"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Eye, EyeOff, Copy, Send, Download, Lock, Unlock } from "lucide-react"
import { WalletBalanceOverview } from "./wallet-balance-overview"
import { WalletCreationForm } from "./wallet-creation-form"
import { WalletTransactionHistory } from "./wallet-transaction-history"
import { QuantumVaultInterface } from "./quantum-vault-interface"

export function WalletManagementInterface() {
  const [wallets, setWallets] = useState([
    {
      id: "wallet-xrp-001",
      name: "Primary XRP Vault",
      network: "XRP",
      address: "rN7n7otQDd6FczFgLdlqtyMVrn3Rqq5Qvx",
      balance: 15234.56,
      quantumSignature: "QS-XRP-94.2",
      locked: false,
      created: "2024-01-15",
    },
    {
      id: "wallet-xlm-001",
      name: "Stellar Operations",
      network: "XLM",
      address: "GBRPYHIL2CI3WHZDTOOQFC6EB4CGQWF57XVJY7IJCCVP7XZJGGTO5ON",
      balance: 8945.23,
      quantumSignature: "QS-XLM-89.7",
      locked: false,
      created: "2024-02-20",
    },
    {
      id: "wallet-xdc-001",
      name: "XDC Enterprise",
      network: "XDC",
      address: "xdc1234567890abcdef1234567890abcdef1234567890",
      balance: 42156.78,
      quantumSignature: "QS-XDC-91.5",
      locked: true,
      created: "2024-03-10",
    },
    {
      id: "wallet-hbar-001",
      name: "Hedera Treasury",
      network: "HBAR",
      address: "0.0.123456",
      balance: 5678.9,
      quantumSignature: "QS-HBAR-88.9",
      locked: false,
      created: "2024-01-25",
    },
  ])

  const [selectedWallet, setSelectedWallet] = useState(wallets[0])
  const [showAddresses, setShowAddresses] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("overview")

  const toggleAddressVisibility = (walletId: string) => {
    setShowAddresses((prev) => ({
      ...prev,
      [walletId]: !prev[walletId],
    }))
  }

  const toggleWalletLock = (walletId: string) => {
    setWallets((prev) => prev.map((w) => (w.id === walletId ? { ...w, locked: !w.locked } : w)))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Wallet Portfolio Overview
          </CardTitle>
          <CardDescription>Multi-chain wallet management and balance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <WalletBalanceOverview wallets={wallets} totalBalance={totalBalance} />
        </CardContent>
      </Card>

      {/* Main Wallet Management */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="vault">Quantum Vault</TabsTrigger>
          <TabsTrigger value="create">Create Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wallet List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Wallets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {wallets.map((wallet) => (
                    <button
                      key={wallet.id}
                      onClick={() => setSelectedWallet(wallet)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        selectedWallet.id === wallet.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{wallet.name}</p>
                          <p className="text-xs text-muted-foreground">{wallet.network}</p>
                        </div>
                        {wallet.locked && <Lock className="w-4 h-4 text-destructive" />}
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Selected Wallet Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-accent/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedWallet.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{selectedWallet.network}</Badge>
                        <span className="text-xs">{selectedWallet.quantumSignature}</span>
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toggleWalletLock(selectedWallet.id)}>
                      {selectedWallet.locked ? (
                        <>
                          <Unlock className="w-4 h-4 mr-2" />
                          Unlock
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Lock
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Balance */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
                    <p className="text-4xl font-bold text-foreground">
                      {selectedWallet.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedWallet.network} tokens</p>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                      <code className="text-xs font-mono flex-1 truncate">
                        {showAddresses[selectedWallet.id]
                          ? selectedWallet.address
                          : selectedWallet.address.slice(0, 10) + "..."}
                      </code>
                      <Button variant="ghost" size="sm" onClick={() => toggleAddressVisibility(selectedWallet.id)}>
                        {showAddresses[selectedWallet.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(selectedWallet.address)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="text-sm font-medium">{selectedWallet.created}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge variant={selectedWallet.locked ? "destructive" : "default"}>
                        {selectedWallet.locked ? "Locked" : "Active"}
                      </Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button className="gap-2">
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Receive
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <WalletTransactionHistory wallet={selectedWallet} />
        </TabsContent>

        <TabsContent value="vault">
          <QuantumVaultInterface wallet={selectedWallet} />
        </TabsContent>

        <TabsContent value="create">
          <WalletCreationForm
            onWalletCreated={(newWallet) => {
              setWallets([...wallets, newWallet])
              setSelectedWallet(newWallet)
              setActiveTab("overview")
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
