"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface ModuleNavigationProps {
  items: NavigationItem[]
  className?: string
}

export function ModuleNavigation({ items, className }: ModuleNavigationProps) {
  const pathname = usePathname()

  return (
    <div className={cn("mb-6", className)}>
      <nav className="flex overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex space-x-2">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground",
                )}
              >
                {item.icon && <item.icon className={cn("mr-2 h-4 w-4", isActive ? "text-primary-foreground" : "")} />}
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
