"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, AlertCircle, CheckCircle2, CircleHelp } from "lucide-react"
import { petCareData } from "@/lib/pet-care-data"
import jsPDF from "jspdf"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PetCareRecommendationsProps {
  petType: string
  breed: string
  petAge: number
  petName?: string
}

export function PetCareRecommendations({ petType, breed, petAge, petName }: PetCareRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<string>("")

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

  // Get care data for this pet type and life stage
  const careData = petCareData[petType]?.[lifeStage]

  if (!careData) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Care Recommendations</CardTitle>
          <CardDescription>
            We don't have specific care recommendations for this pet type and age combination yet.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Set default active tab if not set
  if (!activeTab && careData.categories.length > 0) {
    setActiveTab(careData.categories[0].name.toLowerCase())
  }

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "essential":
        return (
          <Badge variant="destructive">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Essential
          </Badge>
        )
      case "recommended":
        return (
          <Badge variant="default" className="bg-gray-600">
            <AlertCircle className="h-3 w-3 mr-1" /> Recommended
          </Badge>
        )
      case "optional":
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-400">
            <CircleHelp className="h-3 w-3 mr-1" /> Optional
          </Badge>
        )
      default:
        return null
    }
  }

  const handleDownloadCareSchedule = () => {
    // Create a new PDF document
    const doc = new jsPDF()

    // Set up initial position
    let y = 20
    const leftMargin = 20
    const pageWidth = doc.internal.pageSize.getWidth()

    // Add title
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(`Care Schedule for ${petName || "Your Pet"}`, leftMargin, y)
    y += 10

    // Add pet info
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(
      `${breed} ${petType}, ${petAge} years old - ${lifeStage.charAt(0).toUpperCase() + lifeStage.slice(1)} Stage`,
      leftMargin,
      y,
    )
    y += 10

    // Add overview
    doc.setFontSize(10)
    const overviewLines = doc.splitTextToSize(careData.overview, pageWidth - 40)
    doc.text(overviewLines, leftMargin, y)
    y += overviewLines.length * 5 + 10

    // Add categories and recommendations
    careData.categories.forEach((category) => {
      // Check if we need a new page
      if (y > 250) {
        doc.addPage()
        y = 20
      }

      // Add category name
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text(category.name, leftMargin, y)
      y += 8

      // Add recommendations
      doc.setFontSize(10)
      category.recommendations.forEach((rec) => {
        // Check if we need a new page
        if (y > 250) {
          doc.addPage()
          y = 20
        }

        // Add title and importance
        doc.setFont("helvetica", "bold")
        doc.text(`${rec.title} (${rec.importance})`, leftMargin, y)
        y += 5

        // Add description
        doc.setFont("helvetica", "normal")
        const descLines = doc.splitTextToSize(rec.description, pageWidth - 40)
        doc.text(descLines, leftMargin, y)
        y += descLines.length * 5

        // Add frequency if available
        if (rec.frequency) {
          doc.setFont("helvetica", "italic")
          doc.text(`Frequency: ${rec.frequency}`, leftMargin, y)
          y += 5
        }

        y += 5 // Add some space between recommendations
      })

      y += 10 // Add space between categories
    })

    // Save the PDF
    doc.save(`${petName || "pet"}_care_schedule.pdf`)
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Care Recommendations</CardTitle>
            <CardDescription>
              Personalized care guide for your {lifeStage} {petType}
            </CardDescription>
          </div>
          <Button
            onClick={handleDownloadCareSchedule}
            variant="outline"
            size="sm"
            className="self-start sm:self-center border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Care Schedule
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-muted-foreground">{careData.overview}</div>

        {/* Mobile: Vertical tabs */}
        <div className="block md:hidden">
          <div className="flex flex-col space-y-1 mb-4">
            {careData.categories.map((category) => (
              <Button
                key={category.name}
                variant={activeTab === category.name.toLowerCase() ? "default" : "outline"}
                className={`justify-start text-left ${
                  activeTab === category.name.toLowerCase()
                    ? "bg-gray-700 text-white hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(category.name.toLowerCase())}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Tab content for mobile */}
          {careData.categories.map((category) => (
            <div key={category.name} className={activeTab === category.name.toLowerCase() ? "block" : "hidden"}>
              <Accordion type="multiple" className="space-y-4">
                {category.recommendations.map((rec, index) => (
                  <AccordionItem
                    key={`${category.name}-${index}`}
                    value={`${category.name}-${index}`}
                    className="border rounded-lg px-4 border-gray-300"
                  >
                    <AccordionTrigger className="py-3 hover:no-underline">
                      <div className="flex flex-col text-left gap-2">
                        <h4 className="text-sm font-medium">{rec.title}</h4>
                        <div>{getImportanceBadge(rec.importance)}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      {rec.frequency && (
                        <p className="text-sm mt-1">
                          <span className="font-medium">Frequency:</span> {rec.frequency}
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal tabs */}
        <div className="hidden md:block">
          <Tabs defaultValue={careData.categories[0].name.toLowerCase()} className="w-full">
            <TabsList className="w-full justify-start overflow-auto bg-gray-100 dark:bg-gray-800">
              {careData.categories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name.toLowerCase()}
                  className="whitespace-nowrap data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {careData.categories.map((category) => (
              <TabsContent key={category.name} value={category.name.toLowerCase()} className="pt-4">
                <Accordion type="multiple" className="space-y-4">
                  {category.recommendations.map((rec, index) => (
                    <AccordionItem
                      key={`${category.name}-${index}`}
                      value={`${category.name}-${index}`}
                      className="border rounded-lg px-4 border-gray-300"
                    >
                      <AccordionTrigger className="py-3 hover:no-underline">
                        <div className="flex items-center text-left">
                          <h4 className="text-sm font-medium">{rec.title}</h4>
                          <div className="ml-2">{getImportanceBadge(rec.importance)}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-3">
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                        {rec.frequency && (
                          <p className="text-sm mt-1">
                            <span className="font-medium">Frequency:</span> {rec.frequency}
                          </p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

