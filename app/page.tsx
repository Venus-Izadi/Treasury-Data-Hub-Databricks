"use client"

import { useState } from "react"
import { LCRSidebar, type LCRPage } from '@/components/lcr-sidebar'
import { LCRHeader } from '@/components/lcr-header'
import { LCRDashboard } from '@/components/lcr-dashboard'
import { ExecutiveSummaryPage } from '@/components/executive-summary-page'
import { RisksPage } from '@/components/risks-page'
import { ForecastsPage } from '@/components/forecasts-page'
import { LCRConversation } from '@/components/lcr-conversation'

const pageMeta: Record<LCRPage, { title: string; subtitle: string }> = {
  dashboard: {
    title: "LCR Dashboard",
    subtitle: "Intraday Liquidity Coverage Metrics and Analysis",
  },
  executive: {
    title: "Executive Summary",
    subtitle: "Key insights and top priorities",
  },
  risks: {
    title: "Risk Analysis",
    subtitle: "Current threats and compliance concerns",
  },
  forecasts: {
    title: "Forecasts",
    subtitle: "Projected LCR scenarios and outlooks",
  },
  conversation: {
    title: "Conversation",
    subtitle: "Smart LCR assistant powered by AI",
  },
}

export default function Page() {
  const [activePage, setActivePage] = useState<LCRPage>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const { title, subtitle } = pageMeta[activePage]
  
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }
  
  const handleNavigate = (page: LCRPage) => {
    setActivePage(page)
    setSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <LCRSidebar 
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <LCRHeader 
          title={title}
          subtitle={subtitle}
          lastUpdated="Mar 10, 2026 14:30"
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 px-4 md:px-8 py-4 md:py-6 overflow-y-auto">
          {activePage === "dashboard" && <LCRDashboard onNavigate={handleNavigate} />}
          {activePage === "executive" && <ExecutiveSummaryPage />}
          {activePage === "risks" && <RisksPage />}
          {activePage === "forecasts" && <ForecastsPage />}
          {activePage === "conversation" && <LCRConversation />}
        </main>
      </div>
    </div>
  )
}
