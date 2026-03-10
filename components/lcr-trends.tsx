'use client'

import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

const chartData = [
  { date: '02-17', value: 125 },
  { date: '02-20', value: 138 },
  { date: '02-23', value: 142 },
  { date: '02-26', value: 105 },
  { date: '03-01', value: 118 },
  { date: '03-03', value: 77 },
  { date: '03-05', value: 141 },
  { date: '03-08', value: 135 }
]

const kpiData = [
  {
    label: 'HQLA',
    value: '$1,123',
    subtext: 'High Quality Liquid Assets',
    date: '2026-03-09',
    trend: 'up' as const
  },
  {
    label: 'CASH INFLOWS',
    value: '$1,123',
    subtext: 'Total gross (HQLA breakdown)',
    date: '2026-03-09',
    trend: 'down' as const
  },
  {
    label: 'CASH OUTFLOWS',
    value: '$818',
    subtext: 'Weighted outflows (LCR)',
    date: '2026-03-09',
    trend: 'up' as const
  }
]

export default function LCRTrends() {
  const [view, setView] = useState<'chart' | 'table'>('chart')

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">LCR Ratio Trends</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView('chart')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'chart'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-muted'
            }`}
          >
            Chart
          </button>
          <button
            onClick={() => setView('table')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'table'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-muted'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="bg-secondary rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">{kpi.label}</p>
                <p className="text-xl font-bold text-foreground mt-1">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.subtext}</p>
                <p className="text-xs text-muted-foreground mt-2">{kpi.date}</p>
              </div>
              <div>
                {kpi.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-status-green" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-status-red" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Card */}
      <div className="bg-secondary rounded-lg p-4 mb-6 col-span-1 md:col-span-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">2052a Filing Status</p>
            <p className="text-sm text-foreground mt-2">2026-03-09</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-status-green rounded-full"></span>
            <span className="text-sm font-medium text-status-green">Submitted</span>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-status-yellow text-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          📄 PDF Report
        </button>
      </div>

      {/* Chart View */}
      {view === 'chart' && (
        <div className="bg-secondary rounded-lg p-6 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                label={{ value: 'LCR %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value) => [`${value}%`, 'LCR']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--chart-2))" 
                dot={{ fill: 'hsl(var(--chart-2))', r: 4 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">LCR Ratio</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{row.value}%</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-2 ${
                      row.value >= 100 ? 'text-status-green' : 'text-status-red'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        row.value >= 100 ? 'bg-status-green' : 'bg-status-red'
                      }`}></span>
                      {row.value >= 100 ? 'Compliant' : 'Non-Compliant'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
