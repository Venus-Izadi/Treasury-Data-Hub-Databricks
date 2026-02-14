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
        className="flex gap-1 border-b border-border"
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
              "px-5 py-3 text-sm font-medium transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
            )}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        className="pt-5"
      >
        {activeTab === "balance" && <BalanceSheetTab />}
        {activeTab === "loans" && <LoansSecuritiesTab />}
        {activeTab === "funding" && <FundingCapacityTab />}
      </div>
    </section>
  )
}
