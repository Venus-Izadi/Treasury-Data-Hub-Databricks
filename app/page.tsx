"use client"

import { useState } from "react"
import { Sidebar, type SidebarPage } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ExecutiveTiles } from "@/components/dashboard/executive-tiles"
import { BalanceSheetTab } from "@/components/dashboard/tab-balance-sheet"
import { LoansSecuritiesTab } from "@/components/dashboard/tab-loans-securities"
import { FundingCapacityTab } from "@/components/dashboard/tab-funding-capacity"

const pageTitles: Record<SidebarPage, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Treasury Data Hub",
    subtitle: "Executive Dashboard | Liquidity, Funding & Risk",
  },
  balance: {
    title: "Balance Sheet Summary",
    subtitle: "Asset & liability composition, deposit trends, and cash flow",
  },
  loans: {
    title: "Loans & Securities",
    subtitle: "Portfolio analysis, repricing, and maturity details",
  },
  funding: {
    title: "Funding & Capacity",
    subtitle: "Borrowing utilization, HQLA composition, and stress results",
  },
}

export default function DashboardPage() {
  const [activePage, setActivePage] = useState<SidebarPage>("dashboard")
  const { title, subtitle } = pageTitles[activePage]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} subtitle={subtitle} />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {activePage === "dashboard" && <ExecutiveTiles />}
          {activePage === "balance" && <BalanceSheetTab />}
          {activePage === "loans" && <LoansSecuritiesTab />}
          {activePage === "funding" && <FundingCapacityTab />}
        </main>
      </div>
    </div>
  )
}
