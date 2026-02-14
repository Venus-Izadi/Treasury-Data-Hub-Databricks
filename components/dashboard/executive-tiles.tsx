"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { TrendingUp, TrendingDown, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import { OverviewCharts } from "./overview-charts"

/* -------------------------------------------------- */
/*  Shared sub-components                             */
/* -------------------------------------------------- */

function MetricCard({
  borderColor,
  children,
}: {
  borderColor: string
  children: React.ReactNode
}) {
  return (
    <div
      className="bg-card rounded-lg border border-border overflow-hidden"
      style={{ borderTop: `3px solid ${borderColor}` }}
    >
      <div className="p-5">{children}</div>
    </div>
  )
}

function ChangeIndicator({
  value,
  suffix = "vs prior",
  positive,
}: {
  value: string
  suffix?: string
  positive: boolean
}) {
  return (
    <div
      className={`flex items-center gap-1 text-xs mt-2 ${
        positive ? "text-status-green" : "text-status-red"
      }`}
    >
      {positive ? (
        <TrendingUp className="w-3.5 h-3.5" />
      ) : (
        <TrendingDown className="w-3.5 h-3.5" />
      )}
      <span>
        {value} {suffix}
      </span>
    </div>
  )
}

function MiniTooltip({ active, payload, label, unit }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string; unit?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-foreground text-card text-xs rounded-md px-2.5 py-1.5 shadow-lg">
      <p className="font-medium mb-0.5">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: {unit}{entry.value.toFixed(2)}
        </p>
      ))}
    </div>
  )
}

/* -------------------------------------------------- */
/*  Tile 1 - Federal Reserve                          */
/* -------------------------------------------------- */

const fedData = [
  { time: "8AM", actual: 2.2, forecast: 2.2 },
  { time: "10AM", actual: 2.35, forecast: 2.3 },
  { time: "12PM", actual: 2.45, forecast: 2.38 },
  { time: "2PM", actual: 2.4, forecast: 2.42 },
  { time: "4PM", actual: 2.48, forecast: 2.5 },
  { time: "EOD", actual: 2.52, forecast: 2.52 },
]

function FedReserveTile() {
  return (
    <MetricCard borderColor="hsl(152,55%,41%)">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Fed Reserve Balance
      </div>
      <div className="flex items-baseline gap-1.5 mt-1.5">
        <span className="text-3xl font-bold text-foreground">$2.45</span>
        <span className="text-lg text-muted-foreground font-medium">B</span>
      </div>
      <ChangeIndicator value="+$250M" suffix="from open" positive />
      <div className="h-14 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={fedData}>
            <YAxis domain={[2, 2.6]} hide />
            <XAxis dataKey="time" hide />
            <Tooltip content={<MiniTooltip unit="$" />} />
            <Line dataKey="actual" name="Actual" stroke="hsl(152,55%,41%)" strokeWidth={2} dot={false} />
            <Line dataKey="forecast" name="Forecast" stroke="hsl(217,91%,60%)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  )
}

/* -------------------------------------------------- */
/*  Tile 2 - Consolidated Cash                        */
/* -------------------------------------------------- */

function ConsolidatedCashTile() {
  return (
    <MetricCard borderColor="hsl(152,55%,41%)">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Consolidated Cash
      </div>
      <div className="flex items-baseline gap-1.5 mt-1.5">
        <span className="text-3xl font-bold text-foreground">$8.72</span>
        <span className="text-lg text-muted-foreground font-medium">B</span>
      </div>
      <ChangeIndicator value="+1.2%" suffix="DoD" positive />
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Fed Account</span>
          <span className="font-medium text-foreground">$2.45B</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Operating</span>
          <span className="font-medium text-foreground">$1.85B</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Correspondent</span>
          <span className="font-medium text-foreground">$2.12B</span>
        </div>
      </div>
    </MetricCard>
  )
}

/* -------------------------------------------------- */
/*  Tile 3 - Regulatory Headroom                      */
/* -------------------------------------------------- */

function RegulatoryTile() {
  return (
    <MetricCard borderColor="hsl(25,95%,53%)">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Regulatory Headroom
      </div>
      <div className="flex items-center gap-4 mt-3">
        {[
          { label: "LCR", value: "127%", ok: true },
          { label: "NSFR", value: "115%", ok: true },
          { label: "ILST", value: "30d", ok: true },
        ].map((item) => (
          <div key={item.label} className="text-center flex-1">
            <div className="text-xs font-medium text-muted-foreground uppercase">
              {item.label}
            </div>
            <div className="text-xl font-bold text-foreground mt-0.5">{item.value}</div>
            <div
              className={`w-2 h-2 rounded-full mx-auto mt-1.5 ${
                item.ok ? "bg-status-green" : "bg-status-yellow"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">LCR Surplus</span>
          <span className="font-medium text-status-green">+$1.2B</span>
        </div>
        <div className="flex justify-between text-sm mt-1.5">
          <span className="text-muted-foreground">Total HQLA</span>
          <span className="font-medium text-foreground">$4.8B</span>
        </div>
      </div>
    </MetricCard>
  )
}

/* -------------------------------------------------- */
/*  Tile 4 - Core Deposits                            */
/* -------------------------------------------------- */

const depositData = [
  { week: "W-4", value: 43.2 },
  { week: "W-3", value: 43.0 },
  { week: "W-2", value: 42.8 },
  { week: "W-1", value: 42.6 },
  { week: "Now", value: 42.5 },
]

function CoreDepositsTile() {
  return (
    <MetricCard borderColor="hsl(25,95%,53%)">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Core Deposits
      </div>
      <div className="flex items-baseline gap-1.5 mt-1.5">
        <span className="text-3xl font-bold text-foreground">$42.5</span>
        <span className="text-lg text-muted-foreground font-medium">B</span>
      </div>
      <ChangeIndicator value="-0.8%" suffix="WoW" positive={false} />
      <div className="h-14 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={depositData}>
            <XAxis dataKey="week" hide />
            <YAxis domain={[42, 43.5]} hide />
            <Tooltip content={<MiniTooltip unit="$" />} />
            <Area
              dataKey="value"
              name="Deposits"
              stroke="hsl(25,95%,53%)"
              fill="hsl(25,95%,53%)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  )
}

/* -------------------------------------------------- */
/*  Tile 5 - Active Alerts (with drill-down)          */
/* -------------------------------------------------- */

const allAlerts = [
  { label: "Fed Position Review", severity: "critical" as const, detail: "Balance approaching minimum threshold at 3PM cutoff", value: "Review 3PM" },
  { label: "Uninsured Deposit Spike", severity: "critical" as const, detail: "Uninsured deposits increased $500M, nearing 35% policy limit", value: "+$500M" },
  { label: "CD Maturities Cluster", severity: "warning" as const, detail: "$200M in CDs maturing within next 7 days", value: "$200M 7d" },
  { label: "Brokered Deposit Concentration", severity: "warning" as const, detail: "Brokered deposits now 9.9% of total, policy limit 10%", value: "9.9%" },
  { label: "FHLB Advance Maturing", severity: "info" as const, detail: "$150M FHLB advance maturing in 5 business days", value: "$150M 5d" },
]

const severityStyles = {
  critical: { dot: "bg-status-red", text: "text-status-red", badge: "bg-status-red/10 text-status-red border-status-red/20" },
  warning: { dot: "bg-status-yellow", text: "text-status-yellow", badge: "bg-status-yellow/10 text-status-yellow border-status-yellow/20" },
  info: { dot: "bg-status-blue", text: "text-status-blue", badge: "bg-status-blue/10 text-status-blue border-status-blue/20" },
}

function AlertsTile() {
  const [expanded, setExpanded] = useState(false)
  const displayAlerts = expanded ? allAlerts : allAlerts.slice(0, 3)

  return (
    <MetricCard borderColor="hsl(0,84%,60%)">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Active Alerts
      </div>
      <div className="flex items-baseline gap-1.5 mt-1.5">
        <span className="text-3xl font-bold text-foreground">{allAlerts.length}</span>
      </div>
      <div className="flex items-center gap-2 text-xs mt-2 text-muted-foreground">
        <AlertTriangle className="w-3.5 h-3.5 text-status-red" />
        <span>2 Critical, 2 Warning, 1 Info</span>
      </div>
      <div className="mt-4 space-y-0">
        {displayAlerts.map((alert, i) => {
          const style = severityStyles[alert.severity]
          return (
            <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-border/60 last:border-b-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${style.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-foreground truncate">{alert.label}</span>
                  <span className={`text-xs font-semibold shrink-0 ${style.text}`}>{alert.value}</span>
                </div>
                {expanded && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{alert.detail}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-primary font-medium mt-3 hover:underline"
      >
        {expanded ? (
          <>Show less <ChevronUp className="w-3 h-3" /></>
        ) : (
          <>View all {allAlerts.length} alerts <ChevronDown className="w-3 h-3" /></>
        )}
      </button>
    </MetricCard>
  )
}

/* -------------------------------------------------- */
/*  Insights Section                                  */
/* -------------------------------------------------- */

const insights = [
  {
    badge: "LCR 127%",
    badgeColor: "bg-status-green/10 text-status-green border border-status-green/20",
    text: "Well above the 100% regulatory minimum. Strong liquidity cushion.",
  },
  {
    badge: "NSFR 115%",
    badgeColor: "bg-status-blue/10 text-status-blue border border-status-blue/20",
    text: "Conservative lending relative to deposits. Low funding risk.",
  },
  {
    badge: "ILST 30d",
    badgeColor: "bg-status-yellow/10 text-status-yellow border border-status-yellow/20",
    icon: true,
    text: "Meets requirements but limited buffer. Monitor closely.",
  },
]

function InsightsSection() {
  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <h3 className="text-sm font-semibold text-foreground">Insights</h3>
        </div>
        <span className="text-xs text-muted-foreground">Auto-generated</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <div key={insight.badge} className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${insight.badgeColor}`}>
                {insight.badge}
              </span>
              {insight.icon && <AlertTriangle className="w-3.5 h-3.5 text-status-yellow" />}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------- */
/*  Executive Tiles Section (3 + 2 grid)              */
/* -------------------------------------------------- */

export function ExecutiveTiles() {
  return (
    <section aria-label="Executive Metrics" className="space-y-5">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">Treasury Overview</h2>
        <span className="bg-muted text-muted-foreground px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wide">
          Last 2 Days
        </span>
      </div>

      {/* Row 1: 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FedReserveTile />
        <ConsolidatedCashTile />
        <RegulatoryTile />
      </div>

      {/* Row 2: 2 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CoreDepositsTile />
        <AlertsTile />
      </div>

      <InsightsSection />

      <OverviewCharts />
    </section>
  )
}
