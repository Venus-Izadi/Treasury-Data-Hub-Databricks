"use client"

import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

/* -------------------------------------------------- */
/*  Shared sub-components                             */
/* -------------------------------------------------- */

function TileWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-[#1a2744] to-[#0f1a2e] rounded-lg border border-foreground/[0.08] overflow-hidden">
      {children}
    </div>
  )
}

function TileHeader({
  icon,
  iconClass,
  title,
}: {
  icon: string
  iconClass: string
  title: string
}) {
  return (
    <div className="px-4 py-3 flex items-center justify-between border-b border-foreground/[0.05]">
      <div className="flex items-center gap-2.5">
        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center text-[13px] font-bold text-primary-foreground ${iconClass}`}
        >
          {icon}
        </div>
        <span className="text-[13px] text-muted-foreground uppercase tracking-wide font-semibold">
          {title}
        </span>
      </div>
      <button className="text-[11px] text-[#a78bfa] bg-[rgba(139,92,246,0.15)] px-2.5 py-1.5 rounded uppercase font-semibold hover:bg-[rgba(139,92,246,0.25)] transition-colors">
        Ask Genie
      </button>
    </div>
  )
}

function MetricRow({
  label,
  value,
  valueClass,
  badge,
}: {
  label: string
  value?: string
  valueClass?: string
  badge?: { text: string; variant: "green" | "yellow" | "red" }
}) {
  const badgeStyles = {
    green: "bg-[#166534] text-[#86efac]",
    yellow: "bg-[#854d0e] text-[#fde047]",
    red: "bg-[#7f1d1d] text-[#fca5a5]",
  }

  return (
    <div className="flex justify-between items-center mb-2 last:mb-0">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      {badge ? (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold uppercase ${badgeStyles[badge.variant]}`}
        >
          {badge.text}
        </span>
      ) : (
        <span className={`text-[13px] font-medium text-foreground ${valueClass ?? ""}`}>
          {value}
        </span>
      )}
    </div>
  )
}

/* -------------------------------------------------- */
/*  Tile 1 - Federal Reserve                          */
/* -------------------------------------------------- */

const fedData = [
  { time: "8AM", actual: 2.2, forecast: 2.2, comfort: 0.5 },
  { time: "10AM", actual: 2.35, forecast: 2.3, comfort: 0.5 },
  { time: "12PM", actual: 2.45, forecast: 2.38, comfort: 0.5 },
  { time: "2PM", actual: 2.4, forecast: 2.42, comfort: 0.5 },
  { time: "4PM", actual: 2.48, forecast: 2.5, comfort: 0.5 },
  { time: "EOD", actual: 2.52, forecast: 2.52, comfort: 0.5 },
]

function FedReserveTile() {
  return (
    <TileWrapper>
      <TileHeader icon="FED" iconClass="bg-gradient-to-br from-[#1e40af] to-[#1e3a8a]" title="Federal Reserve" />
      <div className="px-4 py-3.5">
        <div className="text-[32px] font-bold text-primary-foreground leading-none">$2.45B</div>
        <div className="text-[13px] text-muted-foreground mt-1 uppercase">Current Balance</div>
        <div className="inline-flex items-center gap-1 text-[13px] mt-1.5 px-2.5 py-1 rounded bg-status-green/15 text-status-green">
          +$250M from open
        </div>
        <div className="h-20 mt-2.5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fedData}>
              <YAxis domain={[0, 3]} hide />
              <XAxis dataKey="time" hide />
              <Area dataKey="comfort" stroke="rgba(239,68,68,0.5)" fill="rgba(239,68,68,0.1)" strokeWidth={1} />
              <Line dataKey="actual" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line dataKey="forecast" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 pt-3 border-t border-foreground/[0.05]">
          <MetricRow label="Projected EOD" value="$2.52B" />
          <MetricRow label="Daylight OD Cap" value="$500M" />
          <MetricRow label="Status" badge={{ text: "Comfort Zone", variant: "green" }} />
        </div>
      </div>
    </TileWrapper>
  )
}

/* -------------------------------------------------- */
/*  Tile 2 - Consolidated Cash                        */
/* -------------------------------------------------- */

function ConsolidatedCashTile() {
  return (
    <TileWrapper>
      <TileHeader icon="$" iconClass="bg-gradient-to-br from-[#166534] to-[#14532d]" title="Consolidated Cash" />
      <div className="px-4 py-3.5">
        <div className="text-[32px] font-bold text-primary-foreground leading-none">$8.72B</div>
        <div className="text-[13px] text-muted-foreground mt-1 uppercase">Total USD Equiv.</div>
        <div className="inline-flex items-center gap-1 text-[13px] mt-1.5 px-2.5 py-1 rounded bg-status-green/15 text-status-green">
          +1.2% DoD
        </div>
        <div className="mt-3 pt-3 border-t border-foreground/[0.05]">
          <MetricRow label="Fed Account" value="$2.45B" />
          <MetricRow label="Operating Accts" value="$1.85B" />
          <MetricRow label="Correspondent" value="$2.12B" />
          <MetricRow label="Sweep Accounts" value="$2.30B" />
        </div>
      </div>
    </TileWrapper>
  )
}

/* -------------------------------------------------- */
/*  Tile 3 - Regulatory Headroom                      */
/* -------------------------------------------------- */

function TrafficLight({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: "green" | "yellow"
}) {
  const indicatorStyle = color === "green"
    ? "bg-status-green shadow-[0_0_8px_hsl(var(--status-green))]"
    : "bg-status-yellow shadow-[0_0_8px_hsl(var(--status-yellow))]"
  const textColor = color === "green" ? "text-status-green" : "text-status-yellow"

  return (
    <div className="flex-1 bg-black/25 rounded-md p-2.5 text-center">
      <div className="text-xs text-muted-foreground mb-1 uppercase font-semibold">{label}</div>
      <div className={`text-xl font-bold ${textColor}`}>
        <span className={`w-2.5 h-2.5 rounded-full inline-block mr-1 ${indicatorStyle}`} />
        {value}
      </div>
    </div>
  )
}

function RegulatoryTile() {
  return (
    <TileWrapper>
      <TileHeader icon="REG" iconClass="bg-gradient-to-br from-[#9a3412] to-[#7c2d12]" title="Regulatory" />
      <div className="px-4 py-3.5">
        <div className="flex gap-2.5 mt-2">
          <TrafficLight label="LCR" value="127%" color="green" />
          <TrafficLight label="NSFR" value="115%" color="green" />
          <TrafficLight label="ILST" value="30d" color="green" />
        </div>
        <div className="mt-3 pt-3 border-t border-foreground/[0.05]">
          <MetricRow label="LCR Surplus" value="+$1.2B" valueClass="text-status-green" />
          <MetricRow label="Total HQLA" value="$4.8B" />
          <MetricRow label="Net Cash Outflow" value="$3.78B" />
        </div>
      </div>
    </TileWrapper>
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
    <TileWrapper>
      <TileHeader icon="DEP" iconClass="bg-gradient-to-br from-[#5b21b6] to-[#4c1d95]" title="Core Deposits" />
      <div className="px-4 py-3.5">
        <div className="text-[32px] font-bold text-primary-foreground leading-none">$42.5B</div>
        <div className="text-[13px] text-muted-foreground mt-1 uppercase">Total Deposit Base</div>
        <div className="inline-flex items-center gap-1 text-[13px] mt-1.5 px-2.5 py-1 rounded bg-status-red/15 text-status-red">
          -0.8% WoW
        </div>
        <div className="h-20 mt-2.5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={depositData}>
              <XAxis dataKey="week" hide />
              <YAxis hide />
              <Area dataKey="value" stroke="#ef4444" fill="rgba(239,68,68,0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 pt-3 border-t border-foreground/[0.05]">
          <MetricRow label="Uninsured %" badge={{ text: "32%", variant: "yellow" }} />
          <MetricRow label="Retail / Wholesale" value="68% / 32%" />
          <MetricRow label="Cost of Funds" value="3.85%" />
        </div>
      </div>
    </TileWrapper>
  )
}

/* -------------------------------------------------- */
/*  Tile 5 - Active Alerts                            */
/* -------------------------------------------------- */

function AlertCountItem({
  num,
  label,
  color,
}: {
  num: number
  label: string
  color: "critical" | "warning" | "info"
}) {
  const textColor = {
    critical: "text-status-red",
    warning: "text-status-yellow",
    info: "text-status-blue",
  }

  return (
    <div className="text-center">
      <div className={`text-[28px] font-bold ${textColor[color]}`}>{num}</div>
      <div className="text-xs text-muted-foreground uppercase font-semibold">{label}</div>
    </div>
  )
}

function AlertsTile() {
  return (
    <TileWrapper>
      <TileHeader icon="!" iconClass="bg-gradient-to-br from-[#991b1b] to-[#7f1d1d]" title="Active Alerts" />
      <div className="px-4 py-3.5">
        <div className="flex gap-5 mb-3">
          <AlertCountItem num={2} label="Critical" color="critical" />
          <AlertCountItem num={2} label="Warning" color="warning" />
          <AlertCountItem num={1} label="Info" color="info" />
        </div>
        <div className="mt-3 pt-3 border-t border-foreground/[0.05]">
          <MetricRow label="Fed Position" value="Review 3PM" valueClass="text-status-red" />
          <MetricRow label="Uninsured Spike" value="+$500M" valueClass="text-status-red" />
          <MetricRow label="CD Maturities" value="$200M 7d" valueClass="text-status-yellow" />
          <MetricRow label="Sweep Available" value="$450M" valueClass="text-status-green" />
        </div>
      </div>
    </TileWrapper>
  )
}

/* -------------------------------------------------- */
/*  Executive Tiles Section                           */
/* -------------------------------------------------- */

export function ExecutiveTiles() {
  return (
    <section className="mb-5" aria-label="Executive Metrics">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 bg-accent rounded flex items-center justify-center text-accent-foreground font-bold text-base">
          E
        </div>
        <h2 className="text-lg font-semibold text-primary-foreground">Executive Metrics</h2>
        <span className="bg-[rgba(91,33,182,0.2)] text-[#a78bfa] px-2.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wide">
          5 Genie-Enabled Tiles
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        <FedReserveTile />
        <ConsolidatedCashTile />
        <RegulatoryTile />
        <CoreDepositsTile />
        <AlertsTile />
      </div>
    </section>
  )
}
