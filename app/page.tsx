"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar, type SidebarPage } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ExecutiveTiles } from "@/components/dashboard/executive-tiles"
import { BalanceSheetTab } from "@/components/dashboard/tab-balance-sheet"
import { LoansSecuritiesTab } from "@/components/dashboard/tab-loans-securities"
import { FundingCapacityTab } from "@/components/dashboard/tab-funding-capacity"

const pageMeta: Record<SidebarPage, { title: string; subtitle: string; breadcrumb: string[] }> = {
  dashboard: {
    title: "Treasury Data Hub",
    subtitle: "Executive Dashboard | Liquidity, Funding & Risk",
    breadcrumb: ["Dashboard"],
  },
  balance: {
    title: "Balance Sheet Summary",
    subtitle: "Asset & liability composition, deposit trends, and cash flow",
    breadcrumb: ["Dashboard", "Balance Sheet"],
  },
  loans: {
    title: "Loans & Securities",
    subtitle: "Portfolio analysis, repricing, and maturity details",
    breadcrumb: ["Dashboard", "Loans & Securities"],
  },
  funding: {
    title: "Funding & Capacity",
    subtitle: "Borrowing utilization, HQLA composition, and stress results",
    breadcrumb: ["Dashboard", "Funding & Capacity"],
  },
}

function PageTransition({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const prevKey = useRef(pageKey)

  useEffect(() => {
    if (prevKey.current !== pageKey) {
      setVisible(false)
      const timer = setTimeout(() => {
        prevKey.current = pageKey
        setVisible(true)
      }, 80)
      return () => clearTimeout(timer)
    } else {
      setVisible(true)
    }
  }, [pageKey])

  return (
    <div
      className="transition-all duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {children}
    </div>
  )
}

export default function DashboardPage() {
  const [activePage, setActivePage] = useState<SidebarPage>("dashboard")
  const { title, subtitle, breadcrumb } = pageMeta[activePage]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <PageTransition pageKey={activePage}>
            {activePage === "dashboard" && <ExecutiveTiles />}
            {activePage === "balance" && <BalanceSheetTab />}
            {activePage === "loans" && <LoansSecuritiesTab />}
            {activePage === "funding" && <FundingCapacityTab />}
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
