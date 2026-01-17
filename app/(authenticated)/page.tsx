"use client"

import { Overview } from "@/components/dashboard/overview"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { TopFarmers } from "@/components/dashboard/top-farmers"
import { QueueWidget } from "@/components/dashboard/queue-widget"
import { RoleGate } from "@/components/auth/role-gate"
import { useAuth } from "@/contexts/auth-context"

export default function Dashboard() {
  const { isAdmin } = useAuth()

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to FreshServe Connect, your unified farm-to-fork ecosystem.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Orders</h3>
          </div>
          <div className="text-2xl font-bold">1,284</div>
          <p className="text-xs text-muted-foreground">+12.5% from last month</p>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Farmers</h3>
          </div>
          <div className="text-2xl font-bold">48</div>
          <p className="text-xs text-muted-foreground">+4 new this week</p>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Queue Wait Time</h3>
          </div>
          <div className="text-2xl font-bold">8 min</div>
          <p className="text-xs text-muted-foreground">-2 min from yesterday</p>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Revenue</h3>
          </div>
          <div className="text-2xl font-bold">$12,234</div>
          <p className="text-xs text-muted-foreground">+18.2% from last month</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RoleGate allowedRole="admin">
          <Overview className="col-span-4" />
        </RoleGate>
        <QueueWidget className={`col-span-3 ${!isAdmin ? "md:col-span-full" : ""}`} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <RecentOrders className="col-span-4" />
        <TopFarmers className="col-span-3" />
      </div>
    </div>
  )
}
