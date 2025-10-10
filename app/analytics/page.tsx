import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StatsSection } from "@/components/stats-section"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
            <h1 className="font-serif text-4xl mb-8">Analytics</h1>
            <StatsSection />
            <div className="mt-8 bg-card rounded-2xl p-8 shadow-sm">
              <p className="text-muted-foreground">Detailed analytics coming soon...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
