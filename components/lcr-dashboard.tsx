'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { TrendingUp, TrendingDown, ArrowRight, AlertTriangle, CheckCircle, Clock, FileText, Download } from 'lucide-react'
import type { LCRPage } from './lcr-sidebar'

const chartData = [
  { date: '02-17', value: 125, min: 100 },
  { date: '02-20', value: 138, min: 100 },
  { date: '02-23', value: 142, min: 100 },
  { date: '02-26', value: 105, min: 100 },
  { date: '03-01', value: 118, min: 100 },
  { date: '03-03', value: 77, min: 100 },
  { date: '03-05', value: 141, min: 100 },
  { date: '03-08', value: 135, min: 100 },
]

interface LCRDashboardProps {
  onNavigate: (page: LCRPage) => void
}

export function LCRDashboard({ onNavigate }: LCRDashboardProps) {
  const currentLCR = 141.10
  const previousLCR = 135.20
  const lcrChange = ((currentLCR - previousLCR) / previousLCR * 100).toFixed(1)
  const isUp = currentLCR > previousLCR

  return (
    <div className="space-y-6">
      {/* Hero Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current LCR - Hero Card */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current LCR Ratio</span>
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                currentLCR >= 100 ? 'bg-status-green/10 text-status-green' : 'bg-status-red/10 text-status-red'
              }`}>
                {currentLCR >= 100 ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {currentLCR >= 100 ? 'Compliant' : 'Non-Compliant'}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-foreground tracking-tight">{currentLCR}%</span>
              <div className={`flex items-center gap-1 ${isUp ? 'text-status-green' : 'text-status-red'}`}>
                {isUp ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span className="text-sm font-semibold">{isUp ? '+' : ''}{lcrChange}%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">As of March 10, 2026</p>
          </div>
        </div>

        {/* HQLA */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">HQLA</p>
              <p className="text-2xl font-bold text-foreground mt-1">$1,123M</p>
              <p className="text-xs text-muted-foreground mt-1">High Quality Liquid Assets</p>
            </div>
            <div className="p-2 bg-status-green/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-status-green" />
            </div>
          </div>
        </div>

        {/* Net Outflows */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Net Outflows</p>
              <p className="text-2xl font-bold text-foreground mt-1">$818M</p>
              <p className="text-xs text-muted-foreground mt-1">30-day weighted outflows</p>
            </div>
            <div className="p-2 bg-status-yellow/10 rounded-lg">
              <TrendingDown className="w-4 h-4 text-status-yellow" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground">LCR Ratio Trend</h2>
              <p className="text-sm text-muted-foreground">Last 30 days performance</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">LCR %</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-status-red" />
                <span className="text-muted-foreground">Min. Required (100%)</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '11px' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '11px' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[60, 160]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`${value}%`, 'LCR']}
                />
                <Line 
                  type="monotone"
                  dataKey="min"
                  stroke="hsl(var(--status-red))"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Status */}
        <div className="space-y-4">
          {/* Filing Status */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">2052a Filing Status</p>
                <p className="text-sm text-foreground mt-1 font-medium">March 9, 2026</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-status-green/10 text-status-green">
                <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
                Submitted
              </span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary hover:bg-muted text-foreground rounded-lg text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Download PDF Report
            </button>
          </div>

          {/* Quick Navigation Cards */}
          <button 
            onClick={() => onNavigate('executive')}
            className="w-full bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-sm transition-all text-left group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Executive Summary</p>
                <p className="text-xs text-muted-foreground mt-1">3 key items require attention</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>

          <button 
            onClick={() => onNavigate('risks')}
            className="w-full bg-card rounded-xl border border-border p-5 hover:border-status-red/50 hover:shadow-sm transition-all text-left group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-status-red" />
                <p className="text-sm font-semibold text-foreground">Active Risks</p>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-status-red/10 text-status-red">4</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Regulatory scrutiny highly likely</p>
          </button>

          <button 
            onClick={() => onNavigate('forecasts')}
            className="w-full bg-card rounded-xl border border-border p-5 hover:border-status-blue/50 hover:shadow-sm transition-all text-left group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Forecast Scenarios</p>
                <p className="text-xs text-muted-foreground mt-1">Base, stress, and optimistic cases</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Summary Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Recent LCR History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">LCR Ratio</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">HQLA</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Net Outflows</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { date: 'Mar 8', lcr: 135, hqla: 1098, outflows: 814, status: 'compliant' },
                { date: 'Mar 5', lcr: 141, hqla: 1123, outflows: 796, status: 'compliant' },
                { date: 'Mar 3', lcr: 77, hqla: 630, outflows: 818, status: 'breach' },
                { date: 'Mar 1', lcr: 118, hqla: 965, outflows: 818, status: 'compliant' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${row.lcr >= 100 ? 'text-foreground' : 'text-status-red'}`}>
                      {row.lcr}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">${row.hqla}M</td>
                  <td className="px-6 py-4 text-muted-foreground">${row.outflows}M</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      row.status === 'compliant' 
                        ? 'bg-status-green/10 text-status-green' 
                        : 'bg-status-red/10 text-status-red'
                    }`}>
                      {row.status === 'compliant' ? (
                        <><CheckCircle className="w-3 h-3" /> Compliant</>
                      ) : (
                        <><AlertTriangle className="w-3 h-3" /> Breach</>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
