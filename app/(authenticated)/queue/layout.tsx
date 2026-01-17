"use client"

import type React from "react"

import { ModuleNavigation } from "@/components/module-navigation"
import { Clock, Users, Ticket, BarChart3 } from "lucide-react"

export default function QueueLayout({ children }: { children: React.ReactNode }) {
  const navigationItems = [
    {
      name: "Overview",
      href: "/queue",
      icon: Clock,
    },
    {
      name: "Queue Management",
      href: "/queue/management",
      icon: Users,
    },
    {
      name: "Token Generator",
      href: "/queue/token",
      icon: Ticket,
    },
    {
      name: "Queue Status",
      href: "/queue/status",
      icon: BarChart3,
    },
  ]

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Virtual Queue System</h1>
        <p className="text-muted-foreground">Manage virtual queues, generate tokens, and track wait times.</p>
      </div>

      <ModuleNavigation items={navigationItems} />

      {children}
    </div>
  )
}
