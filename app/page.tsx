"use client"

import { useState } from "react"
import { LCRSidebar, type LCRPage } from '@/components/lcr-sidebar'
import { LCRHeader } from '@/components/lcr-header'
import DashboardLayout from '@/components/dashboard-layout'
import ExecutiveSummary from '@/components/executive-summary'
import LCRTrends from '@/components/lcr-trends'
import { LCRConversation } from '@/components/lcr-conversation'

const pageMeta: Record<LCRPage, { title: string; subtitle: string }> = {
  dashboard: {
    title: "LCR Dashboard",
    subtitle: "Intraday Liquidity Coverage Metrics and Analysis",
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
          {activePage === "dashboard" && (
            <DashboardLayout>
              <ExecutiveSummary />
              <LCRTrends />
            </DashboardLayout>
          )}
          {activePage === "conversation" && <LCRConversation />}
        </main>
      </div>
    </div>
  )
}
