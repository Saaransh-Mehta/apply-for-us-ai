import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser, UserButton } from "@clerk/clerk-react"
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  User, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Crown,
  Lock
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const { user } = useUser()
  const navigate = useNavigate()
  const [userTier, setUserTier] = useState("free") // free, pro, pro-plus
  const [hasResume, setHasResume] = useState(false)

  useEffect(() => {
    // Check user tier from localStorage (in real app, from database)
    const tier = localStorage.getItem("userTier") || "free"
    setUserTier(tier)

    // Check if user has resume
    const resumeStatus = localStorage.getItem("hasResume")
    setHasResume(resumeStatus === "true")
  }, [])

  const handleApplyToJob = () => {
    if (userTier === "free") {
      alert("Apply to New Job is a Pro feature! Upgrade to Pro or Pro Plus to unlock this feature.")
      navigate("/pricing")
    } else {
      // Navigate to apply page for pro users
      console.log("Navigate to apply page")
    }
  }

  const handleBrowseOpportunities = () => {
    if (userTier === "free" && !hasResume) {
      // Free tier users need to upload resume first
      navigate("/resume-upload")
    } else {
      navigate("/browse-jobs")
    }
  }

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "profile",
      title: "Profile",
      icon: User,
    },
    {
      id: "settings",
      title: "Account Settings",
      icon: Settings,
    },
  ]

  // Mock data for applications
  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      status: "Applied",
      date: "2025-11-12",
      statusColor: "bg-blue-500"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Frontend Developer",
      status: "Interview",
      date: "2025-11-10",
      statusColor: "bg-yellow-500"
    },
    {
      id: 3,
      company: "Amazon",
      position: "Full Stack Developer",
      status: "Rejected",
      date: "2025-11-08",
      statusColor: "bg-red-500"
    },
    {
      id: 4,
      company: "Meta",
      position: "React Developer",
      status: "Accepted",
      date: "2025-11-05",
      statusColor: "bg-green-500"
    },
  ]

  const stats = [
    {
      title: "Total Applications",
      value: "24",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "In Progress",
      value: "8",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Accepted",
      value: "3",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Rejected",
      value: "13",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="outline-font">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeSection === item.id}
                      onClick={() => {
                        if (item.id === "profile") {
                          navigate("/profile")
                        } else {
                          setActiveSection(item.id)
                        }
                      }}
                      className="outline-font"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold outline-font">Dashboard</h1>
          </div>
          
          {/* User Profile Section with Clerk UserButton */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 outline-font hidden sm:block">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-lg",
                }
              }}
            />
          </div>
        </header>

        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h2 className="text-3xl font-bold outline-font mb-2">
                Welcome back, {user?.firstName || "User"}! 👋
              </h2>
              <p className="outline-font text-blue-100">
                Track your job applications and manage your career journey
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 outline-font">{stat.title}</p>
                      <p className="text-3xl font-bold outline-font mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-xl font-bold outline-font mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button 
                  className="outline-font flex items-center gap-2 relative" 
                  variant="outline"
                  onClick={handleApplyToJob}
                >
                  <FileText className="w-4 h-4" />
                  Apply to New Job
                  {userTier === "free" && (
                    <Lock className="w-3 h-3 ml-1 text-amber-500" />
                  )}
                </Button>
                <Button 
                  className="outline-font flex items-center gap-2" 
                  variant="outline"
                  onClick={handleBrowseOpportunities}
                >
                  <Briefcase className="w-4 h-4" />
                  Browse Opportunities
                </Button>
                <Button 
                  className="outline-font flex items-center gap-2" 
                  variant="outline"
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-4 h-4" />
                  Update Profile
                </Button>
              </div>
              {userTier === "free" && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800 outline-font flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Upgrade to Pro to unlock "Apply to New Job" and more features!
                  </p>
                </div>
              )}
            </Card>

            {/* Recent Applications */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold outline-font">Recent Applications</h3>
                <Button variant="link" className="outline-font">View All →</Button>
              </div>
              <div className="space-y-3">
                {applications.map((app) => (
                  <div 
                    key={app.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${app.statusColor}`}></div>
                      <div>
                        <p className="font-semibold outline-font">{app.position}</p>
                        <p className="text-sm text-gray-600 outline-font">{app.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="outline-font">
                        {app.status}
                      </Badge>
                      <span className="text-sm text-gray-500 outline-font">{app.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Progress Chart Placeholder */}
            <Card className="p-6">
              <h3 className="text-xl font-bold outline-font mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Application Progress
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500 outline-font">Chart visualization coming soon...</p>
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard
