"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Zap,
  TrendingUp,
  Network,
  BarChart3,
  Settings,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { QuantumEnergyVisualization } from "./quantum-energy-visualization"
import { NetworkResonanceChart } from "./network-resonance-chart"
import { TransactionMetrics } from "./transaction-metrics"
import { TransactionProcessingInterface } from "./transaction-processing-interface"
import { NetworkMonitoringSystem } from "./network-monitoring-system"
import { ComplianceDashboard } from "./compliance-dashboard"
import { WalletManagementInterface } from "./wallet-management-interface"
import { TerminalConsole } from "./terminal-console"
import { DebugConsole } from "./debug-console"
import { WorkflowAutomationEngine } from "./workflow-automation-engine"
import { DigitalAssetsNetwork } from "./digital-assets-network"
import { CrossChainBridge } from "./cross-chain-bridge"
import { DeFiProtocolsHub } from "./defi-protocols-hub"
import { SMEExpertRegistry } from "./sme-expert-registry"
import { SMEConsultationInterface } from "./sme-consultation-interface"
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
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                  Q
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">QFS</h1>
                  <p className="text-xs text-muted-foreground">Quantum Financial System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={systemStatus === "optimal" ? "default" : "destructive"} className="gap-1">
                {systemStatus === "optimal" ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                {systemStatus === "optimal" ? "Optimal" : "Alert"}
              </Badge>
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${sidebarOpen ? "w-64" : "w-0"} hidden lg:block border-r border-border bg-card/50 transition-all duration-300 overflow-hidden`}
        >
          <div className="p-6 space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Core Systems
              </h3>
              <nav className="space-y-2">
                <NavItem icon={<BarChart3 className="w-4 h-4" />} label="Overview" />
                <NavItem icon={<Zap className="w-4 h-4" />} label="Energy" />
                <NavItem icon={<Network className="w-4 h-4" />} label="Networks" />
                <NavItem icon={<Activity className="w-4 h-4" />} label="Transactions" />
              </nav>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Expert Services
              </h3>
              <nav className="space-y-2">
                <NavItem icon={<CheckCircle2 className="w-4 h-4" />} label="SME Experts" />
                <NavItem icon={<TrendingUp className="w-4 h-4" />} label="Consultation" />
                <NavItem icon={<BarChart3 className="w-4 h-4" />} label="Analytics" />
              </nav>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Advanced</h3>
              <nav className="space-y-2">
                <NavItem icon={<Network className="w-4 h-4" />} label="DeFi" />
                <NavItem icon={<Zap className="w-4 h-4" />} label="Workflows" />
                <NavItem icon={<Settings className="w-4 h-4" />} label="Compliance" />
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">System Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Quantum Energy"
                  value={quantumEnergy.toFixed(1)}
                  unit="%"
                  icon={<Zap className="w-5 h-5" />}
                  trend="+2.3%"
                  color="primary"
                  progress={quantumEnergy}
                />
                <MetricCard
                  title="Active Networks"
                  value="20"
                  icon={<Network className="w-5 h-5" />}
                  trend="All synchronized"
                  color="accent"
                />
                <MetricCard
                  title="Transactions"
                  value="2,847"
                  icon={<Activity className="w-5 h-5" />}
                  trend="+28.5% today"
                  color="chart-2"
                />
                <MetricCard
                  title="Efficiency"
                  value="98.2"
                  unit="%"
                  icon={<TrendingUp className="w-5 h-5" />}
                  trend="Optimal"
                  color="chart-3"
                  progress={98.2}
                />
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <div className="overflow-x-auto">
                <TabsList className="inline-flex gap-1 bg-muted/50 p-1 rounded-lg w-full">
                  <TabsTrigger value="overview" className="text-sm">
                    Overview
                  </TabsTrigger>
                  <div className="w-px bg-border" />
                  <TabsTrigger value="sme-experts" className="text-sm">
                    Experts
                  </TabsTrigger>
                  <TabsTrigger value="sme-consultation" className="text-sm">
                    Consultation
                  </TabsTrigger>
                  <TabsTrigger value="sme-analytics" className="text-sm">
                    SME Analytics
                  </TabsTrigger>
                  <div className="w-px bg-border" />
                  <TabsTrigger value="digital-assets" className="text-sm">
                    Assets
                  </TabsTrigger>
                  <TabsTrigger value="cross-chain" className="text-sm">
                    Cross-Chain
                  </TabsTrigger>
                  <TabsTrigger value="defi" className="text-sm">
                    DeFi
                  </TabsTrigger>
                  <div className="w-px bg-border" />
                  <TabsTrigger value="transactions" className="text-sm">
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="networks" className="text-sm">
                    Networks
                  </TabsTrigger>
                  <TabsTrigger value="compliance" className="text-sm">
                    Compliance
                  </TabsTrigger>
                  <div className="w-px bg-border" />
                  <TabsTrigger value="workflows" className="text-sm">
                    Workflows
                  </TabsTrigger>
                  <TabsTrigger value="terminal" className="text-sm">
                    Terminal
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-primary/20">
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

                  <Card className="border-accent/20">
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

              <TabsContent value="sme-analytics">
                <SMEAnalytics />
              </TabsContent>

              <TabsContent value="digital-assets">
                <DigitalAssetsNetwork />
              </TabsContent>

              <TabsContent value="cross-chain">
                <CrossChainBridge />
              </TabsContent>

              <TabsContent value="defi">
                <DeFiProtocolsHub />
              </TabsContent>

              <TabsContent value="transactions">
                <TransactionProcessingInterface />
              </TabsContent>

              <TabsContent value="networks">
                <NetworkMonitoringSystem />
              </TabsContent>

              <TabsContent value="compliance">
                <ComplianceDashboard />
              </TabsContent>

              <TabsContent value="workflows">
                <WorkflowAutomationEngine />
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
        </main>
      </div>
    </div>
  )
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors group">
      {icon}
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  )
}

function MetricCard({
  title,
  value,
  unit,
  icon,
  trend,
  color,
  progress,
}: {
  title: string
  value: string
  unit?: string
  icon: React.ReactNode
  trend: string
  color: string
  progress?: number
}) {
  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>{icon}</div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        {progress !== undefined && <Progress value={progress} className="h-1.5" />}
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  )
}
