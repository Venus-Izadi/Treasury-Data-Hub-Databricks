"use client"

import { useState, useEffect } from "react"
import { Calendar, RefreshCw, ChevronDown, Menu } from "lucide-react"

// -----------------------------------------
// Timeframe Configuration
// -----------------------------------------

export const timeframes = [
  { label: "Today", value: "today" },
  { label: "Last 2 Days", value: "2d" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
] as const

export type Timeframe = (typeof timeframes)[number]["value"]

// -----------------------------------------
// Header Props
// -----------------------------------------

interface HeaderProps {
  title: string
  subtitle: string
  timeframe: Timeframe
  onTimeframeChange: (value: Timeframe) => void
  lastUpdated?: Date
  isRefreshing?: boolean
  onRefresh?: () => void
  onMenuClick?: () => void
}

// -----------------------------------------
// Timestamp Formatter
// -----------------------------------------

function formatTimestamp(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })
}

// -----------------------------------------
// Header Component
// -----------------------------------------

export function Header({
  title,
  subtitle,
  timeframe,
  onTimeframeChange,
  lastUpdated,
  isRefreshing = false,
  onRefresh,
  onMenuClick,
}: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const activeLabel = timeframes.find((t) => t.value === timeframe)?.label ?? "Today"

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Use lastUpdated if provided, otherwise use current time
  const displayTime = lastUpdated ?? currentTime

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-border bg-card gap-4">
      {/* Left: Mobile menu + Title */}
      <div className="flex items-center gap-3 min-w-0">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">{title}</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5 truncate">{subtitle}</p>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Timeframe picker */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 md:gap-2 bg-muted px-2.5 md:px-3.5 py-2 rounded-lg text-xs md:text-sm text-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            <Calendar className="w-3.5 md:w-4 h-3.5 md:h-4 text-muted-foreground" />
            <span className="hidden sm:inline">{activeLabel}</span>
            <span className="sm:hidden">{timeframe}</span>
            <ChevronDown className={`w-3 md:w-3.5 h-3 md:h-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 z-20 bg-card border border-border rounded-lg shadow-lg py-1.5 min-w-[140px] md:min-w-[160px]">
                {timeframes.map((tf) => (
                  <button
                    key={tf.value}
                    onClick={() => { onTimeframeChange(tf.value); setOpen(false) }}
                    className={`w-full text-left px-3 md:px-3.5 py-2 text-sm transition-colors ${
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

        {/* Timestamp - hidden on small screens */}
        <div className="hidden md:flex items-center gap-2 bg-muted px-3.5 py-2 rounded-lg text-sm text-muted-foreground">
          <span>As of {formatTimestamp(displayTime)}</span>
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 md:gap-2 bg-card border border-border px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 md:w-4 h-3.5 md:h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </header>
  )
}
