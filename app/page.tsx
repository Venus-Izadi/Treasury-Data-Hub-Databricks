"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar, type SidebarPage } from "@/components/dashboard/sidebar"
import { Header, type Timeframe } from "@/components/dashboard/header"
import { ExecutiveTiles } from "@/components/dashboard/executive-tiles"
import { BalanceSheetTab } from "@/components/dashboard/tab-balance-sheet"
import { LoansSecuritiesTab } from "@/components/dashboard/tab-loans-securities"
import { FundingCapacityTab } from "@/components/dashboard/tab-funding-capacity"
import { ConversationPage } from "@/components/dashboard/conversation-page"
import { ExecutiveTilesSkeleton, PanelSkeleton } from "@/components/dashboard/skeletons"
import { useDashboardData } from "@/hooks/use-dashboard-data"

// -----------------------------------------
// Page Metadata
// -----------------------------------------

const pageMeta: Record<SidebarPage, { title: string; subtitle: string }> = {
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
  conversation: {
    title: "Conversation",
    subtitle: "Smart treasury assistant powered by AI",
  },
}

// -----------------------------------------
// Page Transition Component
// -----------------------------------------

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

// -----------------------------------------
// Main Dashboard Page
// -----------------------------------------

export default function DashboardPage() {
  // Navigation state
  const [activePage, setActivePage] = useState<SidebarPage>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Data state
  const [timeframe, setTimeframe] = useState<Timeframe>("2d")
  const { data, isLoading, isValidating, refresh } = useDashboardData(timeframe)

  // Page metadata
  const { title, subtitle } = pageMeta[activePage]

  // Handle refresh
  const handleRefresh = async () => {
    await refresh()
  }

  // Close sidebar on route change (mobile)
  const handleNavigate = (page: SidebarPage) => {
    setActivePage(page)
    setSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={title}
          subtitle={subtitle}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          lastUpdated={data?.lastUpdated}
          isRefreshing={isValidating}
          onRefresh={handleRefresh}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 px-4 md:px-8 py-4 md:py-6 overflow-y-auto">
          <PageTransition pageKey={activePage}>
            {activePage === "dashboard" && (
              isLoading ? (
                <ExecutiveTilesSkeleton />
              ) : (
                <ExecutiveTiles
                  data={data}
                  onNavigateToConversation={() => setActivePage("conversation")}
                />
              )
            )}
            {activePage === "balance" && (
              isLoading ? <PanelSkeleton /> : <BalanceSheetTab timeframe={timeframe} />
            )}
            {activePage === "loans" && (
              isLoading ? <PanelSkeleton /> : <LoansSecuritiesTab timeframe={timeframe} />
            )}
            {activePage === "funding" && (
              isLoading ? <PanelSkeleton /> : <FundingCapacityTab timeframe={timeframe} />
            )}
            {activePage === "conversation" && <ConversationPage />}
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
