'use client'

import React from 'react'
import { AlertTriangle, Shield, Calendar, TrendingDown, AlertOctagon } from 'lucide-react'

const risks = [
  {
    id: 1,
    title: 'Regulatory Scrutiny',
    description: 'Highly likely due to the recent 77.1% breach, potentially limiting tactical liquidity management.',
    severity: 'critical',
    likelihood: 'High',
    impact: 'Severe',
    icon: Shield,
  },
  {
    id: 2,
    title: 'Wholesale Cliff',
    description: 'A weekly "wholesale cliff" exists; failure to roll over short-term unsecured funding causes immediate non-compliance.',
    severity: 'critical',
    likelihood: 'Medium',
    impact: 'Critical',
    icon: AlertOctagon,
  },
  {
    id: 3,
    title: 'Corporate Tax Season',
    description: 'Watch March 15 - April 15; drawdowns on large operational deposits will cause significant HQLA drops.',
    severity: 'warning',
    likelihood: 'High',
    impact: 'Moderate',
    icon: Calendar,
  },
  {
    id: 4,
    title: 'Level 1 Asset Depletion',
    description: 'Continued depletion of Level 1 assets below ~$330M will trigger the Level 2 cap, rendering excess MBS/Munis useless for LCR compliance.',
    severity: 'critical',
    likelihood: 'Medium',
    impact: 'Severe',
    icon: TrendingDown,
  },
]

export function RisksPage() {
  const criticalCount = risks.filter(r => r.severity === 'critical').length
  const warningCount = risks.filter(r => r.severity === 'warning').length

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Risk Summary Header */}
      <div className="bg-gradient-to-r from-status-red/10 via-status-red/5 to-transparent rounded-xl border border-status-red/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-status-red/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-status-red" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Risk Assessment</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Active threats and compliance concerns requiring monitoring
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-center px-4 py-2 bg-card rounded-lg border border-border">
              <p className="text-2xl font-bold text-status-red">{criticalCount}</p>
              <p className="text-xs text-muted-foreground">Critical</p>
            </div>
            <div className="text-center px-4 py-2 bg-card rounded-lg border border-border">
              <p className="text-2xl font-bold text-status-yellow">{warningCount}</p>
              <p className="text-xs text-muted-foreground">Warning</p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map((risk) => {
          const Icon = risk.icon
          return (
            <div 
              key={risk.id}
              className={`bg-card rounded-xl border p-5 hover:shadow-md transition-shadow ${
                risk.severity === 'critical' ? 'border-status-red/30' : 'border-status-yellow/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  risk.severity === 'critical' ? 'bg-status-red/10' : 'bg-status-yellow/10'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    risk.severity === 'critical' ? 'text-status-red' : 'text-status-yellow'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{risk.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      risk.severity === 'critical' 
                        ? 'bg-status-red/10 text-status-red' 
                        : 'bg-status-yellow/10 text-status-yellow'
                    }`}>
                      {risk.severity === 'critical' ? 'Critical' : 'Warning'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {risk.description}
                  </p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Likelihood</p>
                      <p className="text-sm font-medium text-foreground">{risk.likelihood}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Impact</p>
                      <p className="text-sm font-medium text-foreground">{risk.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Risk Matrix */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-base font-semibold text-foreground mb-4">Risk Matrix Overview</h2>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="col-start-2 text-muted-foreground font-medium py-2">Low</div>
          <div className="text-muted-foreground font-medium py-2">Medium</div>
          <div className="text-muted-foreground font-medium py-2">High</div>
          
          <div className="text-muted-foreground font-medium py-2 text-right pr-2">Severe</div>
          <div className="bg-status-yellow/20 rounded p-2">-</div>
          <div className="bg-status-red/20 rounded p-2">2</div>
          <div className="bg-status-red/30 rounded p-2">1</div>
          
          <div className="text-muted-foreground font-medium py-2 text-right pr-2">Moderate</div>
          <div className="bg-status-green/20 rounded p-2">-</div>
          <div className="bg-status-yellow/20 rounded p-2">-</div>
          <div className="bg-status-yellow/30 rounded p-2">1</div>
          
          <div className="text-muted-foreground font-medium py-2 text-right pr-2">Low</div>
          <div className="bg-status-green/20 rounded p-2">-</div>
          <div className="bg-status-green/20 rounded p-2">-</div>
          <div className="bg-status-yellow/20 rounded p-2">-</div>
        </div>
      </div>
    </div>
  )
}
