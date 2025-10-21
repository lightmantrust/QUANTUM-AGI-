"use client"

import { useEffect, useRef } from "react"

interface NetworkStatus {
  network: "XRP" | "XLM" | "XDC" | "HBAR"
  latency: number
  nodes: number
  activeConnections: number
}

interface NetworkLatencyMapProps {
  networks: NetworkStatus[]
}

export function NetworkLatencyMap({ networks }: NetworkLatencyMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw world map outline (simplified)
    ctx.strokeStyle = "hsl(var(--border))"
    ctx.lineWidth = 1
    ctx.beginPath()
    // Simplified world outline
    ctx.rect(50, 50, width - 100, height - 100)
    ctx.stroke()

    // Network node positions (mock global positions)
    const nodePositions = {
      XRP: { x: width * 0.2, y: height * 0.3 },
      XLM: { x: width * 0.7, y: height * 0.4 },
      XDC: { x: width * 0.5, y: height * 0.6 },
      HBAR: { x: width * 0.8, y: height * 0.2 },
    }

    const colors = {
      XRP: "#0891b2",
      XLM: "#6366f1",
      XDC: "#22c55e",
      HBAR: "#a855f7",
    }

    // Draw connections between networks
    networks.forEach((network, i) => {
      networks.slice(i + 1).forEach((otherNetwork) => {
        const pos1 = nodePositions[network.network]
        const pos2 = nodePositions[otherNetwork.network]

        const avgLatency = (network.latency + otherNetwork.latency) / 2
        const opacity = Math.max(0.1, 1 - avgLatency / 10)

        ctx.strokeStyle = `rgba(8, 145, 178, ${opacity})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(pos1.x, pos1.y)
        ctx.lineTo(pos2.x, pos2.y)
        ctx.stroke()
      })
    })

    // Draw network nodes
    networks.forEach((network) => {
      const pos = nodePositions[network.network]
      const radius = Math.max(8, Math.min(20, network.nodes / 10))

      // Node circle
      ctx.fillStyle = colors[network.network]
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
      ctx.fill()

      // Node border
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()

      // Network label
      ctx.fillStyle = "hsl(var(--foreground))"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(network.network, pos.x, pos.y + radius + 15)

      // Latency info
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "hsl(var(--muted-foreground))"
      ctx.fillText(`${network.latency.toFixed(1)}s`, pos.x, pos.y + radius + 28)
    })
  }, [networks])

  return (
    <div className="flex items-center justify-center h-80 bg-muted/20 rounded-lg">
      <canvas ref={canvasRef} width={600} height={300} className="max-w-full h-auto border border-border rounded" />
    </div>
  )
}
