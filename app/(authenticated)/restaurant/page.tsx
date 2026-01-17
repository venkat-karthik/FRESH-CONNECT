import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Package, MenuSquare, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function RestaurantOverviewPage() {
  const modules = [
    {
      title: "Direct Purchasing",
      description: "Purchase fresh produce directly from local farmers.",
      icon: ShoppingCart,
      href: "/restaurant/purchasing",
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Inventory Tracking",
      description: "Monitor stock levels and expiry dates of all ingredients.",
      icon: Package,
      href: "/restaurant/inventory",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Menu Planning",
      description: "Create and manage your menu items and categories.",
      icon: MenuSquare,
      href: "/restaurant/menu",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    },
    {
      title: "Kitchen Dashboard",
      description: "Manage and track food preparation in real-time.",
      icon: LayoutDashboard,
      href: "/restaurant/kitchen",
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
