"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Cat, Dog, Fish, Rabbit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateHumanAge } from "@/lib/age-calculator"
import { AgeResult } from "@/components/age-result"
import { AgeComparisonChart } from "@/components/age-comparison-chart"
import { PetCareRecommendations } from "@/components/pet-care-recommendations"
import { petTypes, breedsByType } from "@/lib/pet-data"
import { AgeSlider } from "@/components/age-slider"

// Form schema with validation
const formSchema = z.object({
  petType: z
    .string({
      required_error: "Pet type is required",
    })
    .min(1, "Pet type is required"),

  breed: z
    .string({
      required_error: "Breed is required",
    })
    .min(1, "Breed is required"),

  age: z.union([
    z
      .string()
      .min(1, "Age is required")
      .refine((val) => !isNaN(Number.parseFloat(val)), {
        message: "Age must be a number",
      })
      .refine((val) => Number.parseFloat(val) > 0, {
        message: "Age must be positive",
      })
      .refine((val) => Number.parseFloat(val) <= 30, {
        message: "Age must be less than 30 years",
      }),
    z.number().positive("Age must be positive").max(30, "Age must be less than 30 years"),
  ]),

  name: z
    .string()
    .optional()
    .transform((val) => val?.trim()) // Trim spaces
    .refine((val) => !val || val.length > 0, {
      message: "Pet name cannot be empty or just spaces",
    })
    .refine((val) => !val || /^[A-Za-z\s]+$/.test(val), {
      message: "Pet name can only contain letters and spaces",
    }),
})

export default function PetAgeCalculator() {
  const [result, setResult] = useState<{
    humanAge: number
    description: string
    petAge: number
    breed: string
  } | null>(null)
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petType: "",
      breed: "",
      age: "",
      name: "",
    },
    mode: "onBlur", // Validate on blur for better user experience
  })

  const watchPetType = form.watch("petType")
  const watchBreed = form.watch("breed")
  const watchAge = form.watch("age")

  useEffect(() => {
    if (watchPetType) {
      setAvailableBreeds(breedsByType[watchPetType] || [])
      form.setValue("breed", "")
      // Trigger validation for breed field when pet type changes
      form.trigger("breed")
    }
  }, [watchPetType, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Ensure age is a number for the calculation
      const ageValue = typeof values.age === "string" ? Number.parseFloat(values.age) : values.age

      const { humanAge, description } = calculateHumanAge(values.petType, values.breed, ageValue)

      setResult({
        humanAge,
        description,
        petAge: ageValue,
        breed: values.breed,
      })
    } catch (error) {
      console.error("Calculation error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPetIcon = (petType: string) => {
    switch (petType) {
      case "dog":
        return <Dog className="h-6 w-6" aria-hidden="true" />
      case "cat":
        return <Cat className="h-6 w-6" aria-hidden="true" />
      case "rabbit":
        return <Rabbit className="h-6 w-6" aria-hidden="true" />
      case "fish":
        return <Fish className="h-6 w-6" aria-hidden="true" />
      default:
        return null
    }
  }

  // Get current age as a number for the chart
  const currentAge = watchAge ? (typeof watchAge === "string" ? Number.parseFloat(watchAge) : watchAge) : 0

  return (
    <Card className="w-full border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-foreground">Calculate Your Pet's Human Age</CardTitle>
        <CardDescription className="text-muted-foreground">
          Different pets age at different rates. Find out how old your pet is in human years.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-labelledby="form-heading" noValidate>
            <h3 id="form-heading" className="sr-only">
              Pet Age Calculator Form
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="group" aria-labelledby="pet-info-heading">
              <div className="sr-only" id="pet-info-heading">
                Pet Information
              </div>

              <FormField
                control={form.control}
                name="petType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          // Clear breed when pet type changes
                          if (value !== field.value) {
                            form.setValue("breed", "")
                          }
                        }}
                        defaultValue={field.value}
                        name={field.name}
                        required
                      >
                        <SelectTrigger
                          className={`bg-background text-foreground border-input ${
                            form.formState.errors.petType ? "border-destructive" : ""
                          }`}
                          aria-label="Select pet type"
                        >
                          <SelectValue placeholder="Select your pet" />
                        </SelectTrigger>
                        <SelectContent>
                          {petTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                {getPetIcon(type.value)}
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!watchPetType}
                        name={field.name}
                        required
                      >
                        <SelectTrigger
                          className={`bg-background text-foreground border-input ${
                            form.formState.errors.breed ? "border-destructive" : ""
                          }`}
                          aria-label="Select breed"
                        >
                          <SelectValue
                            placeholder={watchPetType ? "What breed is your pet?" : "Select pet type first"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {availableBreeds.map((breed) => (
                            <SelectItem key={breed} value={breed}>
                              {breed}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AgeSlider
                        value={field.value}
                        onChange={field.onChange}
                        min={0}
                        max={30}
                        error={!!form.formState.errors.age}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription id="age-description" className="text-muted-foreground text-xs italic">
                      Use the sliders to set your pet's age in years and months
                    </FormDescription>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="pet-name"
                        placeholder="What's your pet's name? (optional)"
                        className="bg-background text-foreground border-input"
                        {...field}
                        aria-describedby="name-description"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              <span className="text-destructive">*</span> Required fields
            </div>

            <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Calculating..." : "Calculate Human Age"}
            </Button>
          </form>
        </Form>

        {result && (
          <div className="mt-6" aria-live="polite" aria-atomic="true">
            <AgeResult
              humanAge={result.humanAge}
              description={result.description}
              petName={form.getValues("name")}
              petType={form.getValues("petType")}
              petAge={result.petAge}
              breed={result.breed}
            />

            {watchPetType && watchBreed && (
              <div className="mt-6">
                <AgeComparisonChart
                  petType={watchPetType}
                  breed={watchBreed}
                  currentAge={currentAge > 0 ? currentAge : 0}
                />
              </div>
            )}

            {result && (
              <PetCareRecommendations
                petType={form.getValues("petType")}
                breed={result.breed}
                petAge={result.petAge}
                petName={form.getValues("name")}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

