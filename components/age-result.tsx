import { Card, CardContent } from "@/components/ui/card"
import { Cat, Dog, Fish, Rabbit, Baby, Heart, Leaf, Star } from "lucide-react"

interface AgeResultProps {
  humanAge: number
  description: string
  petName?: string
  petType: string
  petAge: number
  breed: string
}

export function AgeResult({ humanAge, description, petName, petType, petAge, breed }: AgeResultProps) {
  const getPetIcon = (petType: string) => {
    switch (petType) {
      case "dog":
        return <Dog className="h-8 w-8" aria-hidden="true" />
      case "cat":
        return <Cat className="h-8 w-8" aria-hidden="true" />
      case "rabbit":
        return <Rabbit className="h-8 w-8" aria-hidden="true" />
      case "fish":
        return <Fish className="h-8 w-8" aria-hidden="true" />
      default:
        return null
    }
  }

  const petTypeLabel =
    {
      dog: "Dog",
      cat: "Cat",
      rabbit: "Rabbit",
      fish: "Fish",
    }[petType] || "Pet"

  // Format the human age to show one decimal place
  const formattedHumanAge = humanAge.toFixed(1).replace(/\.0$/, "")

  // Determine life stage based on pet type and age
  const getLifeStage = () => {
    if (petType === "dog") {
      const isSmallBreed = [
        "Chihuahua",
        "Pomeranian",
        "Yorkshire Terrier",
        "Shih Tzu",
        "Maltese",
        "Toy Poodle",
      ].includes(breed)
      const isLargeBreed = [
        "German Shepherd",
        "Labrador Retriever",
        "Golden Retriever",
        "Rottweiler",
        "Great Dane",
        "Saint Bernard",
      ].includes(breed)

      if (petAge < 1) return "puppy"
      if (isSmallBreed) {
        if (petAge < 2) return "adolescent"
        if (petAge < 9) return "adult"
        return "senior"
      } else if (isLargeBreed) {
        if (petAge < 2) return "adolescent"
        if (petAge < 6) return "adult"
        return "senior"
      } else {
        if (petAge < 2) return "adolescent"
        if (petAge < 7) return "adult"
        return "senior"
      }
    } else if (petType === "cat") {
      if (petAge < 1) return "kitten"
      if (petAge < 2) return "adolescent"
      if (petAge < 10) return "adult"
      return "senior"
    } else if (petType === "rabbit") {
      if (petAge < 0.5) return "baby"
      if (petAge < 1) return "adolescent"
      if (petAge < 5) return "adult"
      return "senior"
    } else if (petType === "fish") {
      if (petAge < 0.25) return "baby"
      if (petAge < 1) return "adolescent"
      if (petAge < 3) return "adult"
      return "senior"
    }

    // Default stages
    if (petAge < 1) return "baby"
    if (petAge < 2) return "adolescent"
    if (petAge < 7) return "adult"
    return "senior"
  }

  const lifeStage = getLifeStage()

  const stageInfo = {
    puppy: {
      title: "Puppy",
      icon: <Baby className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description: "Your puppy is developing rapidly, learning about the world, and forming important bonds.",
    },
    kitten: {
      title: "Kitten",
      icon: <Baby className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description: "Your kitten is growing quickly and developing motor skills and social behaviors.",
    },
    baby: {
      title: "Baby",
      icon: <Baby className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description: "Your pet is in its earliest life stage, growing rapidly and learning about its environment.",
    },
    adolescent: {
      title: "Adolescent",
      icon: <Star className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description: "Your pet is like a teenager - full of energy and testing boundaries.",
    },
    adult: {
      title: "Adult",
      icon: <Heart className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description: "Your pet is in their prime years. Maintain regular exercise and preventative healthcare.",
    },
    senior: {
      title: "Senior",
      icon: <Leaf className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description: "Your pet is in their golden years. They may need adjustments to diet and exercise.",
    },
  }

  const info = stageInfo[lifeStage as keyof typeof stageInfo]

  return (
    <Card className="border-2 border-gray-300 bg-gray-50 dark:bg-gray-800/10">
      <CardContent className="pt-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Result Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                {getPetIcon(petType)}
                <span className="sr-only">{petTypeLabel} icon</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {petName ? `${petName} is` : "Your pet is"}{" "}
                <span className="text-gray-700 dark:text-gray-300">{formattedHumanAge}</span> in human years
              </h3>
            </div>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* Life Stage Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">{info.icon}</div>
              <h3 className="text-xl font-bold text-foreground">{info.title} Stage</h3>
            </div>
            <p className="text-muted-foreground">{info.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

