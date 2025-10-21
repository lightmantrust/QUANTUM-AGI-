"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Lightbulb, CheckCircle2, AlertCircle, Clock } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  expert: string
  timestamp: string
  status: "pending" | "implemented" | "reviewed"
}

const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "1",
    title: "Optimize Quantum Energy Allocation",
    description: "Implement dynamic energy distribution based on network load patterns",
    priority: "high",
    expert: "Dr. Sarah Chen",
    timestamp: "2 hours ago",
    status: "pending",
  },
  {
    id: "2",
    title: "Enhance Cross-Chain Security",
    description: "Add additional validation layers for cross-chain transactions",
    priority: "high",
    expert: "Marcus Johnson",
    timestamp: "4 hours ago",
    status: "implemented",
  },
  {
    id: "3",
    title: "Compliance Audit Schedule",
    description: "Schedule quarterly compliance audits with ISO 20022 validation",
    priority: "medium",
    expert: "Elena Rodriguez",
    timestamp: "1 day ago",
    status: "reviewed",
  },
]

export function SMEConsultationInterface() {
  const [activeTab, setActiveTab] = useState("recommendations")
  const [consultationQuery, setConsultationQuery] = useState("")
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])

  const handleSendQuery = () => {
    if (consultationQuery.trim()) {
      setMessages([...messages, { role: "user", content: consultationQuery }])
      // Simulate expert response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "expert",
            content:
              "Based on your query, I recommend implementing a phased approach. First, analyze current bottlenecks, then optimize resource allocation, and finally validate with stress testing.",
          },
        ])
      }, 1000)
      setConsultationQuery("")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "implemented":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "reviewed":
        return <AlertCircle className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="consultation">Live Consultation</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          {MOCK_RECOMMENDATIONS.map((rec) => (
            <Card key={rec.id} className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <CardTitle className="text-base">{rec.title}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{rec.expert}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(rec.status)}
                    <Badge
                      variant={
                        rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{rec.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">{rec.timestamp}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button size="sm">Implement</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="consultation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Expert Consultation</CardTitle>
              <CardDescription>Get instant recommendations from subject matter experts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat Area */}
              <ScrollArea className="h-64 border border-border rounded-lg p-4 bg-muted/30">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-8">
                      Start a consultation by asking a question below
                    </p>
                  ) : (
                    messages.map((msg, idx) => (
                      <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.role === "expert" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>SE</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg ${
                            msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask an expert about your system..."
                  value={consultationQuery}
                  onChange={(e) => setConsultationQuery(e.target.value)}
                  className="min-h-20"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      handleSendQuery()
                    }
                  }}
                />
                <Button onClick={handleSendQuery} size="sm" className="h-20">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultation History</CardTitle>
              <CardDescription>Track all expert consultations and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Consultation #{i}</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
