"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertTriangle, FileText, Users, Shield } from "lucide-react"

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

interface ComplianceOverviewProps {
  metrics: ComplianceMetrics
}

export function ComplianceOverview({ metrics }: ComplianceOverviewProps) {
  const complianceAreas = [
    {
      name: "ISO 20022 Messaging",
      score: metrics.iso20022Compliance,
      icon: FileText,
      description: "Financial message format compliance",
      status:
        metrics.iso20022Compliance > 95 ? "excellent" : metrics.iso20022Compliance > 85 ? "good" : "needs-attention",
    },
    {
      name: "KYC Compliance",
      score: metrics.kycCompliance,
      icon: Users,
      description: "Know Your Customer verification",
      status: metrics.kycCompliance > 95 ? "excellent" : metrics.kycCompliance > 85 ? "good" : "needs-attention",
    },
    {
      name: "AML Monitoring",
      score: metrics.amlCompliance,
      icon: Shield,
      description: "Anti-Money Laundering controls",
      status: metrics.amlCompliance > 95 ? "excellent" : metrics.amlCompliance > 85 ? "good" : "needs-attention",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "needs-attention":
        return "text-yellow-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return "default"
      case "good":
        return "secondary"
      case "needs-attention":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Compliance Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {complianceAreas.map((area) => {
          const Icon = area.icon
          return (
            <Card key={area.name} className="relative">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{area.name}</span>
                  </div>
                  <Badge variant={getStatusBadge(area.status)}>{area.status.replace("-", " ")}</Badge>
                </CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{area.score.toFixed(1)}%</span>
                    {area.score > 95 ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <Progress value={area.score} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed Compliance Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Summary</CardTitle>
            <CardDescription>Current compliance status across all areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Transaction Monitoring</p>
                    <p className="text-xs text-muted-foreground">Real-time compliance checks active</p>
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Regulatory Reporting</p>
                    <p className="text-xs text-muted-foreground">Automated report generation</p>
                  </div>
                </div>
                <Badge variant="default">Automated</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Manual Reviews</p>
                    <p className="text-xs text-muted-foreground">{metrics.pendingReviews} items pending review</p>
                  </div>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Statistics</CardTitle>
            <CardDescription>Compliance audit and review metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{metrics.completedAudits}</div>
                  <p className="text-sm text-muted-foreground">Completed Audits</p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <div className="text-2xl font-bold text-accent">{metrics.pendingReviews}</div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Audit Completion Rate</span>
                  <span className="text-sm font-medium">96.2%</span>
                </div>
                <Progress value={96.2} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Review Response Time</span>
                  <span className="text-sm font-medium">2.3 days avg</span>
                </div>
                <Progress value={85} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
