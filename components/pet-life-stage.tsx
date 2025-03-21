import { Card, CardContent } from "@/components/ui/card"
import { Baby, Heart, Leaf, Star } from "lucide-react"

interface PetLifeStageProps {
  petType: string
  breed: string
  petAge: number
  humanAge: number
}

export function PetLifeStage({ petType, breed, petAge, humanAge }: PetLifeStageProps) {
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
      description:
        "Your puppy is developing rapidly, learning about the world, and forming important bonds. Focus on socialization, basic training, and proper nutrition for growth.",
    },
    kitten: {
      title: "Kitten",
      icon: <Baby className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description:
        "Your kitten is growing quickly and developing motor skills and social behaviors. Provide plenty of play, appropriate scratching surfaces, and kitten-specific nutrition.",
    },
    baby: {
      title: "Baby",
      icon: <Baby className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description:
        "Your pet is in its earliest life stage, growing rapidly and learning about its environment. Provide extra care, appropriate nutrition, and gentle handling.",
    },
    adolescent: {
      title: "Adolescent",
      icon: <Star className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description:
        "Your pet is like a teenager - full of energy and testing boundaries. Continue training, provide plenty of exercise, and maintain consistent rules and routines.",
    },
    adult: {
      title: "Adult",
      icon: <Heart className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description:
        "Your pet is in their prime years. Maintain regular exercise, mental stimulation, and preventative healthcare. Watch for subtle changes that might indicate health issues.",
    },
    senior: {
      title: "Senior",
      icon: <Leaf className="h-8 w-8 text-gray-700" aria-hidden="true" />,
      description:
        "Your pet is in their golden years. They may need adjustments to diet, exercise, and living arrangements. Regular veterinary checkups are especially important now.",
    },
  }

  const info = stageInfo[lifeStage as keyof typeof stageInfo]

  return (
    <Card className="mt-6 border-gray-300 bg-gray-50 dark:bg-gray-800/10">
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0 p-3 bg-gray-200 dark:bg-gray-700 rounded-full">{info.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">{info.title} Stage</h3>
            <p className="text-muted-foreground">{info.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

