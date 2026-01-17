"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function NotificationsSettingsPage() {
  // General notification settings
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [notificationSound, setNotificationSound] = useState(true)
  const [notificationPosition, setNotificationPosition] = useState("top-right")
  const [autoHideTimeout, setAutoHideTimeout] = useState([5])
  const [maxVisibleNotifications, setMaxVisibleNotifications] = useState("3")

  // Notification types
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [queueUpdates, setQueueUpdates] = useState(true)
  const [inventoryAlerts, setInventoryAlerts] = useState(true)
  const [paymentNotifications, setPaymentNotifications] = useState(true)
  const [systemAnnouncements, setSystemAnnouncements] = useState(true)

  // Delivery methods
  const [highPriorityMethod, setHighPriorityMethod] = useState("both")
  const [mediumPriorityMethod, setMediumPriorityMethod] = useState("app")
  const [lowPriorityMethod, setLowPriorityMethod] = useState("app")

  const handleSubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved notification settings:", {
          enableNotifications,
          notificationSound,
          notificationPosition,
          autoHideTimeout,
          maxVisibleNotifications,
          orderUpdates,
          queueUpdates,
          inventoryAlerts,
          paymentNotifications,
          systemAnnouncements,
          highPriorityMethod,
          mediumPriorityMethod,
          lowPriorityMethod,
        })
        resolve()
      }, 1000)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">Customize how you receive notifications and alerts.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="types">Notification Types</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <SettingsForm
            title="General Notification Settings"
            description="Configure how notifications appear and behave."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNotifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Turn all notifications on or off</p>
                </div>
                <Switch
                  id="enableNotifications"
                  checked={enableNotifications}
                  onCheckedChange={setEnableNotifications}
                />
              </div>

              {enableNotifications && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notificationSound">Notification Sound</Label>
                      <p className="text-sm text-muted-foreground">Play a sound when notifications arrive</p>
                    </div>
                    <Switch id="notificationSound" checked={notificationSound} onCheckedChange={setNotificationSound} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notificationPosition">Notification Position</Label>
                    <Select value={notificationPosition} onValueChange={setNotificationPosition}>
                      <SelectTrigger id="notificationPosition">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="autoHideTimeout">Auto-hide Timeout (seconds)</Label>
                      <span className="text-sm text-muted-foreground">{autoHideTimeout[0]}</span>
                    </div>
                    <Slider
                      id="autoHideTimeout"
                      value={autoHideTimeout}
                      onValueChange={setAutoHideTimeout}
                      min={0}
                      max={15}
                      step={1}
                    />
                    <p className="text-xs text-muted-foreground">Set to 0 to disable auto-hide</p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="maxVisibleNotifications">Maximum Visible Notifications</Label>
                    <Select value={maxVisibleNotifications} onValueChange={setMaxVisibleNotifications}>
                      <SelectTrigger id="maxVisibleNotifications">
                        <SelectValue placeholder="Select maximum" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <SettingsForm
            title="Notification Types"
            description="Choose which types of notifications you want to receive."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderUpdates">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications about order status changes</p>
                </div>
                <Switch id="orderUpdates" checked={orderUpdates} onCheckedChange={setOrderUpdates} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="queueUpdates">Queue Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications about your position in the queue</p>
                </div>
                <Switch id="queueUpdates" checked={queueUpdates} onCheckedChange={setQueueUpdates} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="inventoryAlerts">Inventory Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications about low stock or new inventory</p>
                </div>
                <Switch id="inventoryAlerts" checked={inventoryAlerts} onCheckedChange={setInventoryAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="paymentNotifications">Payment Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notifications about payments and transactions</p>
                </div>
                <Switch
                  id="paymentNotifications"
                  checked={paymentNotifications}
                  onCheckedChange={setPaymentNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="systemAnnouncements">System Announcements</Label>
                  <p className="text-sm text-muted-foreground">Important system-wide announcements</p>
                </div>
                <Switch
                  id="systemAnnouncements"
                  checked={systemAnnouncements}
                  onCheckedChange={setSystemAnnouncements}
                />
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="delivery" className="mt-6">
          <SettingsForm
            title="Delivery Methods"
            description="Configure how different priority notifications are delivered."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label>High Priority Notifications</Label>
                <p className="text-sm text-muted-foreground mb-2">Critical alerts that require immediate attention</p>
                <RadioGroup value={highPriorityMethod} onValueChange={setHighPriorityMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="high-app" />
                    <Label htmlFor="high-app">App only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="high-email" />
                    <Label htmlFor="high-email">Email only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="high-both" />
                    <Label htmlFor="high-both">Both app and email</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label>Medium Priority Notifications</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Important updates that don't require immediate action
                </p>
                <RadioGroup value={mediumPriorityMethod} onValueChange={setMediumPriorityMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="medium-app" />
                    <Label htmlFor="medium-app">App only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="medium-email" />
                    <Label htmlFor="medium-email">Email only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="medium-both" />
                    <Label htmlFor="medium-both">Both app and email</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label>Low Priority Notifications</Label>
                <p className="text-sm text-muted-foreground mb-2">General information and non-urgent updates</p>
                <RadioGroup value={lowPriorityMethod} onValueChange={setLowPriorityMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="low-app" />
                    <Label htmlFor="low-app">App only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="low-email" />
                    <Label htmlFor="low-email">Email only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="low-both" />
                    <Label htmlFor="low-both">Both app and email</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>
      </Tabs>
    </div>
  )
}
