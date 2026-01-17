"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface QueueNotification {
  id: number
  message: string
  type: "info" | "success" | "warning"
  timestamp: Date
}

// Mock user preferences - in a real app, these would come from a database or context
const userPreferences = {
  enableNotifications: true,
  notificationSound: true,
  notificationPosition: "bottom-right",
  maxVisibleNotifications: 1,
  autoHideTimeout: 5, // seconds
  notificationTypes: {
    queueUpdates: true,
    orderAlerts: true,
    inventoryAlerts: true,
    systemAnnouncements: true,
  },
}

export function QueueNotifications() {
  const [notifications, setNotifications] = useState<QueueNotification[]>([])
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  // Simulate receiving notifications - but limit to just 1 visible at a time
  useEffect(() => {
    // If notifications are disabled, don't show any
    if (!userPreferences.enableNotifications) {
      return
    }

    const infoMessages = ["New order added to the queue", "Average wait time decreased to 5 minutes"]

    const successMessages = ["Token TKN-JOHN3748 has been served", "Queue at Hospital Cafeteria is now shorter"]

    const warningMessages = [
      "Wait time at Campus Cafeteria is increasing",
      "Tech Park Canteen will close in 30 minutes",
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        // Reduced frequency
        const type = Math.random() > 0.7 ? "warning" : Math.random() > 0.5 ? "success" : "info"
        let message = ""

        // Check if this notification type is enabled
        let shouldShow = true
        if (type === "info" && !userPreferences.notificationTypes.queueUpdates) {
          shouldShow = false
        } else if (type === "warning" && !userPreferences.notificationTypes.inventoryAlerts) {
          shouldShow = false
        } else if (type === "success" && !userPreferences.notificationTypes.orderAlerts) {
          shouldShow = false
        }

        if (!shouldShow) {
          return
        }

        switch (type) {
          case "info":
            message = infoMessages[Math.floor(Math.random() * infoMessages.length)]
            break
          case "success":
            message = successMessages[Math.floor(Math.random() * successMessages.length)]
            break
          case "warning":
            message = warningMessages[Math.floor(Math.random() * warningMessages.length)]
            break
        }

        const newNotification: QueueNotification = {
          id: Date.now(),
          message,
          type,
          timestamp: new Date(),
        }

        setNotifications((prev) => [newNotification, ...prev].slice(0, 5))

        // Play sound if enabled
        if (userPreferences.notificationSound) {
          // In a real app, you would play a sound here
          // const audio = new Audio('/notification-sound.mp3');
          // audio.play();
        }
      }
    }, 15000) // Increased interval to 15 seconds

    return () => clearInterval(interval)
  }, [])

  // Auto-hide notifications after timeout if set
  useEffect(() => {
    if (userPreferences.autoHideTimeout > 0 && notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1))
      }, userPreferences.autoHideTimeout * 1000)

      return () => clearTimeout(timer)
    }
  }, [notifications])

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const viewAllNotifications = () => {
    router.push("/notifications")
  }

  if (notifications.length === 0 || !userPreferences.enableNotifications) {
    return null
  }

  // Only show the max number of notifications based on user preferences
  const visibleNotifications = showAll
    ? notifications.slice(0, userPreferences.maxVisibleNotifications)
    : [notifications[0]]

  // Position the notifications based on user preferences
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }[userPreferences.notificationPosition]

  return (
    <div className={`fixed z-50 w-80 space-y-2 ${positionClasses}`}>
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`p-4 rounded-lg shadow-lg border ${
              notification.type === "info"
                ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                : notification.type === "success"
                  ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                  : "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`rounded-full p-1.5 ${
                  notification.type === "info"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                    : notification.type === "success"
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                      : "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
                }`}
              >
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    notification.type === "info"
                      ? "text-blue-700 dark:text-blue-300"
                      : notification.type === "success"
                        ? "text-green-700 dark:text-green-300"
                        : "text-amber-700 dark:text-amber-300"
                  }`}
                >
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.timestamp.toLocaleTimeString()}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeNotification(notification.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {notifications.length > 1 && !showAll && (
        <Button variant="outline" size="sm" className="w-full bg-background" onClick={() => setShowAll(true)}>
          Show {Math.min(notifications.length - 1, userPreferences.maxVisibleNotifications - 1)} more notifications
        </Button>
      )}

      {showAll && (
        <Button variant="outline" size="sm" className="w-full bg-background" onClick={() => setShowAll(false)}>
          Show less
        </Button>
      )}

      <Button variant="default" size="sm" className="w-full" onClick={viewAllNotifications}>
        View All Notifications
        <ExternalLink className="ml-2 h-3 w-3" />
      </Button>
    </div>
  )
}
