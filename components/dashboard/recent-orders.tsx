import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "ORD-1234",
    customer: "Campus Cafeteria",
    items: "Tomatoes, Lettuce, Carrots",
    amount: "$234.50",
    status: "completed",
    date: "2023-05-20",
  },
  {
    id: "ORD-1235",
    customer: "Tech Park Canteen",
    items: "Potatoes, Onions, Garlic",
    amount: "$178.25",
    status: "processing",
    date: "2023-05-20",
  },
  {
    id: "ORD-1236",
    customer: "City Hospital",
    items: "Apples, Oranges, Bananas",
    amount: "$352.00",
    status: "pending",
    date: "2023-05-19",
  },
  {
    id: "ORD-1237",
    customer: "University Dining",
    items: "Spinach, Kale, Broccoli",
    amount: "$189.75",
    status: "completed",
    date: "2023-05-19",
  },
  {
    id: "ORD-1238",
    customer: "Corporate Office",
    items: "Bell Peppers, Cucumbers",
    amount: "$124.30",
    status: "processing",
    date: "2023-05-18",
  },
]

interface RecentOrdersProps {
  className?: string
}

export function RecentOrders({ className }: RecentOrdersProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest orders from restaurants and cafeterias.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="hidden md:table-cell">{order.items}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "completed" ? "success" : order.status === "processing" ? "default" : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
