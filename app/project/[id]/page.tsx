import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProjectDetail } from "@/components/project-detail"

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <ProjectDetail projectId={params.id} />
          </div>
        </main>
      </div>
    </div>
  )
}
