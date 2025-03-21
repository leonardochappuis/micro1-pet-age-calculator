"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CustomNumberInputProps {
  value: string | number
  onChange: (value: string) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  className?: string
  error?: boolean
}

export function CustomNumberInput({
  value,
  onChange,
  min = 0,
  max = 30,
  step = 0.1,
  placeholder = "Enter age",
  className = "",
  error = false,
}: CustomNumberInputProps) {
  const [inputValue, setInputValue] = useState<string>(value.toString())
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setInputValue(value === undefined || value === "" ? "" : value.toString())
  }, [value])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // Allow empty input for UX
    if (newValue === "") {
      setInputValue("")
      onChange("")
      return
    }

    // Only allow numeric input with up to one decimal point
    if (!/^[0-9]*\.?[0-9]*$/.test(newValue)) {
      return
    }

    setInputValue(newValue)

    // Only update parent if it's a valid number
    if (!isNaN(Number.parseFloat(newValue))) {
      onChange(newValue)
    }
  }

  const increment = () => {
    const currentValue = inputValue === "" ? 0 : Number.parseFloat(inputValue)
    const newValue = Math.min(currentValue + step, max)
    setInputValue(newValue.toString())
    onChange(newValue.toString())
  }

  const decrement = () => {
    const currentValue = inputValue === "" ? 0 : Number.parseFloat(inputValue)
    const newValue = Math.max(currentValue - step, min)
    setInputValue(newValue.toString())
    onChange(newValue.toString())
  }

  // Format displayed value to show one decimal place when needed
  const displayValue =
    inputValue === ""
      ? ""
      : Number.parseFloat(inputValue) % 1 === 0
        ? Number.parseInt(inputValue).toString()
        : Number.parseFloat(inputValue).toFixed(1)

  return (
    <div
      className={`relative ${className} ${isFocused ? "ring-2 ring-ring ring-offset-2 ring-offset-background rounded-md" : ""}`}
    >
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-r-none border-r-0 z-10",
            error ? "border-destructive" : "border-input",
            isFocused && "border-input",
          )}
          onClick={decrement}
          disabled={inputValue === "" || Number.parseFloat(inputValue) <= min}
          aria-label="Decrease age"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "text-center rounded-none border-x-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            error ? "border-destructive" : "border-input",
          )}
          placeholder={placeholder}
          aria-label="Pet age in years"
          inputMode="decimal"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "h-10 w-10 rounded-l-none border-l-0 z-10",
            error ? "border-destructive" : "border-input",
            isFocused && "border-input",
          )}
          onClick={increment}
          disabled={inputValue !== "" && Number.parseFloat(inputValue) >= max}
          aria-label="Increase age"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

