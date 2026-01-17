import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ListChecks, Calendar, Bell, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function FarmerOverviewPage() {
  const modules = [
    {
      title: "Produce Listings",
      description: "Manage your produce inventory, prices, and availability.",
      icon: ListChecks,
      href: "/farmer/produce",
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Crop Calendar",
      description: "Plan your planting and harvesting schedule based on seasons.",
      icon: Calendar,
      href: "/farmer/calendar",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Order Alerts",
      description: "Real-time order alerts from restaurants and cafeterias.",
      icon: Bell,
      href: "/farmer/orders",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    },
    {
      title: "Sales Dashboard",
      description: "Monthly sales performance and trends.",
      icon: BarChart3,
      href: "/farmer/sales",
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {modules.map((module) => (
        <Link key={module.title} href={module.href} className="block">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`rounded-lg p-2 ${module.color}`}>
                <module.icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
