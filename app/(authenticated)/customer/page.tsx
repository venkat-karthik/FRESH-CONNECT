import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, MenuSquare, ShoppingCart, History } from "lucide-react"
import Link from "next/link"

export default function CustomerOverviewPage() {
  const modules = [
    {
      title: "Cafeterias",
      description: "Browse and select cafeterias based on location and cuisine.",
      icon: Store,
      href: "/customer/cafeterias",
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Menu",
      description: "Browse our selection of fresh and delicious food items.",
      icon: MenuSquare,
      href: "/customer/menu",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Order",
      description: "Place your order and get a virtual queue token.",
      icon: ShoppingCart,
      href: "/customer/order",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    },
    {
      title: "History",
      description: "View your past orders and receipts.",
      icon: History,
      href: "/customer/history",
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
