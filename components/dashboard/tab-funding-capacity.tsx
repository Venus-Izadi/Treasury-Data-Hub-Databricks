"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import {
  PanelCard,
  PanelCardTitle,
  DataRow,
  TotalRow,
  FundingBar,
} from "./panel-components"
import { ChartTooltip } from "./chart-tooltip"
import { Clock } from "lucide-react"
import type { Timeframe } from "./header"

// Props interface - timeframe passed for future backend integration
interface FundingCapacityTabProps {
  timeframe?: Timeframe
}

/* -------------------------------------------------- */
/*  Chart data                                        */
/* -------------------------------------------------- */

const ilstData = [
  { day: "Day 1", base: 8.7, stress: 8.7, threshold: 3.0 },
  { day: "Day 2", base: 8.5, stress: 7.8, threshold: 3.0 },
  { day: "Day 3", base: 8.4, stress: 7.0, threshold: 3.0 },
  { day: "Day 4", base: 8.2, stress: 6.2, threshold: 3.0 },
  { day: "Day 5", base: 8.1, stress: 5.5, threshold: 3.0 },
  { day: "Day 6", base: 8.0, stress: 4.9, threshold: 3.0 },
  { day: "Day 7", base: 7.9, stress: 4.4, threshold: 3.0 },
]

/* -------------------------------------------------- */
/*  Actions Panel                                     */
/* -------------------------------------------------- */

const actions = [
  {
    iconBg: "bg-status-yellow/10",
    iconColor: "text-status-yellow",
    icon: "$",
    text: "Adjust deposit pricing strategy - uninsured deposits at 32% approaching 35% policy limit",
    trigger: "Trigger: Uninsured % or concentration exceeds internal policy limits",
  },
  {
    iconBg: "bg-status-green/10",
    iconColor: "text-status-green",
    icon: "H",
    text: "Consider HQLA sales or short-term FHLB advance - ILST projections show tighter liquidity in 5-7 days under stress",
    trigger: "Trigger: ILST projections show tight liquidity within 5-7 day horizon",
  },
  {
    iconBg: "bg-status-blue/10",
    iconColor: "text-status-blue",
    icon: "F",
    text: "Monitor loan pipeline and adjust funding mix - consider term FHLB funding instead of growing rate-sensitive deposits",
    trigger: "Trigger: Loan pipeline growth with deposit outflows or rising cost of funds",
  },
]

/* -------------------------------------------------- */
/*  Component                                         */
/* -------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FundingCapacityTab({ timeframe = "2d" }: FundingCapacityTabProps) {
  // timeframe will be used when connecting to backend API
  return (
    <div className="space-y-5">
      {/* Row 1: Wholesale Funding Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <PanelCard>
          <PanelCardTitle icon="FH" iconColor="green">
            FHLB Advances
          </PanelCardTitle>
          <DataRow label="Current Advances" value="$1.25B" />
          <DataRow label="Collateral Pledged" value="$2.1B" />
          <DataRow label="Collateral Coverage" value="168%" />
          <DataRow label="Wtd Avg Cost" value="5.20%" />
          <DataRow label="Avg Maturity" value="45 days" />
          <TotalRow label="Available Capacity" value="$850M" valueClass="text-status-green" />
        </PanelCard>

        <PanelCard>
          <PanelCardTitle icon="DW" iconColor="blue">
            Fed Discount Window
          </PanelCardTitle>
          <DataRow label="Collateral Pledged" value="$1.8B" />
          <DataRow label="Primary Credit Rate" value="5.50%" />
          <DataRow label="Secondary Credit" value="6.00%" />
          <DataRow label="Last Accessed" value="Never" />
          <DataRow label="Readiness Status" value="Operational" valueClass="text-status-green" />
          <TotalRow label="Borrowing Capacity" value="$1.5B" valueClass="text-status-green" />
        </PanelCard>

        <PanelCard>
          <PanelCardTitle icon="RP" iconColor="purple">
            Repo & Credit Lines
          </PanelCardTitle>
          <DataRow label="Repo Capacity" value="$620M" valueClass="text-status-green" />
          <DataRow label="Repo Outstanding" value="$0" />
          <DataRow label="Correspondent Lines" value="$250M" valueClass="text-status-green" />
          <DataRow label="Uncommitted Facilities" value="$100M" />
          <TotalRow label="Total Lines" value="$970M" />
        </PanelCard>
      </div>

      {/* Row 2: Contingent Funding & ILST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PanelCard>
          <PanelCardTitle icon="CF" iconColor="gold">
            Total Contingent Funding
          </PanelCardTitle>
          <div className="mt-3">
            <FundingBar label="FHLB" value="$850M" width="26%" color="hsl(152,55%,41%)" />
            <FundingBar label="Fed DW" value="$1.5B" width="47%" color="hsl(217,91%,60%)" />
            <FundingBar label="Repo" value="$620M" width="19%" color="hsl(263,70%,50%)" />
            <FundingBar label="Credit Lines" value="$350M" width="8%" color="hsl(25,95%,53%)" />
          </div>
          <TotalRow label="Total Contingent Funding" value="$3.32B" valueClass="text-status-green" />
        </PanelCard>

        <PanelCard>
          <PanelCardTitle icon="IL" iconColor="red">
            ILST Projection (5-7 Day)
          </PanelCardTitle>
          <div className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ilstData}>
                <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Horizon", position: "insideBottom", offset: -2, style: { fill: "#94a3b8", fontSize: 10 } }} />
                <YAxis domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v}B`} label={{ value: "Liquidity ($B)", angle: -90, position: "insideLeft", offset: 10, style: { fill: "#94a3b8", fontSize: 10 } }} />
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <Tooltip content={<ChartTooltip formatter={(v) => `$${v}B`} />} />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 11, color: "#64748b" }} />
                <Line dataKey="base" name="Base Case" stroke="hsl(152,55%,41%)" strokeWidth={2} />
                <Line dataKey="stress" name="Stress Case" stroke="hsl(25,95%,53%)" strokeWidth={2} />
                <Line dataKey="threshold" name="Min Threshold" stroke="hsl(0,84%,60%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <DataRow label="Current ILST Horizon" value="30+ days" valueClass="text-status-green" />
          <DataRow label="Stress Scenario" value="18 days" valueClass="text-status-yellow" />
        </PanelCard>
      </div>

      {/* Actions Panel */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Recommended Actions
        </h3>
        <div className="space-y-0">
          {actions.map((action, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-border/60 last:border-b-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${action.iconBg} ${action.iconColor}`}>
                {action.icon}
              </div>
              <div>
                <p className="text-sm text-foreground leading-relaxed">{action.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{action.trigger}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
