"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, ArrowRight } from "lucide-react"

export default function Home() {
  const [intentId, setIntentId] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!intentId.trim()) return

    setLoading(true)
    router.push(`/intent/${encodeURIComponent(intentId)}`)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-foreground">Nexus Intent Explorer</span>
          </div>
          <a
            href="https://docs.availproject.org/nexus/nexus-cheatsheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
              Explore Intent Lifecycle
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Track the complete journey of your Avail Nexus intent from creation through settlement
            </p>
          </div>

          {/* Search Card */}
          <Card className="p-8 border border-border/60 bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Intent ID</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your intent ID..."
                    value={intentId}
                    onChange={(e) => setIntentId(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!intentId.trim() || loading}
                className="w-full h-12 text-base font-medium"
              >
                {loading ? "Loading..." : "Explore Intent"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/40">
              <p className="text-xs text-muted-foreground text-center">
                Enter a valid intent ID to view its complete lifecycle and transaction details
              </p>
            </div>
          </Card>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">4</div>
              <p className="text-sm text-muted-foreground">Lifecycle Stages</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Real-time</div>
              <p className="text-sm text-muted-foreground">Data Updates</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Multi-chain</div>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
