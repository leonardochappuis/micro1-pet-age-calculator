"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Cat, Dog, Fish, Rabbit, ChevronRight, ChevronLeft, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
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
      required_error: "Please select your pet type",
    })
    .min(1, "Please select your pet type"),

  breed: z
    .string({
      required_error: "Please select your pet's breed",
    })
    .min(1, "Please select your pet's breed"),

  age: z.union([
    z
      .string()
      .min(1, "Please enter your pet's age")
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

export default function MultiStepCalculator() {
  const [step, setStep] = useState(1)
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([])
  const [result, setResult] = useState<{
    humanAge: number
    description: string
    petAge: number
    breed: string
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petType: "",
      breed: "",
      age: "",
      name: "",
    },
    mode: "onChange",
  })

  const watchPetType = form.watch("petType")
  const watchBreed = form.watch("breed")
  const watchAge = form.watch("age")
  const watchName = form.watch("name")

  useEffect(() => {
    if (watchPetType) {
      setAvailableBreeds(breedsByType[watchPetType] || [])
      form.setValue("breed", "")
    }
  }, [watchPetType, form])

  const nextStep = async () => {
    let canProceed = false

    switch (step) {
      case 1:
        await form.trigger("petType")
        canProceed = !form.getFieldState("petType").invalid
        break
      case 2:
        await form.trigger("breed")
        canProceed = !form.getFieldState("breed").invalid
        break
      case 3:
        await form.trigger("age")
        canProceed = !form.getFieldState("age").invalid
        break
      case 4:
        await form.trigger("name")
        canProceed = !form.getFieldState("name").invalid
        break
    }

    if (canProceed) {
      if (step === 4) {
        calculateResult()
      } else {
        setStep(step + 1)
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const calculateResult = () => {
    const values = form.getValues()
    const ageValue = typeof values.age === "string" ? Number.parseFloat(values.age) : values.age
    const { humanAge, description } = calculateHumanAge(values.petType, values.breed, ageValue)

    setResult({
      humanAge,
      description,
      petAge: ageValue,
      breed: values.breed,
    })

    setStep(5)
  }

  const resetForm = () => {
    form.reset()
    setStep(1)
    setResult(null)
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <FormField
            control={form.control}
            name="petType"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <div className="text-xl font-medium text-center mb-6">What type of pet do you have?</div>
                <div className="grid grid-cols-2 gap-4">
                  {petTypes.map((type) => {
                    const isSelected = field.value === type.value
                    return (
                      <button
                        key={type.value}
                        type="button"
                        className={cn(
                          "h-24 flex flex-col items-center justify-center gap-2 rounded-md border transition-colors",
                          isSelected
                            ? "bg-gray-700 hover:bg-gray-800 text-white border-gray-700"
                            : "bg-background hover:bg-gray-100 hover:border-gray-400 dark:hover:bg-gray-800 dark:hover:border-gray-500 border-input",
                        )}
                        onClick={() => field.onChange(type.value)}
                      >
                        <div className="text-3xl">{getPetIcon(type.value)}</div>
                        <div>{type.label}</div>
                      </button>
                    )
                  })}
                </div>
                <FormMessage className="text-destructive text-center" />
              </FormItem>
            )}
          />
        )

      case 2:
        return (
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <div className="text-xl font-medium text-center mb-6">What breed is your {watchPetType}?</div>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} name={field.name}>
                    <SelectTrigger
                      className={`bg-background text-foreground border-input h-12 text-lg ${
                        form.formState.errors.breed ? "border-destructive" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select a breed" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {availableBreeds.map((breed) => (
                        <SelectItem key={breed} value={breed}>
                          {breed}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-destructive text-center" />
              </FormItem>
            )}
          />
        )

      case 3:
        return (
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <div className="text-xl font-medium text-center mb-6">How old is your {watchBreed}?</div>
                <FormControl>
                  <div className="flex justify-center">
                    <AgeSlider
                      value={field.value}
                      onChange={field.onChange}
                      min={0}
                      max={30}
                      error={!!form.formState.errors.age}
                      className="w-full max-w-md"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-destructive text-center" />
              </FormItem>
            )}
          />
        )

      case 4:
        return (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <div className="text-xl font-medium text-center mb-6">What's your pet's name? (optional)</div>
                <FormControl>
                  <div className="flex justify-center">
                    <Input
                      placeholder="Enter your pet's name"
                      className="bg-background text-foreground border-input h-12 text-lg max-w-xs"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-destructive text-center" />
              </FormItem>
            )}
          />
        )

      case 5:
        return (
          result && (
            <div className="space-y-8">
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Sparkles className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Results</h2>
                  <p className="text-muted-foreground">Here's how old your pet is in human years!</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <AgeResult
                  humanAge={result.humanAge}
                  description={result.description}
                  petName={watchName}
                  petType={watchPetType}
                  petAge={result.petAge}
                  breed={result.breed}
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <AgeComparisonChart
                  petType={watchPetType}
                  breed={watchBreed}
                  currentAge={currentAge > 0 ? currentAge : 0}
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <PetCareRecommendations
                  petType={watchPetType}
                  breed={result.breed}
                  petAge={result.petAge}
                  petName={watchName}
                />
              </motion.div>
            </div>
          )
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-foreground">Step-by-Step Calculator</CardTitle>
        <CardDescription className="text-muted-foreground">
          Follow the steps to calculate your pet's human age
        </CardDescription>
      </CardHeader>

      {step < 5 && (
        <div className="px-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mb-6">
            <div
              className="bg-gray-700 dark:bg-gray-300 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        {step < 5 ? (
          <>
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className="w-28">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            <Button type="button" onClick={nextStep} className="w-28 bg-gray-700 hover:bg-gray-800 text-white">
              {step === 4 ? "Calculate" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button type="button" onClick={resetForm} className="w-full bg-gray-700 hover:bg-gray-800 text-white">
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

