"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Shield, TrendingDown, TrendingUp, Activity } from "lucide-react"
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"

interface RiskAssessmentProps {
  riskScore: number
}

const riskCategories = [
  { name: "Transaction Risk", value: 12, color: "#0891b2" },
  { name: "Network Risk", value: 8, color: "#6366f1" },
  { name: "Compliance Risk", value: 15, color: "#22c55e" },
  { name: "Operational Risk", value: 10, color: "#f59e0b" },
]

const riskFactors = [
  {
    category: "High Volume Transactions",
    risk: "Medium",
    impact: 7.2,
    trend: "stable",
    description: "Increased transaction volumes may indicate suspicious activity",
  },
  {
    category: "Cross-Border Transfers",
    risk: "Low",
    impact: 3.1,
    trend: "decreasing",
    description: "International transfers within normal parameters",
  },
  {
    category: "New Customer Onboarding",
    risk: "Medium",
    impact: 5.8,
    trend: "increasing",
    description: "Higher KYC verification requirements for new accounts",
  },
  {
    category: "Network Latency",
    risk: "Low",
    impact: 2.4,
    trend: "stable",
    description: "Network performance within acceptable ranges",
  },
]

export function RiskAssessment({ riskScore }: RiskAssessmentProps) {
  const getRiskLevel = (score: number) => {
    if (score < 10) return { level: "Low", color: "text-green-600", variant: "default" as const }
    if (score < 20) return { level: "Medium", color: "text-yellow-600", variant: "secondary" as const }
    if (score < 30) return { level: "High", color: "text-orange-600", variant: "destructive" as const }
    return { level: "Critical", color: "text-red-600", variant: "destructive" as const }
  }

  const riskLevel = getRiskLevel(riskScore)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      case "stable":
        return <Activity className="w-4 h-4 text-blue-500" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Overall Risk Assessment
          </CardTitle>
          <CardDescription>Current system-wide risk evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-foreground">{riskScore.toFixed(1)}</div>
              <p className="text-sm text-muted-foreground">Risk Score (0-100)</p>
            </div>
            <Badge variant={riskLevel.variant} className="text-lg px-3 py-1">
              {riskLevel.level} Risk
            </Badge>
          </div>
          <Progress value={100 - riskScore * 3.33} className="mb-2" />
          <p className="text-xs text-muted-foreground">Lower scores indicate better risk management</p>
        </CardContent>
      </Card>

      {/* Risk Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
            <CardDescription>Breakdown of risk categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Factors</CardTitle>
            <CardDescription>Key areas requiring monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{factor.category}</span>
                      {getTrendIcon(factor.trend)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getRiskColor(factor.risk)}>
                        {factor.risk}
                      </Badge>
                      <span className="text-sm font-medium">{factor.impact.toFixed(1)}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                  <Progress value={factor.impact * 10} className="mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts */}
      {riskScore > 20 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">High Risk Level Detected</p>
              <p className="text-sm">
                Current risk score of {riskScore.toFixed(1)} exceeds recommended thresholds. Review risk factors and
                implement additional controls.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Risk Mitigation Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Mitigation Recommendations</CardTitle>
          <CardDescription>Suggested actions to reduce overall risk exposure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Enhanced Transaction Monitoring</p>
                <p className="text-xs text-muted-foreground">
                  Implement additional screening for high-value transactions above $10,000
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Customer Due Diligence</p>
                <p className="text-xs text-muted-foreground">
                  Conduct enhanced KYC reviews for customers with unusual transaction patterns
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Network Redundancy</p>
                <p className="text-xs text-muted-foreground">
                  Increase network monitoring frequency during peak transaction periods
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
