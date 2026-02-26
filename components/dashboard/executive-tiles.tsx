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
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Bell,
  CheckCircle2,
  Eye,
  AlertCircle,
} from "lucide-react"
import type { DashboardData, AlertSeverity, InsightItem, InsightSeverity, InsightStatus } from "@/lib/types/dashboard"

/* -------------------------------------------------- */
/*  Props Interface                                   */
/* -------------------------------------------------- */

interface ExecutiveTilesProps {
  data?: DashboardData
  onNavigateToConversation?: () => void
}

/* -------------------------------------------------- */
/*  Shared sub-components                             */
/* -------------------------------------------------- */

function MetricCard({
  borderColor,
  children,
  title,
  onAskAI,
}: {
  borderColor: string
  children: React.ReactNode
  title: string
  onAskAI?: () => void
}) {
  return (
    <div
      className="bg-card rounded-lg border border-border overflow-hidden"
      style={{ borderTop: `3px solid ${borderColor}` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </div>
          {onAskAI && (
            <button
              onClick={onAskAI}
              title={`Ask AI about ${title}`}
              className="shrink-0 p-1 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {children}
      </div>
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

function MiniTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
  unit?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-foreground text-card text-xs rounded-md px-2.5 py-1.5 shadow-lg">
      <p className="font-medium mb-0.5">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: {unit}
          {entry.value.toFixed(2)}
        </p>
      ))}
    </div>
  )
}

/* -------------------------------------------------- */
/*  Tile 1 - Federal Reserve                          */
/* -------------------------------------------------- */

function FedReserveTile({
  data,
  onAskAI,
}: {
  data: DashboardData["fedReserve"]
  onAskAI?: () => void
}) {
  return (
    <MetricCard borderColor="hsl(152,55%,41%)" title="Fed Reserve Balance" onAskAI={onAskAI}>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-foreground">${data.currentBalance.toFixed(2)}</span>
        <span className="text-lg text-muted-foreground font-medium">B</span>
      </div>
      <ChangeIndicator value={`+$${data.changeFromOpen.toFixed(0)}M`} suffix="from open" positive />
      <div className="h-20 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.trend} margin={{ bottom: 2, left: 4, right: 4 }}>
            <YAxis domain={[2, 2.6]} tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} width={30} tickFormatter={(v: number) => `$${v}B`} />
            <XAxis dataKey="time" tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} />
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

function ConsolidatedCashTile({
  data,
  onAskAI,
}: {
  data: DashboardData["consolidatedCash"]
  onAskAI?: () => void
}) {
  return (
    <MetricCard borderColor="hsl(152,55%,41%)" title="Consolidated Cash" onAskAI={onAskAI}>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-foreground">${data.total.toFixed(2)}</span>
        <span className="text-lg text-muted-foreground font-medium">B</span>
      </div>
      <ChangeIndicator value={`+${data.changePercent.toFixed(1)}%`} suffix="DoD" positive />
      <div className="mt-4 space-y-2">
        {data.breakdown.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium text-foreground">${item.value.toFixed(2)}B</span>
          </div>
        ))}
      </div>
    </MetricCard>
  )
}

/* -------------------------------------------------- */
/*  Tile 3 - Regulatory Headroom                      */
/* -------------------------------------------------- */

function RegulatoryTile({
  data,
  onAskAI,
}: {
  data: DashboardData["regulatory"]
  onAskAI?: () => void
}) {
  return (
    <MetricCard borderColor="hsl(25,95%,53%)" title="Regulatory Headroom" onAskAI={onAskAI}>
      <div className="flex items-center gap-4 mt-1">
        {data.metrics.map((item) => (
          <div key={item.label} className="text-center flex-1">
            <div className="text-xs font-medium text-muted-foreground uppercase">{item.label}</div>
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
          <span className="font-medium text-status-green">+${data.lcrSurplus.toFixed(1)}B</span>
        </div>
        <div className="flex justify-between text-sm mt-1.5">
          <span className="text-muted-foreground">Total HQLA</span>
          <span className="font-medium text-foreground">${data.totalHQLA.toFixed(1)}B</span>
        </div>
      </div>
    </MetricCard>
  )
}

/* -------------------------------------------------- */
/*  Tile 4 - Core Deposits                            */
/* -------------------------------------------------- */

function CoreDepositsTile({
  data,
  onAskAI,
}: {
  data: DashboardData["coreDeposits"]
  onAskAI?: () => void
}) {
  return (
    <MetricCard borderColor="hsl(25,95%,53%)" title="Core Deposits" onAskAI={onAskAI}>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-foreground">${data.total.toFixed(1)}</span>
        <span className="text-lg text-muted-foreground font-medium">B</span>
      </div>
      <ChangeIndicator value={`${data.changePercent}%`} suffix="WoW" positive={data.changePercent > 0} />
      <div className="h-20 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.trend} margin={{ bottom: 2, left: 4, right: 4 }}>
            <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis domain={[42, 43.5]} tick={{ fill: "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false} width={34} tickFormatter={(v: number) => `$${v}B`} />
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

const severityStyles: Record<AlertSeverity, { dot: string; text: string; badge: string }> = {
  critical: { dot: "bg-status-red", text: "text-status-red", badge: "bg-status-red/10 text-status-red border-status-red/20" },
  warning: { dot: "bg-status-yellow", text: "text-status-yellow", badge: "bg-status-yellow/10 text-status-yellow border-status-yellow/20" },
  info: { dot: "bg-status-blue", text: "text-status-blue", badge: "bg-status-blue/10 text-status-blue border-status-blue/20" },
}

function AlertsTile({
  data,
  onAskAI,
}: {
  data: DashboardData["alerts"]
  onAskAI?: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const displayAlerts = expanded ? data.alerts : data.alerts.slice(0, 3)

  return (
    <MetricCard borderColor="hsl(0,84%,60%)" title="Active Alerts" onAskAI={onAskAI}>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-foreground">{data.alerts.length}</span>
      </div>
      <div className="flex items-center gap-2 text-xs mt-2 text-muted-foreground">
        <AlertTriangle className="w-3.5 h-3.5 text-status-red" />
        <span>{data.criticalCount} Critical, {data.warningCount} Warning, {data.infoCount} Info</span>
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
          <>
            Show less <ChevronUp className="w-3 h-3" />
          </>
        ) : (
          <>
            View all {data.alerts.length} alerts <ChevronDown className="w-3 h-3" />
          </>
        )}
      </button>
    </MetricCard>
  )
}

/* -------------------------------------------------- */
/*  Insights Section - compact color-coded list       */
/* -------------------------------------------------- */

const severityConfig: Record<InsightSeverity, { border: string; bg: string; badgeBg: string; badgeText: string; dotColor: string }> = {
  green: { border: "border-l-status-green", bg: "hover:bg-status-green/5", badgeBg: "bg-status-green/10", badgeText: "text-status-green", dotColor: "bg-status-green" },
  blue: { border: "border-l-status-blue", bg: "hover:bg-status-blue/5", badgeBg: "bg-status-blue/10", badgeText: "text-status-blue", dotColor: "bg-status-blue" },
  yellow: { border: "border-l-status-yellow", bg: "hover:bg-status-yellow/5", badgeBg: "bg-status-yellow/10", badgeText: "text-status-yellow", dotColor: "bg-status-yellow" },
  red: { border: "border-l-status-red", bg: "hover:bg-status-red/5", badgeBg: "bg-status-red/10", badgeText: "text-status-red", dotColor: "bg-status-red" },
}

const statusConfig: Record<InsightStatus, { icon: React.ElementType; color: string }> = {
  "Acknowledged": { icon: CheckCircle2, color: "text-status-green" },
  "Under Review": { icon: Eye, color: "text-status-blue" },
  "Action Required": { icon: AlertCircle, color: "text-status-yellow" },
  "Escalated": { icon: AlertTriangle, color: "text-status-red" },
}

function InsightsSection({ data }: { data: DashboardData["insights"] }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? data.items : data.items.slice(0, 5)

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-border gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Insights & Alerts</h3>
          </div>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
            {data.items.length}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {data.countByStatus.escalated > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-status-red">
              <span className="w-1.5 h-1.5 rounded-full bg-status-red" />
              {data.countByStatus.escalated} Escalated
            </span>
          )}
          {data.countByStatus.actionRequired > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-status-yellow">
              <span className="w-1.5 h-1.5 rounded-full bg-status-yellow" />
              {data.countByStatus.actionRequired} Action Required
            </span>
          )}
          {data.countByStatus.underReview > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-status-blue">
              <span className="w-1.5 h-1.5 rounded-full bg-status-blue" />
              {data.countByStatus.underReview} Review
            </span>
          )}
        </div>
      </div>

      {/* Alert rows */}
      <div className="divide-y divide-border">
        {displayed.map((insight, idx) => {
          const sev = severityConfig[insight.severity]
          const isExpanded = expandedIdx === idx
          const StatusIcon = statusConfig[insight.status].icon

          return (
            <div key={insight.id}>
              <button
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                className={`w-full text-left flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 border-l-[3px] transition-colors ${sev.border} ${sev.bg} ${isExpanded ? "bg-muted/50" : ""}`}
              >
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${sev.badgeBg} ${sev.badgeText} whitespace-nowrap`}>
                  {insight.badge}
                </span>
                <p className="text-sm text-foreground flex-1 truncate">{insight.text}</p>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                    <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[insight.status].color}`} />
                    {insight.status}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>
              </button>

              {isExpanded && (
                <div className={`px-4 md:px-5 py-3.5 border-l-[3px] bg-muted/30 ${sev.border}`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Portfolio</span>
                      <p className="text-sm font-medium text-foreground mt-0.5">{insight.portfolio}</p>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Status</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[insight.status].color}`} />
                        <p className={`text-sm font-medium ${statusConfig[insight.status].color}`}>{insight.status}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Notify / Review</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {insight.assignees.map((group) => (
                          <span key={group} className="text-[11px] font-medium bg-card border border-border text-foreground px-2 py-0.5 rounded-full">
                            {group}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Show more/less */}
      {data.items.length > 5 && (
        <div className="px-5 py-3 border-t border-border">
          <button
            onClick={() => { setShowAll(!showAll); setExpandedIdx(null) }}
            className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
          >
            {showAll ? (
              <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>View all {data.items.length} alerts <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------- */
/*  Executive Tiles Section                           */
/* -------------------------------------------------- */

export function ExecutiveTiles({ data, onNavigateToConversation }: ExecutiveTilesProps) {
  // Default data for when data is not yet loaded
  if (!data) return null

  return (
    <section aria-label="Executive Metrics" className="space-y-5">
      {/* Insights first */}
      <InsightsSection data={data.insights} />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <h2 className="text-base font-semibold text-foreground">Treasury Overview</h2>
        {onNavigateToConversation && (
          <button
            onClick={onNavigateToConversation}
            title="Ask AI about these metrics"
            className="sm:ml-auto flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors w-fit"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Ask AI
          </button>
        )}
      </div>

      {/* Row 1: 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FedReserveTile data={data.fedReserve} onAskAI={onNavigateToConversation} />
        <ConsolidatedCashTile data={data.consolidatedCash} onAskAI={onNavigateToConversation} />
        <CoreDepositsTile data={data.coreDeposits} onAskAI={onNavigateToConversation} />
      </div>

      {/* Row 2: 2 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RegulatoryTile data={data.regulatory} onAskAI={onNavigateToConversation} />
        <AlertsTile data={data.alerts} onAskAI={onNavigateToConversation} />
      </div>
    </section>
  )
}
