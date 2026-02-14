"use client"

import { DatabankLogo } from "./databank-logo"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary px-6 py-3 border-b-[3px] border-accent flex justify-between items-center">
      <div className="flex items-center gap-4">
        <DatabankLogo />
        <div className="border-l border-foreground/20 pl-4">
          <h1 className="text-[22px] text-primary-foreground font-semibold">Treasury Data Hub</h1>
          <p className="text-[13px] text-muted-foreground mt-0.5">
            Executive Dashboard | Liquidity, Funding & Risk
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="bg-gradient-to-br from-[#5b21b6] to-[#4c1d95] text-primary-foreground px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wide">
          Genie-Enabled
        </span>
        <button
          onClick={() => window.location.reload()}
          className="bg-foreground/10 border border-foreground/20 text-primary-foreground px-4 py-2 rounded text-sm cursor-pointer hover:bg-foreground/15 transition-colors"
        >
          Refresh
        </button>
        <div className="text-right text-[13px] text-muted-foreground">
          <strong className="text-accent block text-sm">Live Data</strong>
          February 10, 2026 | 4:32 PM EST
        </div>
      </div>
    </header>
  )
}
