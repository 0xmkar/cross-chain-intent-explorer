"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import { IntentTimeline } from "@/components/intent-timeline"
import { IntentDetails } from "@/components/intent-details"
import { LifecycleStatus } from "@/components/lifecycle-status"
import { TransactionDetails } from "@/components/transaction-details"
import { fetchIntentData } from "@/lib/intent-api"
import type { IntentData } from "@/lib/types"

export default function IntentPage() {
  const params = useParams()
  const router = useRouter()
  const intentId = params.intentId as string

  const [data, setData] = useState<IntentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadIntent = async () => {
      try {
        setLoading(true)
        setError(null)
        const intentData = await fetchIntentData(intentId)
        setData(intentData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load intent data")
      } finally {
        setLoading(false)
      }
    }

    loadIntent()
  }, [intentId])

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Intent Details</h1>
              <p className="text-sm text-muted-foreground font-mono">{intentId}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading intent data...</p>
            </div>
          </div>
        ) : error ? (
          <Card className="p-8 border-destructive/50 bg-destructive/5">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Error Loading Intent</h3>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                  Go Back
                </Button>
              </div>
            </div>
          </Card>
        ) : data ? (
          <div className="space-y-8">
            <LifecycleStatus data={data} />

            {/* Timeline */}
            <IntentTimeline data={data} />

            <TransactionDetails data={data} />

            {/* Details */}
            <IntentDetails data={data} />
          </div>
        ) : null}
      </div>
    </main>
  )
}
