"use client"

import type React from "react"

import { ModuleNavigation } from "@/components/module-navigation"
import { UtensilsCrossed, ShoppingCart, Package, MenuSquare, LayoutDashboard } from "lucide-react"

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  const navigationItems = [
    {
      name: "Overview",
      href: "/restaurant",
      icon: UtensilsCrossed,
    },
    {
      name: "Direct Purchasing",
      href: "/restaurant/purchasing",
      icon: ShoppingCart,
    },
    {
      name: "Inventory Tracking",
      href: "/restaurant/inventory",
      icon: Package,
    },
    {
      name: "Menu Planning",
      href: "/restaurant/menu",
      icon: MenuSquare,
    },
    {
      name: "Kitchen Dashboard",
      href: "/restaurant/kitchen",
      icon: LayoutDashboard,
    },
  ]

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Restaurant Module</h1>
        <p className="text-muted-foreground">Manage inventory, plan menus, and track kitchen operations.</p>
      </div>

      <ModuleNavigation items={navigationItems} />

      {children}
    </div>
  )
}
