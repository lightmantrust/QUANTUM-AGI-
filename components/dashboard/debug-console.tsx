"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bug, AlertCircle, Info, CheckCircle2 } from "lucide-react"

interface DebugEvent {
  id: string
  timestamp: Date
  type: "trace" | "warning" | "error" | "info"
  component: string
  message: string
  stack?: string
}

interface PerformanceMetric {
  name: string
  duration: number
  timestamp: Date
  status: "fast" | "normal" | "slow"
}

export function DebugConsole() {
  const [debugEvents, setDebugEvents] = useState<DebugEvent[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 5000),
      type: "info",
      component: "MainDashboard",
      message: "Component mounted successfully",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 4000),
      type: "trace",
      component: "NetworkMonitoringSystem",
      message: "Real-time updates started",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 3000),
      type: "info",
      component: "LegalNetworksInterface",
      message: "Legal networks data loaded",
    },
  ])

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    {
      name: "Dashboard Render",
      duration: 245,
      timestamp: new Date(Date.now() - 5000),
      status: "fast",
    },
    {
      name: "Network Data Fetch",
      duration: 1250,
      timestamp: new Date(Date.now() - 4000),
      status: "normal",
    },
    {
      name: "Compliance Check",
      duration: 850,
      timestamp: new Date(Date.now() - 3000),
      status: "normal",
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />
      case "trace":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fast":
        return "text-green-500"
      case "normal":
        return "text-blue-500"
      case "slow":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card className="bg-slate-950 border-slate-800">
      <CardHeader className="border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bug className="w-5 h-5 text-purple-500" />
          <div>
            <CardTitle className="text-purple-500">Debug Console</CardTitle>
            <CardDescription className="text-slate-400">
              Development diagnostics and performance monitoring
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger value="events" className="text-slate-300">
              Events
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-slate-300">
              Performance
            </TabsTrigger>
            <TabsTrigger value="network" className="text-slate-300">
              Network
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <ScrollArea className="h-64 w-full bg-slate-900 border border-slate-800 rounded p-3">
              <div className="space-y-2">
                {debugEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 text-xs border-b border-slate-800 pb-2">
                    {getTypeIcon(event.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">{event.timestamp.toLocaleTimeString()}</span>
                        <Badge variant="outline" className="text-xs bg-slate-800 text-slate-300">
                          {event.component}
                        </Badge>
                      </div>
                      <p className="text-slate-300 mt-1">{event.message}</p>
                      {event.stack && <p className="text-slate-500 mt-1 font-mono">{event.stack}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="performance">
            <ScrollArea className="h-64 w-full bg-slate-900 border border-slate-800 rounded p-3">
              <div className="space-y-3">
                {performanceMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1 border-b border-slate-800 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">{metric.name}</span>
                      <span className={`font-mono text-sm ${getStatusColor(metric.status)}`}>{metric.duration}ms</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{metric.timestamp.toLocaleTimeString()}</span>
                      <Badge variant="outline" className="text-xs bg-slate-800 text-slate-300">
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="network">
            <ScrollArea className="h-64 w-full bg-slate-900 border border-slate-800 rounded p-3">
              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-mono">
                  <p className="text-green-500">GET /api/networks - 200 OK (125ms)</p>
                  <p className="text-green-500">GET /api/nodes - 200 OK (89ms)</p>
                  <p className="text-green-500">POST /api/transactions - 201 Created (245ms)</p>
                  <p className="text-blue-500">GET /api/compliance - 200 OK (156ms)</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
