"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface AgeSliderProps {
  value: string | number
  onChange: (value: string) => void
  min?: number
  max?: number
  error?: boolean
  className?: string
}

export function AgeSlider({ value, onChange, min = 0, max = 30, error = false, className = "" }: AgeSliderProps) {
  // Parse the initial value into years and months
  const parseAge = (ageValue: string | number): { years: number; months: number } => {
    const numValue = typeof ageValue === "string" ? Number.parseFloat(ageValue) || 0 : ageValue
    const years = Math.floor(numValue)
    const months = Math.round((numValue - years) * 12)
    return { years, months }
  }

  const [years, setYears] = useState<number>(0)
  const [months, setMonths] = useState<number>(0)

  // Initialize from props
  useEffect(() => {
    if (value !== "") {
      const { years: y, months: m } = parseAge(value)
      setYears(y)
      setMonths(m)
    }
  }, [value])

  // Update the parent component when years or months change
  const updateAge = (newYears: number, newMonths: number) => {
    // If months is 12, increment years and set months to 0
    if (newMonths === 12) {
      newYears += 1
      newMonths = 0
    }

    // Calculate the decimal age
    const decimalAge = newYears + newMonths / 12

    // Don't exceed the maximum
    if (decimalAge > max) {
      return
    }

    // Update local state
    setYears(newYears)
    setMonths(newMonths)

    // Update parent with string representation
    onChange(decimalAge.toString())
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="years-slider" className={cn(error ? "text-destructive" : "")}>
            Years
          </Label>
          <span className="text-sm font-medium bg-muted px-2 py-1 rounded-md">{years}</span>
        </div>
        <Slider
          id="years-slider"
          min={0}
          max={30}
          step={1}
          value={[years]}
          onValueChange={(vals) => updateAge(vals[0], months)}
          className={cn(
            error ? "border-destructive" : "",
            "[&>.relative>.absolute]:bg-gray-700 dark:[&>.relative>.absolute]:bg-gray-300",
          )}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="months-slider" className={cn(error ? "text-destructive" : "")}>
            Months
          </Label>
          <span className="text-sm font-medium bg-muted px-2 py-1 rounded-md">{months}</span>
        </div>
        <Slider
          id="months-slider"
          min={0}
          max={11}
          step={1}
          value={[months]}
          onValueChange={(vals) => updateAge(years, vals[0])}
          className={cn(
            error ? "border-destructive" : "",
            "[&>.relative>.absolute]:bg-gray-700 dark:[&>.relative>.absolute]:bg-gray-300",
          )}
        />
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Age:{" "}
        <span className="font-medium">
          {years} years, {months} months
        </span>
      </div>
    </div>
  )
}

