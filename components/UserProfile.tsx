"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Mail, Save, Check, Loader2, Loader } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useUser } from "@/app/hooks/useUser"

export default function UserProfile() {
  const { user, loading, error, updateUser } = useUser()

  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState("" )
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    if (user?.name) {
      setName(user.name)
    }
  }, [user])

  const handleSaveProfile = async () => {
    setSaved(true)
   if(name.trim() && name !== user?.name){
    await updateUser({ name: name.trim() })
   }
   setSaved(false)
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
 if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader></Loader></div>
 if (error) return <div>Error loading user data</div>

  return (
    <div className="min-h-screen bg-gradient-to-br py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative">
         

          <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
            <div className="relative">
              <div className="h-32 w-32 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                <span className="text-4xl font-bold text-white">{getInitials(user?.name||"")}</span>
              </div>
            
            </div>
          </div>
        </div>

        <div className="text-center pt-20 pb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{user?.name}</h1>
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Mail className="h-4 w-4" />
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>

        <Card className="border-0 shadow-xl rounded-lg overflow-hidden">
          <div className="bg-white ">
            <div className="flex gap-1 p-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === "profile"
                    ? "bg-secondary text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
              disabled
                onClick={() => setActiveTab("password")}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === "password"
                    ? "bg-secondary text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Lock className="h-4 w-4" />
                Security
              </button>
            </div>
          </div>

          <CardContent className="p-8">
            {activeTab === "profile" ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Information</h2>
                  <p className="text-slate-600 text-sm">Update your personal details and information</p>
                </div>

                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 rounded-xl border-slate-200 focus:border-slate-400 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      value={user?.email}
                      
                      disabled
                      className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleSaveProfile}
                    className="w-full sm:w-auto  py-3 px-3 bg-secondary text-white hover:bg-slate-800 rounded-lg shadow-lg transition-all hover:shadow-xl"
                    disabled={saved}
                  >
                    {saved ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Saved 
                      </>
                    ) : (
                      <>
                        <Save className="mr-1 h-4 w-4 " />
                        Save 
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Change Password</h2>
                  <p className="text-slate-600 text-sm">Update your password to keep your account secure</p>
                </div>

                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-sm font-semibold text-slate-700">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="h-12 rounded-xl border-slate-200 focus:border-slate-400 transition-colors"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm font-semibold text-slate-700">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-12 rounded-xl border-slate-200 focus:border-slate-400 transition-colors"
                      placeholder="Enter new password"
                    />
                    <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-semibold text-slate-700">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 rounded-xl border-slate-200 focus:border-slate-400 transition-colors"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full sm:w-auto h-12 px-8 bg-secondary text-white hover:bg-slate-800 rounded-xl shadow-lg transition-all hover:shadow-xl"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
