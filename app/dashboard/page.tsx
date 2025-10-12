import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ProjectList } from "@/components/project-list";
import { StatsSection } from "@/components/stats-section";
import Protected from "@/components/Protected";

export default function DashboardPage() {
  return (
    <Protected>
      <div className="min-h-screen">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 lg:ml-64 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
              {/* Welcome Section */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-muted-foreground mb-2">Hi there,</p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-balance mb-4 md:mb-6">
                  Welcome to feedbackx.me.
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Create projects and collect anonymous feedback from your team, customers, or community. Share links
                  and gather insights.
                </p>
              </div>

              {/* Stats Section */}
              <StatsSection />

              {/* Project List */}
              <ProjectList />
            </div>
          </main>
        </div>
      </div>
    </Protected>
  );
}
