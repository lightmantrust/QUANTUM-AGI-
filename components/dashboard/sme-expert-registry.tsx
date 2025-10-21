"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageSquare, TrendingUp, Award, Search, Plus } from "lucide-react"

interface Expert {
  id: string
  name: string
  specialty: string
  expertise: string[]
  rating: number
  consultations: number
  successRate: number
  avatar?: string
  bio: string
  certifications: string[]
}

const MOCK_EXPERTS: Expert[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    specialty: "Quantum Finance",
    expertise: ["Quantum Computing", "Financial Algorithms", "Risk Analysis"],
    rating: 4.9,
    consultations: 342,
    successRate: 96.8,
    bio: "PhD in Quantum Physics with 15+ years in financial systems",
    certifications: ["CFA", "Quantum Computing Specialist"],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    specialty: "Blockchain & DeFi",
    expertise: ["Smart Contracts", "DeFi Protocols", "Cross-Chain Integration"],
    rating: 4.8,
    consultations: 287,
    successRate: 95.2,
    bio: "Expert in blockchain architecture and DeFi optimization",
    certifications: ["Ethereum Developer", "DeFi Architect"],
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    specialty: "Compliance & Regulation",
    expertise: ["ISO 20022", "Regulatory Frameworks", "Audit Trails"],
    rating: 4.7,
    consultations: 198,
    successRate: 98.1,
    bio: "Compliance officer with expertise in financial regulations",
    certifications: ["Compliance Officer", "ISO 20022 Expert"],
  },
  {
    id: "4",
    name: "James Liu",
    specialty: "Network Architecture",
    expertise: ["Corda Framework", "Network Design", "Performance Optimization"],
    rating: 4.6,
    consultations: 156,
    successRate: 94.5,
    bio: "Enterprise network architect specializing in distributed systems",
    certifications: ["Corda Developer", "Network Architect"],
  },
]

export function SMEExpertRegistry() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null)

  const filteredExperts = MOCK_EXPERTS.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesExpertise = !selectedExpertise || expert.expertise.includes(selectedExpertise)
    return matchesSearch && matchesExpertise
  })

  const allExpertise = Array.from(new Set(MOCK_EXPERTS.flatMap((e) => e.expertise)))

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Expert Registry
          </CardTitle>
          <CardDescription>Find and consult with subject matter experts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search experts by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Expert
            </Button>
          </div>

          {/* Expertise Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedExpertise === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedExpertise(null)}
            >
              All Expertise
            </Button>
            {allExpertise.map((expertise) => (
              <Button
                key={expertise}
                variant={selectedExpertise === expertise ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedExpertise(expertise)}
              >
                {expertise}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredExperts.map((expert) => (
          <Card key={expert.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={expert.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {expert.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{expert.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{expert.bio}</p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-2">
                {expert.expertise.map((exp) => (
                  <Badge key={exp} variant="secondary" className="text-xs">
                    {exp}
                  </Badge>
                ))}
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2">
                {expert.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Consultations</p>
                  <p className="font-semibold">{expert.consultations}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="font-semibold text-green-600">{expert.successRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <p className="font-semibold">{expert.rating}/5</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Consult
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExperts.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-muted-foreground">No experts found matching your criteria</p>
        </Card>
      )}
    </div>
  )
}
