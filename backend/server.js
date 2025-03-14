const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompts for different languages
const getSystemPrompt = (language) => {
  const prompts = {
    en: `You are Marhaba, an AI-powered virtual tourist guide for Fes, Morocco. 
    Provide accurate, helpful information about monuments, history, culture, and practical details in Fes. 
    Be friendly, concise, and informative. Respond in English.`,
    
    fr: `Vous êtes Marhaba, un guide touristique virtuel alimenté par l'IA pour Fès, Maroc. 
    Fournissez des informations précises et utiles sur les monuments, l'histoire, la culture et les détails pratiques à Fès. 
    Soyez amical, concis et informatif. Répondez en français.`,
    
    ar: `أنت مرحبا، دليل سياحي افتراضي مدعوم بالذكاء الاصطناعي لمدينة فاس، المغرب.
    قدم معلومات دقيقة ومفيدة عن المعالم والتاريخ والثقافة والتفاصيل العملية في فاس.
    كن ودودًا وموجزًا ومفيدًا. أجب باللغة العربية.`,
    
    es: `Eres Marhaba, un guía turístico virtual impulsado por IA para Fez, Marruecos.
    Proporciona información precisa y útil sobre monumentos, historia, cultura y detalles prácticos en Fez.
    Sé amigable, conciso e informativo. Responde en español.`
  };
  
  return prompts[language] || prompts.en;
};

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, language = 'en' } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(language)
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    res.json({ 
      message: response.choices[0].message.content,
      usage: response.usage
    });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// API endpoint for model training (placeholder)
app.post('/api/train', (req, res) => {
  // In a real implementation, this would initiate a fine-tuning job
  // For now, we'll just return a success message
  res.json({ 
    message: 'Training initiated',
    status: 'pending',
    estimatedCompletionTime: '2 hours'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 