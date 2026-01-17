"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CloudIcon as CloudSync } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useCustomTheme } from "@/contexts/theme-context"

export function SettingsSync() {
  const [isSyncing, setIsSyncing] = useState(false)
  const { syncSettings } = useCustomTheme()

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await syncSettings()
      toast({
        title: "Settings synced",
        description: "Your settings have been synced across all devices.",
      })
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Failed to sync settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
      {isSyncing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Syncing...
        </>
      ) : (
        <>
          <CloudSync className="mr-2 h-4 w-4" />
          Sync Settings
        </>
      )}
    </Button>
  )
}
