import { Header } from "@/components/dashboard/header"
import { AlertBanner } from "@/components/dashboard/alert-banner"
import { ExecutiveTiles } from "@/components/dashboard/executive-tiles"
import { DetailTabs } from "@/components/dashboard/detail-tabs"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AlertBanner />
      <main className="px-7 py-5">
        <ExecutiveTiles />
        <DetailTabs />
      </main>
    </div>
  )
}
