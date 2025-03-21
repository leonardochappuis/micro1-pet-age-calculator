"use client"

import { useState } from "react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PetAvatarSelectorProps {
  petType: string
  onSelectAvatar: (avatar: string) => void
  selectedAvatar?: string
}

export function PetAvatarSelector({ petType, onSelectAvatar, selectedAvatar }: PetAvatarSelectorProps) {
  const [currentPage, setCurrentPage] = useState(0)

  // Avatar options by pet type
  const avatarOptions: Record<string, string[]> = {
    dog: [
      "/placeholder.svg?height=100&width=100&text=🐕",
      "/placeholder.svg?height=100&width=100&text=🐶",
      "/placeholder.svg?height=100&width=100&text=🐩",
      "/placeholder.svg?height=100&width=100&text=🦮",
      "/placeholder.svg?height=100&width=100&text=🐕‍🦺",
    ],
    cat: [
      "/placeholder.svg?height=100&width=100&text=🐈",
      "/placeholder.svg?height=100&width=100&text=🐱",
      "/placeholder.svg?height=100&width=100&text=😺",
      "/placeholder.svg?height=100&width=100&text=😸",
      "/placeholder.svg?height=100&width=100&text=🐈‍⬛",
    ],
    rabbit: [
      "/placeholder.svg?height=100&width=100&text=🐇",
      "/placeholder.svg?height=100&width=100&text=🐰",
      "/placeholder.svg?height=100&width=100&text=🧸",
    ],
    fish: [
      "/placeholder.svg?height=100&width=100&text=🐠",
      "/placeholder.svg?height=100&width=100&text=🐟",
      "/placeholder.svg?height=100&width=100&text=🐡",
      "/placeholder.svg?height=100&width=100&text=🦈",
    ],
  }

  // Default avatars if pet type not found
  const defaultAvatars = [
    "/placeholder.svg?height=100&width=100&text=🐾",
    "/placeholder.svg?height=100&width=100&text=❤️",
    "/placeholder.svg?height=100&width=100&text=🏠",
  ]

  const avatars = avatarOptions[petType] || defaultAvatars
  const itemsPerPage = 3
  const totalPages = Math.ceil(avatars.length / itemsPerPage)

  const currentAvatars = avatars.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <Card className="w-full mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Choose a Pet Avatar</CardTitle>
        <CardDescription>Click an avatar to select it for your pet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevPage}
            disabled={totalPages <= 1}
            aria-label="Previous avatars"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-4 items-center justify-center">
            {currentAvatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => {
                  console.log("Avatar clicked:", avatar) // Add logging
                  onSelectAvatar(avatar)
                }}
                className={cn(
                  "relative rounded-full overflow-hidden border-2 transition-all p-1",
                  selectedAvatar === avatar
                    ? "border-primary scale-110 shadow-md"
                    : "border-transparent hover:border-primary/50 hover:scale-105",
                )}
                aria-label={`Select pet avatar ${index + 1}`}
                aria-pressed={selectedAvatar === avatar}
              >
                <img
                  src={avatar || "/placeholder.svg"}
                  alt={`Pet avatar option ${index + 1}`}
                  className="w-16 h-16 object-cover"
                />
                {selectedAvatar === avatar && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="icon" onClick={nextPage} disabled={totalPages <= 1} aria-label="Next avatars">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

