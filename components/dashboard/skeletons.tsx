// ===========================================
// Skeleton Loading Components
// ===========================================
// These components display placeholder UI while data is loading.

import { cn } from "@/lib/utils"

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  )
}

// -----------------------------------------
// Metric Card Skeleton
// -----------------------------------------

export function MetricCardSkeleton({ hasChart = false }: { hasChart?: boolean }) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden" style={{ borderTop: "3px solid hsl(var(--muted))" }}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
        <Skeleton className="h-9 w-24 mb-2" />
        <Skeleton className="h-4 w-20" />
        {hasChart && (
          <div className="mt-4">
            <Skeleton className="h-20 w-full" />
          </div>
        )}
      </div>
    </div>
  )
}

// -----------------------------------------
// Regulatory Card Skeleton
// -----------------------------------------

export function RegulatoryCardSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden" style={{ borderTop: "3px solid hsl(var(--muted))" }}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
        <div className="flex items-center gap-4 mt-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-6 w-14" />
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}

// -----------------------------------------
// Alerts Card Skeleton
// -----------------------------------------

export function AlertsCardSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden" style={{ borderTop: "3px solid hsl(var(--muted))" }}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
        <Skeleton className="h-9 w-10 mb-2" />
        <Skeleton className="h-4 w-40" />
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-2.5 py-2">
              <Skeleton className="h-2 w-2 rounded-full mt-1.5" />
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// -----------------------------------------
// Insights Section Skeleton
// -----------------------------------------

export function InsightsSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="divide-y divide-border">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3 border-l-[3px] border-muted">
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
        ))}
      </div>
    </div>
  )
}

// -----------------------------------------
// Executive Tiles Skeleton (Full Dashboard)
// -----------------------------------------

export function ExecutiveTilesSkeleton() {
  return (
    <section aria-label="Loading Executive Metrics" className="space-y-5">
      <InsightsSkeleton />

      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-6 w-24 rounded-md" />
        <div className="ml-auto">
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCardSkeleton hasChart />
        <MetricCardSkeleton />
        <MetricCardSkeleton hasChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RegulatoryCardSkeleton />
        <AlertsCardSkeleton />
      </div>
    </section>
  )
}

// -----------------------------------------
// Generic Panel Skeleton
// -----------------------------------------

export function PanelSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-5">
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-5">
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  )
}
