"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Code2 } from "lucide-react"

const web3Services = [
  { id: "metamask", name: "MetaMask", type: "Wallet", status: "connected", users: 30000000, chains: 100 },
  { id: "walletconnect", name: "WalletConnect", type: "Protocol", status: "active", users: 5000000, chains: 50 },
  { id: "ethers", name: "Ethers.js", type: "Library", status: "active", downloads: 50000000, version: "6.x" },
  { id: "web3js", name: "Web3.js", type: "Library", status: "active", downloads: 30000000, version: "4.x" },
  { id: "viem", name: "Viem", type: "Library", status: "active", downloads: 15000000, version: "2.x" },
  { id: "thegraph", name: "The Graph", type: "Indexing", status: "active", subgraphs: 50000, queries: 1000000000 },
]

const web3ActivityData = [
  { time: "00:00", transactions: 45000, gasPrice: 25 },
  { time: "04:00", transactions: 52000, gasPrice: 28 },
  { time: "08:00", transactions: 68000, gasPrice: 32 },
  { time: "12:00", transactions: 85000, gasPrice: 38 },
  { time: "16:00", transactions: 92000, gasPrice: 42 },
  { time: "20:00", transactions: 78000, gasPrice: 35 },
  { time: "24:00", transactions: 65000, gasPrice: 30 },
]

export function Web3IntegrationPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Connected Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">847</div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Active connections</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Smart Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">2,341</div>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Deployed & monitored</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Web3 Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{web3Services.length}</div>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">Integrated & active</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {web3Services.map((service) => (
              <Card key={service.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{service.type}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    {service.type === "Wallet" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium">{service.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Users:</span>
                          <span className="font-medium">{(service.users / 1000000).toFixed(0)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Chains:</span>
                          <span className="font-medium">{service.chains}</span>
                        </div>
                      </>
                    )}
                    {service.type === "Library" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Downloads:</span>
                          <span className="font-medium">{(service.downloads / 1000000).toFixed(0)}M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Version:</span>
                          <span className="font-medium">{service.version}</span>
                        </div>
                      </>
                    )}
                    {service.type === "Indexing" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subgraphs:</span>
                          <span className="font-medium">{(service.subgraphs / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Queries/Day:</span>
                          <span className="font-medium">{(service.queries / 1000000000).toFixed(1)}B</span>
                        </div>
                      </>
                    )}
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    <Code2 className="w-4 h-4 mr-2" />
                    Integrate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Web3 Network Activity</CardTitle>
              <CardDescription>Real-time transaction and gas price data</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={web3ActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="transactions"
                      fill="#5b4eff"
                      stroke="#5b4eff"
                      name="Transactions"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="gasPrice"
                      fill="#00d9ff"
                      stroke="#00d9ff"
                      name="Gas Price (Gwei)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Standards</CardTitle>
              <CardDescription>Supported ERC standards and protocols</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { standard: "ERC-20", description: "Token Standard", adoption: 95 },
                { standard: "ERC-721", description: "NFT Standard", adoption: 88 },
                { standard: "ERC-1155", description: "Multi-Token Standard", adoption: 72 },
                { standard: "ERC-4626", description: "Tokenized Vault Standard", adoption: 65 },
                { standard: "ERC-2612", description: "Permit Extension", adoption: 58 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-semibold">{item.standard}</h5>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${item.adoption}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{item.adoption}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="standards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Web3 Integration Standards</CardTitle>
              <CardDescription>Latest protocols and best practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "JSON-RPC 2.0", status: "Implemented", version: "Latest" },
                { name: "EIP-1193", status: "Implemented", version: "Latest" },
                { name: "EIP-6963", status: "Implemented", version: "Latest" },
                { name: "EIP-712", status: "Implemented", version: "Latest" },
                { name: "EIP-1559", status: "Implemented", version: "Latest" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-semibold text-sm">{item.name}</h5>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200"
                    >
                      {item.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.version}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
