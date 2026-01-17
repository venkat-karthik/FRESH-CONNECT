"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AdminSettingsPage() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  // System settings
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "The system is currently undergoing maintenance. Please check back later.",
  )
  const [systemVersion, setSystemVersion] = useState("1.0.0")
  const [debugMode, setDebugMode] = useState(false)

  // User management
  const [defaultUserRole, setDefaultUserRole] = useState("customer")
  const [userRegistrationEnabled, setUserRegistrationEnabled] = useState(true)
  const [requireEmailVerification, setRequireEmailVerification] = useState(true)
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5")

  // API settings
  const [apiRateLimit, setApiRateLimit] = useState("100")
  const [apiTimeout, setApiTimeout] = useState("30")
  const [enableExternalApi, setEnableExternalApi] = useState(false)
  const [apiKey, setApiKey] = useState("sk_test_12345678901234567890")

  // Redirect non-admin users
  if (!isAdmin) {
    router.push("/settings")
    return null
  }

  const handleSystemSubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved system settings:", {
          maintenanceMode,
          maintenanceMessage,
          systemVersion,
          debugMode,
        })
        resolve()
      }, 1000)
    })
  }

  const handleUserManagementSubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved user management settings:", {
          defaultUserRole,
          userRegistrationEnabled,
          requireEmailVerification,
          maxLoginAttempts,
        })
        resolve()
      }, 1000)
    })
  }

  const handleApiSubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved API settings:", {
          apiRateLimit,
          apiTimeout,
          enableExternalApi,
          apiKey: "********", // Don't log actual API key
        })
        resolve()
      }, 1000)
    })
  }

  const generateNewApiKey = () => {
    // Simulate generating a new API key
    const newKey =
      "sk_test_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setApiKey(newKey)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Admin Settings</h3>
        <p className="text-sm text-muted-foreground">Configure system-wide settings and administrative options.</p>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          These settings affect the entire system. Changes should be made with caution.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="mt-6">
          <SettingsForm
            title="System Settings"
            description="Configure global system settings and maintenance options."
            onSubmit={handleSystemSubmit}
          >
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the system in maintenance mode to prevent user access
                  </p>
                </div>
                <Switch id="maintenanceMode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>

              {maintenanceMode && (
                <div className="grid gap-2">
                  <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                  <Textarea
                    id="maintenanceMessage"
                    value={maintenanceMessage}
                    onChange={(e) => setMaintenanceMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="systemVersion">System Version</Label>
                <Input
                  id="systemVersion"
                  value={systemVersion}
                  onChange={(e) => setSystemVersion(e.target.value)}
                  placeholder="1.0.0"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable detailed error messages and logging</p>
                </div>
                <Switch id="debugMode" checked={debugMode} onCheckedChange={setDebugMode} />
              </div>

              <div className="grid gap-2">
                <Label>System Actions</Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" className="flex-1">
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Rebuild Index
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Reset System
                  </Button>
                </div>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <SettingsForm
            title="User Management Settings"
            description="Configure user registration and authentication options."
            onSubmit={handleUserManagementSubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="defaultUserRole">Default User Role</Label>
                <Select value={defaultUserRole} onValueChange={setDefaultUserRole}>
                  <SelectTrigger id="defaultUserRole">
                    <SelectValue placeholder="Select default role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="restaurant">Restaurant Manager</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="userRegistrationEnabled">User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                </div>
                <Switch
                  id="userRegistrationEnabled"
                  checked={userRegistrationEnabled}
                  onCheckedChange={setUserRegistrationEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireEmailVerification">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">Require email verification before account activation</p>
                </div>
                <Switch
                  id="requireEmailVerification"
                  checked={requireEmailVerification}
                  onCheckedChange={setRequireEmailVerification}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={maxLoginAttempts}
                  onChange={(e) => setMaxLoginAttempts(e.target.value)}
                  min="1"
                  max="10"
                />
                <p className="text-xs text-muted-foreground">Number of failed login attempts before account lockout</p>
              </div>

              <div className="grid gap-2">
                <Label>User Management Actions</Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" className="flex-1">
                    Export Users
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Unlock Accounts
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Send Announcement
                  </Button>
                </div>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <SettingsForm
            title="API Settings"
            description="Configure API access and rate limiting."
            onSubmit={handleApiSubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="apiRateLimit">API Rate Limit (requests per minute)</Label>
                <Input
                  id="apiRateLimit"
                  type="number"
                  value={apiRateLimit}
                  onChange={(e) => setApiRateLimit(e.target.value)}
                  min="10"
                  max="1000"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="apiTimeout">API Timeout (seconds)</Label>
                <Input
                  id="apiTimeout"
                  type="number"
                  value={apiTimeout}
                  onChange={(e) => setApiTimeout(e.target.value)}
                  min="5"
                  max="120"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableExternalApi">External API Access</Label>
                  <p className="text-sm text-muted-foreground">Allow external applications to access the API</p>
                </div>
                <Switch id="enableExternalApi" checked={enableExternalApi} onCheckedChange={setEnableExternalApi} />
              </div>

              {enableExternalApi && (
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Button variant="outline" size="sm" onClick={generateNewApiKey}>
                      Generate New Key
                    </Button>
                  </div>
                  <div className="flex">
                    <Input id="apiKey" value={apiKey} readOnly className="font-mono text-xs" />
                    <Button
                      variant="ghost"
                      className="ml-2"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey)
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep this key secret. It provides full access to the API.
                  </p>
                </div>
              )}

              <div className="grid gap-2">
                <Label>API Documentation</Label>
                <div className="rounded-md border p-4">
                  <p className="text-sm">
                    API documentation is available at{" "}
                    <a href="#" className="text-primary underline">
                      https://api.freshserve.com/docs
                    </a>
                  </p>
                  <p className="mt-2 text-sm">
                    Swagger UI is available at{" "}
                    <a href="#" className="text-primary underline">
                      https://api.freshserve.com/swagger
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>
      </Tabs>
    </div>
  )
}
