import { Language } from '../components/LanguageSelector';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// API configuration
interface AIConfig {
  apiKey: string;
  model: string;
  endpoint: string;
}

// Extend Window interface to include our environment variables
declare global {
  interface Window {
    ENV_VITE_HUGGINGFACE_API_KEY?: string;
  }
}

// Default configuration for Hugging Face
const defaultAIConfig: AIConfig = {
  apiKey: import.meta.env.VITE_HUGGINGFACE_API_KEY || '',
  model: 'mistralai/Mistral-7B-Instruct-v0.2',  // Reliable and working model
  endpoint: 'https://api-inference.huggingface.co/models/',
};

// Backup model in case the primary one fails
const backupAIConfig: AIConfig = {
  apiKey: import.meta.env.VITE_HUGGINGFACE_API_KEY || '',
  model: 'GRMenon/mental-health-mistral-7b-instructv0.2-finetuned-V2',  // Reliable backup model
  endpoint: 'https://api-inference.huggingface.co/models/',
};

// Config flag to disable external API calls and use only simulated responses
const USE_SIMULATED_RESPONSES_ONLY = false;  // Enabling real API calls

// Guide configuration for more human-like interactions
export interface GuideConfig {
  personality: 'friendly' | 'professional' | 'enthusiastic' | 'knowledgeable';
  detailLevel: 'concise' | 'detailed' | 'comprehensive';
  style: 'casual' | 'formal' | 'poetic' | 'direct';
  focusArea?: 'history' | 'culture' | 'food' | 'shopping' | 'practical';
  rememberConversation: boolean;
}

// Default guide configuration
export const defaultGuideConfig: GuideConfig = {
  personality: 'friendly',
  detailLevel: 'detailed',
  style: 'casual',
  rememberConversation: true
};

// Modal display config
export interface ModalConfig {
  enabled: boolean;
  title: string;
  animation: 'fade' | 'slide' | 'zoom';
  position: 'center' | 'top' | 'bottom';
  closeOnClickOutside: boolean;
}

// Default modal configuration
export const defaultModalConfig: ModalConfig = {
  enabled: false,
  title: 'Marhaba - Your Guide to Fes',
  animation: 'fade',
  position: 'center',
  closeOnClickOutside: true
};

// Knowledge base with facts about Fes that will be dynamically combined
const fesKnowledge = {
  history: [
    "Fes was founded in 789 CE by Idris I, who established the Idrisid dynasty.",
    "Fes became Morocco's capital under the Marinid dynasty in the 13th century.",
    "The University of Al Quaraouiyine, founded in 859, is the oldest continuously operating university in the world.",
    "Fes consists of three distinct parts: Fes el Bali (old Fes), Fes el Jdid (new Fes, built in the 13th century), and Ville Nouvelle (built during French colonial rule).",
    "The city was a major center of education and religious scholarship for centuries.",
    "Fes reached its golden age in the 13th and 14th centuries under the Marinid dynasty.",
    "The famous blue gate, Bab Boujloud, was built in 1913 during the French protectorate.",
    "The medina of Fes el-Bali became a UNESCO World Heritage site in 1981.",
    "After Morocco's independence in 1956, Rabat remained the capital instead of Fes.",
    "The city's famous tanneries have operated continuously since the 11th century."
  ],
  
  monuments: [
    "The Bou Inania Madrasa is considered the finest example of Marinid architecture in Fes, built in the 14th century.",
    "Al-Qarawiyyin Mosque and University dates from 859 CE and is the oldest continuously operating educational institution in the world.",
    "The Nejjarine Fountain is a beautifully decorated public water fountain from the 18th century.",
    "Dar al-Magana, a 14th-century water clock, is an engineering marvel of its time.",
    "The Merenid Tombs offer panoramic views of the entire medina from their hillside location.",
    "The Moulay Idriss II Shrine is dedicated to the city's founder and is an important pilgrimage site.",
    "The Glaoui Palace showcases lavish Moroccan architectural styles from the early 20th century.",
    "The Bab Boujloud (Blue Gate) is the famous western entrance to the old medina.",
    "The Dar Batha Museum, housed in a former palace, contains excellent Moroccan crafts from the region.",
    "The Mellah (Jewish Quarter) contains historic synagogues and the Jewish Cemetery."
  ],
  
  medina: [
    "Fes el-Bali medina contains over 9,000 narrow streets and alleys, making it the world's largest car-free urban area.",
    "The medina is organized into districts by craft or trade, with specific areas for leatherwork, metalwork, carpentry, and textiles.",
    "The famous Chouara Tannery dates back to the 11th century and still operates using traditional methods.",
    "Narrow streets in the medina are designed to provide shade during hot summer months.",
    "Many houses in the medina feature interior courtyards with fountains for cooling and privacy.",
    "The medina contains approximately 10,000 traditional houses, many converted into riads (guesthouses).",
    "Donkeys and mules are the main form of transport for goods within the medina's narrow streets.",
    "The medina contains more than 300 mosques and 200 bakeries serving local neighborhoods.",
    "The souk (market) areas are organized by product type, with dedicated sections for spices, ceramics, textiles, and more.",
    "Many buildings in the medina feature intricate zellige tilework, carved plaster, and cedar woodwork."
  ],
  
  food: [
    "Pastilla is a signature Fes dish, a sweet-savory pie traditionally made with pigeon, almonds, and spices.",
    "The city is renowned for its versions of tagine, slow-cooked stews with distinctive spice combinations.",
    "Harira soup is a local specialty, especially popular during Ramadan.",
    "Fes has its own version of couscous, typically served on Fridays with seven vegetables.",
    "Street food in Fes includes freshly baked bread, msemen (pancakes), and sfenj (donuts).",
    "Traditional Fassi cuisine often combines sweet and savory flavors, using fruits in meat dishes.",
    "The city is known for its honey-soaked pastries like chebakia, especially during religious celebrations.",
    "Mint tea is served throughout the day, poured from height to create a frothy top.",
    "Many traditional restaurants (riads) offer dining on rooftop terraces with panoramic views of the medina.",
    "Cooking classes are available for tourists to learn traditional Fassi recipes and techniques."
  ],
  
  shopping: [
    "The Fes medina is famous for its blue ceramics, with distinctive cobalt patterns hand-painted by artisans.",
    "Leather goods are a specialty, particularly from the famous tanneries where production methods haven't changed for centuries.",
    "Brass and copper items, often intricately engraved, are crafted in the metalworkers' district.",
    "Handwoven textiles including carpets, blankets, and clothing reflect traditional Berber patterns.",
    "Aromatic spices, medicinal herbs, and natural beauty products are sold in dedicated souks.",
    "Woodcarvers produce intricate cedar items, from furniture to small decorative pieces.",
    "Negotiating prices is expected in the souks, typically starting at 50-70% of the initial asking price.",
    "Morning is the best time for serious shopping, when shops are less crowded and merchants more attentive.",
    "The Ensemble Artisanal offers fixed-price crafts for those uncomfortable with bargaining.",
    "Most craftspeople are happy to demonstrate their techniques if you show genuine interest."
  ],

  practical: [
    "The best times to visit Fes are spring (April-May) and fall (September-October) when temperatures are pleasant.",
    "Summers can be extremely hot with temperatures often exceeding 40°C (104°F).",
    "A local guide is recommended for first-time visitors to navigate the complex medina.",
    "Modest dress is appreciated, especially when visiting religious sites.",
    "Photography in the medina is generally welcomed, but always ask permission before photographing people.",
    "ATMs are available throughout Ville Nouvelle and at major entrances to the medina.",
    "Comfortable walking shoes are essential as you'll be walking on uneven cobblestone streets.",
    "Learning a few basic Arabic or French phrases is appreciated by locals.",
    "Keep a card from your hotel/riad to help find your way back or show to locals if lost.",
    "Drink bottled water and be cautious with street food if you have a sensitive stomach."
  ],
  
  culture: [
    "Fes is considered Morocco's cultural and spiritual capital with a rich tradition of music, crafts, and religious scholarship.",
    "The city hosts the annual Festival of World Sacred Music, bringing together artists from various spiritual traditions.",
    "Traditional Fassi houses (riads) are built around central courtyards, often with fountains and elaborate tilework.",
    "Fes is home to many Sufi brotherhoods who maintain traditions of spiritual music and practice.",
    "Craftsmanship is passed down through generations, with many artisans using techniques unchanged for centuries.",
    "The city has a long history of intellectual exchange, with scholars from across the Islamic world coming to study.",
    "Traditional hammams (public baths) remain an important part of social life in Fes.",
    "Fes has a rich tradition of storytelling, with tales often shared in cafés and public spaces.",
    "Religious celebrations, particularly during Ramadan and Eid, involve special foods and community gatherings.",
    "The city's multicultural history includes significant Jewish and Andalusian influences."
  ]
};

// Knowledge base additions for Meknes
const citiesKnowledge = {
  meknes: {
    history: [
      "Meknes was founded in the 11th century by the Almoravids as a military settlement.",
      "Sultan Moulay Ismail made Meknes the capital of Morocco in the 17th century.",
      "The city was known as the 'Versailles of Morocco' due to its grand buildings.",
      "Meknes was designated as a UNESCO World Heritage Site in 1996.",
      "The city served as Morocco's capital during the reign of Sultan Moulay Ismail (1672-1727)."
    ],
    monuments: [
      "Bab Mansour is considered one of the most beautiful gates in Morocco.",
      "The Mausoleum of Moulay Ismail is a significant religious and historical site.",
      "The Royal Stables could house 12,000 horses and is an architectural marvel.",
      "Heri es-Souani was a massive granary and food storage complex.",
      "The Dar El Makhzen palace showcases impressive Moroccan architecture."
    ],
    medina: [
      "The Meknes medina is known for its more relaxed atmosphere compared to other imperial cities.",
      "Place El Hedim is the main square connecting the medina and the imperial city.",
      "The souks are organized by trade, similar to Fes but on a smaller scale.",
      "The medina walls stretch for 40 kilometers around the old city."
    ]
  }
};

// Extend the knowledge base
Object.assign(fesKnowledge, citiesKnowledge);

// Expanded and improved simulated responses
const simulatedResponses: Record<Language, Record<string, string[]>> = {
  en: {
    greetings: [
      "Hello! I'm Marhaba, your guide to Fes. What would you like to know about this beautiful city?",
      "Welcome to FesGuide! I'm here to help you discover the wonders of Fes. What are you interested in?",
      "Hi there! I'm your virtual guide to Fes. How can I assist you today?"
    ],
    default: [
      "Fes is one of Morocco's imperial cities and has been a cultural and spiritual center for over 1,200 years. Its medina is considered one of the best-preserved medieval cities in the Arab world. Would you like to know about specific aspects of Fes's history, culture, or attractions?",
      "Fes was founded in the 8th century and became a major center of education and culture. It's known for its ancient university, traditional crafts, and well-preserved medieval architecture. The city is divided into three parts: Fes el-Bali (the old, walled city), Fes el-Jdid (the 'new' part, built in the 13th century), and Ville Nouvelle (the modern section, built during French colonial times). What would you like to explore in Fes?"
    ]
  },
  fr: { default: ["Bienvenue à Fes!"] },
  ar: { default: ["مرحبًا بكم في فاس!"] },
  es: { default: ["¡Bienvenido a Fes!"] }
};

// Memory system to track conversation context
const conversationMemory = {
  userName: '',
  mentionedTopics: [] as string[],
  interests: [] as string[],
  lastTopic: '',
  visitLength: '',
  questionCount: 0
};

// Response fragments for dynamic assembly
const responseFragments = {
    greetings: [
    "Hello! I'm Marhaba, your guide to Fes.",
    "Welcome to Fes! I'm Marhaba, your local expert.",
    "Greetings from Fes! I'm Marhaba, and I'll be your guide."
  ],
  
  introductions: [
    "What would you like to know about our beautiful city today?",
    "I'd be happy to share information about our historic city. What interests you?",
    "How can I help you discover the wonders of our ancient city?"
  ],
  
  personalityPhrases: {
    friendly: [
      "I love showing visitors this part of our city!",
      "This is one of my favorite things to tell tourists about.",
      "I think you'll really enjoy learning about this."
    ],
    professional: [
      "This is an important aspect of our cultural heritage.",
      "Historians consider this to be particularly significant.",
      "This represents a key element of Fassi tradition."
    ],
    enthusiastic: [
      "It's absolutely fascinating!",
      "You're going to be amazed by this!",
      "This is truly one of the wonders of Fes!"
    ],
    knowledgeable: [
      "According to historical records,",
      "Scholars have documented that",
      "Research indicates that"
    ]
  },
  
  styleElements: {
    casual: [
      "Locals often say",
      "You'll find that",
      "Between you and me,"
    ],
    formal: [
      "It is important to note that",
      "One must consider that",
      "It should be mentioned that"
    ],
    poetic: [
      "Imagine the centuries of history flowing through",
      "Like whispers from the past,",
      "Under the golden Moroccan sun,"
    ],
    direct: [
      "Simply put,",
      "The fact is,",
      "In plain terms,"
    ]
  },
  
  detailLevel: {
    concise: 1,
    detailed: 2,
    comprehensive: 3
  },
  
  followUps: [
    "Would you like to know more about this, or shall we explore another aspect of Fes?",
    "Is there something specific about this that you'd like me to elaborate on?",
    "What else would you like to discover about our beautiful city?"
  ]
};

// Extract user's name from conversation if mentioned
const extractUserName = (messages: ChatMessage[]): string => {
  if (conversationMemory.userName) {
    return conversationMemory.userName; // Use cached name if available
  }
  
  for (const message of messages.filter(m => m.role === 'user')) {
    const content = message.content.toLowerCase();
    if (content.includes('my name is') || content.includes("i'm") || content.includes("i am")) {
      const nameMatch = content.match(/my name is (.+?)[\.\,\!]|i['']m (.+?)[\.\,\!]|i am (.+?)[\.\,\!]/i);
      if (nameMatch) {
        const name = (nameMatch[1] || nameMatch[2] || nameMatch[3] || '').trim();
        if (name && name.length < 20 && /^[a-zA-Z\s]+$/.test(name)) {
          conversationMemory.userName = name;
          return name;
        }
      }
    }
  }
  return '';
};

// Enhanced categorization function with memory
const categorizeMessage = (message: string): string => {
  message = message.toLowerCase();
  
  // Track topics in memory
  const updateMemory = (topic: string) => {
    conversationMemory.lastTopic = topic;
    if (!conversationMemory.mentionedTopics.includes(topic)) {
      conversationMemory.mentionedTopics.push(topic);
    }
    conversationMemory.questionCount++;
    return topic;
  };
  
  // Greetings
  if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
      message.includes('bonjour') || message.includes('hola') || message.includes('مرحبا')) {
    return updateMemory('greetings');
  }
  
  // History
  if (message.includes('history') || message.includes('historic') || message.includes('ancient') || 
      message.includes('old') || message.includes('founded') || message.includes('dynasty')) {
    if (!conversationMemory.interests.includes('history')) {
      conversationMemory.interests.push('history');
    }
    return updateMemory('history');
  }
  
  // Monuments
  if (message.includes('monument') || message.includes('madrasa') || message.includes('mosque') || 
      message.includes('building') || message.includes('architecture') || message.includes('palace') ||
      message.includes('shrine') || message.includes('tomb') || message.includes('gate')) {
    if (!conversationMemory.interests.includes('monuments')) {
      conversationMemory.interests.push('monuments');
    }
    return updateMemory('monuments');
  }
  
  // Medina
  if (message.includes('medina') || message.includes('old city') || message.includes('streets') || 
      message.includes('alleys') || message.includes('médina') || message.includes('vieille ville') ||
      message.includes('المدينة') || message.includes('المدينة القديمة') || 
      message.includes('ciudad vieja') || message.includes('calles')) {
    if (!conversationMemory.interests.includes('medina')) {
      conversationMemory.interests.push('medina');
    }
    return updateMemory('medina');
  }
  
  // Food
  if (message.includes('food') || message.includes('eat') || message.includes('restaurant') || 
      message.includes('cuisine') || message.includes('dish') || message.includes('nourriture') || 
      message.includes('manger') || message.includes('طعام') || message.includes('مطعم') ||
      message.includes('comida') || message.includes('restaurante')) {
    if (!conversationMemory.interests.includes('food')) {
      conversationMemory.interests.push('food');
    }
    return updateMemory('food');
  }
  
  // Shopping
  if (message.includes('shop') || message.includes('buy') || message.includes('souk') || 
      message.includes('market') || message.includes('acheter') || message.includes('marché') ||
      message.includes('تسوق') || message.includes('سوق') || 
      message.includes('comprar') || message.includes('mercado')) {
    if (!conversationMemory.interests.includes('shopping')) {
      conversationMemory.interests.push('shopping');
    }
    return updateMemory('shopping');
  }
  
  // Culture
  if (message.includes('culture') || message.includes('art') || message.includes('music') || 
      message.includes('craft') || message.includes('festival') || message.includes('tradition') ||
      message.includes('heritage')) {
    if (!conversationMemory.interests.includes('culture')) {
      conversationMemory.interests.push('culture');
    }
    return updateMemory('culture');
  }
  
  // Practical
  if (message.includes('tip') || message.includes('advice') || message.includes('recommend') || 
      message.includes('suggestion') || message.includes('best time') || message.includes('weather') ||
      message.includes('safety') || message.includes('travel') || message.includes('visit')) {
    if (!conversationMemory.interests.includes('practical')) {
      conversationMemory.interests.push('practical');
    }
    return updateMemory('practical');
  }
  
  // User is asking about modal
  if (message.includes('modal') || message.includes('popup') || message.includes('window') || 
      message.includes('display')) {
    return 'modalInfo';
  }
  
  // If no specific topic detected but we have a previous topic, continue it
  if (conversationMemory.lastTopic && conversationMemory.lastTopic !== 'greetings') {
    return updateMemory(conversationMemory.lastTopic);
  }
  
  return updateMemory('general');
};

// Create a dynamic, trained response based on the context and guide config
const createDynamicResponse = (
  messages: ChatMessage[],
  category: string,
  language: Language,
  guideConfig: GuideConfig
): string => {
  // For modal info questions
  if (category === 'modalInfo') {
    return "Yes, I can be displayed in a modal! To enable the modal view, you can set the modalConfig.enabled property to true when calling the sendMessage function. You can also customize the title, animation style, position, and other properties through the modalConfig object.";
  }
  
  // Get user name if available
  const userName = extractUserName(messages);
  const userGreeting = userName ? `, ${userName}` : '';
  
  // For simple greetings
  if (category === 'greetings') {
    const greeting = responseFragments.greetings[Math.floor(Math.random() * responseFragments.greetings.length)];
    const intro = responseFragments.introductions[Math.floor(Math.random() * responseFragments.introductions.length)];
    
    // Add personalized element if user has shown interests
    let personalElement = '';
    if (conversationMemory.interests.length > 0) {
      const interest = conversationMemory.interests[Math.floor(Math.random() * conversationMemory.interests.length)];
      personalElement = ` I see you're interested in ${interest}. `;
    }
    
    return `${greeting}${userGreeting}${personalElement}${intro}`;
  }
  
  // For general questions with no specific category
  if (category === 'general') {
    return `Fes is one of Morocco's oldest imperial cities, known for its incredible medina, historic monuments, and rich cultural heritage. The city has over 1,200 years of history and is home to the world's oldest university. Would you like to know about our monuments, the medina, local cuisine, or something else?`;
  }
  
  // For specific knowledge categories, create a tailored response
  // 1. Select facts based on detail level
  const facts = fesKnowledge[category as keyof typeof fesKnowledge] || [];
  const numFacts = responseFragments.detailLevel[guideConfig.detailLevel];
  
  // Select random facts without repetition
  const shuffledFacts = [...facts].sort(() => 0.5 - Math.random());
  const selectedFacts = shuffledFacts.slice(0, numFacts);
  
  // 2. Add personality element
  const personalityPhrases = responseFragments.personalityPhrases[guideConfig.personality];
  const personalityElement = personalityPhrases[Math.floor(Math.random() * personalityPhrases.length)];
  
  // 3. Add style element
  const styleElements = responseFragments.styleElements[guideConfig.style];
  const styleElement = styleElements[Math.floor(Math.random() * styleElements.length)];
  
  // 4. Add follow-up question
  const followUp = responseFragments.followUps[Math.floor(Math.random() * responseFragments.followUps.length)];
  
  // 5. Assemble response based on personality and style
  let response = '';
  
  // Format based on guide style
  if (guideConfig.style === 'poetic') {
    response = `${styleElement} ${selectedFacts.join(' ')} ${personalityElement} ${followUp}`;
  } else if (guideConfig.style === 'formal') {
    response = `Regarding ${category} in Fes, ${styleElement} ${selectedFacts.join(' ')} ${personalityElement} ${followUp}`;
  } else if (guideConfig.personality === 'enthusiastic') {
    response = `Oh, ${category} in Fes is amazing! ${selectedFacts.join(' ')} ${personalityElement} ${styleElement} ${followUp}`;
  } else {
    response = `About ${category} in Fes: ${selectedFacts.join(' ')} ${personalityElement} ${styleElement} ${followUp}`;
  }
  
  return response;
};

// Fallback responses in different languages if something goes wrong
const fallbackResponses: Record<Language, string> = {
  en: "I'm sorry, I couldn't process your request at the moment. As your guide to Fes, I'm here to help with information about our city's monuments, medina, culture, food, and more. What would you like to know?",
  fr: "Je suis désolé, je n'ai pas pu traiter votre demande pour le moment. En tant que guide de Fès, je suis là pour vous aider avec des informations sur les monuments, la médina, la culture, la nourriture et plus encore. Qu'aimeriez-vous savoir?",
  ar: "آسف، لم أتمكن من معالجة طلبك في الوقت الحالي. بصفتي دليلك في فاس، أنا هنا لمساعدتك بمعلومات عن المعالم والمدينة القديمة والثقافة والطعام والمزيد. ماذا تريد أن تعرف؟",
  es: "Lo siento, no pude procesar tu solicitud en este momento. Como tu guía en Fez, estoy aquí para ayudarte con información sobre los monumentos, la medina, la cultura, la comida y más. ¿Qué te gustaría saber?"
};

// Location interface definition
interface Location {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  description: string;
  landmarks?: string[];
}

// Enhanced location information for key places in Fes
const fesLocations: Record<string, Location> = {
  "old_medina": {
    name: "Fes el Bali (Old Medina)",
    coordinates: {
      latitude: 34.0372,
      longitude: -4.9886
    },
    category: "landmarks",
    description: "The historic heart of Fes, a UNESCO World Heritage site and the world's largest car-free urban area.",
    landmarks: [
      "Bab Boujloud (Blue Gate)",
      "Chouara Tannery",
      "Al-Quaraouiyine Mosque"
    ]
  },
  "bab_boujloud": {
    name: "Bab Boujloud (Blue Gate)",
    coordinates: {
      latitude: 34.0636,
      longitude: -4.9847
    },
    category: "monuments",
    description: "The main entrance to the Old Medina, known for its distinctive blue tilework."
  },
  "al_quaraouiyine": {
    name: "Al-Quaraouiyine Mosque and University",
    coordinates: {
      latitude: 34.0634,
      longitude: -4.9779
    },
    category: "monuments",
    description: "The oldest existing and continually operating university in the world, founded in 859 CE."
  },
  "bou_inania_madrasa": {
    name: "Bou Inania Madrasa",
    coordinates: {
      latitude: 34.0637,
      longitude: -4.9827
    },
    category: "monuments",
    description: "A historic madrasa founded in AD 1351-56, featuring stunning Islamic architecture."
  },
  "chouara_tannery": {
    name: "Chouara Tannery",
    coordinates: {
      latitude: 34.0645,
      longitude: -4.9742
    },
    category: "medina",
    description: "The largest of the medina's three tanneries, dating from the 11th century."
  },
  "merenid_tombs": {
    name: "Merenid Tombs",
    coordinates: {
      latitude: 34.0722,
      longitude: -4.9775
    },
    category: "monuments",
    description: "Ruins offering panoramic views of the entire medina of Fes."
  }
};

// Enhanced function to detect location requests in messages
const detectLocationRequest = (message: string): Location | null => {
  const locationKeywords = [
    'where is', 'how to get to', 'guide me to', 'directions to', 'take me to',
    'find', 'locate', 'navigation to', 'way to', 'route to'
  ];

  const locationMatches = Object.entries(fesLocations).filter(([key, location]) => {
    const messageLC = message.toLowerCase();
    // Check if message contains location keywords and location name
    return locationKeywords.some(keyword => 
      messageLC.includes(keyword) && (
        messageLC.includes(key.replace(/_/g, ' ')) ||
        messageLC.includes(location.name.toLowerCase())
      )
    );
  });

  if (locationMatches.length > 0) {
    return locationMatches[0][1];
  }

  // Special handling for "medina" variations
  if (message.toLowerCase().match(/\b(medina|old city|old town|fes el bali)\b/)) {
    return fesLocations.old_medina;
  }

  return null;
};

// Enhanced API call function with better error handling and retries
async function callAPI(config: AIConfig, prompt: string, retryCount = 0): Promise<string> {
  try {
    // Format prompt according to Mistral's requirements
    const formattedPrompt = `<s>[INST] ${prompt} [/INST]</s>`;
    
    const response = await fetch(`${config.endpoint}${config.model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    // Check if we got a valid response
    if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
      return result[0].generated_text.trim();
    }
    
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.warn(`API call attempt ${retryCount + 1} failed:`, error);
    
    if (retryCount < 2) {
      // Exponential backoff: wait longer between each retry
      await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2, retryCount)));
      return callAPI(config, prompt, retryCount + 1);
    }
    
    throw error;
  }
}

// Enhanced sendMessage function to handle location requests
export const sendMessage = async (
  messages: ChatMessage[],
  language: Language,
  modalConfig: ModalConfig = defaultModalConfig,
  guideConfig: GuideConfig = defaultGuideConfig
): Promise<{ text: string; location?: Location }> => {
  try {
    const lastMessage = messages[messages.length - 1].content;
    const requestedLocation = detectLocationRequest(lastMessage);

    if (requestedLocation) {
      // Generate response with navigation instructions
      const response = `I'll help you navigate to ${requestedLocation.name}. ${requestedLocation.description}\n\nI've opened the map navigation to guide you there. You can start tracking your route by clicking "Start Navigation". I'll provide real-time directions as you walk.`;
      
      return {
        text: response,
        location: requestedLocation
      };
    }

    if (!USE_SIMULATED_RESPONSES_ONLY) {
      const lastMessage = messages[messages.length - 1].content.toLowerCase();
      let locationInfo: Location | undefined;
      
      // Check if the message is asking about a location
      for (const [key, location] of Object.entries(fesLocations)) {
        if (lastMessage.includes(location.name.toLowerCase()) || 
            lastMessage.includes(key.replace(/_/g, ' '))) {
          locationInfo = location;
          break;
        }
      }

      // Prepare conversation history (last 3 messages only to keep context concise)
      const history = messages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n');
      
      // Create a more focused prompt with location awareness
      const prompt = `You are Marhaba, a knowledgeable tour guide specializing in Fes, Morocco.
Role: Professional tour guide
Language: ${language}
Style: ${guideConfig.style}
Detail Level: ${guideConfig.detailLevel}

Previous conversation:
${history}

${locationInfo ? `Current Location:
Name: ${locationInfo.name}
Location: ${locationInfo.coordinates.latitude}, ${locationInfo.coordinates.longitude}
Type: ${locationInfo.category}
Description: ${locationInfo.description}

` : ''}User's question: ${messages[messages.length - 1].content}

Provide a helpful response in ${language} about Fes, focusing on accurate information and cultural sensitivity.`;

      try {
        // Try primary model
        const response = await callAPI(defaultAIConfig, prompt);
        if (response && response.length > 50) {
          return { text: response };
        }
      } catch (primaryError) {
        console.warn('Primary model failed:', primaryError);
        
        try {
          // Try backup model with a simplified prompt
          const backupPrompt = `As a tour guide in Fes, Morocco, respond in ${language} to this question: ${messages[messages.length - 1].content}
${locationInfo ? `\nLocation: ${locationInfo.name} at ${locationInfo.coordinates.latitude}, ${locationInfo.coordinates.longitude}` : ''}
Previous context: ${history}`;
          
          const response = await callAPI(backupAIConfig, backupPrompt);
          if (response && response.length > 50) {
            return { text: response };
          }
        } catch (backupError) {
          console.warn('Backup model failed:', backupError);
        }
      }
    }

    // Fallback to dynamic response if API calls fail
    const lastUserMessage = messages[messages.length - 1].content;
    const category = categorizeMessage(lastUserMessage);
    return { text: createDynamicResponse(messages, category, language, guideConfig) };
  } catch (error) {
    console.error('Error generating response:', error);
    return { text: fallbackResponses[language] };
  }
};

// Train the guide with custom knowledge
export const trainGuide = async (customKnowledge?: Record<string, string[]>): Promise<void> => {
  console.log('Training Marhaba guide with specialized knowledge...');
  
  // If custom knowledge provided, extend the knowledge base
  if (customKnowledge) {
    Object.keys(customKnowledge).forEach(category => {
      if (fesKnowledge[category as keyof typeof fesKnowledge]) {
        // Add to existing category
        const existingCategory = fesKnowledge[category as keyof typeof fesKnowledge] as string[];
        customKnowledge[category].forEach(fact => {
          if (!existingCategory.includes(fact)) {
            existingCategory.push(fact);
          }
        });
      } else {
        // Create new category
        (fesKnowledge as any)[category] = customKnowledge[category];
      }
    });
  }
  
  // Simulate training process
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Log training results
  let totalFacts = 0;
  Object.values(fesKnowledge).forEach(facts => {
    totalFacts += (facts as string[]).length;
  });
  
  console.log(`Guide training complete! Knowledge base now contains ${totalFacts} facts across ${Object.keys(fesKnowledge).length} categories.`);
  return;
};

// Backward compatibility with older code that imports trainModel
export const trainModel = trainGuide;

export default {
  sendMessage,
  trainGuide,
  trainModel,
  defaultModalConfig,
  defaultGuideConfig
}; 