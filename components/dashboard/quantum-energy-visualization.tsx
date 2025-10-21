"use client"

import { useEffect, useRef } from "react"

interface QuantumEnergyVisualizationProps {
  energy: number
}

export function QuantumEnergyVisualization({ energy }: QuantumEnergyVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Create gradient for energy field
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(width, height) / 2)
    gradient.addColorStop(0, `rgba(8, 145, 178, ${(energy / 100) * 0.8})`)
    gradient.addColorStop(0.5, `rgba(99, 102, 241, ${(energy / 100) * 0.4})`)
    gradient.addColorStop(1, "rgba(8, 145, 178, 0)")

    // Draw energy field
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, (Math.min(width, height) / 2) * (energy / 100), 0, 2 * Math.PI)
    ctx.fill()

    // Draw energy rings
    const rings = 3
    for (let i = 1; i <= rings; i++) {
      const radius = (Math.min(width, height) / 2) * (i / rings) * (energy / 100)
      ctx.strokeStyle = `rgba(8, 145, 178, ${0.3 / i})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw energy level text
    ctx.fillStyle = "rgb(75, 85, 99)"
    ctx.font = "bold 24px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${energy.toFixed(1)}%`, centerX, centerY)

    ctx.fillStyle = "rgb(107, 114, 128)"
    ctx.font = "12px sans-serif"
    ctx.fillText("Quantum Energy", centerX, centerY + 20)
  }, [energy])

  return (
    <div className="flex items-center justify-center h-64">
      <canvas ref={canvasRef} width={300} height={200} className="max-w-full h-auto" />
    </div>
  )
}
