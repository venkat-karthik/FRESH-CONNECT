"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample order alerts data
const orderAlertsData = [
  {
    id: "ORD-1234",
    customer: "Campus Cafeteria",
    items: [
      { name: "Organic Tomatoes", quantity: "25 kg" },
      { name: "Lettuce", quantity: "15 kg" },
      { name: "Carrots", quantity: "20 kg" },
    ],
    total: "$234.50",
    status: "new",
    time: "10 minutes ago",
  },
  {
    id: "ORD-1235",
    customer: "Tech Park Canteen",
    items: [
      { name: "Potatoes", quantity: "50 kg" },
      { name: "Onions", quantity: "30 kg" },
      { name: "Garlic", quantity: "5 kg" },
    ],
    total: "$178.25",
    status: "new",
    time: "25 minutes ago",
  },
  {
    id: "ORD-1236",
    customer: "City Hospital",
    items: [
      { name: "Apples", quantity: "40 kg" },
      { name: "Oranges", quantity: "35 kg" },
      { name: "Bananas", quantity: "25 kg" },
    ],
    total: "$352.00",
    status: "accepted",
    time: "1 hour ago",
  },
  {
    id: "ORD-1237",
    customer: "University Dining",
    items: [
      { name: "Spinach", quantity: "18 kg" },
      { name: "Kale", quantity: "12 kg" },
      { name: "Broccoli", quantity: "15 kg" },
    ],
    total: "$189.75",
    status: "accepted",
    time: "2 hours ago",
  },
  {
    id: "ORD-1238",
    customer: "Corporate Office",
    items: [
      { name: "Bell Peppers", quantity: "10 kg" },
      { name: "Cucumbers", quantity: "15 kg" },
    ],
    total: "$124.30",
    status: "declined",
    time: "3 hours ago",
  },
]

export function OrderAlerts() {
  const [alerts, setAlerts] = useState(orderAlertsData)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAccept = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status: "accepted" } : alert)))
  }

  const handleDecline = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status: "declined" } : alert)))
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Order Alerts</CardTitle>
          <CardDescription>Real-time order alerts from restaurants and cafeterias.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4 gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-full p-2 ${
                      alert.status === "new"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        : alert.status === "accepted"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{alert.customer}</h3>
                      <Badge
                        variant={
                          alert.status === "new" ? "default" : alert.status === "accepted" ? "success" : "outline"
                        }
                      >
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Order {alert.id} • {alert.time}
                    </p>
                    <p className="text-sm font-medium mt-1">{alert.total}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(alert)}>
                    View Details
                  </Button>
                  {alert.status === "new" && (
                    <>
                      <Button variant="default" size="sm" onClick={() => handleAccept(alert.id)}>
                        <Check className="mr-1 h-4 w-4" />
                        Accept
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDecline(alert.id)}>
                        <X className="mr-1 h-4 w-4" />
                        Decline
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Order from {selectedOrder?.customer}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm font-medium mb-2">Items:</h4>
            <ul className="space-y-2">
              {selectedOrder?.items.map((item: any, index: number) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-medium mt-4 pt-4 border-t">
              <span>Total:</span>
              <span>{selectedOrder?.total}</span>
            </div>
          </div>
          <DialogFooter>
            {selectedOrder?.status === "new" ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleDecline(selectedOrder.id)
                    setIsDialogOpen(false)
                  }}
                >
                  Decline
                </Button>
                <Button
                  onClick={() => {
                    handleAccept(selectedOrder.id)
                    setIsDialogOpen(false)
                  }}
                >
                  Accept Order
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
