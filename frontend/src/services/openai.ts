import { Language } from '../components/LanguageSelector';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Simulated responses for different topics in different languages
const simulatedResponses = {
  en: {
    greetings: [
      "Hello! I'm Marhaba, your guide to Fes. What would you like to know about this beautiful city?",
      "Welcome to FesGuide! I'm here to help you discover the wonders of Fes. What are you interested in?",
      "Hi there! I'm your virtual guide to Fes. How can I assist you today?"
    ],
    monuments: [
      "Fes is home to many incredible monuments. The Bou Inania Madrasa is a stunning example of Marinid architecture, built in the 14th century. It's one of the few religious buildings in Morocco that non-Muslims can visit.",
      "Al-Qarawiyyin Mosque and University, founded in 859, is considered the oldest continuously operating university in the world. The mosque is a spiritual center of Fes.",
      "The Nejjarine Museum of Wooden Arts & Crafts is housed in a beautifully restored fondouk (inn) from the 18th century. It showcases traditional Moroccan woodwork and crafts."
    ],
    medina: [
      "Fes el-Bali, the ancient walled medina of Fes, is a UNESCO World Heritage site and one of the largest car-free urban areas in the world. It contains over 9,000 narrow streets and alleys!",
      "The medina of Fes is famous for its authentic craftsmanship. You can watch artisans working with leather, metal, wood, and textiles using techniques passed down through generations.",
      "Navigating the medina can be challenging but rewarding. Consider hiring a local guide for your first visit to help you discover hidden gems and avoid getting lost."
    ],
    food: [
      "Moroccan cuisine in Fes is delicious! Try traditional dishes like tagine (slow-cooked stew), pastilla (savory-sweet meat pie), and harira (hearty soup).",
      "For an authentic dining experience, visit a traditional restaurant in the medina. Many offer panoramic views of the city from rooftop terraces.",
      "Don't miss trying Moroccan mint tea, a symbol of hospitality. It's traditionally served with a dramatic pour from height to create a frothy top."
    ],
    shopping: [
      "The souks (markets) of Fes are organized by craft. You'll find dedicated areas for leather goods, ceramics, textiles, spices, and metalwork.",
      "Fes is renowned for its blue pottery and ceramics. The distinctive cobalt blue designs are hand-painted and make wonderful souvenirs.",
      "When shopping in Fes, friendly haggling is expected. Start by offering about half the initial asking price and negotiate from there."
    ],
    default: [
      "That's an interesting question about Fes! This historic city has been a cultural and spiritual center for over 1,200 years.",
      "Fes is a fascinating destination with a rich history. It was founded in the 8th century and became a major center of education and culture.",
      "As your guide to Fes, I'd be happy to share more specific information about any aspect of the city you're curious about."
    ]
  },
  fr: {
    greetings: [
      "Bonjour ! Je suis Marhaba, votre guide à Fès. Que souhaitez-vous savoir sur cette magnifique ville ?",
      "Bienvenue sur FesGuide ! Je suis là pour vous aider à découvrir les merveilles de Fès. Qu'est-ce qui vous intéresse ?",
      "Salut ! Je suis votre guide virtuel à Fès. Comment puis-je vous aider aujourd'hui ?"
    ],
    monuments: [
      "Fès abrite de nombreux monuments incroyables. La Médersa Bou Inania est un superbe exemple d'architecture marinide, construite au 14ème siècle. C'est l'un des rares bâtiments religieux au Maroc que les non-musulmans peuvent visiter.",
      "Al-Qarawiyyin Mosque and University, fondée en 859, est considérée comme la plus ancienne université en activité continue au monde. La mosquée est un centre spirituel de Fès.",
      "Le Musée Nejjarine des Arts et Métiers du Bois est abrité dans un fondouk (auberge) magnifiquement restauré du 18ème siècle. Il présente l'artisanat traditionnel marocain du bois."
    ],
    medina: [
      "Fès el-Bali, l'ancienne médina fortifiée de Fès, est un site du patrimoine mondial de l'UNESCO et l'une des plus grandes zones urbaines sans voiture au monde. Elle contient plus de 9 000 rues et ruelles étroites !",
      "La médina de Fès est célèbre pour son artisanat authentique. Vous pouvez observer des artisans travaillant le cuir, le métal, le bois et les textiles en utilisant des techniques transmises de génération en génération.",
      "Naviguer dans la médina peut être difficile mais gratifiant. Envisagez d'engager un guide local pour votre première visite pour vous aider à découvrir des joyaux cachés et éviter de vous perdre."
    ],
    food: [
      "La cuisine marocaine à Fès est délicieuse ! Essayez des plats traditionnels comme le tajine (ragoût mijoté), la pastilla (tourte salée-sucrée à la viande) et la harira (soupe copieuse).",
      "Pour une expérience culinaire authentique, visitez un restaurant traditionnel dans la médina. Beaucoup offrent des vues panoramiques de la ville depuis des terrasses sur le toit.",
      "Ne manquez pas de goûter au thé à la menthe marocain, symbole d'hospitalité. Il est traditionnellement servi avec un versement spectaculaire en hauteur pour créer une mousse sur le dessus."
    ],
    shopping: [
      "Les souks (marchés) de Fès sont organisés par artisanat. Vous trouverez des zones dédiées aux articles en cuir, à la céramique, aux textiles, aux épices et à la métallurgie.",
      "Fès est renommée pour sa poterie et sa céramique bleues. Les motifs distinctifs bleu cobalt sont peints à la main et font de merveilleux souvenirs.",
      "Lors de vos achats à Fès, le marchandage amical est attendu. Commencez par offrir environ la moitié du prix initial demandé et négociez à partir de là."
    ],
    default: [
      "C'est une question intéressante sur Fès ! Cette ville historique est un centre culturel et spirituel depuis plus de 1 200 ans.",
      "Fès est une destination fascinante avec une riche histoire. Elle a été fondée au 8ème siècle et est devenue un centre majeur d'éducation et de culture.",
      "En tant que votre guide à Fès, je serais heureux de partager des informations plus spécifiques sur tout aspect de la ville qui vous intéresse."
    ]
  },
  ar: {
    greetings: [
      "مرحبًا! أنا مرحبا، دليلك في فاس. ماذا تود أن تعرف عن هذه المدينة الجميلة؟",
      "أهلاً بك في دليل فاس! أنا هنا لمساعدتك في اكتشاف عجائب فاس. ما الذي يهمك؟",
      "مرحبًا! أنا دليلك الافتراضي في فاس. كيف يمكنني مساعدتك اليوم؟"
    ],
    monuments: [
      "تضم فاس العديد من المعالم الرائعة. تعد مدرسة بو عنانية مثالاً رائعًا للعمارة المرينية، بنيت في القرن الرابع عشر. إنها واحدة من المباني الدينية القليلة في المغرب التي يمكن لغير المسلمين زيارتها.",
      "يعتبر جامع وجامعة القرويين، الذي تأسس عام 859، أقدم جامعة لا تزال تعمل في العالم. المسجد هو مركز روحي لفاس.",
      "يقع متحف النجارين للفنون والحرف الخشبية في فندق (نزل) تم ترميمه بشكل جميل من القرن الثامن عشر. يعرض المتحف الحرف اليدوية الخشبية التقليدية المغربية."
    ],
    medina: [
      "فاس البالي، المدينة القديمة المسورة في فاس، هي موقع تراث عالمي لليونسكو وواحدة من أكبر المناطق الحضرية الخالية من السيارات في العالم. تحتوي على أكثر من 9000 شارع وزقاق ضيق!",
      "تشتهر مدينة فاس بحرفها اليدوية الأصيلة. يمكنك مشاهدة الحرفيين يعملون بالجلد والمعادن والخشب والمنسوجات باستخدام تقنيات متوارثة عبر الأجيال.",
      "التنقل في المدينة قد يكون صعبًا ولكنه مجزي. فكر في الاستعانة بمرشد محلي لزيارتك الأولى لمساعدتك في اكتشاف الكنوز المخفية وتجنب الضياع."
    ],
    food: [
      "المطبخ المغربي في فاس لذيذ! جرب الأطباق التقليدية مثل الطاجين (يخنة مطبوخة ببطء)، والبسطيلة (فطيرة لحم حلوة ومالحة)، والحريرة (حساء دسم).",
      "للحصول على تجربة طعام أصيلة، قم بزيارة مطعم تقليدي في المدينة. تقدم العديد منها إطلالات بانورامية على المدينة من الشرفات على السطح.",
      "لا تفوت تجربة الشاي المغربي بالنعناع، رمز الضيافة. يتم تقديمه تقليديًا بصب درامي من ارتفاع لخلق طبقة رغوية على القمة."
    ],
    shopping: [
      "يتم تنظيم أسواق فاس حسب الحرفة. ستجد مناطق مخصصة للسلع الجلدية والخزف والمنسوجات والتوابل والأشغال المعدنية.",
      "تشتهر فاس بالفخار والخزف الأزرق. التصاميم المميزة باللون الأزرق الكوبالت مرسومة يدويًا وتشكل تذكارات رائعة.",
      "عند التسوق في فاس، يتوقع المساومة الودية. ابدأ بتقديم حوالي نصف السعر المطلوب في البداية وتفاوض من هناك."
    ],
    default: [
      "هذا سؤال مثير للاهتمام حول فاس! كانت هذه المدينة التاريخية مركزًا ثقافيًا وروحيًا لأكثر من 1200 عام.",
      "فاس وجهة رائعة ذات تاريخ غني. تأسست في القرن الثامن وأصبحت مركزًا رئيسيًا للتعليم والثقافة.",
      "بصفتي دليلك إلى فاس، يسعدني مشاركة معلومات أكثر تحديدًا حول أي جانب من جوانب المدينة تشعر بالفضول حوله."
    ]
  },
  es: {
    greetings: [
      "¡Hola! Soy Marhaba, tu guía en Fez. ¿Qué te gustaría saber sobre esta hermosa ciudad?",
      "¡Bienvenido a FesGuide! Estoy aquí para ayudarte a descubrir las maravillas de Fez. ¿Qué te interesa?",
      "¡Hola! Soy tu guía virtual en Fez. ¿Cómo puedo ayudarte hoy?"
    ],
    monuments: [
      "Fez alberga muchos monumentos increíbles. La Madrasa Bou Inania es un impresionante ejemplo de arquitectura meriní, construida en el siglo XIV. Es uno de los pocos edificios religiosos en Marruecos que los no musulmanes pueden visitar.",
      "La Mezquita y Universidad Al-Qarawiyyin, fundada en 859, es considerada la universidad más antigua en funcionamiento continuo del mundo. La mezquita es un centro espiritual de Fez.",
      "El Museo Nejjarine de Artes y Oficios de la Madera está alojado en un fondouk (posada) bellamente restaurado del siglo XVIII. Muestra la artesanía tradicional marroquí en madera."
    ],
    medina: [
      "Fez el-Bali, la antigua medina amurallada de Fez, es un sitio del Patrimonio Mundial de la UNESCO y una de las áreas urbanas sin coches más grandes del mundo. ¡Contiene más de 9,000 calles y callejones estrechos!",
      "La medina de Fez es famosa por su artesanía auténtica. Puedes ver a artesanos trabajando con cuero, metal, madera y textiles utilizando técnicas transmitidas a través de generaciones.",
      "Navegar por la medina puede ser desafiante pero gratificante. Considera contratar un guía local para tu primera visita para ayudarte a descubrir joyas ocultas y evitar perderte."
    ],
    food: [
      "¡La cocina marroquí en Fez es deliciosa! Prueba platos tradicionales como el tagine (guiso cocido a fuego lento), la pastilla (pastel de carne agridulce) y la harira (sopa sustanciosa).",
      "Para una experiencia gastronómica auténtica, visita un restaurante tradicional en la medina. Muchos ofrecen vistas panorámicas de la ciudad desde terrazas en la azotea.",
      "No te pierdas probar el té de menta marroquí, un símbolo de hospitalidad. Tradicionalmente se sirve con un dramático vertido desde altura para crear una parte superior espumosa."
    ],
    shopping: [
      "Los zocos (mercados) de Fez están organizados por oficio. Encontrarás áreas dedicadas a artículos de cuero, cerámica, textiles, especias y trabajos en metal.",
      "Fez es reconocida por su cerámica y alfarería azul. Los distintivos diseños azul cobalto están pintados a mano y son maravillosos recuerdos.",
      "Al comprar en Fez, se espera un regateo amistoso. Comienza ofreciendo aproximadamente la mitad del precio inicial solicitado y negocia a partir de ahí."
    ],
    default: [
      "¡Esa es una pregunta interesante sobre Fez! Esta ciudad histórica ha sido un centro cultural y espiritual durante más de 1,200 años.",
      "Fez es un destino fascinante con una rica historia. Fue fundada en el siglo VIII y se convirtió en un importante centro de educación y cultura.",
      "Como tu guía en Fez, estaría encantado de compartir información más específica sobre cualquier aspecto de la ciudad que te intrigue."
    ]
  }
};

// Function to categorize user message
const categorizeMessage = (message: string): string => {
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
      message.includes('bonjour') || message.includes('hola') || message.includes('مرحبا')) {
    return 'greetings';
  }
  
  if (message.includes('monument') || message.includes('madrasa') || message.includes('mosque') || 
      message.includes('building') || message.includes('architecture') || message.includes('historical') ||
      message.includes('monument') || message.includes('médersa') || message.includes('mosquée') ||
      message.includes('معلم') || message.includes('مسجد') || message.includes('مدرسة') ||
      message.includes('monumento') || message.includes('mezquita')) {
    return 'monuments';
  }
  
  if (message.includes('medina') || message.includes('old city') || message.includes('streets') || 
      message.includes('alleys') || message.includes('médina') || message.includes('vieille ville') ||
      message.includes('المدينة') || message.includes('المدينة القديمة') || 
      message.includes('ciudad vieja') || message.includes('calles')) {
    return 'medina';
  }
  
  if (message.includes('food') || message.includes('eat') || message.includes('restaurant') || 
      message.includes('cuisine') || message.includes('dish') || message.includes('nourriture') || 
      message.includes('manger') || message.includes('طعام') || message.includes('مطعم') ||
      message.includes('comida') || message.includes('restaurante')) {
    return 'food';
  }
  
  if (message.includes('shop') || message.includes('buy') || message.includes('souk') || 
      message.includes('market') || message.includes('acheter') || message.includes('marché') ||
      message.includes('تسوق') || message.includes('سوق') || 
      message.includes('comprar') || message.includes('mercado')) {
    return 'shopping';
  }
  
  return 'default';
};

// Function to get a random response from the appropriate category
const getRandomResponse = (category: string, language: Language): string => {
  const responses = simulatedResponses[language]?.[category] || simulatedResponses.en[category];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

export const sendMessage = async (
  messages: ChatMessage[],
  language: Language
): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Get the last user message
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    
    if (!lastUserMessage) {
      return getRandomResponse('greetings', language);
    }
    
    // Categorize the message and get a response
    const category = categorizeMessage(lastUserMessage.content);
    return getRandomResponse(category, language);
    
  } catch (error) {
    console.error('Error generating response:', error);
    
    // Fallback responses in different languages
    const fallbackResponses = {
      en: "I'm sorry, I couldn't process your request at the moment. Please try again later.",
      fr: "Je suis désolé, je n'ai pas pu traiter votre demande pour le moment. Veuillez réessayer plus tard.",
      ar: "آسف، لم أتمكن من معالجة طلبك في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.",
      es: "Lo siento, no pude procesar tu solicitud en este momento. Por favor, inténtalo de nuevo más tarde."
    };
    
    return fallbackResponses[language];
  }
};

// Function to train the model with specific Fes-related information
export const trainModel = async (): Promise<void> => {
  console.log('Training model with Fes-specific information...');
  // This is just a placeholder function since we're using simulated responses
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('Model training complete!');
};

export default {
  sendMessage,
  trainModel
}; 