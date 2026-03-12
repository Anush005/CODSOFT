export interface HealthRule {
  keywords: string[];
  response: string;
  followUpChips?: string[];
}

export const rules: HealthRule[] = [
  {
    keywords: ['headache', 'head pain', 'migraine', 'head hurts'],
    response: "Headaches can be caused by dehydration, stress, lack of sleep, or eye strain. Try drinking water, resting in a dark room, and applying a cold compress. For migraines, avoid known triggers like bright lights and certain foods. If headaches are severe or persistent, consult a doctor.",
    followUpChips: ['Migraine remedies', 'When to see a doctor', 'Stress relief tips'],
  },
  {
    keywords: ['cold', 'flu', 'cough', 'sneez', 'runny nose', 'congestion', 'sore throat'],
    response: "For colds and flu, rest and hydration are key. Drink warm fluids like herbal tea or broth. Honey can soothe a sore throat (not for children under 1). Over-the-counter decongestants may help with congestion. If symptoms last more than 10 days or include high fever, see a doctor.",
    followUpChips: ['Home remedies for cold', 'Flu vs cold differences', 'Boost immune system'],
  },
  {
    keywords: ['sleep', 'insomnia', 'cant sleep', "can't sleep", 'tired', 'fatigue', 'exhausted'],
    response: "Good sleep hygiene is essential: keep a consistent schedule, avoid screens 1 hour before bed, keep your room cool and dark, and limit caffeine after noon. Adults need 7–9 hours per night. If insomnia persists for weeks, consider speaking with a healthcare provider.",
    followUpChips: ['Sleep hygiene tips', 'Natural sleep aids', 'When fatigue is serious'],
  },
  {
    keywords: ['stress', 'anxiety', 'worried', 'nervous', 'panic', 'overwhelmed', 'mental health'],
    response: "Managing stress starts with deep breathing exercises, regular physical activity, and adequate sleep. Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. Limit caffeine and practice mindfulness. If anxiety interferes with daily life, please reach out to a mental health professional.",
    followUpChips: ['Breathing exercises', 'Mindfulness tips', 'When to seek help'],
  },
  {
    keywords: ['diet', 'nutrition', 'eat', 'food', 'healthy eating', 'meal', 'weight'],
    response: "A balanced diet includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Aim for 5 servings of fruits/vegetables daily. Stay hydrated with 8 glasses of water. Limit processed foods, added sugars, and excessive sodium. Portion control matters as much as food quality.",
    followUpChips: ['Balanced meal ideas', 'Hydration tips', 'Foods to avoid'],
  },
  {
    keywords: ['exercise', 'workout', 'fitness', 'physical activity', 'gym', 'active'],
    response: "Adults should aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening exercises twice a week. Start slow if you're new — even a 10-minute daily walk makes a difference. Listen to your body and rest when needed.",
    followUpChips: ['Beginner workout plan', 'Exercise for weight loss', 'Stretching routine'],
  },
  {
    keywords: ['fever', 'temperature', 'hot', 'chills'],
    response: "A fever (above 100.4°F / 38°C) is your body's way of fighting infection. Stay hydrated, rest, and use acetaminophen or ibuprofen to manage discomfort. Seek immediate medical attention if fever exceeds 103°F (39.4°C), lasts more than 3 days, or is accompanied by severe symptoms.",
    followUpChips: ['When fever is dangerous', 'How to reduce fever', 'Fever in children'],
  },
  {
    keywords: ['vitamin', 'supplement', 'deficiency', 'iron', 'vitamin d', 'b12', 'calcium'],
    response: "Most nutrients should come from food, but common deficiencies include Vitamin D (get sunlight + fortified foods), B12 (important for vegetarians/vegans), Iron (leafy greens, red meat), and Calcium (dairy, fortified alternatives). Always consult a doctor before starting supplements.",
    followUpChips: ['Vitamin D sources', 'Iron-rich foods', 'Do I need supplements?'],
  },
  {
    keywords: ['back pain', 'back ache', 'spine', 'posture', 'sitting'],
    response: "Back pain is often caused by poor posture, prolonged sitting, or weak core muscles. Maintain good posture — ears over shoulders, shoulders over hips. Take breaks every 30 minutes to stretch. Strengthen your core with planks and bridges. Apply heat or ice for acute pain. See a doctor if pain radiates down your legs.",
    followUpChips: ['Posture exercises', 'Desk ergonomics', 'Core strengthening'],
  },
  {
    keywords: ['skin', 'acne', 'rash', 'dry skin', 'eczema', 'sunburn', 'moistur'],
    response: "For healthy skin: cleanse gently, moisturize daily, and always wear SPF 30+ sunscreen. For acne, avoid touching your face and use non-comedogenic products. Dry skin benefits from thicker creams with ceramides. For persistent rashes or eczema, a dermatologist can provide targeted treatments.",
    followUpChips: ['Skincare routine', 'Acne remedies', 'Sun protection tips'],
  },
  {
    keywords: ['heart', 'blood pressure', 'cholesterol', 'cardiovascular', 'chest pain'],
    response: "Heart health basics: exercise regularly, eat a heart-healthy diet (rich in omega-3s, fiber, and low in saturated fats), manage stress, avoid smoking, and limit alcohol. Monitor your blood pressure regularly. If you experience chest pain, shortness of breath, or irregular heartbeat, seek immediate medical attention.",
    followUpChips: ['Heart-healthy foods', 'Lower blood pressure', 'Warning signs'],
  },
  {
    keywords: ['diabetes', 'blood sugar', 'insulin', 'glucose'],
    response: "Managing blood sugar involves eating regular balanced meals, choosing complex carbs over simple sugars, staying active, and monitoring glucose levels. Fiber-rich foods help slow sugar absorption. Both Type 1 and Type 2 diabetes require medical supervision — work closely with your healthcare team.",
    followUpChips: ['Low glycemic foods', 'Blood sugar tips', 'Diabetes prevention'],
  },
  {
    keywords: ['allergy', 'allergies', 'allergic', 'histamine', 'hay fever', 'pollen'],
    response: "For allergies: identify and avoid triggers, keep windows closed during high pollen days, shower after being outdoors, and use air purifiers. Over-the-counter antihistamines can help manage symptoms. For severe allergies or anaphylaxis, always carry prescribed epinephrine and seek emergency care.",
    followUpChips: ['Common allergens', 'Natural allergy relief', 'Food allergies'],
  },
  {
    keywords: ['hydrat', 'water', 'drink', 'thirst', 'dehydrat'],
    response: "Aim for about 8 glasses (2 liters) of water daily — more if you exercise, live in hot climates, or are pregnant/nursing. Signs of dehydration include dark urine, dry mouth, fatigue, and dizziness. Fruits and vegetables also contribute to hydration. Limit sugary drinks and excessive caffeine.",
    followUpChips: ['Signs of dehydration', 'Best hydrating foods', 'How much water daily'],
  },
  {
    keywords: ['eye', 'vision', 'screen', 'eye strain', 'dry eyes'],
    response: "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds. Adjust screen brightness and use blue light filters in the evening. Keep screens at arm's length and slightly below eye level. Use artificial tears for dry eyes. Get annual eye exams.",
    followUpChips: ['20-20-20 rule', 'Blue light effects', 'Eye-healthy foods'],
  },
  {
    keywords: ['dental', 'teeth', 'tooth', 'gum', 'oral', 'brush'],
    response: "Brush twice daily for 2 minutes with fluoride toothpaste, floss daily, and replace your toothbrush every 3 months. Limit sugary and acidic foods. Visit your dentist every 6 months for checkups. Don't ignore bleeding gums — it could signal gum disease.",
    followUpChips: ['Proper brushing technique', 'Gum disease signs', 'Foods for healthy teeth'],
  },
  {
    keywords: ['pregnancy', 'pregnant', 'prenatal', 'expecting'],
    response: "Prenatal care is crucial: take folic acid supplements, eat a balanced diet, stay active with gentle exercise, avoid alcohol and raw fish, and attend all prenatal appointments. Common discomforts like nausea and fatigue are normal in early pregnancy. Always consult your OB-GYN with any concerns.",
    followUpChips: ['Prenatal vitamins', 'Safe exercises', 'First trimester tips'],
  },
  {
    keywords: ['first aid', 'wound', 'cut', 'burn', 'bruise', 'bleeding'],
    response: "For minor cuts: clean with water, apply antibiotic ointment, and cover with a bandage. For burns: run cool (not cold) water over it for 10+ minutes. For nosebleeds: lean forward and pinch the soft part of your nose. Seek emergency care for deep wounds, heavy bleeding, or burns larger than your palm.",
    followUpChips: ['First aid basics', 'When to go to ER', 'Home medicine kit'],
  },
];

export const fallbackResponse = {
  response: "I can help with general health topics like nutrition, exercise, sleep, common symptoms, mental health, and more. Try asking about a specific health concern — I'm here to help! ⚕️\n\n*Disclaimer: I provide general health information only, not medical advice. Always consult a healthcare professional for diagnosis and treatment.*",
  followUpChips: ['Healthy diet tips', 'How to sleep better', 'Exercise recommendations'],
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
  'How to eat healthy?',
  'Tips for better sleep',
  'How to manage stress?',
];
