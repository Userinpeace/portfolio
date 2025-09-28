"use client"

import React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center"
            >
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-destructive neon-text">
                SYSTEM.ERROR
              </h1>
              <p className="text-muted-foreground font-mono">
                AN UNEXPECTED ERROR OCCURRED
              </p>
            </div>

            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm font-mono text-destructive">
                {this.state.error?.message || "Unknown error occurred"}
              </p>
            </div>

            <Button
              onClick={() => window.location.reload()}
              className="cyber-button bg-primary text-primary-foreground hover:bg-primary/80"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              RESTART.SYSTEM
            </Button>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
