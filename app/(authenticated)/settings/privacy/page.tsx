"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"

export default function PrivacySettingsPage() {
  // Data sharing settings
  const [shareUsageData, setShareUsageData] = useState(true)
  const [shareLocationData, setShareLocationData] = useState(false)
  const [allowPersonalization, setAllowPersonalization] = useState(true)

  // Visibility settings
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [orderHistoryVisibility, setOrderHistoryVisibility] = useState(false)
  const [activityStatusVisibility, setActivityStatusVisibility] = useState(true)

  // Data management
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState("90")

  const handleSubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved privacy settings:", {
          shareUsageData,
          shareLocationData,
          allowPersonalization,
          profileVisibility,
          orderHistoryVisibility,
          activityStatusVisibility,
          dataRetentionPeriod,
        })
        resolve()
      }, 1000)
    })
  }

  const handleDataExport = () => {
    // Simulate data export
    console.log("Exporting user data...")
    // In a real app, this would trigger a backend process to generate and provide a download
  }

  const handleDataDeletion = () => {
    // Simulate data deletion
    console.log("Requesting data deletion...")
    // In a real app, this would trigger a backend process to delete user data
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Privacy Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your privacy preferences and data sharing options.</p>
      </div>

      <Tabs defaultValue="sharing" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sharing">Data Sharing</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
          <TabsTrigger value="management">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="sharing" className="mt-6">
          <SettingsForm
            title="Data Sharing Settings"
            description="Control how your data is shared and used."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareUsageData">Share Usage Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect anonymous usage data to improve our services
                  </p>
                </div>
                <Switch id="shareUsageData" checked={shareUsageData} onCheckedChange={setShareUsageData} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shareLocationData">Share Location Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to use your location for nearby cafeteria recommendations
                  </p>
                </div>
                <Switch id="shareLocationData" checked={shareLocationData} onCheckedChange={setShareLocationData} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowPersonalization">Allow Personalization</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to personalize your experience based on your preferences
                  </p>
                </div>
                <Switch
                  id="allowPersonalization"
                  checked={allowPersonalization}
                  onCheckedChange={setAllowPersonalization}
                />
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="visibility" className="mt-6">
          <SettingsForm
            title="Visibility Settings"
            description="Control what information is visible to others."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Allow others to see your profile information</p>
                </div>
                <Switch id="profileVisibility" checked={profileVisibility} onCheckedChange={setProfileVisibility} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderHistoryVisibility">Order History Visibility</Label>
                  <p className="text-sm text-muted-foreground">Allow restaurant staff to see your past orders</p>
                </div>
                <Switch
                  id="orderHistoryVisibility"
                  checked={orderHistoryVisibility}
                  onCheckedChange={setOrderHistoryVisibility}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activityStatusVisibility">Activity Status</Label>
                  <p className="text-sm text-muted-foreground">Show when you're active on the platform</p>
                </div>
                <Switch
                  id="activityStatusVisibility"
                  checked={activityStatusVisibility}
                  onCheckedChange={setActivityStatusVisibility}
                />
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="management" className="mt-6">
          <SettingsForm
            title="Data Management"
            description="Manage your data retention, export, and deletion options."
            onSubmit={handleSubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="dataRetentionPeriod">Data Retention Period (days)</Label>
                <Input
                  id="dataRetentionPeriod"
                  type="number"
                  value={dataRetentionPeriod}
                  onChange={(e) => setDataRetentionPeriod(e.target.value)}
                  min="30"
                  max="365"
                />
                <p className="text-xs text-muted-foreground">How long we keep your activity data (minimum 30 days)</p>
              </div>

              <div className="grid gap-2">
                <Label>Export Your Data</Label>
                <p className="text-sm text-muted-foreground mb-2">Download a copy of all your personal data</p>
                <Button onClick={handleDataExport} variant="outline">
                  Export Data
                </Button>
              </div>

              <div className="grid gap-2">
                <Label>Delete Your Data</Label>
                <p className="text-sm text-muted-foreground mb-2">Request permanent deletion of all your data</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete All Data</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your data and remove your account
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDataDeletion}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>
      </Tabs>
    </div>
  )
}
