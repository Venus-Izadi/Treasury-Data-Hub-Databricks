"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  PanelCard,
  PanelCardTitle,
  DataRow,
  SubsectionHeader,
  TotalRow,
  MaturityTag,
} from "./panel-components"

/* -------------------------------------------------- */
/*  Chart data                                        */
/* -------------------------------------------------- */

const depositTrendData = [
  { month: "Jan", deposits: 44.2 },
  { month: "Feb", deposits: 44.5 },
  { month: "Mar", deposits: 44.8 },
  { month: "Apr", deposits: 44.6 },
  { month: "May", deposits: 44.3 },
  { month: "Jun", deposits: 44.0 },
  { month: "Jul", deposits: 43.8 },
  { month: "Aug", deposits: 43.5 },
  { month: "Sep", deposits: 43.2 },
  { month: "Oct", deposits: 42.9 },
  { month: "Nov", deposits: 42.7 },
  { month: "Dec", deposits: 42.5 },
]

const channelFlowData = [
  { channel: "Branch", flow: -120 },
  { channel: "Mobile", flow: 45 },
  { channel: "Online", flow: -85 },
  { channel: "Wire", flow: -260 },
]

const segmentFlowData = [
  { segment: "Retail", flow: 35 },
  { segment: "Small Biz", flow: -95 },
  { segment: "Commercial", flow: -280 },
  { segment: "HNW", flow: -80 },
]

const uninsuredTrendData = [
  { date: "Nov 10", uninsured: 28, limit: 35 },
  { date: "Nov 20", uninsured: 28.5, limit: 35 },
  { date: "Nov 30", uninsured: 29, limit: 35 },
  { date: "Dec 10", uninsured: 29.5, limit: 35 },
  { date: "Dec 20", uninsured: 30, limit: 35 },
  { date: "Dec 31", uninsured: 30.5, limit: 35 },
  { date: "Jan 10", uninsured: 31, limit: 35 },
  { date: "Jan 20", uninsured: 31.5, limit: 35 },
  { date: "Jan 31", uninsured: 32, limit: 35 },
  { date: "Feb 10", uninsured: 32, limit: 35 },
]

/* -------------------------------------------------- */
/*  Component                                         */
/* -------------------------------------------------- */

export function BalanceSheetTab() {
  return (
    <div className="space-y-5">
      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Deposit Composition */}
        <PanelCard>
          <PanelCardTitle icon="D" iconColor="green">
            Deposit Composition by Type
          </PanelCardTitle>
          <DataRow label="Retail Checking & Savings (Core)" value="$18.2B" />
          <DataRow label="Money Market (Rate-Sensitive)" value="$8.5B" />
          <SubsectionHeader>CDs by Maturity Bucket</SubsectionHeader>
          <DataRow label="CDs <30 days">
            <span className="text-sm font-medium text-foreground">
              $1.8B <MaturityTag>Near-Term</MaturityTag>
            </span>
          </DataRow>
          <DataRow label="CDs 30-90 days" value="$3.2B" />
          <DataRow label="CDs 90d-1yr" value="$4.1B" />
          <DataRow label="CDs >1yr" value="$2.5B" />
          <DataRow label="Brokered Deposits" value="$4.2B" valueClass="text-status-yellow" />
          <TotalRow label="Total Deposits" value="$42.5B" valueClass="text-primary-foreground" />
        </PanelCard>

        {/* Insurance & Concentration */}
        <PanelCard>
          <PanelCardTitle icon="I" iconColor="blue">
            Insurance & Concentration
          </PanelCardTitle>
          <SubsectionHeader>FDIC Insurance Status</SubsectionHeader>
          <DataRow label="FDIC Insured (<$250K)" value="$28.9B (68%)" valueClass="text-status-green" />
          <DataRow label="Uninsured (>$250K)" value="$13.6B (32%)" valueClass="text-status-yellow" />
          <SubsectionHeader>Concentration Metrics</SubsectionHeader>
          <DataRow label="Top 20 Depositors" value="35% of total" valueClass="text-status-yellow" />
          <DataRow label="Top 50 Accounts" value="$8.2B" />
          <DataRow label="Geographic (Top 3 States)" value="62%" />
          <DataRow label="Industry - Healthcare" value="28%" valueClass="text-status-yellow" />
          <DataRow label="Industry - Real Estate" value="18%" />
          <SubsectionHeader>Depositor Type (Uninsured)</SubsectionHeader>
          <DataRow label="Consumer HNW" value="$4.8B" />
          <DataRow label="Small Business" value="$5.2B" />
          <DataRow label="Municipal/Public Funds" value="$3.6B" />
        </PanelCard>

        {/* Deposit Trends & Cost */}
        <PanelCard>
          <PanelCardTitle icon="T" iconColor="purple">
            Deposit Trends & Cost
          </PanelCardTitle>
          <div className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={depositTrendData}>
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[41, 46]} tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Area dataKey="deposits" stroke="#c9a227" fill="rgba(201,162,39,0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <SubsectionHeader>Net Flow Summary</SubsectionHeader>
          <DataRow label="7-Day Net Flow" value="-$285M" valueClass="text-status-red" />
          <DataRow label="30-Day Net Flow" value="-$420M" valueClass="text-status-red" />
          <DataRow label="90-Day Net Flow" value="-$680M" valueClass="text-status-red" />
          <SubsectionHeader>Cost of Funds</SubsectionHeader>
          <DataRow label="Avg Cost of Funds" value="3.85%" />
          <DataRow label="Interest-Bearing %" value="73%" />
          <DataRow label="Non-Interest Bearing" value="27%" />
        </PanelCard>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PanelCard>
          <PanelCardTitle icon="C" iconColor="gold">
            Net Flows by Channel (30-Day)
          </PanelCardTitle>
          <div className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelFlowData}>
                <XAxis dataKey="channel" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <Bar
                  dataKey="flow"
                  radius={[4, 4, 0, 0]}
                  fill="#ef4444"
                  shape={(props: Record<string, unknown>) => {
                    const { x, y, width, height, payload } = props as {
                      x: number
                      y: number
                      width: number
                      height: number
                      payload: { flow: number }
                    }
                    const color = payload.flow >= 0 ? "#22c55e" : "#ef4444"
                    return <rect x={x} y={y} width={width} height={height} fill={color} rx={4} />
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
        <PanelCard>
          <PanelCardTitle icon="S" iconColor="red">
            Net Flows by Segment (30-Day)
          </PanelCardTitle>
          <div className="h-[180px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentFlowData}>
                <XAxis dataKey="segment" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <Bar
                  dataKey="flow"
                  radius={[4, 4, 0, 0]}
                  fill="#ef4444"
                  shape={(props: Record<string, unknown>) => {
                    const { x, y, width, height, payload } = props as {
                      x: number
                      y: number
                      width: number
                      height: number
                      payload: { flow: number }
                    }
                    const color = payload.flow >= 0 ? "#22c55e" : "#ef4444"
                    return <rect x={x} y={y} width={width} height={height} fill={color} rx={4} />
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
      </div>

      {/* Row 3 */}
      <PanelCard>
        <PanelCardTitle icon="U" iconColor="red">
          Uninsured Deposit % - 90-Day Trend
        </PanelCardTitle>
        <div className="h-[180px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={uninsuredTrendData}>
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[25, 40]}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: 12, color: "#94a3b8" }}
              />
              <Area dataKey="uninsured" name="Uninsured %" stroke="#f59e0b" fill="rgba(245,158,11,0.1)" strokeWidth={2} />
              <Line
                dataKey="limit"
                name="Policy Limit"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </PanelCard>
    </div>
  )
}
