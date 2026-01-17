"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Leaf, UtensilsCrossed, Users, Clock, Settings, Menu, X, LogOut, User, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useCustomTheme } from "@/contexts/theme-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const { sidebarPosition } = useCustomTheme()
  const router = useRouter()
  const [notificationCount, setNotificationCount] = useState(0)

  // Simulate getting notification count
  useEffect(() => {
    setNotificationCount(3) // Example count
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Define routes based on user role
  const routes = [
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      color: "text-green-500",
      role: "all" as const,
    },
    {
      label: "Farmer Module",
      icon: Leaf,
      href: "/farmer",
      color: "text-emerald-500",
      role: "admin" as const,
    },
    {
      label: "Restaurant Module",
      icon: UtensilsCrossed,
      href: "/restaurant",
      color: "text-orange-500",
      role: "all" as const,
    },
    {
      label: "Customer Module",
      icon: Users,
      href: "/customer",
      color: "text-blue-500",
      role: "all" as const,
    },
    {
      label: "Virtual Queue",
      icon: Clock,
      href: "/queue",
      color: "text-purple-500",
      role: "all" as const,
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/notifications",
      color: "text-yellow-500",
      role: "all" as const,
      badge: notificationCount > 0,
      badgeCount: notificationCount,
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      color: "text-gray-500",
      role: "all" as const,
    },
  ]

  // Add a click handler for the notification route to show notification settings
  const handleRouteClick = (href: string) => {
    setIsOpen(false)
    if (href === "/notifications") {
      // You could also directly navigate to notification settings
      // router.push("/settings/notifications")
    }
  }

  // Filter routes based on user role
  const filteredRoutes = routes.filter((route) => route.role === "all" || (route.role === "admin" && isAdmin))

  // Determine sidebar position classes
  const sidebarPositionClasses =
    sidebarPosition === "right"
      ? {
          sidebar: "right-0 border-l",
          mobileButton: "right-4 left-auto",
          closed: "-right-full md:right-0",
        }
      : {
          sidebar: "left-0 border-r",
          mobileButton: "left-4",
          closed: "-left-full md:left-0",
        }

  return (
    <>
      <div className={`md:hidden fixed top-4 z-50 ${sidebarPositionClasses.mobileButton}`}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-y-0 z-40 flex flex-col bg-background shadow-sm md:relative transition-all duration-300",
          isOpen ? `${sidebarPositionClasses.sidebar} w-64` : `${sidebarPositionClasses.closed} md:w-64 lg:w-72`,
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">FreshServe</h1>
          </Link>
          <ModeToggle />
        </div>

        <div className="flex-1 py-4 px-2 space-y-1">
          {filteredRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => handleRouteClick(route.href)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent relative",
                pathname === route.href || pathname.startsWith(route.href + "/")
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              <span>{route.label}</span>
              {route.badge && (
                <Badge
                  variant="destructive"
                  className="ml-auto px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center"
                >
                  {route.badgeCount}
                </Badge>
              )}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.avatar || user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )
}
