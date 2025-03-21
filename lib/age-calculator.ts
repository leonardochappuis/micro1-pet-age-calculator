export function calculateHumanAge(
  petType: string,
  breed: string,
  age: number | string,
): { humanAge: number; description: string } {
  // Convert age to number if it's a string
  const ageNum = typeof age === "string" ? Number.parseFloat(age) : age

  switch (petType) {
    case "dog":
      return calculateDogAge(breed, ageNum)
    case "cat":
      return calculateCatAge(breed, ageNum)
    case "rabbit":
      return calculateRabbitAge(ageNum)
    case "fish":
      return calculateFishAge(breed, ageNum)
    default:
      return {
        humanAge: ageNum * 7,
        description: "Using a standard conversion factor of 7.",
      }
  }
}

function calculateDogAge(breed: string, age: number): { humanAge: number; description: string } {
  // Small, medium, large breed classifications
  const smallBreeds = ["Chihuahua", "Pomeranian", "Yorkshire Terrier", "Shih Tzu", "Maltese", "Toy Poodle"]
  const largeBreeds = [
    "German Shepherd",
    "Labrador Retriever",
    "Golden Retriever",
    "Rottweiler",
    "Great Dane",
    "Saint Bernard",
  ]

  let humanAge: number
  let description: string

  // More accurate dog age calculation based on research
  // First year counts as 15 human years
  // Second year adds 9 more human years
  // Each additional year adds 4-5 human years depending on size

  if (age <= 1) {
    humanAge = age * 15
  } else if (age <= 2) {
    humanAge = 15 + (age - 1) * 9
  } else {
    const baseAge = 24 // 15 + 9 for first two years

    if (smallBreeds.includes(breed)) {
      humanAge = baseAge + (age - 2) * 4
      description = `Small breeds like ${breed} tend to age more slowly after adulthood, but live longer overall.`
    } else if (largeBreeds.includes(breed)) {
      humanAge = baseAge + (age - 2) * 5.5
      description = `Large breeds like ${breed} tend to age faster after adulthood and have shorter lifespans.`
    } else {
      humanAge = baseAge + (age - 2) * 5
      description = `Medium-sized breeds like ${breed} age at an average rate.`
    }

    return { humanAge, description }
  }

  if (age <= 1) {
    description = "Puppies develop quickly in their first year, equivalent to human adolescence."
  } else if (age <= 2) {
    description = "The second year of a dog's life is equivalent to the mid-twenties for humans."
  }

  return { humanAge, description }
}

function calculateCatAge(breed: string, age: number): { humanAge: number; description: string } {
  let humanAge: number
  let description: string

  // Cat age calculation
  // First year is approximately 15 human years
  // Second year adds about 9 human years
  // Each additional year adds about 4 human years

  if (age <= 1) {
    humanAge = age * 15
    description = "Kittens develop rapidly in their first year, reaching adolescence."
  } else if (age <= 2) {
    humanAge = 15 + (age - 1) * 9
    description = "By age two, cats have reached full adulthood, equivalent to mid-twenties in humans."
  } else {
    humanAge = 24 + (age - 2) * 4

    // Some breed-specific adjustments
    if (["Siamese", "Burmese", "Oriental"].includes(breed)) {
      description = `${breed} cats tend to be longer-lived than average, often remaining active into their late teens.`
    } else if (["Maine Coon", "Ragdoll", "Persian"].includes(breed)) {
      description = `${breed} cats mature more slowly and can have longer lifespans with proper care.`
    } else {
      description = "Cats age more consistently than dogs after reaching adulthood."
    }
  }

  return { humanAge, description }
}

function calculateRabbitAge(age: number): { humanAge: number; description: string } {
  // Rabbits mature quickly and can live 8-12 years
  let humanAge: number
  let description: string

  if (age <= 1) {
    humanAge = age * 18 // More precise calculation for the first year
    description = "Rabbits mature very quickly, reaching adulthood in their first year."
  } else {
    humanAge = 18 + (age - 1) * 8
    description = "Each rabbit year after the first is roughly equivalent to 8 human years."
  }

  return { humanAge, description }
}

function calculateFishAge(breed: string, age: number): { humanAge: number; description: string } {
  let humanAge: number
  let description: string

  // Fish age varies dramatically by species
  if (["Goldfish", "Koi"].includes(breed)) {
    humanAge = age * 5
    description = `${breed} can live for decades with proper care. Each year is roughly 5 human years.`
  } else if (["Betta", "Guppy", "Tetra"].includes(breed)) {
    humanAge = age * 20
    description = `${breed} have shorter lifespans, with each year equivalent to about 20 human years.`
  } else {
    humanAge = age * 10
    description = "Most aquarium fish age at a moderate rate compared to their maximum lifespan."
  }

  return { humanAge, description }
}

