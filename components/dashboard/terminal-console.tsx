"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal, Copy, Trash2 } from "lucide-react"

interface ConsoleLog {
  id: string
  timestamp: Date
  level: "info" | "warning" | "error" | "success" | "debug"
  message: string
  details?: string
}

interface CommandHistory {
  command: string
  output: string
  timestamp: Date
  status: "success" | "error" | "pending"
}

export function TerminalConsole() {
  const [logs, setLogs] = useState<ConsoleLog[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 5000),
      level: "info",
      message: "QFS System initialized",
      details: "All core modules loaded successfully",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 4000),
      level: "success",
      message: "Network connections established",
      details: "Connected to 4 blockchain networks",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 3000),
      level: "info",
      message: "Compliance check passed",
      details: "All regulatory requirements met",
    },
  ])

  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([
    {
      command: "status",
      output: "System Status: OPERATIONAL\nUptime: 24h 15m 32s\nCPU: 45%\nMemory: 62%",
      timestamp: new Date(Date.now() - 10000),
      status: "success",
    },
  ])

  const [currentCommand, setCurrentCommand] = useState("")
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs, commandHistory])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "success":
        return "text-green-500"
      case "debug":
        return "text-blue-500"
      default:
        return "text-gray-400"
    }
  }

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      case "success":
        return "default"
      default:
        return "outline"
    }
  }

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = currentCommand.trim()
      if (command) {
        // Simulate command execution
        const output = executeCommand(command)
        setCommandHistory([
          ...commandHistory,
          {
            command,
            output,
            timestamp: new Date(),
            status: "success",
          },
        ])

        // Add log entry
        setLogs([
          ...logs,
          {
            id: Date.now().toString(),
            timestamp: new Date(),
            level: "info",
            message: `Command executed: ${command}`,
            details: output,
          },
        ])

        setCurrentCommand("")
        setHistoryIndex(-1)
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand("")
      }
    }
  }

  const executeCommand = (command: string): string => {
    const cmd = command.toLowerCase().trim()

    const commands: Record<string, string> = {
      help: `Available Commands:
  status          - Show system status
  networks        - List active networks
  transactions    - Show recent transactions
  compliance      - Check compliance status
  nodes           - List all nodes
  energy          - Show quantum energy level
  clear           - Clear console
  help            - Show this help message`,
      status: `System Status: OPERATIONAL
Uptime: 24h 15m 32s
CPU Usage: 45%
Memory Usage: 62%
Network Health: 99.8%
Active Connections: 1,247`,
      networks: `Active Networks:
  XRP     - Status: ONLINE    | Resonance: 94.2% | Nodes: 150
  XLM     - Status: ONLINE    | Resonance: 89.7% | Nodes: 89
  XDC     - Status: DEGRADED  | Resonance: 78.5% | Nodes: 45
  HBAR    - Status: ONLINE    | Resonance: 88.9% | Nodes: 39`,
      transactions: `Recent Transactions:
  TX-2024-001: $1,250,000 | XRP → HBAR | Status: CONFIRMED
  TX-2024-002: $850,000   | XLM → XDC  | Status: CONFIRMED
  TX-2024-003: $2,100,000 | HBAR → XRP | Status: PENDING
  TX-2024-004: $450,000   | XDC → XLM  | Status: CONFIRMED`,
      compliance: `Compliance Status: COMPLIANT
  ISO 20022: PASSED
  PSD2: PASSED
  GLBA: PASSED
  SOC 2 Type II: PASSED
  Last Audit: 2024-01-15
  Next Audit: 2024-04-15`,
      nodes: `Active Nodes:
  SWIFT-Frankfurt: ONLINE | Uptime: 99.98% | Utilization: 65%
  SWIFT-NewYork: ONLINE | Uptime: 99.97% | Utilization: 72%
  SEPA-Brussels: ONLINE | Uptime: 99.99% | Utilization: 58%
  FedWire-DC: ONLINE | Uptime: 99.99% | Utilization: 45%`,
      energy: `Quantum Energy Level: 87.3%
  Current: 87.3%
  Peak: 92.1%
  Average: 85.6%
  Trend: +2.3% (last hour)`,
      clear: "",
    }

    if (cmd === "clear") {
      setLogs([])
      return ""
    }

    return commands[cmd] || `Command not found: ${command}\nType 'help' for available commands`
  }

  const clearLogs = () => {
    setLogs([])
    setCommandHistory([])
  }

  const copyLogs = () => {
    const logText = logs
      .map((log) => `[${log.timestamp.toLocaleTimeString()}] ${log.level.toUpperCase()}: ${log.message}`)
      .join("\n")
    navigator.clipboard.writeText(logText)
  }

  return (
    <div className="space-y-6">
      {/* Console Logs */}
      <Card className="bg-slate-950 border-slate-800">
        <CardHeader className="border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-green-500" />
              <div>
                <CardTitle className="text-green-500">System Console</CardTitle>
                <CardDescription className="text-slate-400">Real-time system logs and diagnostics</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                onClick={copyLogs}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                onClick={clearLogs}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64 w-full bg-slate-950 p-4 font-mono text-sm">
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="space-y-1">
                  <div className="flex items-start gap-3">
                    <span className="text-slate-500 flex-shrink-0">[{log.timestamp.toLocaleTimeString()}]</span>
                    <Badge variant={getLevelBadgeVariant(log.level)} className="flex-shrink-0 text-xs">
                      {log.level.toUpperCase()}
                    </Badge>
                    <span className={`${getLevelColor(log.level)} flex-1`}>{log.message}</span>
                  </div>
                  {log.details && <div className="text-slate-400 ml-24 text-xs">{log.details}</div>}
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Command Terminal */}
      <Card className="bg-slate-950 border-slate-800">
        <CardHeader className="border-b border-slate-800">
          <CardTitle className="text-green-500 text-base">Terminal</CardTitle>
          <CardDescription className="text-slate-400">Execute system commands</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Command History Output */}
            {commandHistory.length > 0 && (
              <ScrollArea className="h-40 w-full bg-slate-900 border border-slate-800 rounded p-3 font-mono text-xs">
                <div className="space-y-3">
                  {commandHistory.slice(-5).map((cmd, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-green-500">$ {cmd.command}</div>
                      <div className="text-slate-300 whitespace-pre-wrap">{cmd.output}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* Command Input */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded px-3 py-2">
              <span className="text-green-500 font-mono">$</span>
              <Input
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="Enter command (type 'help' for available commands)"
                className="bg-transparent border-0 text-green-500 placeholder-slate-500 focus:outline-none focus:ring-0 font-mono text-sm"
              />
            </div>

            {/* Quick Commands */}
            <div className="space-y-2">
              <p className="text-xs text-slate-400">Quick Commands:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["status", "networks", "transactions", "compliance", "nodes", "energy", "help", "clear"].map((cmd) => (
                  <Button
                    key={cmd}
                    variant="outline"
                    size="sm"
                    className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 font-mono text-xs"
                    onClick={() => {
                      setCurrentCommand(cmd)
                    }}
                  >
                    {cmd}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <Card className="bg-slate-950 border-slate-800">
        <CardHeader className="border-b border-slate-800">
          <CardTitle className="text-green-500 text-base">System Metrics</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-400">CPU Usage</p>
              <p className="text-lg font-mono text-green-500">45%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Memory</p>
              <p className="text-lg font-mono text-green-500">62%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Network I/O</p>
              <p className="text-lg font-mono text-green-500">1.2 Gbps</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-400">Uptime</p>
              <p className="text-lg font-mono text-green-500">24h 15m</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
