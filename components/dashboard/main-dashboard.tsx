"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Activity, Zap, TrendingUp, Network, BarChart3, Settings, AlertTriangle, CheckCircle2 } from "lucide-react"
import { QuantumEnergyVisualization } from "./quantum-energy-visualization"
import { NetworkResonanceChart } from "./network-resonance-chart"
import { TransactionMetrics } from "./transaction-metrics"
import { TransactionProcessingInterface } from "./transaction-processing-interface"
import { NetworkMonitoringSystem } from "./network-monitoring-system"
import { ComplianceDashboard } from "./compliance-dashboard"
import { WalletManagementInterface } from "./wallet-management-interface"
import { LegalNetworksInterface } from "./legal-networks-interface"
import { TerminalConsole } from "./terminal-console"
import { DebugConsole } from "./debug-console"
import { CordaFrameworkIntegration } from "./corda-framework-integration"
import { AGIProblemSolver } from "./agi-problem-solver"
import { WorkflowAutomationEngine } from "./workflow-automation-engine"
import { DigitalAssetsNetwork } from "./digital-assets-network"
import { ExpandedDigitalAssets } from "./expanded-digital-assets"
import { CrossChainBridge } from "./cross-chain-bridge"
import { DeFiProtocolsHub } from "./defi-protocols-hub"
import { Web3IntegrationPanel } from "./web3-integration-panel"
import { SMEExpertRegistry } from "./sme-expert-registry"
import { SMEConsultationInterface } from "./sme-consultation-interface"
import { SMEQualityAssurance } from "./sme-quality-assurance"
import { SMEAnalytics } from "./sme-analytics"

export function MainDashboard() {
  const [quantumEnergy, setQuantumEnergy] = useState(87.3)
  const [networkResonance, setNetworkResonance] = useState({
    XRP: 94.2,
    XLM: 89.7,
    XDC: 91.5,
    HBAR: 88.9,
  })
  const [systemStatus, setSystemStatus] = useState("optimal")

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumEnergy((prev) => prev + (Math.random() - 0.5) * 2)
      setNetworkResonance((prev) => ({
        XRP: Math.max(80, Math.min(100, prev.XRP + (Math.random() - 0.5) * 3)),
        XLM: Math.max(80, Math.min(100, prev.XLM + (Math.random() - 0.5) * 3)),
        XDC: Math.max(80, Math.min(100, prev.XDC + (Math.random() - 0.5) * 3)),
        HBAR: Math.max(80, Math.min(100, prev.HBAR + (Math.random() - 0.5) * 3)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">QFS - Quantum Financial System</h1>
                <p className="text-sm text-muted-foreground">
                  Enterprise Financial Transaction Optimization Platform with Multi-Chain Digital Asset Integration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={systemStatus === "optimal" ? "default" : "destructive"} className="gap-1">
                {systemStatus === "optimal" ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                System {systemStatus === "optimal" ? "Optimal" : "Alert"}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quantum Energy Level</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{quantumEnergy.toFixed(1)}%</div>
              <Progress value={quantumEnergy} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">+2.3% from last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Networks</CardTitle>
              <Network className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">20</div>
              <div className="flex gap-1 mt-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  BTC
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  ETH
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  SOL
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  ARB
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  +16
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">All networks synchronized</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Transactions Today</CardTitle>
              <Activity className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,847</div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-chart-2">+28.5%</span> from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Energy Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">98.2%</div>
              <p className="text-xs text-muted-foreground mt-2">Optimal performance range</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-10 gap-1 overflow-x-auto">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sme-experts" className="text-xs">
              SME Experts
            </TabsTrigger>
            <TabsTrigger value="sme-consultation" className="text-xs">
              Consultation
            </TabsTrigger>
            <TabsTrigger value="sme-qa" className="text-xs">
              QA
            </TabsTrigger>
            <TabsTrigger value="sme-analytics" className="text-xs">
              SME Analytics
            </TabsTrigger>
            <TabsTrigger value="digital-assets" className="text-xs">
              Digital Assets
            </TabsTrigger>
            <TabsTrigger value="expanded-assets" className="text-xs">
              Expanded Assets
            </TabsTrigger>
            <TabsTrigger value="cross-chain" className="text-xs">
              Cross-Chain
            </TabsTrigger>
            <TabsTrigger value="defi" className="text-xs">
              DeFi
            </TabsTrigger>
            <TabsTrigger value="web3" className="text-xs">
              Web3
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="networks" className="text-xs">
              Networks
            </TabsTrigger>
            <TabsTrigger value="legal" className="text-xs">
              Legal
            </TabsTrigger>
            <TabsTrigger value="corda" className="text-xs">
              Corda
            </TabsTrigger>
            <TabsTrigger value="agi" className="text-xs">
              AGI
            </TabsTrigger>
            <TabsTrigger value="workflows" className="text-xs">
              Workflows
            </TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs">
              Compliance
            </TabsTrigger>
            <TabsTrigger value="terminal" className="text-xs">
              Terminal
            </TabsTrigger>
            <TabsTrigger value="debug" className="text-xs">
              Debug
            </TabsTrigger>
            <TabsTrigger value="wallets" className="text-xs">
              Wallets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Quantum Energy Field
                  </CardTitle>
                  <CardDescription>Real-time visualization of quantum energy patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuantumEnergyVisualization energy={quantumEnergy} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-accent" />
                    Network Resonance
                  </CardTitle>
                  <CardDescription>Multi-chain network synchronization status</CardDescription>
                </CardHeader>
                <CardContent>
                  <NetworkResonanceChart data={networkResonance} />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-chart-2" />
                  Transaction Metrics
                </CardTitle>
                <CardDescription>Performance analytics and processing statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionMetrics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sme-experts">
            <SMEExpertRegistry />
          </TabsContent>

          <TabsContent value="sme-consultation">
            <SMEConsultationInterface />
          </TabsContent>

          <TabsContent value="sme-qa">
            <SMEQualityAssurance />
          </TabsContent>

          <TabsContent value="sme-analytics">
            <SMEAnalytics />
          </TabsContent>

          <TabsContent value="digital-assets">
            <DigitalAssetsNetwork />
          </TabsContent>

          <TabsContent value="expanded-assets">
            <ExpandedDigitalAssets />
          </TabsContent>

          <TabsContent value="cross-chain">
            <CrossChainBridge />
          </TabsContent>

          <TabsContent value="defi">
            <DeFiProtocolsHub />
          </TabsContent>

          <TabsContent value="web3">
            <Web3IntegrationPanel />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionProcessingInterface />
          </TabsContent>

          <TabsContent value="networks">
            <NetworkMonitoringSystem />
          </TabsContent>

          <TabsContent value="legal">
            <LegalNetworksInterface />
          </TabsContent>

          <TabsContent value="corda">
            <CordaFrameworkIntegration />
          </TabsContent>

          <TabsContent value="agi">
            <AGIProblemSolver />
          </TabsContent>

          <TabsContent value="workflows">
            <WorkflowAutomationEngine />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceDashboard />
          </TabsContent>

          <TabsContent value="terminal" className="space-y-6">
            <TerminalConsole />
          </TabsContent>

          <TabsContent value="debug" className="space-y-6">
            <DebugConsole />
          </TabsContent>

          <TabsContent value="wallets">
            <WalletManagementInterface />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
