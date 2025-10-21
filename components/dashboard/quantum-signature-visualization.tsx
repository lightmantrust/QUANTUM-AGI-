"use client"

import { useEffect, useRef } from "react"

interface Transaction {
  id: string
  network: "XRP" | "XLM" | "XDC" | "HBAR"
  quantumSignature: number
  energyEfficiency: number
  status: string
}

interface QuantumSignatureVisualizationProps {
  transactions: Transaction[]
}

export function QuantumSignatureVisualization({ transactions }: QuantumSignatureVisualizationProps) {
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

    // Draw quantum signatures as wave patterns
    transactions.forEach((tx, index) => {
      const y = (height / (transactions.length + 1)) * (index + 1)
      const amplitude = (tx.quantumSignature / 100) * 30
      const frequency = tx.energyEfficiency / 10

      // Get network color
      const colors = {
        XRP: "rgba(8, 145, 178, 0.8)",
        XLM: "rgba(99, 102, 241, 0.8)",
        XDC: "rgba(34, 197, 94, 0.8)",
        HBAR: "rgba(168, 85, 247, 0.8)",
      }

      ctx.strokeStyle = colors[tx.network]
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let x = 0; x < width; x++) {
        const waveY = y + Math.sin((x / width) * frequency * Math.PI * 2) * amplitude
        if (x === 0) {
          ctx.moveTo(x, waveY)
        } else {
          ctx.lineTo(x, waveY)
        }
      }
      ctx.stroke()

      // Draw network label
      ctx.fillStyle = colors[tx.network]
      ctx.font = "12px sans-serif"
      ctx.fillText(`${tx.network} (${tx.quantumSignature.toFixed(1)}%)`, 10, y - amplitude - 5)
    })
  }, [transactions])

  return (
    <div className="flex items-center justify-center h-64">
      <canvas ref={canvasRef} width={400} height={250} className="max-w-full h-auto border border-border rounded" />
    </div>
  )
}
