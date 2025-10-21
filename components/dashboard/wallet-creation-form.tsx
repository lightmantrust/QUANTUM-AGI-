"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Copy, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WalletCreationFormProps {
  onWalletCreated: (wallet: any) => void
}

export function WalletCreationForm({ onWalletCreated }: WalletCreationFormProps) {
  const [walletName, setWalletName] = useState("")
  const [network, setNetwork] = useState("XRP")
  const [creationMethod, setCreationMethod] = useState("new")
  const [privateKey, setPrivateKey] = useState("")
  const [generatedWallet, setGeneratedWallet] = useState<any>(null)

  const generateNewWallet = () => {
    const networks: Record<string, string> = {
      XRP: "rN7n7otQDd6FczFgLdlqtyMVrn3Rqq5Qvx",
      XLM: "GBRPYHIL2CI3WHZDTOOQFC6EB4CGQWF57XVJY7IJCCVP7XZJGGTO5ON",
      XDC: "xdc1234567890abcdef1234567890abcdef1234567890",
      HBAR: "0.0.123456",
    }

    const quantumSignatures: Record<string, string> = {
      XRP: "QS-XRP-94.2",
      XLM: "QS-XLM-89.7",
      XDC: "QS-XDC-91.5",
      HBAR: "QS-HBAR-88.9",
    }

    const newWallet = {
      id: `wallet-${network.toLowerCase()}-${Date.now()}`,
      name: walletName || `${network} Wallet`,
      network,
      address: networks[network],
      balance: Math.random() * 50000,
      quantumSignature: quantumSignatures[network],
      locked: false,
      created: new Date().toISOString().split("T")[0],
      privateKey: `pk_${Math.random().toString(36).substring(2, 15)}`,
    }

    setGeneratedWallet(newWallet)
  }

  const importWallet = () => {
    if (!privateKey.trim()) return

    const networks: Record<string, string> = {
      XRP: "rN7n7otQDd6FczFgLdlqtyMVrn3Rqq5Qvx",
      XLM: "GBRPYHIL2CI3WHZDTOOQFC6EB4CGQWF57XVJY7IJCCVP7XZJGGTO5ON",
      XDC: "xdc1234567890abcdef1234567890abcdef1234567890",
      HBAR: "0.0.123456",
    }

    const quantumSignatures: Record<string, string> = {
      XRP: "QS-XRP-94.2",
      XLM: "QS-XLM-89.7",
      XDC: "QS-XDC-91.5",
      HBAR: "QS-HBAR-88.9",
    }

    const importedWallet = {
      id: `wallet-${network.toLowerCase()}-${Date.now()}`,
      name: walletName || `${network} Wallet`,
      network,
      address: networks[network],
      balance: Math.random() * 50000,
      quantumSignature: quantumSignatures[network],
      locked: false,
      created: new Date().toISOString().split("T")[0],
      privateKey,
    }

    setGeneratedWallet(importedWallet)
  }

  const confirmWallet = () => {
    if (generatedWallet) {
      onWalletCreated(generatedWallet)
      setWalletName("")
      setNetwork("XRP")
      setCreationMethod("new")
      setPrivateKey("")
      setGeneratedWallet(null)
    }
  }

  return (
    <div className="space-y-6">
      {!generatedWallet ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create or Import Wallet
            </CardTitle>
            <CardDescription>Add a new wallet to your quantum vault</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wallet Name */}
            <div>
              <Label htmlFor="wallet-name">Wallet Name</Label>
              <Input
                id="wallet-name"
                placeholder="e.g., Trading Wallet, Cold Storage"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Network Selection */}
            <div>
              <Label htmlFor="network">Blockchain Network</Label>
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger id="network" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XRP">XRP Ledger</SelectItem>
                  <SelectItem value="XLM">Stellar (XLM)</SelectItem>
                  <SelectItem value="XDC">XDC Network</SelectItem>
                  <SelectItem value="HBAR">Hedera (HBAR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Creation Method */}
            <div>
              <Label>Creation Method</Label>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => setCreationMethod("new")}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    creationMethod === "new" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-medium text-sm">Generate New</p>
                  <p className="text-xs text-muted-foreground">Create a new wallet</p>
                </button>
                <button
                  onClick={() => setCreationMethod("import")}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    creationMethod === "import"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-medium text-sm">Import Existing</p>
                  <p className="text-xs text-muted-foreground">Import from private key</p>
                </button>
              </div>
            </div>

            {/* Import Private Key */}
            {creationMethod === "import" && (
              <div>
                <Label htmlFor="private-key">Private Key</Label>
                <Textarea
                  id="private-key"
                  placeholder="Paste your private key here (keep it secure)"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="mt-2 font-mono text-xs"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Never share your private key. It will be encrypted in the quantum vault.
                </p>
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={creationMethod === "new" ? generateNewWallet : importWallet}
              className="w-full gap-2"
              disabled={!walletName.trim() || (creationMethod === "import" && !privateKey.trim())}
            >
              <Plus className="w-4 h-4" />
              {creationMethod === "new" ? "Generate Wallet" : "Import Wallet"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle>Wallet Created Successfully</CardTitle>
            <CardDescription>Review your new wallet details before confirming</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wallet Details */}
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Wallet Name</p>
                <p className="font-medium">{generatedWallet.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Network</p>
                <Badge>{generatedWallet.network}</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <code className="text-xs font-mono break-all">{generatedWallet.address}</code>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Quantum Signature</p>
                <p className="text-sm font-medium">{generatedWallet.quantumSignature}</p>
              </div>
            </div>

            {/* Private Key (if new) */}
            {creationMethod === "new" && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-xs font-semibold text-destructive mb-2">SAVE YOUR PRIVATE KEY</p>
                <div className="flex items-center gap-2 bg-background p-2 rounded border border-border mb-2">
                  <code className="text-xs font-mono flex-1 break-all">{generatedWallet.privateKey}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(generatedWallet.privateKey)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Store this key securely. You will need it to recover your wallet.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setGeneratedWallet(null)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmWallet} className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Confirm & Add Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
