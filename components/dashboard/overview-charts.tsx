"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"
import { ChartTooltip } from "./chart-tooltip"

/* -------------------------------------------------- */
/*  Liquidity Trend data                              */
/* -------------------------------------------------- */

const liquidityTrendData = [
  { date: "Jan 1", lcr: 130, nsfr: 112, ldr: 78 },
  { date: "Jan 8", lcr: 128, nsfr: 113, ldr: 79 },
  { date: "Jan 15", lcr: 132, nsfr: 111, ldr: 78 },
  { date: "Jan 22", lcr: 129, nsfr: 114, ldr: 80 },
  { date: "Jan 29", lcr: 126, nsfr: 113, ldr: 81 },
  { date: "Feb 1", lcr: 125, nsfr: 112, ldr: 82 },
  { date: "Feb 3", lcr: 128, nsfr: 115, ldr: 80 },
  { date: "Feb 5", lcr: 127, nsfr: 115, ldr: 81 },
  { date: "Feb 6", lcr: 127, nsfr: 115, ldr: 82 },
]

/* -------------------------------------------------- */
/*  HQLA Composition data                             */
/* -------------------------------------------------- */

const hqlaData = [
  { name: "Level 1 - Cash", value: 2.5, color: "hsl(152,55%,41%)" },
  { name: "Level 1 - Treasuries", value: 3.2, color: "hsl(217,91%,60%)" },
  { name: "Level 2A - Agency MBS", value: 1.1, color: "hsl(25,95%,53%)" },
  { name: "Level 2B - Corp Bonds", value: 0.5, color: "hsl(152,35%,55%)" },
]

const totalHQLA = hqlaData.reduce((sum, d) => sum + d.value, 0)

/* -------------------------------------------------- */
/*  Components                                        */
/* -------------------------------------------------- */

export function OverviewCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Liquidity Trend Analysis -- 2/3 */}
      <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-foreground">Liquidity Trend Analysis</h3>
          <div className="flex items-center gap-4">
            {[
              { label: "LCR", color: "hsl(152,55%,41%)" },
              { label: "NSFR", color: "hsl(217,91%,60%)" },
              { label: "LDR", color: "hsl(25,95%,53%)" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-4">30-day rolling LCR, NSFR, and LDR ratios</p>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={liquidityTrendData}>
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[60, 160]}
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
              {/* Regulatory minimum reference line */}
              <Line
                dataKey={() => 100}
                name="Regulatory Min"
                stroke="hsl(0,84%,60%)"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                dot={false}
                legendType="none"
              />
              <Line dataKey="lcr" name="LCR" stroke="hsl(152,55%,41%)" strokeWidth={2.5} dot={false} />
              <Line dataKey="nsfr" name="NSFR" stroke="hsl(217,91%,60%)" strokeWidth={2.5} dot={false} />
              <Line dataKey="ldr" name="LDR" stroke="hsl(25,95%,53%)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-status-red">
          <span className="w-6 border-t-2 border-dashed border-status-red" />
          Regulatory Min (100%)
        </div>
      </div>

      {/* HQLA Composition -- 1/3 */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground">HQLA Composition</h3>
        <p className="text-xs text-muted-foreground mb-2">High-Quality Liquid Assets breakdown</p>
        <div className="h-[180px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={hqlaData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {hqlaData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null
                  const d = payload[0].payload
                  return (
                    <div className="bg-foreground text-card rounded-lg px-3 py-2 shadow-xl text-xs">
                      <p className="font-semibold">{d.name}</p>
                      <p>${d.value}B</p>
                    </div>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">${totalHQLA.toFixed(1)}B</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Total HQLA</div>
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className="space-y-2.5 mt-2">
          {hqlaData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-xs font-semibold text-foreground">${item.value}B</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
