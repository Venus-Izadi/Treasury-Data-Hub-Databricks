import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { ExecutiveTiles } from "@/components/dashboard/executive-tiles"
import { DetailTabs } from "@/components/dashboard/detail-tabs"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <ExecutiveTiles />
          <DetailTabs />
        </main>
      </div>
    </div>
  )
}
