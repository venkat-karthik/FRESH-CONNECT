"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface QueueWidgetProps {
  className?: string
}

export function QueueWidget({ className }: QueueWidgetProps) {
  const [cafeterias, setCafeterias] = useState([
    {
      name: "Campus Cafeteria",
      status: "active",
      queueLength: 12,
      waitTime: "8 min",
      load: 60,
    },
    {
      name: "Tech Park Canteen",
      status: "active",
      queueLength: 8,
      waitTime: "5 min",
      load: 40,
    },
    {
      name: "Hospital Cafeteria",
      status: "closing",
      queueLength: 3,
      waitTime: "2 min",
      load: 15,
    },
    {
      name: "Corporate Office",
      status: "closed",
      queueLength: 0,
      waitTime: "0 min",
      load: 0,
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCafeterias((prev) =>
        prev.map((cafeteria) => {
          if (cafeteria.status !== "active") return cafeteria

          // Randomly update wait time and queue length
          const waitMinutes = Number.parseInt(cafeteria.waitTime.split(" ")[0])
          const newWaitMinutes = Math.max(0, waitMinutes + (Math.random() > 0.7 ? -1 : 0))
          const newWaitTime = `${newWaitMinutes} min`

          const queueChange = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0
          const newQueueLength = Math.max(0, cafeteria.queueLength + queueChange)
          const newLoad = Math.min(100, Math.max(0, (newQueueLength / 20) * 100))

          return {
            ...cafeteria,
            waitTime: newWaitTime,
            queueLength: newQueueLength,
            load: newLoad,
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Queue Status</CardTitle>
        <CardDescription>Current virtual queue status across cafeterias.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {cafeterias.map((cafeteria) => (
            <div key={cafeteria.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{cafeteria.name}</h4>
                  <Badge
                    variant={
                      cafeteria.status === "active"
                        ? "success"
                        : cafeteria.status === "closing"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {cafeteria.status === "active"
                      ? "Active"
                      : cafeteria.status === "closing"
                        ? "Closing Soon"
                        : "Closed"}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{cafeteria.queueLength} in queue</span>
              </div>
              <Progress value={cafeteria.load} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {cafeteria.status === "closed" ? (
                    "Opens at 8:00 AM"
                  ) : (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Avg. wait: {cafeteria.waitTime}
                    </span>
                  )}
                </span>
                <span>{cafeteria.status === "closed" ? "-" : `${cafeteria.queueLength} waiting`}</span>
              </div>
            </div>
          ))}

          <Link href="/queue" passHref>
            <Button variant="outline" className="w-full">
              View Queue Management
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
