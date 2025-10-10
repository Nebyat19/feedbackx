"use client"

import { Search, Bell, Menu, User, LogOut, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileSidebar } from "./mobile-sidebar"
import Link from "next/link"
import { useUser } from "@/app/hooks/useUser"
import { useState } from "react"

export function Header() {
  const { user, loading, error, updateUser } = useUser()
  const [name, setName] = useState("")
  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      // Clear user state
      updateUser({})

      // Clear local storage
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user")
      sessionStorage.removeItem("auth_token")
      sessionStorage.removeItem("user")

      // Redirect to login page
      window.location.href = "/login"
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <MobileSidebar />
            </SheetContent>
          </Sheet>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className=" bg-foreground rounded-lg flex items-center justify-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-foreground rounded-xl ">
          <span className="text-amber-50">  FX</span>
          </div>
            </div>
            <span className="font-serif text-lg sm:text-xl font-semibold  xs:block">feedbackx.me</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="search" placeholder="Search projects..." className="pl-10 w-48 lg:w-64 bg-muted/50 border-0" />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-4 text-sm text-muted-foreground text-center">No new notifications</div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                 <p className="text-sm text-gray-400"> joined on {new Date(user?.createdAt || "").toLocaleDateString()}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
