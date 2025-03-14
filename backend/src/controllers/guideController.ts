import { Request, Response } from 'express';

// This is a placeholder for the AI guide functionality
// In a real implementation, this would connect to an AI service or use a local model
export const getGuideResponse = async (req: Request, res: Response) => {
  try {
    const { query, language = 'english' } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }
    
    // Placeholder response - in a real implementation, this would call an AI service
    const response = generateGuideResponse(query, language);
    
    res.status(200).json({ 
      query,
      language,
      response
    });
  } catch (error) {
    console.error('Error in getGuideResponse controller:', error);
    res.status(500).json({ message: 'Server error while processing guide request' });
  }
};

// Placeholder function to generate responses
// In a real implementation, this would be replaced with an actual AI service call
function generateGuideResponse(query: string, language: string): string {
  // Simple keyword-based responses for demonstration
  const keywords = {
    'medina': 'The Medina of Fes is one of the largest car-free urban areas in the world and a UNESCO World Heritage site. It\'s known for its narrow winding streets and traditional crafts.',
    'tannery': 'The Chouara Tannery is one of the oldest tanneries in the world, dating back to the 11th century. The best view is from surrounding leather shops.',
    'madrasa': 'The Bou Inania Madrasa is a historic Islamic school founded in the 14th century, known for its beautiful architecture and intricate zellige tilework.',
    'restaurant': 'Fes offers many traditional Moroccan restaurants. Try local specialties like pastilla, tagine, and couscous.',
    'shopping': 'The souks (markets) of Fes are famous for leather goods, ceramics, textiles, and spices. Remember to haggle!',
    'hello': 'Marhaba! Welcome to Fes, one of Morocco\'s most historic and fascinating cities.',
    'thank': 'You\'re welcome! Enjoy your time in Fes!'
  };
  
  // Check for keywords in the query
  const lowerQuery = query.toLowerCase();
  for (const [keyword, response] of Object.entries(keywords)) {
    if (lowerQuery.includes(keyword)) {
      return response;
    }
  }
  
  // Default response
  return 'I\'m FesGuide, your AI-powered guide to Fes, Morocco. I can help you with information about monuments, history, culture, and practical details for your visit. What would you like to know about Fes?';
} 