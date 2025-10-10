import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
            <h1 className="font-serif text-4xl mb-8">Settings</h1>
            <div className="bg-card rounded-2xl p-8 shadow-sm">
              <p className="text-muted-foreground">Settings coming soon...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
