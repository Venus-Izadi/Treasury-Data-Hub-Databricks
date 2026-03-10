'use client'

import React from 'react'

interface SummaryItem {
  label: string
  content: string
  highlights: Array<{ text: string; color: 'status-green' | 'status-yellow' | 'status-red' | 'status-blue' }>
}

const statusColorClasses = {
  'status-green': 'text-status-green font-medium',
  'status-yellow': 'text-status-yellow font-medium',
  'status-red': 'text-status-red font-medium',
  'status-blue': 'text-status-blue font-medium',
}

function HighlightedText({ 
  text, 
  highlights 
}: { 
  text: string
  highlights: Array<{ text: string; color: 'status-green' | 'status-yellow' | 'status-red' | 'status-blue' }>
}) {
  if (highlights.length === 0) return <>{text}</>
  
  let remaining = text
  const parts = []
  
  for (const highlight of highlights) {
    const index = remaining.indexOf(highlight.text)
    if (index !== -1) {
      if (index > 0) {
        parts.push(
          <span key={`text-${parts.length}`}>{remaining.substring(0, index)}</span>
        )
      }
      parts.push(
        <span key={`highlight-${parts.length}`} className={statusColorClasses[highlight.color]}>
          {highlight.text}
        </span>
      )
      remaining = remaining.substring(index + highlight.text.length)
    }
  }
  
  if (remaining) {
    parts.push(
      <span key={`text-${parts.length}`}>{remaining}</span>
    )
  }
  
  return <>{parts}</>
}

export default function ExecutiveSummary() {
  const items = [
    {
      section: 'Top 3 Items',
      content: [
        {
          text: 'The LCR recovered to a compliant 141.10% on March 5, following a severe regulatory breach of 77.10% on March 2.',
          highlights: [
            { text: 'compliant 141.10%', color: 'status-green' as const },
            { text: 'severe', color: 'status-red' as const },
            { text: '77.10%', color: 'status-red' as const }
          ]
        },
        {
          text: 'The bank is experiencing extreme volatility (a "sawtooth" pattern) driven by short-term wholesale funding rollovers and HQLA Level 2 cap disqualifications.',
          highlights: [
            { text: 'extreme volatility', color: 'status-red' as const }
          ]
        },
        {
          text: 'Level 1 Treasuries are depleting rapidly, shifting the asset mix dangerously toward capped Level 2 assets and creating a fragile balance sheet.',
          highlights: [
            { text: 'depleting rapidly', color: 'status-red' as const }
          ]
        }
      ]
    },
    {
      section: 'Risks',
      content: [
        {
          text: 'Regulatory scrutiny is highly likely due to the recent 77.1% breach, potentially limiting tactical liquidity management.',
          highlights: [
            { text: 'Regulatory scrutiny', color: 'status-red' as const }
          ]
        },
        {
          text: 'A weekly "wholesale cliff" exists; failure to roll over short-term unsecured funding causes immediate non-compliance.',
          highlights: [
            { text: 'immediate non-compliance', color: 'status-red' as const }
          ]
        },
        {
          text: 'Watch corporate tax season (March 15 - April 15); drawdowns on large operational deposits will cause significant HQLA drops.',
          highlights: [
            { text: 'Watch corporate tax season', color: 'status-yellow' as const },
            { text: 'significant HQLA drops', color: 'status-yellow' as const }
          ]
        },
        {
          text: 'Continued depletion of Level 1 assets below ~$330M will trigger the Level 2 cap, rendering excess MBS/Munis useless for LCR compliance.',
          highlights: [
            { text: 'useless for LCR compliance', color: 'status-red' as const }
          ]
        }
      ]
    },
    {
      section: 'Forecasts',
      content: [
        {
          text: 'Short-Term (0–30 Days): LCR is projected to oscillate between 105% and 145% with high volatility.',
          highlights: [
            { text: 'high volatility', color: 'status-yellow' as const }
          ]
        },
        {
          text: 'Medium-Term (30–90 Days): Without intervention, the LCR will trend downward to ~120% as the bank repeatedly hits the Level 2 cap.',
          highlights: [
            { text: 'trend downward to ~120%', color: 'status-red' as const }
          ]
        },
        {
          text: 'Base Case Scenario: LCR averages 125%, remaining compliant but fragile.',
          highlights: [
            { text: 'compliant', color: 'status-green' as const },
            { text: 'fragile', color: 'status-yellow' as const }
          ]
        },
        {
          text: 'Stress Case Scenario: A repeat of the March 2nd conditions (cap breach and wholesale freeze) could push LCR to <85% (Non-Compliant).',
          highlights: [
            { text: '<85% (Non-Compliant)', color: 'status-red' as const }
          ]
        },
        {
          text: 'Optimistic Case Scenario: Terming out debt and rebalancing HQLA to cash could result in a stable 160%+ LCR.',
          highlights: [
            { text: 'stable 160%+', color: 'status-green' as const }
          ]
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {items.map((group) => (
        <div key={group.section} className="bg-card rounded-lg border border-border p-5">
          <h2 className="text-base font-semibold text-foreground mb-4">{group.section}</h2>
          <ul className="space-y-3">
            {group.content.map((item, idx) => (
              <li key={idx} className="text-sm text-card-foreground leading-relaxed">
                <div className="flex gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">•</span>
                  <span>
                    <HighlightedText text={item.text} highlights={item.highlights} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
