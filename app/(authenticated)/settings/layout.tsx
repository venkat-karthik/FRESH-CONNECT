"use client"

import type React from "react"

import { ModuleNavigation } from "@/components/module-navigation"
import { Settings, Bell, Shield, User, Palette } from "lucide-react"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const navigationItems = [
    {
      name: "General",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Notifications",
      href: "/settings/notifications",
      icon: Bell,
    },
    {
      name: "Privacy",
      href: "/settings/privacy",
      icon: Shield,
    },
    {
      name: "Account",
      href: "/settings/account",
      icon: User,
    },
    {
      name: "Appearance",
      href: "/settings/appearance",
      icon: Palette,
    },
  ]

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <ModuleNavigation items={navigationItems} />

      {children}
    </div>
  )
}
