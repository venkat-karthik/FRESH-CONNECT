"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

// Sample crop data
type CropEvent = {
  name: string
  action: string
  variant: "default" | "success" | "outline"
}

type CropData = {
  [key: string]: CropEvent[]
}

const cropData: CropData = {
  "2023-05-01": [
    { name: "Tomatoes", action: "Planting", variant: "default" },
    { name: "Carrots", action: "Harvesting", variant: "success" },
  ],
  "2023-05-05": [{ name: "Lettuce", action: "Harvesting", variant: "success" }],
  "2023-05-10": [
    { name: "Potatoes", action: "Planting", variant: "default" },
    { name: "Spinach", action: "Maintenance", variant: "outline" },
  ],
  "2023-05-15": [
    { name: "Cucumbers", action: "Harvesting", variant: "success" },
    { name: "Bell Peppers", action: "Planting", variant: "default" },
  ],
  "2023-05-20": [{ name: "Strawberries", action: "Maintenance", variant: "outline" }],
  "2023-05-25": [{ name: "Onions", action: "Harvesting", variant: "success" }],
}

export function CropCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDateStr, setSelectedDateStr] = useState<string>(new Date().toISOString().split("T")[0])

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0]
      setSelectedDateStr(dateStr)
    }
  }

  // Get events for the selected date
  const selectedDateEvents = cropData[selectedDateStr] || []

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Crop Calendar</CardTitle>
          <CardDescription>Plan your planting and harvesting schedule based on seasons.</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={handleSelect} className="rounded-md border" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Crop Activities</CardTitle>
          <CardDescription>Activities scheduled for {date?.toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">{event.action}</p>
                  </div>
                  <Badge variant={event.variant}>{event.action}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center">
              <p className="text-muted-foreground">No activities scheduled for this date</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
