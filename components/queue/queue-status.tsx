"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Clock, QrCode, RefreshCw, Bell, AlertCircle } from "lucide-react"
import { TokenGeneratorDialog } from "./token-generator-dialog"
import { motion, AnimatePresence } from "framer-motion"

// Sample queue data
const initialQueueData = [
  {
    id: 1,
    cafeteria: "Campus Cafeteria",
    status: "active",
    currentToken: "TKN-JOHN3748",
    queueLength: 12,
    waitTime: "8 min",
    tokens: [
      { token: "TKN-JOHN3748", status: "serving" },
      { token: "TKN-SARA5692", status: "waiting", position: 1 },
      { token: "TKN-MIKE9012", status: "waiting", position: 2 },
      { token: "TKN-LISA4567", status: "waiting", position: 3 },
    ],
    alerts: [{ id: 1, message: "High volume expected during lunch hour", type: "info" }],
  },
  {
    id: 2,
    cafeteria: "Tech Park Canteen",
    status: "active",
    currentToken: "TKN-EMMA2345",
    queueLength: 8,
    waitTime: "5 min",
    tokens: [
      { token: "TKN-EMMA2345", status: "serving" },
      { token: "TKN-ALEX6789", status: "waiting", position: 1 },
      { token: "TKN-RYAN1234", status: "waiting", position: 2 },
    ],
    alerts: [],
  },
  {
    id: 3,
    cafeteria: "Hospital Cafeteria",
    status: "closing",
    currentToken: "TKN-DAVE7890",
    queueLength: 3,
    waitTime: "2 min",
    tokens: [
      { token: "TKN-DAVE7890", status: "serving" },
      { token: "TKN-JANE5678", status: "waiting", position: 1 },
    ],
    alerts: [{ id: 1, message: "Closing in 30 minutes", type: "warning" }],
  },
  {
    id: 4,
    cafeteria: "Corporate Office",
    status: "closed",
    currentToken: "-",
    queueLength: 0,
    waitTime: "0 min",
    tokens: [],
    alerts: [],
  },
]

export function QueueStatus() {
  const [queueData, setQueueData] = useState(initialQueueData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedToken, setSelectedToken] = useState("")
  const [showTokenDialog, setShowTokenDialog] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueData((prevData) =>
        prevData.map((queue) => {
          if (queue.status !== "active") return queue

          // Randomly update wait time
          const waitMinutes = Number.parseInt(queue.waitTime.split(" ")[0])
          const newWaitMinutes = Math.max(0, waitMinutes + (Math.random() > 0.7 ? -1 : 0))
          const newWaitTime = `${newWaitMinutes} min`

          // Randomly update queue length
          const queueChange = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0
          const newQueueLength = Math.max(0, queue.queueLength + queueChange)

          // Randomly update tokens
          let newTokens = [...queue.tokens]
          if (Math.random() > 0.9 && queue.tokens.length > 1) {
            // Sometimes remove the serving token and promote the next one
            newTokens = queue.tokens
              .slice(1)
              .map((token, idx) =>
                idx === 0 ? { ...token, status: "serving" } : { ...token, position: (token.position || 0) - 1 },
              )
          }

          // Randomly add alerts
          const newAlerts = [...queue.alerts]
          if (Math.random() > 0.95 && queue.alerts.length < 2) {
            const alertMessages = [
              "Wait time increasing due to high demand",
              "New chef special available today",
              "Kitchen temporarily understaffed",
              "10% discount for orders placed in the next hour",
            ]
            newAlerts.push({
              id: Date.now(),
              message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
              type: Math.random() > 0.5 ? "info" : "warning",
            })
          }

          return {
            ...queue,
            waitTime: newWaitTime,
            queueLength: newQueueLength,
            tokens: newTokens,
            alerts: newAlerts,
          }
        }),
      )
      setLastUpdated(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredQueueData = queueData.filter(
    (queue) =>
      queue.cafeteria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      queue.tokens.some((token) => token.token.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      // Simulate a refresh by making a small change
      setQueueData(
        queueData.map((queue) => {
          if (queue.status === "active") {
            return {
              ...queue,
              waitTime: `${Math.max(1, Number.parseInt(queue.waitTime.split(" ")[0]) - 1)} min`,
            }
          }
          return queue
        }),
      )
      setLastUpdated(new Date())
      setRefreshing(false)
    }, 1000)
  }

  const handleViewToken = (token: string) => {
    setSelectedToken(token)
    setShowTokenDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by cafeteria or token..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing} className="w-full md:w-auto">
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredQueueData.map((queue) => (
          <Card key={queue.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{queue.cafeteria}</CardTitle>
                  <CardDescription>Current queue status and wait times.</CardDescription>
                </div>
                <Badge
                  variant={queue.status === "active" ? "success" : queue.status === "closing" ? "outline" : "secondary"}
                >
                  {queue.status === "active" ? "Active" : queue.status === "closing" ? "Closing Soon" : "Closed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">Queue Status</h4>
                      {queue.status === "active" && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Avg. wait: {queue.waitTime}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{queue.queueLength} in queue</span>
                  </div>
                  <Progress value={queue.status === "closed" ? 0 : (queue.queueLength / 20) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{queue.status === "closed" ? "Opens at 8:00 AM" : `Now serving: ${queue.currentToken}`}</span>
                    <span>{queue.status === "closed" ? "-" : `${queue.queueLength} waiting`}</span>
                  </div>
                </div>

                {queue.alerts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Alerts</h4>
                    <div className="space-y-2">
                      {queue.alerts.map((alert) => (
                        <AnimatePresence key={alert.id}>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`flex items-start gap-2 p-3 rounded-md ${
                              alert.type === "warning"
                                ? "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400"
                                : "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                            }`}
                          >
                            {alert.type === "warning" ? (
                              <AlertCircle className="h-4 w-4 mt-0.5" />
                            ) : (
                              <Bell className="h-4 w-4 mt-0.5" />
                            )}
                            <p className="text-sm">{alert.message}</p>
                          </motion.div>
                        </AnimatePresence>
                      ))}
                    </div>
                  </div>
                )}

                {queue.status !== "closed" && queue.tokens.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3">Current Queue</h4>
                    <div className="space-y-2">
                      {queue.tokens.map((tokenData) => (
                        <motion.div
                          key={tokenData.token}
                          initial={tokenData.status === "serving" ? { scale: 0.95 } : { opacity: 1 }}
                          animate={tokenData.status === "serving" ? { scale: 1 } : { opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-center justify-between border rounded-md p-3 ${
                            tokenData.status === "serving" ? "border-primary bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={tokenData.status === "serving" ? "default" : "outline"}
                              className="w-20 justify-center"
                            >
                              {tokenData.status === "serving" ? "Serving" : `#${tokenData.position}`}
                            </Badge>
                            <span className="font-medium">{tokenData.token}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleViewToken(tokenData.token)}>
                            <QrCode className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {queue.status === "closed" && (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-muted-foreground">This cafeteria is currently closed.</p>
                    <p className="text-sm text-muted-foreground mt-1">Opens tomorrow at 8:00 AM</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredQueueData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No cafeterias found matching your search.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
              Reset Search
            </Button>
          </div>
        )}
      </div>

      {showTokenDialog && (
        <TokenGeneratorDialog token={selectedToken} open={showTokenDialog} onClose={() => setShowTokenDialog(false)} />
      )}
    </div>
  )
}
