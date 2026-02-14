"use client"

import { Calendar, RefreshCw, ChevronRight } from "lucide-react"

interface HeaderProps {
  title: string
  subtitle: string
  breadcrumb?: string[]
}

export function Header({ title, subtitle, breadcrumb }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-card">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5" aria-label="Breadcrumb">
            <span>The Pulse</span>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" />
                <span className={i === breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>{crumb}</span>
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-muted px-3.5 py-2 rounded-lg text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
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
