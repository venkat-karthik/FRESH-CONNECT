import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Ticket, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function QueueOverviewPage() {
  const modules = [
    {
      title: "Queue Management",
      description: "Manage customer orders in the virtual queue system.",
      icon: Users,
      href: "/queue/management",
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Token Generator",
      description: "Create a new token for customer orders.",
      icon: Ticket,
      href: "/queue/token",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Queue Status",
      description: "View and monitor current queue status across cafeterias.",
      icon: BarChart3,
      href: "/queue/status",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
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
