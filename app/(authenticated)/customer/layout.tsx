"use client"

import type React from "react"

import { ModuleNavigation } from "@/components/module-navigation"
import { Users, Store, MenuSquare, ShoppingCart, History } from "lucide-react"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const navigationItems = [
    {
      name: "Overview",
      href: "/customer",
      icon: Users,
    },
    {
      name: "Cafeterias",
      href: "/customer/cafeterias",
      icon: Store,
    },
    {
      name: "Menu",
      href: "/customer/menu",
      icon: MenuSquare,
    },
    {
      name: "Order",
      href: "/customer/order",
      icon: ShoppingCart,
    },
    {
      name: "History",
      href: "/customer/history",
      icon: History,
    },
  ]

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Customer Module</h1>
        <p className="text-muted-foreground">Browse menus, place orders, and track your virtual queue position.</p>
      </div>

      <ModuleNavigation items={navigationItems} />

      {children}
    </div>
  )
}
