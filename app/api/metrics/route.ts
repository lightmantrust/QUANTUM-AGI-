import { NextResponse } from "next/server"

export async function GET() {
  try {
    const metrics = {
      timestamp: new Date().toISOString(),
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
      },
      application: {
        activeConnections: 42,
        requestsPerSecond: 125,
        averageResponseTime: 45,
        errorRate: 0.02,
      },
      networks: {
        xrp: { status: "operational", latency: 120 },
        xlm: { status: "operational", latency: 95 },
        xdc: { status: "operational", latency: 110 },
        hbar: { status: "operational", latency: 105 },
      },
      transactions: {
        processed: 1247,
        pending: 23,
        failed: 2,
        successRate: 99.84,
      },
    }

    return NextResponse.json(metrics, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve metrics" }, { status: 500 })
  }
}
