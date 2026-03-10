import Header from '@/components/header'
import DashboardLayout from '@/components/dashboard-layout'
import ExecutiveSummary from '@/components/executive-summary'
import LCRTrends from '@/components/lcr-trends'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <DashboardLayout>
        <ExecutiveSummary />
        <LCRTrends />
      </DashboardLayout>
    </main>
  )
}
