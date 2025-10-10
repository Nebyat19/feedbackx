import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProjectList } from "@/components/project-list"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
            <h1 className="font-serif text-4xl mb-8">All Projects</h1>
            <ProjectList />
          </div>
        </main>
      </div>
    </div>
  )
}
