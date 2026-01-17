"use client"

import { useCustomTheme } from "@/contexts/theme-context"
import { SettingsForm } from "@/components/settings/settings-form"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme()
  const {
    accentColor,
    setAccentColor,
    borderRadius,
    setBorderRadius,
    compactMode,
    setCompactMode,
    fullWidth,
    setFullWidth,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    lineHeight,
    setLineHeight,
    sidebarPosition,
    setSidebarPosition,
    syncSettings,
  } = useCustomTheme()

  const handleThemeSubmit = async () => {
    // Theme is handled by the useTheme hook
    return Promise.resolve()
  }

  const handleLayoutSubmit = async () => {
    // Layout settings are handled by the theme context
    return Promise.resolve()
  }

  const handleFontSubmit = async () => {
    // Font settings are handled by the theme context
    return Promise.resolve()
  }

  const handleSyncSettings = async () => {
    try {
      await syncSettings()
      toast({
        title: "Settings synced",
        description: "Your appearance settings have been synced across devices.",
      })
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Failed to sync settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Appearance Settings</h3>
          <p className="text-sm text-muted-foreground">Customize the look and feel of the application.</p>
        </div>
        <Button onClick={handleSyncSettings} variant="outline">
          Sync Settings
        </Button>
      </div>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="font">Typography</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="mt-6">
          <SettingsForm
            title="Theme Settings"
            description="Customize the color scheme and visual style."
            onSubmit={handleThemeSubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label>Color Theme</Label>
                <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="light" id="theme-light" className="sr-only peer" />
                    <Label
                      htmlFor="theme-light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-16 rounded-md bg-[#f8fafc] border"></div>
                      <p className="text-center text-sm font-medium">Light</p>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="theme-dark" className="sr-only peer" />
                    <Label
                      htmlFor="theme-dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-16 rounded-md bg-[#1e293b]"></div>
                      <p className="text-center text-sm font-medium">Dark</p>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="theme-system" className="sr-only peer" />
                    <Label
                      htmlFor="theme-system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-16 rounded-md bg-gradient-to-r from-[#f8fafc] to-[#1e293b]"></div>
                      <p className="text-center text-sm font-medium">System</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label>Accent Color</Label>
                <RadioGroup value={accentColor} onValueChange={setAccentColor} className="grid grid-cols-4 gap-4">
                  <div>
                    <RadioGroupItem value="green" id="color-green" className="sr-only peer" />
                    <Label
                      htmlFor="color-green"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-8 w-8 rounded-full bg-green-500"></div>
                      <p className="text-center text-xs font-medium">Green</p>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="blue" id="color-blue" className="sr-only peer" />
                    <Label
                      htmlFor="color-blue"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-8 w-8 rounded-full bg-blue-500"></div>
                      <p className="text-center text-xs font-medium">Blue</p>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="purple" id="color-purple" className="sr-only peer" />
                    <Label
                      htmlFor="color-purple"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-8 w-8 rounded-full bg-purple-500"></div>
                      <p className="text-center text-xs font-medium">Purple</p>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="orange" id="color-orange" className="sr-only peer" />
                    <Label
                      htmlFor="color-orange"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-8 w-8 rounded-full bg-orange-500"></div>
                      <p className="text-center text-xs font-medium">Orange</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="borderRadius">Border Radius</Label>
                  <span className="text-sm text-muted-foreground">{borderRadius}px</span>
                </div>
                <Slider
                  id="borderRadius"
                  value={[borderRadius]}
                  onValueChange={(value) => setBorderRadius(value[0])}
                  min={0}
                  max={20}
                  step={1}
                />
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="layout" className="mt-6">
          <SettingsForm
            title="Layout Settings"
            description="Customize the layout and spacing of the interface."
            onSubmit={handleLayoutSubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label>Sidebar Position</Label>
                <RadioGroup
                  value={sidebarPosition}
                  onValueChange={setSidebarPosition}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="left" id="sidebar-left" className="sr-only peer" />
                    <Label
                      htmlFor="sidebar-left"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-16 flex">
                        <div className="w-1/4 bg-primary/20"></div>
                        <div className="w-3/4"></div>
                      </div>
                      <p className="text-center text-sm font-medium">Left</p>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="right" id="sidebar-right" className="sr-only peer" />
                    <Label
                      htmlFor="sidebar-right"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-16 flex">
                        <div className="w-3/4"></div>
                        <div className="w-1/4 bg-primary/20"></div>
                      </div>
                      <p className="text-center text-sm font-medium">Right</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compactMode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Reduce spacing and padding throughout the interface</p>
                </div>
                <Switch id="compactMode" checked={compactMode} onCheckedChange={setCompactMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="fullWidth">Full Width Layout</Label>
                  <p className="text-sm text-muted-foreground">Expand content to fill the entire screen width</p>
                </div>
                <Switch id="fullWidth" checked={fullWidth} onCheckedChange={setFullWidth} />
              </div>
            </div>
          </SettingsForm>
        </TabsContent>

        <TabsContent value="font" className="mt-6">
          <SettingsForm
            title="Typography Settings"
            description="Customize the fonts and text appearance."
            onSubmit={handleFontSubmit}
          >
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger id="fontFamily">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System Default</SelectItem>
                    <SelectItem value="sans">Sans Serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="lineHeight">Line Height</Label>
                  <span className="text-sm text-muted-foreground">{lineHeight}</span>
                </div>
                <Slider
                  id="lineHeight"
                  value={[lineHeight]}
                  onValueChange={(value) => setLineHeight(value[0])}
                  min={1}
                  max={2}
                  step={0.1}
                />
                <div
                  className="mt-2 p-4 border rounded-md"
                  style={{ lineHeight: lineHeight, fontFamily: getFontFamilyValue(fontFamily) }}
                >
                  <p className="font-medium">Sample Text</p>
                  <p>
                    This is a sample paragraph to demonstrate the line height setting. You can adjust the slider to see
                    how different line height values affect the readability of text in the application.
                  </p>
                </div>
              </div>
            </div>
          </SettingsForm>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

function getFontFamilyValue(fontFamily: string): string {
  switch (fontFamily) {
    case "sans":
      return "Arial, Helvetica, sans-serif"
    case "serif":
      return "Georgia, 'Times New Roman', serif"
    case "mono":
      return "Menlo, Monaco, 'Courier New', monospace"
    default:
      return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  }
}
