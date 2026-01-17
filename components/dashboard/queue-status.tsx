"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface QueueStatusProps {
  className?: string
}

export function QueueStatus({ className }: QueueStatusProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Queue Status</CardTitle>
        <CardDescription>Current virtual queue status across cafeterias.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Campus Cafeteria</h4>
                <Badge variant="success">Active</Badge>
              </div>
              <span className="text-sm text-muted-foreground">12 in queue</span>
            </div>
            <Progress value={60} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Avg. wait: 8 min</span>
              <span>Now serving: TKN-JOHN3748</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Tech Park Canteen</h4>
                <Badge variant="success">Active</Badge>
              </div>
              <span className="text-sm text-muted-foreground">8 in queue</span>
            </div>
            <Progress value={40} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Avg. wait: 5 min</span>
              <span>Now serving: TKN-SARA5692</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Hospital Cafeteria</h4>
                <Badge variant="outline">Closing Soon</Badge>
              </div>
              <span className="text-sm text-muted-foreground">3 in queue</span>
            </div>
            <Progress value={15} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Avg. wait: 2 min</span>
              <span>Now serving: TKN-MIKE9012</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">Corporate Office</h4>
                <Badge variant="outline">Closed</Badge>
              </div>
              <span className="text-sm text-muted-foreground">0 in queue</span>
            </div>
            <Progress value={0} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Opens at 8:00 AM</span>
              <span>-</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
