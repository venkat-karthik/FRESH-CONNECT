"use client"

import type React from "react"

import { ModuleNavigation } from "@/components/module-navigation"
import { Leaf, ListChecks, Calendar, Bell, BarChart3 } from "lucide-react"

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  const navigationItems = [
    {
      name: "Overview",
      href: "/farmer",
      icon: Leaf,
    },
    {
      name: "Produce Listings",
      href: "/farmer/produce",
      icon: ListChecks,
    },
    {
      name: "Crop Calendar",
      href: "/farmer/calendar",
      icon: Calendar,
    },
    {
      name: "Order Alerts",
      href: "/farmer/orders",
      icon: Bell,
    },
    {
      name: "Sales Dashboard",
      href: "/farmer/sales",
      icon: BarChart3,
    },
  ]

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Farmer Module</h1>
        <p className="text-muted-foreground">Manage your produce listings, track orders, and view sales analytics.</p>
      </div>

      <ModuleNavigation items={navigationItems} />

      {children}
    </div>
  )
}
