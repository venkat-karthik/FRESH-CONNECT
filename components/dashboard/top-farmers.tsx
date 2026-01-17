import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowDown, ArrowUp } from "lucide-react"

const farmers = [
  {
    name: "Green Valley Farms",
    email: "contact@greenvalley.com",
    sales: "$12,234",
    products: 24,
    avatar: "GV",
    trend: "up",
    percentage: "8.5%",
  },
  {
    name: "Sunshine Organics",
    email: "info@sunshineorganics.com",
    sales: "$10,876",
    products: 18,
    avatar: "SO",
    trend: "up",
    percentage: "5.2%",
  },
  {
    name: "Fresh Fields",
    email: "sales@freshfields.com",
    sales: "$9,543",
    products: 15,
    avatar: "FF",
    trend: "down",
    percentage: "2.1%",
  },
  {
    name: "Nature's Bounty",
    email: "hello@naturesbounty.com",
    sales: "$8,721",
    products: 12,
    avatar: "NB",
    trend: "up",
    percentage: "3.7%",
  },
  {
    name: "Harvest Moon",
    email: "contact@harvestmoon.com",
    sales: "$7,654",
    products: 10,
    avatar: "HM",
    trend: "down",
    percentage: "1.4%",
  },
]

interface TopFarmersProps {
  className?: string
}

export function TopFarmers({ className }: TopFarmersProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>Top Farmers</CardTitle>
        <CardDescription>Farmers with highest sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {farmers.map((farmer) => (
            <div key={farmer.name} className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border border-primary/10">
                <AvatarImage src="/placeholder.svg" alt={farmer.name} />
                <AvatarFallback className="bg-primary/10 text-primary">{farmer.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">{farmer.name}</p>
                <p className="text-xs text-muted-foreground truncate">{farmer.email}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <p className="text-sm font-medium">{farmer.sales}</p>
                  <span
                    className={`flex items-center text-xs ${farmer.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {farmer.trend === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {farmer.percentage}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{farmer.products} products</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
