'use client'

import React, { useState } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { LCRPage } from './lcr-sidebar'

const chartData = [
  { date: '02-17', value: 125 },
  { date: '02-20', value: 138 },
  { date: '02-23', value: 142 },
  { date: '02-26', value: 105 },
  { date: '03-01', value: 118 },
  { date: '03-03', value: 77 },
  { date: '03-05', value: 141 },
  { date: '03-08', value: 135 },
]

const tableData = [
  { date: '2026-03-09', lcr: 141.10, hqla: 1123, inflows: 1123, outflows: 818, status: 'compliant' },
  { date: '2026-03-08', lcr: 135.00, hqla: 1098, inflows: 1098, outflows: 814, status: 'compliant' },
  { date: '2026-03-05', lcr: 141.00, hqla: 1123, inflows: 1120, outflows: 796, status: 'compliant' },
  { date: '2026-03-03', lcr: 77.10, hqla: 630, inflows: 640, outflows: 818, status: 'breach' },
  { date: '2026-03-01', lcr: 118.00, hqla: 965, inflows: 970, outflows: 818, status: 'compliant' },
  { date: '2026-02-26', lcr: 105.00, hqla: 858, inflows: 860, outflows: 817, status: 'compliant' },
]

interface LCRDashboardProps {
  onNavigate: (page: LCRPage) => void
}

export function LCRDashboard({ onNavigate }: LCRDashboardProps) {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')

  return (
    <div className="space-y-6">
      {/* Top Row: Key Metrics + Quick Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LCR Ratio - Main KPI */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Current LCR</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-foreground">141.10%</span>
            <span className="flex items-center text-status-green text-sm font-medium mb-1">
              <ArrowUpRight className="w-4 h-4" />4.4%
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-status-green/10 text-status-green">
              <CheckCircle className="w-3 h-3" />Compliant
            </span>
            <span className="text-xs text-muted-foreground">Min: 100%</span>
          </div>
        </div>

        {/* HQLA */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">HQLA</p>
          <p className="text-2xl font-bold text-foreground">$1,123M</p>
          <p className="text-xs text-muted-foreground mt-1">Liquid Assets</p>
        </div>

        {/* Cash Inflows */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Cash Inflows</p>
          <p className="text-2xl font-bold text-foreground">$1,123M</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3 text-status-red" />
            <span className="text-xs text-muted-foreground">Total gross (HQLA)</span>
          </div>
        </div>

        {/* Cash Outflows */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <p className="text-xs font-medium text-muted-foreground mb-2">Cash Outflows</p>
          <p className="text-2xl font-bold text-foreground">$818M</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-status-green" />
            <span className="text-xs text-muted-foreground">Weighted (LCR)</span>
          </div>
        </div>

        {/* Filing Status */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">2052a Filing</p>
              <p className="text-lg font-semibold text-foreground">2026-03-09</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-status-green/10 text-status-green">
              <span className="w-1.5 h-1.5 rounded-full bg-status-green" />Submitted
            </span>
          </div>
          <button className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-secondary hover:bg-muted text-foreground rounded-lg text-xs font-medium transition-colors">
            <Download className="w-3.5 h-3.5" />PDF Report
          </button>
        </div>
      </div>

      {/* Middle Row: Chart/Table + Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LCR Ratio Trends - Chart/Table Toggle */}
        <div className="lg:col-span-8 bg-card rounded-xl border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">LCR Ratio Trends</h2>
            <div className="flex bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('chart')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  viewMode === 'chart' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Chart
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  viewMode === 'table' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Table
              </button>
            </div>
          </div>
          
          {viewMode === 'chart' ? (
            <div className="p-5">
              <div className="flex items-center gap-4 text-xs mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">LCR %</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-status-red" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--status-red)) 0, hsl(var(--status-red)) 4px, transparent 4px, transparent 8px)' }} />
                  <span className="text-muted-foreground">Min. 100%</span>
                </div>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} tickLine={false} axisLine={false} domain={[60, 160]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem', fontSize: '11px' }}
                      formatter={(value: number) => [`${value}%`, 'LCR']}
                    />
                    <ReferenceLine y={100} stroke="hsl(var(--status-red))" strokeDasharray="4 4" strokeWidth={1} />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">LCR</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">HQLA</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Inflows</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Outflows</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium">{row.date}</td>
                      <td className="px-4 py-3"><span className={row.lcr >= 100 ? 'text-foreground' : 'text-status-red font-semibold'}>{row.lcr.toFixed(2)}%</span></td>
                      <td className="px-4 py-3 text-muted-foreground">${row.hqla}M</td>
                      <td className="px-4 py-3 text-muted-foreground">${row.inflows}M</td>
                      <td className="px-4 py-3 text-muted-foreground">${row.outflows}M</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          row.status === 'compliant' ? 'bg-status-green/10 text-status-green' : 'bg-status-red/10 text-status-red'
                        }`}>
                          {row.status === 'compliant' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                          {row.status === 'compliant' ? 'Compliant' : 'Breach'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Quick Summaries */}
        <div className="lg:col-span-4 space-y-4">
          {/* Executive Summary */}
          <button 
            onClick={() => onNavigate('executive')}
            className="w-full bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Executive Summary</h3>
              <span className="text-xs text-muted-foreground group-hover:text-primary">View all</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="inline-block px-1.5 py-0.5 rounded bg-status-green/10 text-status-green font-medium">141.10%</span>
                <span className="text-muted-foreground">LCR compliant on March 5</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block px-1.5 py-0.5 rounded bg-status-red/10 text-status-red font-medium">77.10%</span>
                <span className="text-muted-foreground">Regulatory breach on March 2</span>
              </li>
            </ul>
          </button>

          {/* Active Risks */}
          <button 
            onClick={() => onNavigate('risks')}
            className="w-full bg-card rounded-xl border border-border p-4 hover:border-status-red/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-status-red" />
                <h3 className="text-sm font-semibold text-foreground">Active Risks</h3>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-status-red/10 text-status-red">4</span>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-red" />
                Regulatory scrutiny - 77.1% breach
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-yellow" />
                Wholesale cliff risk exists
              </li>
            </ul>
          </button>

          {/* Forecasts */}
          <button 
            onClick={() => onNavigate('forecasts')}
            className="w-full bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Forecasts</h3>
              <span className="text-xs text-muted-foreground group-hover:text-primary">View all</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="font-semibold text-foreground">105-145%</p>
                <p className="text-muted-foreground">0-30 Days</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="font-semibold text-foreground">~120%</p>
                <p className="text-muted-foreground">30-90 Days</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="font-semibold text-foreground">125%</p>
                <p className="text-muted-foreground">Base Case</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
