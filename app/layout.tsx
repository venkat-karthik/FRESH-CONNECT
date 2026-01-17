import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider as NextThemesProvider } from "@/components/theme-provider"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context"
import { QueueNotifications } from "@/components/queue/queue-notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FreshServe Connect",
  description: "A Unified Farm-to-Fork Ecosystem with Smart Cafeteria Virtual Queuing",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeProvider>
            <AuthProvider>
              {children}
              <QueueNotifications />
            </AuthProvider>
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  )
}
