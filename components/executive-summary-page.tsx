'use client'

import React from 'react'
import { AlertCircle, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react'

const topItems = [
  {
    title: 'LCR Recovery',
    description: 'The LCR recovered to a compliant 141.10% on March 5, following a severe regulatory breach of 77.10% on March 2.',
    status: 'positive',
    metrics: [
      { label: 'Current', value: '141.10%', type: 'success' },
      { label: 'Previous Breach', value: '77.10%', type: 'danger' },
    ]
  },
  {
    title: 'Extreme Volatility Pattern',
    description: 'The bank is experiencing a "sawtooth" pattern driven by short-term wholesale funding rollovers and HQLA Level 2 cap disqualifications.',
    status: 'warning',
    metrics: [
      { label: 'Volatility', value: 'High', type: 'warning' },
      { label: 'Pattern', value: 'Sawtooth', type: 'neutral' },
    ]
  },
  {
    title: 'Level 1 Treasury Depletion',
    description: 'Level 1 Treasuries are depleting rapidly, shifting the asset mix dangerously toward capped Level 2 assets and creating a fragile balance sheet.',
    status: 'danger',
    metrics: [
      { label: 'L1 Status', value: 'Depleting', type: 'danger' },
      { label: 'Balance Sheet', value: 'Fragile', type: 'warning' },
    ]
  }
]

export function ExecutiveSummaryPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <AlertCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Top 3 Priority Items</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Critical items requiring immediate attention as of March 10, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Priority Cards */}
      <div className="space-y-4">
        {topItems.map((item, idx) => (
          <div 
            key={idx}
            className={`bg-card rounded-xl border p-6 ${
              item.status === 'danger' ? 'border-status-red/30' :
              item.status === 'warning' ? 'border-status-yellow/30' :
              'border-status-green/30'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                    item.status === 'danger' ? 'bg-status-red/10 text-status-red' :
                    item.status === 'warning' ? 'bg-status-yellow/10 text-status-yellow' :
                    'bg-status-green/10 text-status-green'
                  }`}>
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed ml-11">
                  {item.description}
                </p>
              </div>
            </div>
            
            {/* Metrics */}
            <div className="flex gap-4 mt-4 ml-11">
              {item.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="bg-secondary rounded-lg px-4 py-2">
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className={`text-sm font-semibold ${
                    metric.type === 'success' ? 'text-status-green' :
                    metric.type === 'danger' ? 'text-status-red' :
                    metric.type === 'warning' ? 'text-status-yellow' :
                    'text-foreground'
                  }`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-status-green/10 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-status-green" />
          </div>
          <p className="text-2xl font-bold text-foreground">141.10%</p>
          <p className="text-sm text-muted-foreground">Current LCR</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-status-yellow/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-status-yellow" />
          </div>
          <p className="text-2xl font-bold text-foreground">High</p>
          <p className="text-sm text-muted-foreground">Volatility Level</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-status-red/10 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-status-red" />
          </div>
          <p className="text-2xl font-bold text-foreground">Depleting</p>
          <p className="text-sm text-muted-foreground">L1 Treasuries</p>
        </div>
      </div>
    </div>
  )
}
