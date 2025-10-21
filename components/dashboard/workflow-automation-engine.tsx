"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Workflow {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "completed"
  progress: number
  executionTime: number
  successRate: number
  lastRun: Date
  nextRun: Date
  automationLevel: number
}

export function WorkflowAutomationEngine() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "1",
      name: "Daily Compliance Report Generation",
      description: "Automatically generates and distributes daily compliance reports",
      status: "active",
      progress: 100,
      executionTime: 45,
      successRate: 99.8,
      lastRun: new Date(Date.now() - 3600000),
      nextRun: new Date(Date.now() + 82800000),
      automationLevel: 95,
    },
    {
      id: "2",
      name: "Network Health Monitoring",
      description: "Continuous monitoring and alerting for network anomalies",
      status: "active",
      progress: 87,
      executionTime: 120,
      successRate: 98.5,
      lastRun: new Date(Date.now() - 1800000),
      nextRun: new Date(Date.now() + 1800000),
      automationLevel: 88,
    },
    {
      id: "3",
      name: "Transaction Optimization",
      description: "Optimizes transaction routing and timing for maximum efficiency",
      status: "active",
      progress: 65,
      executionTime: 90,
      successRate: 97.2,
      lastRun: new Date(Date.now() - 7200000),
      nextRun: new Date(Date.now() + 3600000),
      automationLevel: 92,
    },
    {
      id: "4",
      name: "Risk Assessment & Mitigation",
      description: "Automated risk detection and mitigation strategy execution",
      status: "active",
      progress: 42,
      executionTime: 180,
      successRate: 96.8,
      lastRun: new Date(Date.now() - 10800000),
      nextRun: new Date(Date.now() + 7200000),
      automationLevel: 85,
    },
  ])

  const performanceData = workflows.map((w) => ({
    name: w.name.substring(0, 20),
    successRate: w.successRate,
    automation: w.automationLevel,
  }))

  const handlePauseWorkflow = (id: string) => {
    setWorkflows(workflows.map((w) => (w.id === id ? { ...w, status: "paused" } : w)))
  }

  const handleResumeWorkflow = (id: string) => {
    setWorkflows(workflows.map((w) => (w.id === id ? { ...w, status: "active" } : w)))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.filter((w) => w.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Automation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-500">
              {(workflows.reduce((sum, w) => sum + w.automationLevel, 0) / workflows.length).toFixed(0)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.length * 24}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              successRate: {
                label: "Success Rate",
                color: "hsl(var(--chart-1))",
              },
              automation: {
                label: "Automation Level",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="successRate" stroke="var(--color-successRate)" name="Success Rate" />
                <Line type="monotone" dataKey="automation" stroke="var(--color-automation)" name="Automation Level" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="text-lg font-semibold">Active Workflows</div>
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{workflow.name}</div>
                    <div className="text-sm text-slate-400 mt-1">{workflow.description}</div>
                  </div>
                  <Badge
                    className={
                      workflow.status === "active"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }
                  >
                    {workflow.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-5 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400 mb-1">Progress</div>
                    <div className="font-medium">{workflow.progress}%</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Execution Time</div>
                    <div className="font-medium">{workflow.executionTime}s</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Success Rate</div>
                    <div className="font-medium text-green-400">{workflow.successRate}%</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Automation Level</div>
                    <div className="font-medium text-cyan-400">{workflow.automationLevel}%</div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Next Run</div>
                    <div className="font-medium text-sm">{workflow.nextRun.toLocaleTimeString()}</div>
                  </div>
                </div>

                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${workflow.progress}%` }}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  {workflow.status === "active" ? (
                    <Button size="sm" variant="outline" onClick={() => handlePauseWorkflow(workflow.id)}>
                      Pause
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-cyan-600 hover:bg-cyan-700"
                      onClick={() => handleResumeWorkflow(workflow.id)}
                    >
                      Resume
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
