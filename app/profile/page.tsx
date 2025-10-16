import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import UserProfile from "@/components/UserProfile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
          
           <UserProfile />
          </div>
        </main>
      </div>
    </div>
  )
}
