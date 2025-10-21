"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileText, User, Settings, Shield } from "lucide-react"

interface AuditEntry {
  id: string
  timestamp: Date
  user: string
  action: string
  resource: string
  details: string
  ipAddress: string
  status: "success" | "failed" | "warning"
  category: "transaction" | "user" | "system" | "compliance"
}

const mockAuditData: AuditEntry[] = [
  {
    id: "audit_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    user: "admin@quantum.com",
    action: "Transaction Processed",
    resource: "tx_001247",
    details: "XRP transaction processed with quantum signature 94.2%",
    ipAddress: "192.168.1.100",
    status: "success",
    category: "transaction",
  },
  {
    id: "audit_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    user: "compliance@quantum.com",
    action: "KYC Review Completed",
    resource: "user_5678",
    details: "Customer documentation verified and approved",
    ipAddress: "192.168.1.101",
    status: "success",
    category: "compliance",
  },
  {
    id: "audit_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    user: "system",
    action: "Risk Assessment",
    resource: "risk_engine",
    details: "Automated risk assessment triggered for high-value transaction",
    ipAddress: "internal",
    status: "warning",
    category: "system",
  },
  {
    id: "audit_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    user: "operator@quantum.com",
    action: "Network Configuration",
    resource: "xrp_network",
    details: "Updated XRP network resonance parameters",
    ipAddress: "192.168.1.102",
    status: "success",
    category: "system",
  },
]

export function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredEntries = mockAuditData.filter((entry) => {
    const matchesSearch =
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || entry.category === categoryFilter
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <div className="w-2 h-2 rounded-full bg-green-500" />
      case "warning":
        return <div className="w-2 h-2 rounded-full bg-yellow-500" />
      case "failed":
        return <div className="w-2 h-2 rounded-full bg-red-500" />
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "transaction":
        return <FileText className="w-4 h-4 text-primary" />
      case "user":
        return <User className="w-4 h-4 text-accent" />
      case "system":
        return <Settings className="w-4 h-4 text-muted-foreground" />
      case "compliance":
        return <Shield className="w-4 h-4 text-chart-2" />
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Audit Trail
        </CardTitle>
        <CardDescription>Complete log of system activities and compliance events</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="transaction">Transaction</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audit Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-sm">{entry.timestamp.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{entry.user}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{entry.action}</p>
                      <p className="text-xs text-muted-foreground">{entry.details}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{entry.resource}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(entry.status)}
                      <Badge
                        variant={
                          entry.status === "success"
                            ? "default"
                            : entry.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(entry.category)}
                      <span className="text-sm capitalize">{entry.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{entry.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredEntries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No audit entries found matching your criteria</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
