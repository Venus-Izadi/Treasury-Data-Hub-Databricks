"use client"

import { useState } from "react"
import { Calendar, RefreshCw, ChevronDown } from "lucide-react"

const timeframes = [
  { label: "Today", value: "today" },
  { label: "Last 2 Days", value: "2d" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
] as const

type Timeframe = (typeof timeframes)[number]["value"]

interface HeaderProps {
  title: string
  subtitle: string
  timeframe: Timeframe
  onTimeframeChange: (value: Timeframe) => void
}

export type { Timeframe }

export function Header({ title, subtitle, timeframe, onTimeframeChange }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const activeLabel = timeframes.find((t) => t.value === timeframe)?.label ?? "Today"

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-card">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Timeframe picker */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-muted px-3.5 py-2 rounded-lg text-sm text-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{activeLabel}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 z-20 bg-card border border-border rounded-lg shadow-lg py-1.5 min-w-[160px]">
                {timeframes.map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => { onTimeframeChange(tf.value); setOpen(false) }}
                    className={`w-full text-left px-3.5 py-2 text-sm transition-colors ${
                      tf.value === timeframe
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 bg-muted px-3.5 py-2 rounded-lg text-sm text-muted-foreground">
          <span>As of Feb 13, 2026 14:30 UTC</span>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
    </header>
  )
}
