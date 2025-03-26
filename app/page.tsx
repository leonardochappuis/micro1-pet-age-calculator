import MultiStepCalculator from "@/components/multi-step-calculator"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-background">
      <div className="w-full max-w-3xl">
        <header className="mb-8 relative">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1 text-left md:text-center pr-14 md:pr-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Pet Age Calculator</h1>
              <p className="text-muted-foreground">Convert your pet's age to human years</p>
            </div>
            <div className="absolute right-0 top-0 md:relative md:top-auto">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <section aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="sr-only">
            Pet Age Calculator Form
          </h2>
          <MultiStepCalculator />
        </section>
      </div>
    </main>
  )
}

