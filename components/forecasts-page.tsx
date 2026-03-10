'use client'

import React from 'react'
import { TrendingUp, Target, AlertTriangle, Sparkles, Clock, Calendar } from 'lucide-react'

const scenarios = [
  {
    id: 'base',
    title: 'Base Case',
    description: 'LCR averages 125%, remaining compliant but fragile.',
    probability: '60%',
    lcrRange: '115% - 135%',
    status: 'compliant',
    icon: Target,
    color: 'status-blue',
    details: [
      'Maintains minimum compliance threshold',
      'Vulnerable to market shocks',
      'Requires active monitoring',
    ]
  },
  {
    id: 'stress',
    title: 'Stress Case',
    description: 'A repeat of March 2nd conditions could push LCR to <85% (Non-Compliant).',
    probability: '25%',
    lcrRange: '70% - 95%',
    status: 'breach',
    icon: AlertTriangle,
    color: 'status-red',
    details: [
      'Cap breach and wholesale freeze scenario',
      'Immediate regulatory intervention likely',
      'Emergency liquidity measures required',
    ]
  },
  {
    id: 'optimistic',
    title: 'Optimistic Case',
    description: 'Terming out debt and rebalancing HQLA to cash could result in a stable 160%+ LCR.',
    probability: '15%',
    lcrRange: '150% - 175%',
    status: 'strong',
    icon: Sparkles,
    color: 'status-green',
    details: [
      'Proactive debt restructuring',
      'HQLA optimization complete',
      'Comfortable compliance buffer',
    ]
  },
]

const timeframes = [
  {
    period: 'Short-Term',
    range: '0-30 Days',
    forecast: 'LCR projected to oscillate between 105% and 145% with high volatility.',
    status: 'warning',
  },
  {
    period: 'Medium-Term',
    range: '30-90 Days',
    forecast: 'Without intervention, LCR will trend downward to ~120% as the bank repeatedly hits the Level 2 cap.',
    status: 'caution',
  },
]

export function ForecastsPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-status-blue/10 rounded-xl">
            <TrendingUp className="w-6 h-6 text-status-blue" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">LCR Forecast Scenarios</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Projected outcomes based on current trends and market conditions
            </p>
          </div>
        </div>
      </div>

      {/* Timeframe Forecasts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timeframes.map((tf, idx) => (
          <div key={idx} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-secondary rounded-lg">
                {idx === 0 ? <Clock className="w-4 h-4 text-muted-foreground" /> : <Calendar className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{tf.period}</h3>
                <p className="text-xs text-muted-foreground">{tf.range}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tf.forecast}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                tf.status === 'warning' ? 'bg-status-yellow/10 text-status-yellow' : 'bg-status-red/10 text-status-red'
              }`}>
                {tf.status === 'warning' ? 'High Volatility' : 'Downward Trend'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scenario Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Scenario Analysis</h2>
        
        {scenarios.map((scenario) => {
          const Icon = scenario.icon
          return (
            <div 
              key={scenario.id}
              className={`bg-card rounded-xl border overflow-hidden ${
                scenario.color === 'status-red' ? 'border-status-red/30' :
                scenario.color === 'status-green' ? 'border-status-green/30' :
                'border-status-blue/30'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      scenario.color === 'status-red' ? 'bg-status-red/10' :
                      scenario.color === 'status-green' ? 'bg-status-green/10' :
                      'bg-status-blue/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        scenario.color === 'status-red' ? 'text-status-red' :
                        scenario.color === 'status-green' ? 'text-status-green' :
                        'text-status-blue'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{scenario.title}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          scenario.status === 'breach' ? 'bg-status-red/10 text-status-red' :
                          scenario.status === 'strong' ? 'bg-status-green/10 text-status-green' :
                          'bg-status-blue/10 text-status-blue'
                        }`}>
                          {scenario.status === 'breach' ? 'Non-Compliant' : 
                           scenario.status === 'strong' ? 'Strong' : 'Fragile'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{scenario.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{scenario.probability}</p>
                    <p className="text-xs text-muted-foreground">Probability</p>
                  </div>
                </div>

                <div className="flex gap-6 mt-4 ml-16">
                  <div className="bg-secondary rounded-lg px-4 py-2">
                    <p className="text-xs text-muted-foreground">LCR Range</p>
                    <p className="text-sm font-semibold text-foreground">{scenario.lcrRange}</p>
                  </div>
                </div>

                <div className="mt-4 ml-16">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Key Factors</p>
                  <ul className="space-y-1">
                    {scenario.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          scenario.color === 'status-red' ? 'bg-status-red' :
                          scenario.color === 'status-green' ? 'bg-status-green' :
                          'bg-status-blue'
                        }`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
