"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Clock } from "lucide-react"

interface CordaTransaction {
  id: string
  type: string
  status: string
  participants: string[]
  amount: number
  timestamp: Date
  notary: string
}

interface CordaTransactionFlowProps {
  transactions: CordaTransaction[]
}

export function CordaTransactionFlow({ transactions }: CordaTransactionFlowProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Flow Visualization</CardTitle>
        <CardDescription>Corda transaction lifecycle and state progression</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {transactions.map((tx) => (
            <div key={tx.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{tx.id}</h4>
                <Badge variant="outline">{tx.type}</Badge>
              </div>

              {/* Flow Diagram */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {/* Initiated */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Initiated</span>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />

                {/* Recorded */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">Recorded</span>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />

                {/* Notarized */}
                <div
                  className={`flex flex-col items-center gap-1 flex-shrink-0 ${
                    tx.status === "notarized" || tx.status === "finalized" ? "" : "opacity-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.status === "notarized" || tx.status === "finalized" ? "bg-purple-100" : "bg-gray-100"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        tx.status === "notarized" || tx.status === "finalized" ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">Notarized</span>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />

                {/* Finalized */}
                <div
                  className={`flex flex-col items-center gap-1 flex-shrink-0 ${tx.status === "finalized" ? "" : "opacity-50"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.status === "finalized" ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${tx.status === "finalized" ? "text-green-600" : "text-gray-400"}`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">Finalized</span>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Participants</p>
                  <p className="font-medium">{tx.participants.length}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-medium">${(tx.amount / 1000000).toFixed(2)}M</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Notary</p>
                  <p className="font-medium text-xs">{tx.notary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
