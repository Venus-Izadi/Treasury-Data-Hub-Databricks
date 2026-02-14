"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { BalanceSheetTab } from "./tab-balance-sheet"
import { LoansSecuritiesTab } from "./tab-loans-securities"
import { FundingCapacityTab } from "./tab-funding-capacity"

const tabs = [
  { id: "balance", label: "Balance Sheet Summary" },
  { id: "loans", label: "Loans & Securities" },
  { id: "funding", label: "Funding & Capacity" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function DetailTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("balance")

  return (
    <section className="mt-6" aria-label="Detail views">
      {/* Tab navigation */}
      <div
        className="flex gap-1.5 border-b border-foreground/10"
        role="tablist"
        aria-label="Dashboard detail tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-7 py-3.5 rounded-t-md text-sm font-semibold uppercase tracking-wide transition-colors",
              activeTab === tab.id
                ? "bg-gradient-to-br from-[#1a2744] to-[#0f1a2e] text-accent border border-foreground/[0.08] border-b-0"
                : "bg-foreground/[0.05] text-muted-foreground hover:bg-foreground/10 hover:text-primary-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        className="bg-gradient-to-br from-[#1a2744] to-[#0f1a2e] border border-foreground/[0.08] border-t-0 rounded-b-lg p-6"
      >
        {activeTab === "balance" && <BalanceSheetTab />}
        {activeTab === "loans" && <LoansSecuritiesTab />}
        {activeTab === "funding" && <FundingCapacityTab />}
      </div>
    </section>
  )
}
