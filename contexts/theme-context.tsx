"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useTheme } from "next-themes"

type AccentColor = "green" | "blue" | "purple" | "orange"

type ThemeContextType = {
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
  borderRadius: number
  setBorderRadius: (radius: number) => void
  compactMode: boolean
  setCompactMode: (compact: boolean) => void
  fullWidth: boolean
  setFullWidth: (fullWidth: boolean) => void
  fontSize: "small" | "medium" | "large"
  setFontSize: (size: "small" | "medium" | "large") => void
  fontFamily: "system" | "sans" | "serif" | "mono"
  setFontFamily: (family: "system" | "sans" | "serif" | "mono") => void
  lineHeight: number
  setLineHeight: (height: number) => void
  sidebarPosition: "left" | "right"
  setSidebarPosition: (position: "left" | "right") => void
  syncSettings: () => Promise<void>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme()
  const [accentColor, setAccentColorState] = useState<AccentColor>("green")
  const [borderRadius, setBorderRadiusState] = useState(8)
  const [compactMode, setCompactModeState] = useState(false)
  const [fullWidth, setFullWidthState] = useState(false)
  const [fontSize, setFontSizeState] = useState<"small" | "medium" | "large">("medium")
  const [fontFamily, setFontFamilyState] = useState<"system" | "sans" | "serif" | "mono">("system")
  const [lineHeight, setLineHeightState] = useState(1.5)
  const [sidebarPosition, setSidebarPositionState] = useState<"left" | "right">("left")

  // Load settings from localStorage on initial render
  useEffect(() => {
    const loadSettings = () => {
      try {
        const storedSettings = localStorage.getItem("freshserve-theme-settings")
        if (storedSettings) {
          const settings = JSON.parse(storedSettings)
          setAccentColorState(settings.accentColor || "green")
          setBorderRadiusState(settings.borderRadius || 8)
          setCompactModeState(settings.compactMode || false)
          setFullWidthState(settings.fullWidth || false)
          setFontSizeState(settings.fontSize || "medium")
          setFontFamilyState(settings.fontFamily || "system")
          setLineHeightState(settings.lineHeight || 1.5)
          setSidebarPositionState(settings.sidebarPosition || "left")
        }
      } catch (error) {
        console.error("Error loading theme settings:", error)
        // Reset to defaults if there's an error
        localStorage.removeItem("freshserve-theme-settings")
      }
    }

    loadSettings()
  }, [])

  // Apply theme settings to the document
  useEffect(() => {
    // Apply accent color
    document.documentElement.style.setProperty("--accent-color", getAccentColorValue(accentColor))
    document.documentElement.setAttribute("data-accent-color", accentColor)

    // Apply border radius
    document.documentElement.style.setProperty("--radius", `${borderRadius}px`)

    // Apply compact mode
    document.documentElement.classList.toggle("compact-mode", compactMode)

    // Apply full width
    document.documentElement.classList.toggle("full-width", fullWidth)

    // Apply font size
    document.documentElement.setAttribute("data-font-size", fontSize)
    const fontSizeValue = fontSize === "small" ? "0.875rem" : fontSize === "large" ? "1.125rem" : "1rem"
    document.documentElement.style.setProperty("--font-size", fontSizeValue)

    // Apply font family
    let fontFamilyValue = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    if (fontFamily === "sans") {
      fontFamilyValue = "Arial, Helvetica, sans-serif"
    } else if (fontFamily === "serif") {
      fontFamilyValue = "Georgia, 'Times New Roman', serif"
    } else if (fontFamily === "mono") {
      fontFamilyValue = "Menlo, Monaco, 'Courier New', monospace"
    }
    document.documentElement.style.setProperty("--font-family", fontFamilyValue)

    // Apply line height
    document.documentElement.style.setProperty("--line-height", lineHeight.toString())

    // Apply sidebar position
    document.documentElement.setAttribute("data-sidebar-position", sidebarPosition)
  }, [accentColor, borderRadius, compactMode, fullWidth, fontSize, fontFamily, lineHeight, sidebarPosition])

  // Helper function to get CSS color value
  function getAccentColorValue(color: AccentColor): string {
    switch (color) {
      case "green":
        return "var(--green-500, #10b981)"
      case "blue":
        return "var(--blue-500, #3b82f6)"
      case "purple":
        return "var(--purple-500, #8b5cf6)"
      case "orange":
        return "var(--orange-500, #f97316)"
      default:
        return "var(--green-500, #10b981)"
    }
  }

  // Save settings to localStorage
  const saveSettings = () => {
    const settings = {
      accentColor,
      borderRadius,
      compactMode,
      fullWidth,
      fontSize,
      fontFamily,
      lineHeight,
      sidebarPosition,
    }
    localStorage.setItem("freshserve-theme-settings", JSON.stringify(settings))
  }

  // Wrapper functions to update state and save to localStorage
  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color)
    setTimeout(saveSettings, 0)
  }

  const setBorderRadius = (radius: number) => {
    setBorderRadiusState(radius)
    setTimeout(saveSettings, 0)
  }

  const setCompactMode = (compact: boolean) => {
    setCompactModeState(compact)
    setTimeout(saveSettings, 0)
  }

  const setFullWidth = (full: boolean) => {
    setFullWidthState(full)
    setTimeout(saveSettings, 0)
  }

  const setFontSize = (size: "small" | "medium" | "large") => {
    setFontSizeState(size)
    setTimeout(saveSettings, 0)
  }

  const setFontFamily = (family: "system" | "sans" | "serif" | "mono") => {
    setFontFamilyState(family)
    setTimeout(saveSettings, 0)
  }

  const setLineHeight = (height: number) => {
    setLineHeightState(height)
    setTimeout(saveSettings, 0)
  }

  const setSidebarPosition = (position: "left" | "right") => {
    setSidebarPositionState(position)
    setTimeout(saveSettings, 0)
  }

  // Sync settings with server (simulated)
  const syncSettings = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveSettings()
        resolve()
      }, 1000)
    })
  }

  return (
    <ThemeContext.Provider
      value={{
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useCustomTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useCustomTheme must be used within a ThemeProvider")
  }
  return context
}
