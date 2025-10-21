"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Problem {
  id: string
  title: string
  description: string
  category: string
  severity: "low" | "medium" | "high" | "critical"
  status: "pending" | "analyzing" | "solving" | "resolved"
  confidence: number
  solutions: Solution[]
  createdAt: Date
}

interface Solution {
  id: string
  title: string
  description: string
  steps: string[]
  estimatedImpact: number
  riskLevel: "low" | "medium" | "high"
  implemented: boolean
}

export function AGIProblemSolver() {
  const [problems, setProblems] = useState<Problem[]>([
    {
      id: "1",
      title: "Network Latency Spike",
      description: "XRP network experiencing 500ms+ latency",
      category: "Network Performance",
      severity: "high",
      status: "solving",
      confidence: 87,
      solutions: [
        {
          id: "s1",
          title: "Route Optimization",
          description: "Redistribute traffic across alternative nodes",
          steps: ["Analyze current routing", "Identify bottlenecks", "Implement load balancing"],
          estimatedImpact: 65,
          riskLevel: "low",
          implemented: false,
        },
        {
          id: "s2",
          title: "Node Scaling",
          description: "Temporarily increase node capacity",
          steps: ["Provision additional resources", "Configure failover", "Monitor performance"],
          estimatedImpact: 78,
          riskLevel: "medium",
          implemented: false,
        },
      ],
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Transaction Throughput Degradation",
      description: "Processing capacity down 30% from baseline",
      category: "Transaction Processing",
      severity: "high",
      status: "analyzing",
      confidence: 72,
      solutions: [
        {
          id: "s3",
          title: "Batch Optimization",
          description: "Optimize transaction batching algorithm",
          steps: ["Review batch parameters", "Adjust window sizes", "Test performance"],
          estimatedImpact: 45,
          riskLevel: "low",
          implemented: false,
        },
      ],
      createdAt: new Date(),
    },
  ])

  const [newProblem, setNewProblem] = useState("")
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(problems[0])
  const [aiInsights, setAiInsights] = useState<string[]>([])

  const handleAnalyzeProblem = async () => {
    if (!newProblem.trim()) return

    const problem: Problem = {
      id: Date.now().toString(),
      title: newProblem.split("\n")[0],
      description: newProblem,
      category: "User Reported",
      severity: "medium",
      status: "analyzing",
      confidence: 0,
      solutions: [],
      createdAt: new Date(),
    }

    setProblems([problem, ...problems])
    setNewProblem("")

    // Simulate AGI analysis
    setAiInsights([
      "Analyzing problem patterns across historical data...",
      "Cross-referencing with similar incidents...",
      "Generating potential solutions...",
      "Calculating risk assessments...",
      "Optimizing solution recommendations...",
    ])

    // Simulate solution generation
    setTimeout(() => {
      const updatedProblem = {
        ...problem,
        status: "solving" as const,
        confidence: 85,
        solutions: [
          {
            id: "auto1",
            title: "Recommended Solution",
            description: "AI-generated optimal solution based on pattern analysis",
            steps: ["Step 1: Implement fix", "Step 2: Monitor results", "Step 3: Validate"],
            estimatedImpact: 82,
            riskLevel: "low",
            implemented: false,
          },
        ],
      }
      setProblems((prev) => [updatedProblem, ...prev.slice(1)])
      setSelectedProblem(updatedProblem)
      setAiInsights([])
    }, 3000)
  }

  const handleImplementSolution = (problemId: string, solutionId: string) => {
    setProblems(
      problems.map((p) =>
        p.id === problemId
          ? {
              ...p,
              solutions: p.solutions.map((s) => (s.id === solutionId ? { ...s, implemented: true } : s)),
              status: "resolved" as const,
            }
          : p,
      ),
    )
  }

  const problemStats = {
    total: problems.length,
    resolved: problems.filter((p) => p.status === "resolved").length,
    analyzing: problems.filter((p) => p.status === "analyzing").length,
    avgConfidence: Math.round(problems.reduce((sum, p) => sum + p.confidence, 0) / problems.length),
  }

  const confidenceData = problems.map((p) => ({
    name: p.title.substring(0, 15),
    confidence: p.confidence,
    impact: p.solutions.reduce((max, s) => Math.max(max, s.estimatedImpact), 0),
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{problemStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{problemStats.resolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Analyzing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{problemStats.analyzing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-500">{problemStats.avgConfidence}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problem Analysis & Solution Generation</CardTitle>
          <CardDescription>AI-powered problem detection and resolution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Describe a problem or issue..."
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnalyzeProblem()}
              className="flex-1"
            />
            <Button onClick={handleAnalyzeProblem} className="bg-cyan-600 hover:bg-cyan-700">
              Analyze
            </Button>
          </div>

          {aiInsights.length > 0 && (
            <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-4 space-y-2">
              <div className="text-sm font-medium text-cyan-400">AGI Analysis in Progress...</div>
              {aiInsights.map((insight, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                  {insight}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Problems Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {problems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedProblem?.id === problem.id
                    ? "bg-cyan-500/20 border-cyan-500"
                    : "bg-slate-900 border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{problem.title}</div>
                    <div className="text-xs text-slate-400 mt-1">Confidence: {problem.confidence}%</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      problem.severity === "critical"
                        ? "bg-red-500/20 text-red-300"
                        : problem.severity === "high"
                          ? "bg-orange-500/20 text-orange-300"
                          : "bg-yellow-500/20 text-yellow-300"
                    }
                  >
                    {problem.severity}
                  </Badge>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-base">{selectedProblem?.title || "Select a problem"}</CardTitle>
            <CardDescription>{selectedProblem?.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedProblem && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Status</div>
                    <Badge
                      className={
                        selectedProblem.status === "resolved"
                          ? "bg-green-500/20 text-green-300"
                          : selectedProblem.status === "solving"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-yellow-500/20 text-yellow-300"
                      }
                    >
                      {selectedProblem.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Confidence</div>
                    <div className="text-lg font-bold text-cyan-400">{selectedProblem.confidence}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Category</div>
                    <div className="text-sm font-medium">{selectedProblem.category}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-medium">Recommended Solutions</div>
                  {selectedProblem.solutions.map((solution) => (
                    <div key={solution.id} className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-sm">{solution.title}</div>
                          <div className="text-xs text-slate-400 mt-1">{solution.description}</div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            solution.riskLevel === "high"
                              ? "bg-red-500/20 text-red-300"
                              : solution.riskLevel === "medium"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-green-500/20 text-green-300"
                          }
                        >
                          {solution.riskLevel} risk
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-medium text-slate-300">Implementation Steps:</div>
                        {solution.steps.map((step, i) => (
                          <div key={i} className="text-xs text-slate-400 flex items-center gap-2">
                            <span className="text-cyan-400">{i + 1}.</span> {step}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                        <div className="text-xs">
                          <span className="text-slate-400">Estimated Impact: </span>
                          <span className="text-cyan-400 font-medium">{solution.estimatedImpact}%</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleImplementSolution(selectedProblem.id, solution.id)}
                          disabled={solution.implemented}
                          className={
                            solution.implemented ? "bg-green-500/20 text-green-300" : "bg-cyan-600 hover:bg-cyan-700"
                          }
                        >
                          {solution.implemented ? "Implemented" : "Implement"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Solution Effectiveness Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              confidence: {
                label: "AI Confidence",
                color: "hsl(var(--chart-1))",
              },
              impact: {
                label: "Estimated Impact",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="confidence" fill="var(--color-confidence)" name="AI Confidence" />
                <Bar dataKey="impact" fill="var(--color-impact)" name="Estimated Impact" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
