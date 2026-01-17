"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { useAuth } from "@/contexts/auth-context"

export default function AccountSettingsPage() {
  const { user } = useAuth()

  // Profile settings
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [bio, setBio] = useState(user?.bio || "")

  // Security settings
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Preferences
  const [role, setRole] = useState(user?.role || "customer")
  const [preferredCafeteria, setPreferredCafeteria] = useState("")
  const [dietaryPreferences, setDietaryPreferences] = useState("")

  const handleProfileSubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved profile settings:", {
          name,
          email,
          phone,
          bio,
        })
        resolve()
      }, 1000)
    })
  }

  const handleSecuritySubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (newPassword !== confirmPassword) {
          reject(new Error("Passwords do not match"))
          return
        }

        console.log("Saved security settings:", {
          currentPassword: "********", // Don't log actual password
          newPassword: "********", // Don't log actual password
          twoFactorEnabled,
        })

        // Clear password fields
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")

        resolve()
      }, 1000)
    })
  }

  const handlePreferencesSubmit = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saved preferences:", {
          role,
          preferredCafeteria,
          dietaryPreferences,
        })
        resolve()
      }, 1000)
    })
  }

  const handleDeactivateAccount = () => {
    // Simulate account deactivation
    console.log("Deactivating account...")
    // In a real app, this would trigger a backend process to deactivate the account
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account information, security, and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <SettingsForm
            title="Profile Information"
            description="Update your account profile information."
            onSubmit={handleProfileSubmit}
          >
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="text-lg">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="A short bio about yourself"
                />
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SettingsForm
            title="Security Settings"
            description="Update your password and security preferences."
            onSubmit={handleSecuritySubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Your current password"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Your new password"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="grid gap-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={twoFactorEnabled ? "default" : "outline"}
                    onClick={() => setTwoFactorEnabled(true)}
                    className="flex-1"
                  >
                    Enable
                  </Button>
                  <Button
                    variant={!twoFactorEnabled ? "default" : "outline"}
                    onClick={() => setTwoFactorEnabled(false)}
                    className="flex-1"
                  >
                    Disable
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Two-factor authentication adds an extra layer of security to your account
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Account Deactivation</Label>
                <p className="text-sm text-muted-foreground mb-2">Temporarily deactivate your account</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Deactivate Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Your account will be deactivated and you won't be able to access the platform until you
                        reactivate it by logging in again.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeactivateAccount}>Deactivate</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <SettingsForm
            title="Account Preferences"
            description="Set your role and preferences for a personalized experience."
            onSubmit={handlePreferencesSubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="role">Primary Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your primary role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="restaurant">Restaurant Manager</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This determines your default view and available features
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="preferredCafeteria">Preferred Cafeteria</Label>
                <Select value={preferredCafeteria} onValueChange={setPreferredCafeteria}>
                  <SelectTrigger id="preferredCafeteria">
                    <SelectValue placeholder="Select your preferred cafeteria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campus-main">Campus Main</SelectItem>
                    <SelectItem value="tech-hub">Tech Hub</SelectItem>
                    <SelectItem value="business-center">Business Center</SelectItem>
                    <SelectItem value="medical-wing">Medical Wing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                <Select value={dietaryPreferences} onValueChange={setDietaryPreferences}>
                  <SelectTrigger id="dietaryPreferences">
                    <SelectValue placeholder="Select your dietary preferences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Restrictions</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten Free</SelectItem>
                    <SelectItem value="dairy-free">Dairy Free</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>
      </Tabs>
    </div>
  )
}
