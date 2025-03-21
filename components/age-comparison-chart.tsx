"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateHumanAge } from "@/lib/age-calculator"

interface AgeComparisonChartProps {
  petType: string
  breed: string
  currentAge: number
}

export function AgeComparisonChart({ petType, breed, currentAge }: AgeComparisonChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !petType || !breed) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Calculate max age based on pet type
    const maxPetAge =
      petType === "dog"
        ? breed.includes("Chihuahua") || breed.includes("Pomeranian")
          ? 18
          : 15
        : petType === "cat"
          ? 20
          : petType === "rabbit"
            ? 12
            : 10

    // Calculate human ages for the chart
    const dataPoints = []
    for (let age = 0; age <= maxPetAge; age += 0.5) {
      const { humanAge } = calculateHumanAge(petType, breed, age)
      dataPoints.push({ petAge: age, humanAge })
    }

    // Find max human age for scaling
    const maxHumanAge = Math.max(...dataPoints.map((p) => p.humanAge))

    // Draw axes
    ctx.strokeStyle = "#94a3b8" // slate-400
    ctx.lineWidth = 1

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#64748b" // slate-500
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels
    for (let age = 0; age <= maxPetAge; age += 2) {
      const x = padding + (age / maxPetAge) * chartWidth
      ctx.fillText(age.toString(), x, height - padding + 20)
    }
    ctx.fillText("Pet Age (years)", width / 2, height - 5)

    // Y-axis labels
    ctx.textAlign = "right"
    const yLabelCount = 5
    for (let i = 0; i <= yLabelCount; i++) {
      const humanAge = Math.round((i / yLabelCount) * maxHumanAge)
      const y = height - padding - (i / yLabelCount) * chartHeight
      ctx.fillText(humanAge.toString(), padding - 10, y + 4)
    }
    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.fillText("Human Age (years)", 0, 0)
    ctx.restore()

    // Draw the curve
    ctx.beginPath()
    ctx.strokeStyle = "#4b5563" // gray-600
    ctx.lineWidth = 3

    dataPoints.forEach((point, i) => {
      const x = padding + (point.petAge / maxPetAge) * chartWidth
      const y = height - padding - (point.humanAge / maxHumanAge) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw current age marker
    if (currentAge > 0 && currentAge <= maxPetAge) {
      const { humanAge } = calculateHumanAge(petType, breed, currentAge)
      const x = padding + (currentAge / maxPetAge) * chartWidth
      const y = height - padding - (humanAge / maxHumanAge) * chartHeight

      // Draw vertical line to x-axis
      ctx.beginPath()
      ctx.strokeStyle = "rgba(75, 85, 99, 0.3)" // gray-600 with opacity
      ctx.setLineDash([5, 3])
      ctx.moveTo(x, y)
      ctx.lineTo(x, height - padding)
      ctx.stroke()

      // Draw horizontal line to y-axis
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(padding, y)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw point
      ctx.beginPath()
      ctx.fillStyle = "#4b5563" // gray-600
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw label
      ctx.fillStyle = "hsl(var(--background))"
      ctx.font = "bold 10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("NOW", x, y + 3)
    }
  }, [petType, breed, currentAge])

  return (
    <Card className="w-full mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Age Comparison Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative bg-muted/10 rounded-md overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="w-full h-full"
            aria-label={`Chart showing the relationship between ${petType} age and human age`}
            role="img"
          />
          {(!petType || !breed) && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              Select pet type and breed to see the age comparison chart
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

