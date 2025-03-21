// Pet care recommendations data organized by pet type and life stage
export interface CareRecommendation {
  title: string
  description: string
  frequency?: string
  importance: "essential" | "recommended" | "optional"
}

export interface CareCategory {
  name: string
  recommendations: CareRecommendation[]
}

export type PetCareData = {
  [petType: string]: {
    [lifeStage: string]: {
      overview: string
      categories: CareCategory[]
    }
  }
}

export const petCareData: PetCareData = {
  dog: {
    puppy: {
      overview:
        "Puppies need frequent veterinary care, proper nutrition for growth, and early socialization and training.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Vaccinations",
              description: "Core vaccines including distemper, parvovirus, hepatitis, and rabies.",
              frequency: "Every 3-4 weeks until 16 weeks old",
              importance: "essential",
            },
            {
              title: "Deworming",
              description: "Treatment for roundworms, hookworms, and other parasites.",
              frequency: "Every 2-3 weeks until 12 weeks, then monthly until 6 months",
              importance: "essential",
            },
            {
              title: "Microchipping",
              description: "Permanent ID that can help return your puppy if they get lost.",
              frequency: "Once, usually at 8-12 weeks",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Puppy-Specific Food",
              description: "High-quality puppy food formulated for growth and development.",
              frequency: "3-4 times daily until 6 months, then 2-3 times daily",
              importance: "essential",
            },
            {
              title: "Weight Monitoring",
              description: "Track growth to ensure proper development.",
              frequency: "Weekly",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Training & Socialization",
          recommendations: [
            {
              title: "Basic Commands",
              description: "Teach sit, stay, come, and leash walking.",
              frequency: "Daily, short 5-10 minute sessions",
              importance: "essential",
            },
            {
              title: "Socialization",
              description: "Expose to different people, animals, environments, and experiences.",
              frequency: "Daily, especially between 8-16 weeks",
              importance: "essential",
            },
            {
              title: "Puppy Classes",
              description: "Structured training and socialization with professional guidance.",
              frequency: "Weekly",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    adolescent: {
      overview:
        "Adolescent dogs may test boundaries and need consistent training, plenty of exercise, and continued socialization.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Spay/Neuter",
              description: "Discuss timing with your vet based on breed and size.",
              frequency: "Usually between 6-12 months",
              importance: "recommended",
            },
            {
              title: "Booster Vaccinations",
              description: "Follow-up vaccines to maintain immunity.",
              frequency: "As recommended by your vet",
              importance: "essential",
            },
            {
              title: "Parasite Prevention",
              description: "Flea, tick, and heartworm prevention.",
              frequency: "Monthly",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition & Exercise",
          recommendations: [
            {
              title: "Transition to Adult Food",
              description: "Gradually switch to adult formula based on breed size.",
              frequency: "Between 12-24 months depending on breed",
              importance: "essential",
            },
            {
              title: "Regular Exercise",
              description: "Physical activity appropriate for breed and energy level.",
              frequency: "At least 30-60 minutes daily",
              importance: "essential",
            },
            {
              title: "Mental Stimulation",
              description: "Puzzle toys, training games, and new experiences.",
              frequency: "Daily",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Training & Behavior",
          recommendations: [
            {
              title: "Reinforcement Training",
              description: "Continue reinforcing basic commands and boundaries.",
              frequency: "Daily",
              importance: "essential",
            },
            {
              title: "Leash Manners",
              description: "Practice loose-leash walking and proper greeting behavior.",
              frequency: "During daily walks",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    adult: {
      overview:
        "Adult dogs need regular preventative care, appropriate exercise, and mental stimulation to stay healthy and happy.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Annual Check-ups",
              description: "Complete physical examination and health assessment.",
              frequency: "Yearly",
              importance: "essential",
            },
            {
              title: "Dental Cleaning",
              description: "Professional cleaning to prevent periodontal disease.",
              frequency: "As recommended by your vet, typically every 1-2 years",
              importance: "recommended",
            },
            {
              title: "Parasite Prevention",
              description: "Continued flea, tick, and heartworm prevention.",
              frequency: "Monthly",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition & Exercise",
          recommendations: [
            {
              title: "Weight Management",
              description: "Monitor food intake and weight to prevent obesity.",
              frequency: "Ongoing",
              importance: "essential",
            },
            {
              title: "Regular Exercise",
              description: "Activity appropriate for age, breed, and health status.",
              frequency: "Daily, 30-60+ minutes depending on breed",
              importance: "essential",
            },
          ],
        },
        {
          name: "Mental Health",
          recommendations: [
            {
              title: "Enrichment Activities",
              description: "New experiences, toys, and training to prevent boredom.",
              frequency: "Several times weekly",
              importance: "recommended",
            },
            {
              title: "Social Interaction",
              description: "Continued exposure to other dogs and people.",
              frequency: "Weekly",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    senior: {
      overview:
        "Senior dogs need more frequent health monitoring, adjusted exercise, and special attention to comfort and mobility.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Semi-annual Check-ups",
              description: "More frequent monitoring for age-related conditions.",
              frequency: "Every 6 months",
              importance: "essential",
            },
            {
              title: "Senior Bloodwork",
              description: "Comprehensive blood panels to detect early issues.",
              frequency: "Annually or as recommended",
              importance: "essential",
            },
            {
              title: "Dental Care",
              description: "Continued dental maintenance and monitoring.",
              frequency: "As recommended by your vet",
              importance: "essential",
            },
          ],
        },
        {
          name: "Comfort & Mobility",
          recommendations: [
            {
              title: "Joint Supplements",
              description: "Glucosamine, chondroitin, or other supplements for joint health.",
              frequency: "Daily as recommended by your vet",
              importance: "recommended",
            },
            {
              title: "Comfortable Bedding",
              description: "Orthopedic beds to support aging joints.",
              frequency: "Ongoing",
              importance: "recommended",
            },
            {
              title: "Adjusted Exercise",
              description: "Gentler, shorter activities that don't strain joints.",
              frequency: "Daily, multiple shorter sessions",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Senior-Specific Diet",
              description: "Food formulated for older dogs with adjusted calories and nutrients.",
              frequency: "Daily",
              importance: "essential",
            },
            {
              title: "Weight Management",
              description: "Careful monitoring to prevent weight gain as activity decreases.",
              frequency: "Ongoing",
              importance: "essential",
            },
          ],
        },
      ],
    },
  },
  cat: {
    kitten: {
      overview:
        "Kittens need proper nutrition for growth, early veterinary care, and socialization to become well-adjusted cats.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Vaccinations",
              description: "Core vaccines including FVRCP and rabies.",
              frequency: "Starting at 6-8 weeks, then every 3-4 weeks until 16 weeks",
              importance: "essential",
            },
            {
              title: "Deworming",
              description: "Treatment for common intestinal parasites.",
              frequency: "Every 2-3 weeks until 12 weeks, then monthly until 6 months",
              importance: "essential",
            },
            {
              title: "Microchipping",
              description: "Permanent ID that can help return your kitten if they get lost.",
              frequency: "Once, usually at 8-12 weeks",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Kitten-Specific Food",
              description: "High-quality kitten food with appropriate nutrients for growth.",
              frequency: "3-4 times daily until 6 months",
              importance: "essential",
            },
            {
              title: "Fresh Water",
              description: "Clean, fresh water available at all times.",
              frequency: "Change daily",
              importance: "essential",
            },
          ],
        },
        {
          name: "Socialization & Environment",
          recommendations: [
            {
              title: "Handling & Socialization",
              description: "Gentle handling and exposure to different people and experiences.",
              frequency: "Daily",
              importance: "essential",
            },
            {
              title: "Litter Box Training",
              description: "Provide appropriate litter box and teach proper use.",
              frequency: "Clean daily, complete change weekly",
              importance: "essential",
            },
            {
              title: "Safe Play",
              description: "Interactive toys that encourage exercise and mental stimulation.",
              frequency: "Multiple play sessions daily",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    adolescent: {
      overview:
        "Adolescent cats are energetic and may test boundaries. They need continued training, plenty of play, and transition to adult care.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Spay/Neuter",
              description: "Recommended for health benefits and behavior management.",
              frequency: "Usually between 4-6 months",
              importance: "recommended",
            },
            {
              title: "Booster Vaccinations",
              description: "Follow-up vaccines to maintain immunity.",
              frequency: "As recommended by your vet",
              importance: "essential",
            },
            {
              title: "Parasite Prevention",
              description: "Flea and tick prevention, heartworm if recommended.",
              frequency: "Monthly",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition & Exercise",
          recommendations: [
            {
              title: "Transition to Adult Food",
              description: "Gradually switch to adult formula.",
              frequency: "Around 12 months",
              importance: "essential",
            },
            {
              title: "Interactive Play",
              description: "Active play sessions to burn energy and bond.",
              frequency: "Multiple times daily, 10-15 minutes each",
              importance: "essential",
            },
          ],
        },
        {
          name: "Behavior",
          recommendations: [
            {
              title: "Scratching Posts",
              description: "Multiple appropriate scratching surfaces to protect furniture.",
              frequency: "Always available",
              importance: "essential",
            },
            {
              title: "Vertical Space",
              description: "Cat trees, shelves, or perches for climbing and observation.",
              frequency: "Always available",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    adult: {
      overview:
        "Adult cats need regular preventative care, mental stimulation, and appropriate nutrition to maintain health and prevent obesity.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Annual Check-ups",
              description: "Complete physical examination and health assessment.",
              frequency: "Yearly",
              importance: "essential",
            },
            {
              title: "Dental Health",
              description: "Professional cleaning as needed and home dental care.",
              frequency: "Professional: as recommended; Home care: several times weekly",
              importance: "recommended",
            },
            {
              title: "Parasite Prevention",
              description: "Continued flea and tick prevention.",
              frequency: "Monthly or as recommended",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition & Weight",
          recommendations: [
            {
              title: "Weight Management",
              description: "Monitor food intake and weight to prevent obesity.",
              frequency: "Ongoing",
              importance: "essential",
            },
            {
              title: "Fresh Water",
              description: "Clean, fresh water available at all times.",
              frequency: "Change daily",
              importance: "essential",
            },
          ],
        },
        {
          name: "Environmental Enrichment",
          recommendations: [
            {
              title: "Play Sessions",
              description: "Interactive play to maintain physical and mental health.",
              frequency: "Daily, 10-15 minutes",
              importance: "essential",
            },
            {
              title: "Environmental Variety",
              description: "Rotate toys, provide window perches, and create engaging spaces.",
              frequency: "Ongoing",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    senior: {
      overview:
        "Senior cats need more frequent health monitoring, adjusted nutrition, and special attention to comfort and mobility.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Semi-annual Check-ups",
              description: "More frequent monitoring for age-related conditions.",
              frequency: "Every 6 months",
              importance: "essential",
            },
            {
              title: "Senior Bloodwork",
              description: "Comprehensive blood panels to detect early issues like kidney disease.",
              frequency: "Annually or as recommended",
              importance: "essential",
            },
            {
              title: "Blood Pressure Monitoring",
              description: "Regular checks for hypertension, common in older cats.",
              frequency: "During check-ups or as recommended",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Comfort & Accessibility",
          recommendations: [
            {
              title: "Easy Access",
              description: "Provide steps or ramps to favorite perches and beds.",
              frequency: "Ongoing",
              importance: "recommended",
            },
            {
              title: "Comfortable Bedding",
              description: "Soft, warm beds in quiet areas of the home.",
              frequency: "Ongoing",
              importance: "recommended",
            },
            {
              title: "Litter Box Accessibility",
              description: "Low-sided boxes that are easy to enter and exit.",
              frequency: "Ongoing",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Senior-Specific Diet",
              description: "Food formulated for older cats with adjusted phosphorus and protein.",
              frequency: "Daily",
              importance: "essential",
            },
            {
              title: "Water Intake",
              description: "Monitor and encourage water consumption for kidney health.",
              frequency: "Daily",
              importance: "essential",
            },
          ],
        },
      ],
    },
  },
  rabbit: {
    baby: {
      overview: "Baby rabbits (kits) need special nutrition, gentle handling, and a safe environment to thrive.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Initial Check-up",
              description: "First examination by a rabbit-savvy veterinarian.",
              frequency: "Within first week of bringing home",
              importance: "essential",
            },
            {
              title: "Parasite Check",
              description: "Screening for common parasites like coccidia.",
              frequency: "As recommended by your vet",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Mother's Milk/Formula",
              description: "For very young kits under 8 weeks.",
              frequency: "As needed",
              importance: "essential",
            },
            {
              title: "Alfalfa Hay",
              description: "Higher calcium content for growing rabbits.",
              frequency: "Unlimited access",
              importance: "essential",
            },
            {
              title: "Kitten-Specific Pellets",
              description: "Higher protein content for growth.",
              frequency: "Unlimited until 3 months, then begin limiting",
              importance: "essential",
            },
          ],
        },
        {
          name: "Environment & Handling",
          recommendations: [
            {
              title: "Safe Housing",
              description: "Secure enclosure with appropriate bedding.",
              frequency: "Clean weekly or as needed",
              importance: "essential",
            },
            {
              title: "Gentle Socialization",
              description: "Careful handling to build trust and comfort with humans.",
              frequency: "Daily, short sessions",
              importance: "essential",
            },
          ],
        },
      ],
    },
    adolescent: {
      overview:
        "Adolescent rabbits are growing rapidly and developing adult behaviors. They need appropriate nutrition and training.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Spay/Neuter",
              description: "Recommended for health and behavior benefits.",
              frequency: "Usually between 4-6 months",
              importance: "recommended",
            },
            {
              title: "Vaccination",
              description: "RHDV2 vaccine if recommended in your area.",
              frequency: "As recommended by your vet",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Transition to Timothy Hay",
              description: "Gradually replace alfalfa with timothy hay.",
              frequency: "Begin around 7 months",
              importance: "essential",
            },
            {
              title: "Limited Pellets",
              description: "Reduce quantity as rabbit matures.",
              frequency: "Daily, measured amount",
              importance: "essential",
            },
            {
              title: "Fresh Vegetables",
              description: "Gradually introduce variety of leafy greens.",
              frequency: "Daily, increasing amounts",
              importance: "essential",
            },
          ],
        },
        {
          name: "Behavior & Training",
          recommendations: [
            {
              title: "Litter Box Training",
              description: "Consistent reinforcement of proper habits.",
              frequency: "Ongoing",
              importance: "essential",
            },
            {
              title: "Chew Toys",
              description: "Appropriate items to chew to maintain dental health.",
              frequency: "Always available",
              importance: "essential",
            },
            {
              title: "Supervised Free Roam",
              description: "Safe exploration outside of enclosure.",
              frequency: "Daily if possible",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    adult: {
      overview: "Adult rabbits need a consistent routine, proper diet, and regular health monitoring to stay healthy.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Annual Check-ups",
              description: "Complete physical examination and health assessment.",
              frequency: "Yearly",
              importance: "essential",
            },
            {
              title: "Dental Check",
              description: "Examination of teeth for overgrowth or spurs.",
              frequency: "During annual exam or if eating habits change",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Timothy or Grass Hay",
              description: "Primary component of diet for digestive and dental health.",
              frequency: "Unlimited access, fresh daily",
              importance: "essential",
            },
            {
              title: "Limited Pellets",
              description: "Small amount of high-quality, timothy-based pellets.",
              frequency: "Daily, measured amount (about 1/4 cup per 5 lbs)",
              importance: "essential",
            },
            {
              title: "Fresh Vegetables",
              description: "Variety of leafy greens and occasional treats.",
              frequency: "Daily, 1 cup per 2 lbs of body weight",
              importance: "essential",
            },
          ],
        },
        {
          name: "Environment & Exercise",
          recommendations: [
            {
              title: "Exercise Time",
              description: "Safe, supervised time outside enclosure.",
              frequency: "Daily, at least a few hours if possible",
              importance: "essential",
            },
            {
              title: "Environmental Enrichment",
              description: "Toys, tunnels, and items to explore and chew.",
              frequency: "Rotate weekly",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    senior: {
      overview:
        "Senior rabbits need special attention to mobility, comfort, and potential health issues that come with age.",
      categories: [
        {
          name: "Veterinary Care",
          recommendations: [
            {
              title: "Semi-annual Check-ups",
              description: "More frequent monitoring for age-related conditions.",
              frequency: "Every 6 months",
              importance: "essential",
            },
            {
              title: "Mobility Assessment",
              description: "Check for arthritis and other mobility issues.",
              frequency: "During check-ups and at home",
              importance: "essential",
            },
          ],
        },
        {
          name: "Comfort & Accessibility",
          recommendations: [
            {
              title: "Easy Access",
              description: "Low-sided litter boxes and ramps to favorite areas.",
              frequency: "Ongoing",
              importance: "essential",
            },
            {
              title: "Soft Flooring",
              description: "Extra padding in resting areas to prevent pressure sores.",
              frequency: "Ongoing",
              importance: "essential",
            },
            {
              title: "Grooming Assistance",
              description: "Help with grooming as self-grooming may decrease.",
              frequency: "Weekly or as needed",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Softer Hay Options",
              description: "Orchard grass or other softer hays if teeth issues develop.",
              frequency: "As needed",
              importance: "recommended",
            },
            {
              title: "Hydration",
              description: "Monitor water intake and offer water-rich vegetables.",
              frequency: "Daily",
              importance: "essential",
            },
          ],
        },
      ],
    },
  },
  fish: {
    baby: {
      overview: "Baby fish (fry) need clean water, appropriate food, and protection from adult fish.",
      categories: [
        {
          name: "Water Quality",
          recommendations: [
            {
              title: "Frequent Water Changes",
              description: "Small, frequent changes to maintain pristine conditions.",
              frequency: "10-20% every 2-3 days",
              importance: "essential",
            },
            {
              title: "Water Testing",
              description: "Monitor ammonia, nitrite, nitrate, and pH levels.",
              frequency: "Every other day",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Specialized Fry Food",
              description: "Commercially available powdered fry food or infusoria.",
              frequency: "Multiple small feedings daily",
              importance: "essential",
            },
            {
              title: "Live Food",
              description: "Baby brine shrimp, microworms, or other appropriately sized live foods.",
              frequency: "Daily as they grow",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Environment",
          recommendations: [
            {
              title: "Separate Tank",
              description: "Breeding tank or nursery tank to protect from adults.",
              frequency: "Until large enough to join main tank",
              importance: "essential",
            },
            {
              title: "Gentle Filtration",
              description: "Sponge filter or other gentle filtration to prevent injury.",
              frequency: "Ongoing",
              importance: "essential",
            },
          ],
        },
      ],
    },
    adolescent: {
      overview: "Juvenile fish are growing rapidly and developing their adult coloration and behaviors.",
      categories: [
        {
          name: "Water Quality",
          recommendations: [
            {
              title: "Regular Water Changes",
              description: "Maintain clean water for optimal growth.",
              frequency: "25-30% weekly",
              importance: "essential",
            },
            {
              title: "Water Testing",
              description: "Continue monitoring water parameters.",
              frequency: "Weekly",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Growth-Promoting Food",
              description: "High-quality food appropriate for species and size.",
              frequency: "2-3 times daily",
              importance: "essential",
            },
            {
              title: "Varied Diet",
              description: "Mix of flakes, pellets, frozen, and live foods as appropriate.",
              frequency: "Daily",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Environment",
          recommendations: [
            {
              title: "Appropriate Space",
              description: "Ensure tank size accommodates growing fish.",
              frequency: "Ongoing",
              importance: "essential",
            },
            {
              title: "Hiding Places",
              description: "Provide plants, decorations, or structures for security.",
              frequency: "Ongoing",
              importance: "recommended",
            },
          ],
        },
      ],
    },
    adult: {
      overview: "Adult fish need stable water conditions, appropriate nutrition, and a well-maintained environment.",
      categories: [
        {
          name: "Water Quality",
          recommendations: [
            {
              title: "Regular Water Changes",
              description: "Maintain clean water and stable parameters.",
              frequency: "25-30% weekly or biweekly",
              importance: "essential",
            },
            {
              title: "Filter Maintenance",
              description: "Clean or replace filter media as needed.",
              frequency: "Monthly or as recommended",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Species-Appropriate Diet",
              description: "High-quality food specific to your fish type.",
              frequency: "Once or twice daily",
              importance: "essential",
            },
            {
              title: "Portion Control",
              description: "Feed only what can be consumed in 2-3 minutes.",
              frequency: "Each feeding",
              importance: "essential",
            },
            {
              title: "Fasting Day",
              description: "Skip feeding one day per week to prevent overfeeding.",
              frequency: "Weekly",
              importance: "recommended",
            },
          ],
        },
        {
          name: "Tank Maintenance",
          recommendations: [
            {
              title: "Algae Control",
              description: "Clean glass, decorations, and manage algae growth.",
              frequency: "Weekly or as needed",
              importance: "recommended",
            },
            {
              title: "Gravel Vacuuming",
              description: "Remove debris and waste from substrate.",
              frequency: "During water changes",
              importance: "essential",
            },
          ],
        },
      ],
    },
    senior: {
      overview:
        "Older fish may need adjusted care including gentler water flow, easier access to food, and vigilant health monitoring.",
      categories: [
        {
          name: "Water Quality",
          recommendations: [
            {
              title: "More Frequent, Smaller Water Changes",
              description: "Maintain pristine water while minimizing stress.",
              frequency: "15-20% weekly",
              importance: "essential",
            },
            {
              title: "Stable Parameters",
              description: "Avoid fluctuations in temperature and water chemistry.",
              frequency: "Monitor daily",
              importance: "essential",
            },
          ],
        },
        {
          name: "Nutrition",
          recommendations: [
            {
              title: "Easier-to-Eat Food",
              description: "Softer foods or smaller pieces that require less energy to eat.",
              frequency: "Daily",
              importance: "essential",
            },
            {
              title: "Targeted Feeding",
              description: "Ensure food reaches the fish, especially for less mobile individuals.",
              frequency: "Each feeding",
              importance: "essential",
            },
          ],
        },
        {
          name: "Environment",
          recommendations: [
            {
              title: "Reduced Current",
              description: "Adjust filter output or add baffles for gentler water movement.",
              frequency: "Ongoing",
              importance: "recommended",
            },
            {
              title: "Resting Areas",
              description: "Provide plants or decorations near the surface for easier access to air.",
              frequency: "Ongoing",
              importance: "recommended",
            },
            {
              title: "Health Monitoring",
              description: "Watch closely for signs of disease or distress.",
              frequency: "Daily",
              importance: "essential",
            },
          ],
        },
      ],
    },
  },
}

