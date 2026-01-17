"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCodeSVG } from "qrcode.react"
import confetti from "canvas-confetti"
import { motion, AnimatePresence } from "framer-motion"
import { Ticket, Download, Share2, Bell } from "lucide-react"

interface TokenGeneratorDialogProps {
  token: string
  open: boolean
  onClose: () => void
}

export function TokenGeneratorDialog({ token, open, onClose }: TokenGeneratorDialogProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    if (open) {
      // Trigger confetti after a short delay
      const timer = setTimeout(() => {
        setShowConfetti(true)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#4CAF50", "#8BC34A", "#CDDC39", "#FFC107", "#FF9800"],
        })
      }, 500)

      // Show QR code after token animation
      const qrTimer = setTimeout(() => {
        setShowQR(true)
      }, 1000)

      return () => {
        clearTimeout(timer)
        clearTimeout(qrTimer)
      }
    } else {
      setShowConfetti(false)
      setShowQR(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Your Token is Ready!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="bg-primary/10 rounded-full p-6 mb-4"
            >
              <Ticket className="h-12 w-12 text-primary" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-2">{token}</h2>
              <p className="text-muted-foreground mb-6">Show this token at the counter to pick up your order</p>

              <AnimatePresence>
                {showQR && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="border rounded-lg p-4 bg-background mb-6"
                  >
                    <QRCodeSVG value={token} size={180} className="mx-auto" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-sm text-muted-foreground mb-2">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="font-medium">Estimated Wait Time:</span>
                  <span>15-20 minutes</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-medium">Queue Position:</span>
                  <span>3</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-4 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md"
              >
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Bell className="h-4 w-4" />
                  <p className="text-sm">We'll notify you when your order is ready!</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <DialogFooter className="flex flex-row gap-2 sm:justify-center">
          <Button variant="outline" onClick={onClose}>
            <Download className="mr-2 h-4 w-4" />
            Save Token
          </Button>
          <Button variant="outline" onClick={onClose}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
