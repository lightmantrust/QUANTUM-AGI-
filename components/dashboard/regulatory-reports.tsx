"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

interface Report {
  id: string
  name: string
  type: "monthly" | "quarterly" | "annual" | "adhoc"
  status: "completed" | "pending" | "failed"
  generatedDate: Date
  period: string
  size: string
  format: "PDF" | "CSV" | "XML"
}

const mockReports: Report[] = [
  {
    id: "report_001",
    name: "ISO 20022 Compliance Report",
    type: "monthly",
    status: "completed",
    generatedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    period: "November 2024",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "report_002",
    name: "AML Transaction Analysis",
    type: "quarterly",
    status: "completed",
    generatedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    period: "Q4 2024",
    size: "5.8 MB",
    format: "CSV",
  },
  {
    id: "report_003",
    name: "KYC Compliance Summary",
    type: "monthly",
    status: "pending",
    generatedDate: new Date(),
    period: "December 2024",
    size: "Generating...",
    format: "PDF",
  },
  {
    id: "report_004",
    name: "Risk Assessment Report",
    type: "adhoc",
    status: "completed",
    generatedDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    period: "Custom Range",
    size: "1.2 MB",
    format: "XML",
  },
]

export function RegulatoryReports() {
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredReports = mockReports.filter((report) => {
    const matchesType = typeFilter === "all" || report.type === typeFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    return matchesType && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "completed":
        return "default"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "monthly":
        return "bg-blue-100 text-blue-800"
      case "quarterly":
        return "bg-green-100 text-green-800"
      case "annual":
        return "bg-purple-100 text-purple-800"
      case "adhoc":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Generate New Report
          </CardTitle>
          <CardDescription>Create custom compliance and regulatory reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iso20022">ISO 20022 Compliance</SelectItem>
                <SelectItem value="aml">AML Analysis</SelectItem>
                <SelectItem value="kyc">KYC Summary</SelectItem>
                <SelectItem value="risk">Risk Assessment</SelectItem>
                <SelectItem value="audit">Audit Summary</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download and manage compliance reports</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="adhoc">Ad-hoc</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{report.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {report.generatedDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm">{report.size}</TableCell>
                    <TableCell>
                      {report.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                      {report.status === "pending" && (
                        <Badge variant="secondary" className="text-xs">
                          Generating...
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
