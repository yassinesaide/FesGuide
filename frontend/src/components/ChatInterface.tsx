import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector, { Language } from "./LanguageSelector";
import {
  sendMessage,
  generateImage,
  generateAudio,
} from "../services/marhabaAI";
import MapNavigation from "./MapNavigation";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  imageUrl?: string;
  audioUrl?: string;
}

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

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    name: string;
    coordinates: { latitude: number; longitude: number };
  } | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Welcome messages in different languages
  const welcomeMessages = {
    en: "Hi there! I'm Marhaba, your virtual guide to Fes. How can I help you today?",
    fr: "Bonjour ! Je suis Marhaba, votre guide virtuel de Fès. Comment puis-je vous aider aujourd'hui ?",
    ar: "مرحبًا! أنا مرحبا، دليلك الافتراضي في فاس. كيف يمكنني مساعدتك اليوم؟",
    es: "¡Hola! Soy Marhaba, tu guía virtual de Fez. ¿Cómo puedo ayudarte hoy?",
  };

  // Add initial welcome message when component mounts or language changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: welcomeMessages[language],
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGenerateImage = async (prompt: string) => {
    try {
      setIsGeneratingImage(true);
      console.log("Starting image generation for prompt:", prompt);
      const imageUrl = await generateImage(prompt);
      console.log("Successfully generated image:", imageUrl);
      const imageMessage: Message = {
        id: Date.now().toString(),
        text: "Here's what I found in Fes matching your request:",
        sender: "assistant",
        timestamp: new Date(),
        imageUrl,
      };
      setMessages((prev) => [...prev, imageMessage]);
    } catch (error) {
      console.error("Error generating image:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      const userMessage: Message = {
        id: Date.now().toString(),
        text: `I apologize, but I couldn't generate that image: ${errorMessage}. Please try again in a moment.`,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerateAudio = async (text: string) => {
    try {
      setIsGeneratingAudio(true);
      console.log("Starting audio generation for text:", text);
      const audioUrl = await generateAudio(text);
      console.log("Successfully generated audio:", audioUrl);
      const audioMessage: Message = {
        id: Date.now().toString(),
        text: "Here's your audio guide about Fes:",
        sender: "assistant",
        timestamp: new Date(),
        audioUrl,
      };
      setMessages((prev) => [...prev, audioMessage]);
    } catch (error) {
      console.error("Error generating audio:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      const userMessage: Message = {
        id: Date.now().toString(),
        text: `I apologize, but I couldn't generate the audio guide: ${errorMessage}. Please try again in a moment.`,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const chatMessages = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => ({
          role: msg.sender as "user" | "assistant",
          content: msg.text,
        }));

      chatMessages.push({
        role: "user",
        content: userMessage.text,
      });

      // Check for image or audio generation commands
      const lowerCaseMessage = userMessage.text.toLowerCase();
      if (lowerCaseMessage.includes("/generate image")) {
        const prompt = userMessage.text.replace(/\/generate image/i, "").trim();
        await handleGenerateImage(prompt);
      } else if (lowerCaseMessage.includes("/generate audio")) {
        const text = userMessage.text.replace(/\/generate audio/i, "").trim();
        await handleGenerateAudio(text);
      } else if (
        lowerCaseMessage.includes("show me") ||
        lowerCaseMessage.includes("picture of")
      ) {
        // Implicit image generation for natural language requests
        const prompt = userMessage.text
          .replace(/show me|picture of/i, "")
          .trim();
        await handleGenerateImage(prompt);
      } else if (
        lowerCaseMessage.includes("tell me about") ||
        lowerCaseMessage.includes("guide me through")
      ) {
        // Implicit audio generation for natural language requests
        const text = userMessage.text
          .replace(/tell me about|guide me through/i, "")
          .trim();
        await handleGenerateAudio(text);
      } else {
        const response = await sendMessage(chatMessages, language);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        if (response.location) {
          setCurrentLocation(response.location);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message
      const errorMessages = {
        en: "I'm sorry, I couldn't process your request. Please try again.",
        fr: "Je suis désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.",
        ar: "آسف، لم أتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.",
        es: "Lo siento, no pude procesar tu solicitud. Por favor, inténtalo de nuevo.",
      };

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessages[language],
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
        >
          <div className="bg-gradient-to-r from-fes-blue to-fes-teal p-4 text-white flex justify-between items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg">Marhaba</h3>
            </motion.div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <motion.div
            className="px-4 py-3 border-b border-gray-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <LanguageSelector
              selectedLanguage={language}
              onSelectLanguage={setLanguage}
            />
          </motion.div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`p-3 rounded-lg ${
                  message.sender === "assistant"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-fes-blue text-white ml-auto"
                } max-w-[90%] ${message.sender === "user" ? "ml-auto" : ""}`}
              >
                <p className="text-sm">{message.text}</p>
                {message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="Generated"
                    className="mt-2 rounded-lg max-w-full h-auto"
                  />
                )}
                {message.audioUrl && (
                  <audio
                    ref={audioRef}
                    controls
                    className="mt-2 w-full"
                    src={message.audioUrl}
                  >
                    Your browser does not support the audio element.
                  </audio>
                )}
              </motion.div>
            ))}
            {(isLoading || isGeneratingImage || isGeneratingAudio) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-100 text-gray-700 p-3 rounded-lg max-w-[90%] flex items-center space-x-2"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  language === "en"
                    ? "Type your message..."
                    : language === "fr"
                    ? "Tapez votre message..."
                    : language === "ar"
                    ? "اكتب رسالتك..."
                    : "Escribe tu mensaje..."
                }
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fes-blue focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`bg-gradient-to-r from-fes-blue to-fes-teal text-white p-2 rounded-full ${
                  isLoading || !inputValue.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-md"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </motion.button>
            </form>
          </div>

          {currentLocation && (
            <div className="map-container">
              <MapNavigation destination={currentLocation} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;
