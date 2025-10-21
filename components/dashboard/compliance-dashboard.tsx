"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, FileText, AlertTriangle, CheckCircle2, Eye, Clock } from "lucide-react"
import { ComplianceOverview } from "./compliance-overview"
import { AuditTrail } from "./audit-trail"
import { RegulatoryReports } from "./regulatory-reports"
import { RiskAssessment } from "./risk-assessment"

interface ComplianceMetrics {
  overallScore: number
  iso20022Compliance: number
  kycCompliance: number
  amlCompliance: number
  riskScore: number
  pendingReviews: number
  completedAudits: number
  activeAlerts: number
}

interface ComplianceAlert {
  id: string
  type: "kyc" | "aml" | "regulatory" | "audit"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: Date
  status: "active" | "resolved" | "investigating"
}

export function ComplianceDashboard() {
  const [metrics, setMetrics] = useState<ComplianceMetrics>({
    overallScore: 94.2,
    iso20022Compliance: 98.5,
    kycCompliance: 92.1,
    amlCompliance: 96.8,
    riskScore: 15.3,
    pendingReviews: 7,
    completedAudits: 24,
    activeAlerts: 3,
  })

  const [alerts, setAlerts] = useState<ComplianceAlert[]>([
    {
      id: "alert_001",
      type: "kyc",
      severity: "medium",
      title: "KYC Documentation Pending",
      description: "3 customer profiles require updated documentation",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "active",
    },
    {
      id: "alert_002",
      type: "aml",
      severity: "high",
      title: "Suspicious Transaction Pattern",
      description: "Unusual transaction volume detected for account XRP_001247",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: "investigating",
    },
    {
      id: "alert_003",
      type: "regulatory",
      severity: "low",
      title: "Regulatory Update Available",
      description: "New ISO 20022 guidelines published - review required",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "active",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        overallScore: Math.max(90, Math.min(100, prev.overallScore + (Math.random() - 0.5) * 2)),
        riskScore: Math.max(0, Math.min(30, prev.riskScore + (Math.random() - 0.5) * 2)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="w-4 h-4" />
      case "investigating":
        return <Eye className="w-4 h-4" />
      case "resolved":
        return <CheckCircle2 className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.overallScore.toFixed(1)}%</div>
            <Progress value={metrics.overallScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Excellent compliance rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ISO 20022</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.iso20022Compliance.toFixed(1)}%</div>
            <Progress value={metrics.iso20022Compliance} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Message format compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.riskScore.toFixed(1)}</div>
            <Progress value={100 - metrics.riskScore * 3.33} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Low risk profile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.activeAlerts}</div>
            <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Active Compliance Alerts
            </CardTitle>
            <CardDescription>Issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  variant={alert.severity === "high" || alert.severity === "critical" ? "destructive" : "default"}
                >
                  {getStatusIcon(alert.status)}
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{alert.title}</span>
                          <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {Math.floor((Date.now() - alert.timestamp.getTime()) / (1000 * 60))}m ago
                        </span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Compliance Interface */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ComplianceOverview metrics={metrics} />
        </TabsContent>

        <TabsContent value="audit">
          <AuditTrail />
        </TabsContent>

        <TabsContent value="reports">
          <RegulatoryReports />
        </TabsContent>

        <TabsContent value="risk">
          <RiskAssessment riskScore={metrics.riskScore} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
