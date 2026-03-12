export interface PlantRule {
  keywords: string[];
  response: string;
  followUpChips?: string[];
}

export const rules: PlantRule[] = [
  {
    keywords: ['water', 'watering', 'schedule', 'how often', 'thirsty', 'dry'],
    response: "Most houseplants prefer their soil to dry out between waterings. A good rule of thumb: stick your finger two inches into the soil. If it's dry, water thoroughly until it drains from the bottom. Overwatering is the #1 killer of indoor plants.",
    followUpChips: ['Snake plant watering', 'Signs of overwatering', 'Best time to water'],
  },
  {
    keywords: ['light', 'sun', 'sunlight', 'shade', 'dark', 'window', 'bright'],
    response: "Light needs vary by species, but most tropical houseplants thrive in bright, indirect light — think a few feet from a south or east-facing window. Direct afternoon sun can scorch leaves, while too little light causes leggy, stretched growth.",
    followUpChips: ['Low light plants', 'Signs of too much sun', 'Grow lights'],
  },
  {
    keywords: ['yellow', 'yellowing', 'brown', 'browning', 'spots', 'wilting', 'drooping', 'dying'],
    response: "Yellow leaves usually indicate overwatering. Check the top two inches of soil — if it's wet, hold off on watering until it dries out completely. Ensure your pot has proper drainage. Brown crispy tips often signal low humidity or underwatering.",
    followUpChips: ['How to fix root rot', 'Humidity tips', 'When to prune'],
  },
  {
    keywords: ['soil', 'potting', 'repot', 'repotting', 'pot', 'drainage', 'mix'],
    response: "A well-draining potting mix is essential. For most houseplants, combine regular potting soil with perlite and orchid bark in a 2:1:1 ratio. Repot when roots circle the bottom or grow out of drainage holes — typically every 1–2 years.",
    followUpChips: ['Best soil for succulents', 'When to repot', 'Pot size guide'],
  },
  {
    keywords: ['fertiliz', 'feed', 'nutrient', 'food', 'growth'],
    response: "Feed your plants during the growing season (spring through early fall) with a balanced liquid fertilizer diluted to half strength, every 2–4 weeks. Stop fertilizing in winter when growth naturally slows down.",
    followUpChips: ['Organic fertilizers', 'Signs of over-fertilizing', 'Winter care'],
  },
  {
    keywords: ['pest', 'bug', 'insect', 'mealybug', 'spider mite', 'fungus gnat', 'aphid'],
    response: "Common houseplant pests include spider mites, mealybugs, and fungus gnats. Isolate affected plants immediately. Wipe leaves with diluted neem oil or insecticidal soap. For fungus gnats, let soil dry completely between waterings and use sticky traps.",
    followUpChips: ['Neem oil guide', 'Preventing pests', 'Safe pesticides'],
  },
  {
    keywords: ['toxic', 'poison', 'pet', 'cat', 'dog', 'safe', 'child'],
    response: "Many popular houseplants are toxic to pets and children, including pothos, philodendrons, and peace lilies. Pet-safe alternatives include spider plants, calatheas, Boston ferns, and parlor palms. Always check before bringing a new plant home.",
    followUpChips: ['Pet-safe plants list', 'Toxic plant symptoms', 'Child-safe options'],
  },
  {
    keywords: ['snake plant', 'sansevieria', 'mother in law'],
    response: "Snake plants are incredibly low-maintenance. Water every 2–3 weeks (even less in winter), and they tolerate low to bright indirect light. They're excellent air purifiers and nearly indestructible — perfect for beginners.",
    followUpChips: ['Snake plant varieties', 'Propagating snake plants', 'Best beginner plants'],
  },
  {
    keywords: ['propagat', 'cutting', 'clone', 'multiply', 'baby'],
    response: "Most houseplants can be propagated through stem cuttings placed in water or moist soil. Cut just below a node (where leaves attach), remove lower leaves, and place in water. Change water weekly. Roots typically appear in 2–4 weeks.",
    followUpChips: ['Water vs soil propagation', 'Best plants to propagate', 'When to propagate'],
  },
  {
    keywords: ['humid', 'mist', 'misting', 'moisture', 'tropical'],
    response: "Tropical plants love humidity above 50%. Group plants together, use a pebble tray with water, or run a humidifier nearby. Misting provides only temporary relief and can promote fungal issues if overdone. Bathrooms and kitchens are naturally humid spots.",
    followUpChips: ['Best humidifiers', 'High humidity plants', 'Dry air solutions'],
  },
  {
    keywords: ['pothos', 'devil\'s ivy', 'epipremnum'],
    response: "Pothos is one of the most forgiving houseplants. It tolerates low light but grows faster in bright, indirect light. Water when the top inch of soil is dry — roughly every 1–2 weeks. It trails beautifully from shelves and is super easy to propagate in water. Note: toxic to pets.",
    followUpChips: ['Propagating pothos', 'Pothos varieties', 'Pet-safe alternatives'],
  },
  {
    keywords: ['monstera', 'swiss cheese', 'deliciosa'],
    response: "Monstera deliciosa loves bright, indirect light and consistent moisture. Water when the top 2 inches of soil feel dry. It develops its iconic split leaves (fenestrations) as it matures — more light = more splits. Give it a moss pole to climb for larger leaves. Wipe leaves monthly to prevent dust buildup.",
    followUpChips: ['Monstera fenestrations', 'Moss pole setup', 'Monstera propagation'],
  },
  {
    keywords: ['fiddle', 'ficus lyrata', 'fig'],
    response: "Fiddle leaf figs are stunning but particular. They need bright, indirect light and hate being moved. Water when the top inch is dry, and always use room-temperature water. They're sensitive to drafts, temperature swings, and overwatering. Brown spots on leaves usually mean root rot — check drainage immediately.",
    followUpChips: ['Fiddle leaf brown spots', 'Fiddle leaf placement', 'Ficus care tips'],
  },
  {
    keywords: ['succulent', 'cactus', 'cacti', 'aloe', 'echeveria', 'jade'],
    response: "Succulents need bright direct light (6+ hours) and very infrequent watering — soak the soil thoroughly, then let it dry completely before watering again (every 2–3 weeks). Use a fast-draining cactus/succulent mix. The #1 mistake is overwatering; when in doubt, wait another week.",
    followUpChips: ['Succulent soil mix', 'Stretching succulents', 'Indoor cactus care'],
  },
  {
    keywords: ['philodendron', 'heartleaf'],
    response: "Philodendrons are versatile and low-maintenance. They thrive in medium to bright indirect light and prefer their soil to dry slightly between waterings. Heartleaf varieties trail beautifully, while upright types like the Birkin make bold statement pieces. Most are toxic to pets, so keep them out of reach.",
    followUpChips: ['Philodendron varieties', 'Climbing vs trailing', 'Pet-safe plants'],
  },
  {
    keywords: ['calathea', 'prayer plant', 'maranta', 'stromanthe'],
    response: "Calatheas and prayer plants are humidity lovers — aim for 60%+ humidity. They prefer filtered or distilled water (tap water minerals cause brown leaf edges). Give them medium indirect light; direct sun fades their beautiful patterns. Their leaves fold up at night, which is completely normal!",
    followUpChips: ['Calathea humidity tips', 'Water quality guide', 'Best patterned plants'],
  },
  {
    keywords: ['orchid', 'phalaenopsis'],
    response: "Phalaenopsis orchids are easier than their reputation. Water weekly by soaking the roots for 10 minutes, then drain completely — never let them sit in water. They like bright indirect light and bloom for months. After flowers drop, cut the spike above a node and it may rebloom.",
    followUpChips: ['Orchid reblooming', 'Orchid watering method', 'Orchid fertilizing'],
  },
  {
    keywords: ['zz plant', 'zamioculcas', 'zanzibar'],
    response: "ZZ plants are virtually indestructible. They store water in their thick rhizomes and can go weeks without watering. They tolerate low light, neglect, and even fluorescent office lighting. Water only when the soil is completely dry — every 2–4 weeks. They're mildly toxic, so keep away from curious pets.",
    followUpChips: ['Low light plants', 'Beginner plant guide', 'Office-friendly plants'],
  },
  {
    keywords: ['peace lily', 'spathiphyllum'],
    response: "Peace lilies tell you when they need water — their leaves droop dramatically, then bounce right back after a drink. They thrive in low to medium indirect light and can even bloom in low light conditions. They're excellent air purifiers but toxic to pets. Wipe leaves regularly for best health.",
    followUpChips: ['Peace lily blooming', 'Air purifying plants', 'Low light options'],
  },
  {
    keywords: ['rubber', 'ficus elastica'],
    response: "Rubber plants are bold, easy-care statement plants. They love bright indirect light (the darker varieties tolerate lower light). Water when the top inch of soil is dry and wipe their large glossy leaves to keep them dust-free. They can grow quite tall — prune to control size and encourage bushier growth.",
    followUpChips: ['Rubber plant pruning', 'Ficus varieties', 'Large houseplants'],
  },
];

export const fallbackResponse = {
  response: "I'm just a simple botany bot! I only know about watering, light, soil, pests, and common plant issues. Try asking about one of these topics — I'd love to help your plants thrive.",
  followUpChips: ['Watering schedule', 'Light requirements', 'Why are my leaves yellow?'],
};

export const getResponse = (input: string): { response: string; followUpChips?: string[] } => {
  const text = input.toLowerCase();
  
  for (const rule of rules) {
    if (rule.keywords.some(keyword => text.includes(keyword))) {
      return { response: rule.response, followUpChips: rule.followUpChips };
    }
  }
  
  return fallbackResponse;
};

export const initialChips = [
  'How often should I water?',
  'Why are my leaves yellow?',
  'Best light for houseplants',
];
