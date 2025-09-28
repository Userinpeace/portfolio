"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationProps {
  message: string
  type: "success" | "error"
  isVisible: boolean
  onClose: () => void
}

export default function Notification({ message, type, isVisible, onClose }: NotificationProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle
  }

  const colors = {
    success: "border-primary bg-primary/10 text-primary",
    error: "border-destructive bg-destructive/10 text-destructive"
  }

  const Icon = icons[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          transition={{ type: "spring", damping: 15 }}
          className={`fixed bottom-4 right-4 z-50 p-4 rounded-md border ${colors[type]} backdrop-blur-md max-w-sm w-full mx-4 sm:mx-0`}
        >
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <p className="font-mono text-sm flex-1">{message}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 hover:bg-background/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
