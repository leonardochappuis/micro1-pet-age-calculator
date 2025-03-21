"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme based on user preference
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)

    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={toggleTheme}
            aria-pressed={isDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-0 h-auto w-auto hover:bg-transparent focus:bg-transparent"
            style={{ transform: "scale(2)" }}
          >
            <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
            {isDarkMode ? (
              <Sun className="h-24 w-24 text-white" aria-hidden="true" />
            ) : (
              <Moon className="h-24 w-24 text-black" aria-hidden="true" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

