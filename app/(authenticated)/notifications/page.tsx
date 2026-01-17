"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Info, AlertTriangle, CheckCircle, Clock, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

// Sample notification data
const initialNotifications = [
  {
    id: 1,
    title: "New order added to the queue",
    message: "Token TKN-JOHN3748 has been added to Campus Cafeteria queue",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
  },
  {
    id: 2,
    title: "Order completed",
    message: "Token TKN-SARA5692 has been served at Tech Park Canteen",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: true,
  },
  {
    id: 3,
    title: "Wait time increasing",
    message: "Campus Cafeteria is experiencing high demand. Wait time increased to 12 minutes.",
    type: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: 4,
    title: "New farmer registered",
    message: "Green Valley Farms has joined the platform with 15 new products",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: true,
  },
  {
    id: 5,
    title: "Low inventory alert",
    message: "Rice stock is running low (25%) at Campus Cafeteria",
    type: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    read: false,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5" />
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      case "success":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
      case "warning":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
      case "success":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="flex flex-col p-4 md:p-6 gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">View and manage your notifications and alerts.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1 absolute -top-1 -right-1 px-1 min-w-4 h-4">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="warning">Alerts</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
            Clear All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>
            {activeTab === "all"
              ? "All notifications and alerts"
              : activeTab === "unread"
                ? "Unread notifications"
                : activeTab === "warning"
                  ? "Important alerts and warnings"
                  : "Informational notifications"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
                >
                  <div className={`rounded-full p-2 ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="default" className="ml-2">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {notification.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        - {notification.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "all"
                    ? "You don't have any notifications yet."
                    : activeTab === "unread"
                      ? "You've read all your notifications."
                      : activeTab === "warning"
                        ? "No alerts or warnings at this time."
                        : "No informational notifications at this time."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
