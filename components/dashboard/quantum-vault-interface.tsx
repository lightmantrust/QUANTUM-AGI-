"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Lock, Unlock, Shield, Key, AlertTriangle } from "lucide-react"

interface Wallet {
  id: string
  name: string
  network: string
  address: string
  balance: number
  quantumSignature: string
}

interface QuantumVaultInterfaceProps {
  wallet: Wallet
}

export function QuantumVaultInterface({ wallet }: QuantumVaultInterfaceProps) {
  const [vaultLocked, setVaultLocked] = useState(true)
  const [encryptionLevel, setEncryptionLevel] = useState(98)

  return (
    <div className="space-y-6">
      {/* Vault Status */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Quantum Vault Security</CardTitle>
                <CardDescription>Advanced encryption and key management</CardDescription>
              </div>
            </div>
            <Button
              variant={vaultLocked ? "outline" : "default"}
              onClick={() => setVaultLocked(!vaultLocked)}
              className="gap-2"
            >
              {vaultLocked ? (
                <>
                  <Lock className="w-4 h-4" />
                  Locked
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  Unlocked
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Encryption Status */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Encryption Level</p>
              <Badge variant="default">{encryptionLevel}%</Badge>
            </div>
            <Progress value={encryptionLevel} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Quantum-resistant encryption with HMAC-SHA512 signatures
            </p>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-4 h-4 text-primary" />
                <p className="font-medium text-sm">Key Derivation</p>
              </div>
              <p className="text-xs text-muted-foreground">HKDF with SHA-512</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-accent" />
                <p className="font-medium text-sm">Signature Algorithm</p>
              </div>
              <p className="text-xs text-muted-foreground">HMAC-SHA512</p>
            </div>
          </div>

          {/* Vault Contents */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium mb-4">Vault Contents</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="text-sm font-medium">Private Key</p>
                  <p className="text-xs text-muted-foreground">Encrypted and secured</p>
                </div>
                <Badge variant="secondary">Encrypted</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="text-sm font-medium">Quantum Signature</p>
                  <p className="text-xs text-muted-foreground">{wallet.quantumSignature}</p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div>
                  <p className="text-sm font-medium">Recovery Codes</p>
                  <p className="text-xs text-muted-foreground">3 codes generated</p>
                </div>
                <Badge variant="secondary">Stored</Badge>
              </div>
            </div>
          </div>

          {/* Security Warning */}
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">Security Notice</p>
              <p className="text-xs text-muted-foreground mt-1">
                Never share your private key or recovery codes. The quantum vault is designed to protect your assets
                with military-grade encryption.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup & Recovery */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Backup & Recovery</CardTitle>
          <CardDescription>Manage your wallet recovery options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Shield className="w-4 h-4" />
            Generate Recovery Codes
          </Button>
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Key className="w-4 h-4" />
            Export Encrypted Backup
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Store backups in a secure location. Recovery codes are one-time use only.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
