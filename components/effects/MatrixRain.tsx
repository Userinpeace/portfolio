"use client"

import { useEffect, useRef } from "react"

interface MatrixRainProps {
  className?: string
}

export default function MatrixRain({ className = "" }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}"
    const matrixArray = matrix.split("")

    const fontSize = 10
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      if (!ctx || !canvas) return

      // Semi-transparent background for trail effect
      ctx.fillStyle = "rgba(10, 10, 15, 0.04)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#00ffff"
      ctx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
      // Recalculate columns and reset drops
      const newColumns = canvas.width / fontSize
      for (let x = 0; x < newColumns; x++) {
        if (!drops[x]) drops[x] = 1
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none z-0 opacity-20 ${className}`}
    />
  )
}
