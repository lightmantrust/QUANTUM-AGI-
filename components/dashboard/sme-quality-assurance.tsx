"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertTriangle, BarChart3 } from "lucide-react"

interface ValidationMetric {
  name: string
  score: number
  status: "pass" | "warning" | "fail"
  details: string
}

const VALIDATION_METRICS: ValidationMetric[] = [
  {
    name: "Expert Credential Verification",
    score: 98,
    status: "pass",
    details: "All experts verified against industry databases",
  },
  {
    name: "Recommendation Accuracy",
    score: 94,
    status: "pass",
    details: "94% of recommendations successfully implemented",
  },
  {
    name: "Response Time Compliance",
    score: 87,
    status: "warning",
    details: "Average response time: 2.3 hours",
  },
  {
    name: "Knowledge Base Currency",
    score: 91,
    status: "pass",
    details: "Updated within last 30 days",
  },
  {
    name: "Conflict Resolution Rate",
    score: 96,
    status: "pass",
    details: "96% of conflicts resolved within SLA",
  },
]

export function SMEQualityAssurance() {
  const averageScore = Math.round(VALIDATION_METRICS.reduce((sum, m) => sum + m.score, 0) / VALIDATION_METRICS.length)

  return (
    <div className="space-y-6">
      {/* Overall Quality Score */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Quality Assurance Dashboard
          </CardTitle>
          <CardDescription>Expert validation and performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">{averageScore}%</div>
            <p className="text-muted-foreground">Overall Quality Score</p>
            <Progress value={averageScore} className="mt-4" />
          </div>
        </CardContent>
      </Card>

      {/* Validation Metrics */}
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metrics">Validation Metrics</TabsTrigger>
          <TabsTrigger value="audits">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          {VALIDATION_METRICS.map((metric, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {metric.status === "pass" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    <Badge
                      variant={
                        metric.status === "pass" ? "default" : metric.status === "warning" ? "secondary" : "destructive"
                      }
                    >
                      {metric.score}%
                    </Badge>
                  </div>
                  <Progress value={metric.score} />
                  <p className="text-sm text-muted-foreground">{metric.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Audits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Audit #{i}</p>
                    <p className="text-xs text-muted-foreground">{i} days ago</p>
                  </div>
                  <Badge variant="outline">Passed</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
