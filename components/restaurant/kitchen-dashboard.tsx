"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, ChevronRight, Bell } from "lucide-react"

// Sample order data
const initialOrders = [
  {
    id: "ORD-5678",
    token: "TKN-JOHN3748",
    customer: "John Smith",
    items: [
      { name: "Burger Combo", status: "cooking", timeRemaining: 8 },
      { name: "Fries", status: "ready", timeRemaining: 0 },
    ],
    status: "in-progress",
    priority: "normal",
    orderTime: "10:30 AM",
    estimatedCompletion: "10:45 AM",
  },
  {
    id: "ORD-5679",
    token: "TKN-SARA5692",
    customer: "Sara Johnson",
    items: [
      { name: "Salad Bowl", status: "preparing", timeRemaining: 5 },
      { name: "Fresh Juice", status: "not-started", timeRemaining: 3 },
    ],
    status: "new",
    priority: "high",
    orderTime: "10:32 AM",
    estimatedCompletion: "10:42 AM",
  },
  {
    id: "ORD-5680",
    token: "TKN-MIKE9012",
    customer: "Mike Brown",
    items: [
      { name: "Pizza Slice", status: "not-started", timeRemaining: 12 },
      { name: "Soda", status: "not-started", timeRemaining: 1 },
    ],
    status: "new",
    priority: "normal",
    orderTime: "10:35 AM",
    estimatedCompletion: "10:50 AM",
  },
  {
    id: "ORD-5681",
    token: "TKN-LISA4567",
    customer: "Lisa Garcia",
    items: [
      { name: "Pasta", status: "ready", timeRemaining: 0 },
      { name: "Garlic Bread", status: "ready", timeRemaining: 0 },
    ],
    status: "ready",
    priority: "normal",
    orderTime: "10:25 AM",
    estimatedCompletion: "10:40 AM",
  },
]

export function KitchenDashboard() {
  const [orders, setOrders] = useState(initialOrders)
  const [activeTab, setActiveTab] = useState("all")
  const [kitchenLoad, setKitchenLoad] = useState(65)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: "Order ORD-5679 is behind schedule",
      type: "warning",
      time: "2 min ago",
    },
    {
      id: 2,
      message: "High volume of orders expected at lunch",
      type: "info",
      time: "10 min ago",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          // Update item statuses
          const updatedItems = order.items.map((item) => {
            if (item.status === "not-started" && Math.random() > 0.7) {
              return { ...item, status: "preparing", timeRemaining: item.timeRemaining }
            }
            if (item.status === "preparing" && Math.random() > 0.7) {
              return { ...item, status: "cooking", timeRemaining: item.timeRemaining }
            }
            if (item.status === "cooking" && Math.random() > 0.7) {
              return { ...item, status: "ready", timeRemaining: 0 }
            }
            if (item.timeRemaining > 0) {
              return { ...item, timeRemaining: item.timeRemaining - 1 }
            }
            return item
          })

          // Update order status based on items
          let newStatus = order.status
          if (updatedItems.every((item) => item.status === "ready")) {
            newStatus = "ready"
          } else if (updatedItems.some((item) => item.status !== "not-started")) {
            newStatus = "in-progress"
          }

          return { ...order, items: updatedItems, status: newStatus }
        }),
      )

      // Randomly adjust kitchen load
      setKitchenLoad((prev) => {
        const change = Math.floor(Math.random() * 10) - 5
        const newLoad = prev + change
        return Math.max(0, Math.min(100, newLoad))
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge>New</Badge>
      case "in-progress":
        return <Badge variant="outline">In Progress</Badge>
      case "ready":
        return <Badge variant="success">Ready</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getItemStatusColor = (status: string) => {
    switch (status) {
      case "not-started":
        return "bg-gray-200 dark:bg-gray-700"
      case "preparing":
        return "bg-blue-200 dark:bg-blue-900"
      case "cooking":
        return "bg-yellow-200 dark:bg-yellow-900"
      case "ready":
        return "bg-green-200 dark:bg-green-900"
      default:
        return "bg-gray-200 dark:bg-gray-700"
    }
  }

  const updateItemStatus = (orderId: string, itemName: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.map((item) => {
            if (item.name === itemName) {
              const nextStatus = getNextStatus(item.status)
              return {
                ...item,
                status: nextStatus,
                timeRemaining: nextStatus === "ready" ? 0 : item.timeRemaining,
              }
            }
            return item
          })

          // Update order status if all items are ready
          const allReady = updatedItems.every((item) => item.status === "ready")
          return {
            ...order,
            items: updatedItems,
            status: allReady ? "ready" : order.status,
          }
        }
        return order
      }),
    )
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "not-started":
        return "preparing"
      case "preparing":
        return "cooking"
      case "cooking":
        return "ready"
      default:
        return currentStatus
    }
  }

  const markOrderReady = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "ready",
              items: order.items.map((item) => ({ ...item, status: "ready", timeRemaining: 0 })),
            }
          : order,
      ),
    )
  }

  const markOrderCompleted = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "completed",
            }
          : order,
      ),
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Kitchen Orders</CardTitle>
                <CardDescription>Manage and track food preparation in real-time.</CardDescription>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="ready">Ready</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <div
                      className={`px-4 py-2 flex justify-between items-center ${
                        order.priority === "high" ? "bg-red-100 dark:bg-red-900" : "bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        <span className="text-sm text-muted-foreground">({order.token})</span>
                        {order.priority === "high" && <Badge variant="destructive">High Priority</Badge>}
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">Ordered at {order.orderTime}</div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium">{order.customer}</h3>
                          <div className="mt-2 space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${getItemStatusColor(item.status)}`} />
                                <span className="text-sm">{item.name}</span>
                                {item.timeRemaining > 0 && (
                                  <span className="text-xs text-muted-foreground">({item.timeRemaining} min)</span>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 ml-auto"
                                  onClick={() => updateItemStatus(order.id, item.name)}
                                  disabled={item.status === "ready"}
                                >
                                  {item.status === "ready" ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-sm">Est. Completion: {order.estimatedCompletion}</div>
                          {order.status === "ready" ? (
                            <Button size="sm" onClick={() => markOrderCompleted(order.id)}>
                              Mark Completed
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => markOrderReady(order.id)}>
                              Mark All Ready
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-muted-foreground">No orders in this category.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Kitchen Status</CardTitle>
            <CardDescription>Current kitchen load and performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Load</span>
                  <span
                    className={`text-sm font-medium ${
                      kitchenLoad > 80 ? "text-red-500" : kitchenLoad > 60 ? "text-yellow-500" : "text-green-500"
                    }`}
                  >
                    {kitchenLoad}%
                  </span>
                </div>
                <Progress
                  value={kitchenLoad}
                  className={`h-2 ${
                    kitchenLoad > 80
                      ? "bg-red-100 dark:bg-red-900"
                      : kitchenLoad > 60
                        ? "bg-yellow-100 dark:bg-yellow-900"
                        : "bg-green-100 dark:bg-green-900"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background border rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">Active Orders</div>
                  <div className="text-2xl font-bold mt-1">{orders.filter((o) => o.status !== "completed").length}</div>
                </div>
                <div className="bg-background border rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">Avg. Prep Time</div>
                  <div className="text-2xl font-bold mt-1">12 min</div>
                </div>
                <div className="bg-background border rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">On-Time Rate</div>
                  <div className="text-2xl font-bold mt-1">92%</div>
                </div>
                <div className="bg-background border rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">Staff On Duty</div>
                  <div className="text-2xl font-bold mt-1">5</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kitchen Alerts</CardTitle>
            <CardDescription>Important notifications and alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 border-b pb-3">
                  <div
                    className={`rounded-full p-2 ${
                      alert.type === "warning"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                  >
                    {alert.type === "warning" ? <AlertCircle className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}

              {alerts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-sm text-muted-foreground">No alerts at this time.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
