"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle, Plus, Code, Shield } from "lucide-react"

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

interface CordaSmartContractPanelProps {
  contracts: SmartContract[]
}

export function CordaSmartContractPanel({ contracts }: CordaSmartContractPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Smart Contracts</h3>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Deploy Contract
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contracts.map((contract) => (
          <Card key={contract.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(contract.status)}
                  <span>{contract.name}</span>
                </div>
                <Badge
                  variant={
                    contract.status === "deployed"
                      ? "default"
                      : contract.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {contract.status}
                </Badge>
              </CardTitle>
              <CardDescription>v{contract.version}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contract Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">States</span>
                  <p className="text-lg font-semibold">{contract.states}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Flows</span>
                  <p className="text-lg font-semibold">{contract.flows}</p>
                </div>
              </div>

              {/* Audit Status */}
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                {contract.audited ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
                <span className="text-sm">{contract.audited ? "Audited" : "Pending Audit"}</span>
              </div>

              {/* Last Updated */}
              <p className="text-xs text-muted-foreground">Last updated: {contract.lastUpdated.toLocaleDateString()}</p>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Code className="w-4 h-4 mr-1" />
                  View Code
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
