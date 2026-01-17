"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsSync } from "@/components/settings/settings-sync"

export default function GeneralSettingsPage() {
  // System settings
  const [language, setLanguage] = useState("english")
  const [timezone, setTimezone] = useState("UTC")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
  const [timeFormat, setTimeFormat] = useState("12h")

  // Session settings
  const [autoLogout, setAutoLogout] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [rememberMe, setRememberMe] = useState(true)

  // Accessibility settings
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const handleSubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved general settings:", {
          language,
          timezone,
          dateFormat,
          timeFormat,
          autoLogout,
          sessionTimeout,
          rememberMe,
          highContrast,
          largeText,
          reduceMotion,
        })
        resolve()
      }, 1000)
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">General Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure your basic application preferences and system settings.
          </p>
        </div>
        <SettingsSync />
      </div>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="session">Session</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="mt-6">
          <SettingsForm
            title="System Settings"
            description="Configure language, timezone, and date/time formats."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                    <SelectItem value="CST">Central Time (CST)</SelectItem>
                    <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                    <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                    <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timeFormat">Time Format</Label>
                <Select value={timeFormat} onValueChange={setTimeFormat}>
                  <SelectTrigger id="timeFormat">
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="session" className="mt-6">
          <SettingsForm
            title="Session Settings"
            description="Configure session timeout and login preferences."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoLogout">Auto Logout</Label>
                  <p className="text-sm text-muted-foreground">Automatically log out after a period of inactivity</p>
                </div>
                <Switch id="autoLogout" checked={autoLogout} onCheckedChange={setAutoLogout} />
              </div>

              {autoLogout && (
                <div className="grid gap-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    min="1"
                    max="120"
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rememberMe">Remember Me</Label>
                  <p className="text-sm text-muted-foreground">Stay logged in between sessions</p>
                </div>
                <Switch id="rememberMe" checked={rememberMe} onCheckedChange={setRememberMe} />
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="accessibility" className="mt-6">
          <SettingsForm
            title="Accessibility Settings"
            description="Configure accessibility preferences for a better experience."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="highContrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch id="highContrast" checked={highContrast} onCheckedChange={setHighContrast} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="largeText">Large Text</Label>
                  <p className="text-sm text-muted-foreground">Increase text size throughout the application</p>
                </div>
                <Switch id="largeText" checked={largeText} onCheckedChange={setLargeText} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduceMotion">Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch id="reduceMotion" checked={reduceMotion} onCheckedChange={setReduceMotion} />
              </div>
            </div>
          </SettingsForm>
        </TabsContent>
      </Tabs>
    </div>
  )
}
