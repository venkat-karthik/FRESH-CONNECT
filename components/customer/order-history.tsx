"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenGeneratorDialog } from "@/components/queue/token-generator-dialog"

// Sample order history data
const orderHistoryData = [
  {
    id: "ORD-7890",
    token: "TKN-JOHN3748",
    date: "2023-05-20",
    time: "12:30 PM",
    cafeteria: "Campus Cafeteria",
    items: ["Garden Fresh Salad", "Grilled Chicken Sandwich", "Fresh Fruit Smoothie"],
    total: "$27.97",
    status: "completed",
  },
  {
    id: "ORD-7891",
    token: "TKN-JOHN4567",
    date: "2023-05-18",
    time: "1:15 PM",
    cafeteria: "Tech Park Canteen",
    items: ["Vegetable Stir Fry", "Iced Coffee"],
    total: "$15.98",
    status: "completed",
  },
  {
    id: "ORD-7892",
    token: "TKN-JOHN5678",
    date: "2023-05-15",
    time: "11:45 AM",
    cafeteria: "Campus Cafeteria",
    items: ["Crispy French Fries", "Chocolate Brownie", "Fresh Fruit Smoothie"],
    total: "$17.97",
    status: "completed",
  },
  {
    id: "ORD-7893",
    token: "TKN-JOHN6789",
    date: "2023-05-12",
    time: "12:00 PM",
    cafeteria: "Hospital Cafeteria",
    items: ["Chef's Special Pasta", "Iced Coffee"],
    total: "$18.98",
    status: "completed",
  },
  {
    id: "ORD-7894",
    token: "TKN-JOHN7890",
    date: "2023-05-10",
    time: "1:30 PM",
    cafeteria: "Campus Cafeteria",
    items: ["Garden Fresh Salad", "Seasonal Fruit Tart"],
    total: "$16.98",
    status: "completed",
  },
]

// Sample active orders
const activeOrdersData = [
  {
    id: "ORD-7895",
    token: "TKN-JOHN8901",
    date: "2023-05-21",
    time: "11:30 AM",
    cafeteria: "Campus Cafeteria",
    items: ["Grilled Chicken Sandwich", "Crispy French Fries", "Iced Coffee"],
    total: "$21.97",
    status: "in-progress",
    queuePosition: 2,
    estimatedTime: "10 min",
  },
]

export function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("active")
  const [showTokenDialog, setShowTokenDialog] = useState(false)
  const [selectedToken, setSelectedToken] = useState("")

  const filteredActiveOrders = activeOrdersData.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.cafeteria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCompletedOrders = orderHistoryData.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.cafeteria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewToken = (token: string) => {
    setSelectedToken(token)
    setShowTokenDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Filter by Date
        </Button>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="pt-4">
          {filteredActiveOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredActiveOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <CardDescription>
                          {order.date} at {order.time} • {order.cafeteria}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="md:self-start">
                        {order.status === "in-progress" ? "In Progress" : order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Items</h4>
                        <ul className="text-sm text-muted-foreground">
                          {order.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">Queue Position:</span>
                            <Badge variant="default">{order.queuePosition}</Badge>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">Estimated Wait:</span>
                            <span className="text-sm">{order.estimatedTime}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">Total:</span>
                            <span className="text-sm font-bold">{order.total}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewToken(order.token)}>
                            View Token
                          </Button>
                          <Button variant="default" size="sm">
                            <RefreshCw className="mr-1 h-4 w-4" />
                            Refresh Status
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">You don't have any active orders.</p>
              <Button variant="outline" className="mt-4">
                Place a New Order
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Your past orders and receipts.</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredCompletedOrders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Cafeteria</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompletedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          {order.date}
                          <br />
                          <span className="text-xs text-muted-foreground">{order.time}</span>
                        </TableCell>
                        <TableCell>{order.cafeteria}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate">{order.items.join(", ")}</div>
                        </TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewToken(order.token)}>
                            View Token
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No order history found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showTokenDialog && (
        <TokenGeneratorDialog token={selectedToken} open={showTokenDialog} onClose={() => setShowTokenDialog(false)} />
      )}
    </div>
  )
}
