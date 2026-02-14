"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  PanelCard,
  PanelCardTitle,
  DataRow,
  TotalRow,
  FundingBar,
} from "./panel-components"
import { Clock } from "lucide-react"

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
    iconClass: "bg-[rgba(139,92,246,0.2)] text-[#a78bfa]",
    icon: "$",
    text: "Adjust deposit pricing strategy - uninsured deposits at 32% approaching 35% policy limit",
    trigger: "Trigger: Uninsured % or concentration exceeds internal policy limits",
  },
  {
    iconClass: "bg-status-green/20 text-status-green",
    icon: "H",
    text: "Consider HQLA sales or short-term FHLB advance - ILST projections show tighter liquidity in 5-7 days under stress",
    trigger: "Trigger: ILST projections show tight liquidity within 5-7 day horizon",
  },
  {
    iconClass: "bg-status-blue/20 text-status-blue",
    icon: "F",
    text: "Monitor loan pipeline and adjust funding mix - consider term FHLB funding instead of growing rate-sensitive deposits",
    trigger: "Trigger: Loan pipeline growth with deposit outflows or rising cost of funds",
  },
]

/* -------------------------------------------------- */
/*  Component                                         */
/* -------------------------------------------------- */

export function FundingCapacityTab() {
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
          <TotalRow label="Available Capacity" value="$850M" />
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
          <TotalRow label="Borrowing Capacity" value="$1.5B" />
        </PanelCard>

        <PanelCard>
          <PanelCardTitle icon="RP" iconColor="purple">
            Repo & Credit Lines
          </PanelCardTitle>
          <DataRow label="Repo Capacity" value="$620M" valueClass="text-status-green" />
          <DataRow label="Repo Outstanding" value="$0" />
          <DataRow label="Correspondent Lines" value="$250M" valueClass="text-status-green" />
          <DataRow label="Uncommitted Facilities" value="$100M" />
          <TotalRow label="Total Lines" value="$970M" valueClass="text-primary-foreground" />
        </PanelCard>
      </div>

      {/* Row 2: Contingent Funding & ILST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PanelCard>
          <PanelCardTitle icon="CF" iconColor="gold">
            Total Contingent Funding
          </PanelCardTitle>
          <div className="mt-3">
            <FundingBar
              label="FHLB"
              value="$850M"
              width="26%"
              gradient="linear-gradient(90deg,#22c55e,#16a34a)"
            />
            <FundingBar
              label="Fed DW"
              value="$1.5B"
              width="47%"
              gradient="linear-gradient(90deg,#3b82f6,#2563eb)"
            />
            <FundingBar
              label="Repo"
              value="$620M"
              width="19%"
              gradient="linear-gradient(90deg,#8b5cf6,#7c3aed)"
            />
            <FundingBar
              label="Credit Lines"
              value="$350M"
              width="8%"
              gradient="linear-gradient(90deg,#f59e0b,#d97706)"
            />
          </div>
          <TotalRow label="Total Contingent Funding" value="$3.32B" />
        </PanelCard>

        <PanelCard>
          <PanelCardTitle icon="IL" iconColor="red">
            ILST Projection (5-7 Day)
          </PanelCardTitle>
          <div className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ilstData}>
                <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
                />
                <Line dataKey="base" name="Base Case ($B)" stroke="#22c55e" strokeWidth={2} />
                <Line dataKey="stress" name="Stress Case ($B)" stroke="#f59e0b" strokeWidth={2} />
                <Line
                  dataKey="threshold"
                  name="Minimum Threshold"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <DataRow label="Current ILST Horizon" value="30+ days" valueClass="text-status-green" />
          <DataRow label="Stress Scenario" value="18 days" valueClass="text-status-yellow" />
        </PanelCard>
      </div>

      {/* Actions Panel */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-lg p-5">
        <h3 className="text-[15px] font-bold text-accent uppercase tracking-wide mb-4 flex items-center gap-2.5">
          <Clock className="w-5 h-5" />
          Recommended Actions
        </h3>
        <div className="space-y-0">
          {actions.map((action, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3 border-b border-foreground/[0.05] last:border-b-0"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${action.iconClass}`}
              >
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
