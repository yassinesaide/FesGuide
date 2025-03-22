import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Language } from "../components/LanguageSelector";
import {
  sendMessage,
  generateImage,
  generateAudio,
  defaultGuideConfig,
  GuideConfig,
} from "../services/marhabaAI";
import MapNavigation from "../components/MapNavigation";
import paymentService, {
  ProductType,
  premiumAudioTours,
  digitalMaps,
  itineraryOptions,
  virtualGuideOptions,
  photoLocations,
  affiliateHotels,
} from "../services/paymentService";
import Checkout from "../components/Checkout";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

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

const Guide = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Marhaba, your virtual guide to Fes. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Guide configuration
  const [guideConfig, setGuideConfig] = useState<GuideConfig>({
    ...defaultGuideConfig,
    personality: "friendly",
    detailLevel: "detailed",
    style: "casual",
  });

  // Add new state variables for checkout
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    title: string;
    price: number;
    type: ProductType;
  } | null>(null);

  const navigate = useNavigate();

  const languages = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "ar", label: "Arabic" },
    { value: "es", label: "Spanish" },
  ];

  // Personalities
  const personalities = [
    { value: "friendly", label: "Friendly" },
    { value: "professional", label: "Professional" },
    { value: "enthusiastic", label: "Enthusiastic" },
    { value: "knowledgeable", label: "Knowledgeable" },
  ];

  // Detail Levels
  const detailLevels = [
    { value: "concise", label: "Concise" },
    { value: "detailed", label: "Detailed" },
    { value: "comprehensive", label: "Comprehensive" },
  ];

  // Styles
  const styles = [
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
    { value: "poetic", label: "Poetic" },
    { value: "direct", label: "Direct" },
  ];

  // Set welcome message when language changes
  useEffect(() => {
    const welcomeMessages = {
      en: "Hi there! I'm Marhaba, your virtual guide to Fes. How can I help you today?",
      fr: "Bonjour ! Je suis Marhaba, votre guide virtuel de Fès. Comment puis-je vous aider aujourd'hui ?",
      ar: "مرحبًا! أنا مرحبا، دليلك الافتراضي في فاس. كيف يمكنني مساعدتك اليوم؟",
      es: "¡Hola! Soy Marhaba, tu guía virtual de Fez. ¿Cómo puedo ayudarte hoy?",
    };

    setMessages([
      {
        id: "welcome",
        text: welcomeMessages[language],
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  // Scroll to bottom when messages change
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
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
          role:
            msg.sender === "user"
              ? "user"
              : ("assistant" as "user" | "assistant"),
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
        const response = await sendMessage(
          chatMessages,
          language,
          undefined,
          guideConfig
        );
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

  // Handle product selection and open checkout
  const handleProductSelect = (
    id: string,
    title: string,
    price: number,
    type: ProductType
  ) => {
    setSelectedProduct({
      id,
      title,
      price,
      type,
    });
    setCheckoutOpen(true);
  };

  // Handle checkout completion
  const handlePurchaseComplete = (transactionId: string) => {
    console.log(`Transaction completed: ${transactionId}`);

    // Show a success message
    const successMessage: Message = {
      id: Date.now().toString(),
      text: `Thank you for your purchase! Your transaction ID is ${transactionId}. You can access your purchases in the Dashboard.`,
      sender: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, successMessage]);

    // Navigate to dashboard after a delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
          <span className="text-amber-500">Marhaba</span> - Your AI Guide to Fes
        </h1>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-blue-100">
          {/* Guide Configuration */}
          <div className="bg-blue-800 text-white p-4">
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">
                <span className="text-amber-400">Customize</span> Your Guide
                Experience
              </h2>

              <div className="flex flex-wrap gap-4">
                {/* Language Selector */}
                <div className="flex items-center">
                  <label
                    htmlFor="language"
                    className="text-blue-100 mr-2 text-sm"
                  >
                    Language:
                  </label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-blue-700 text-white border border-blue-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Personality Selector */}
                <div className="flex items-center">
                  <label
                    htmlFor="personality"
                    className="text-blue-100 mr-2 text-sm"
                  >
                    Personality:
                  </label>
                  <select
                    id="personality"
                    value={guideConfig.personality}
                    onChange={(e) =>
                      setGuideConfig({
                        ...guideConfig,
                        personality: e.target.value as any,
                      })
                    }
                    className="bg-blue-700 text-white border border-blue-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {personalities.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Detail Level Selector */}
                <div className="flex items-center">
                  <label
                    htmlFor="detailLevel"
                    className="text-blue-100 mr-2 text-sm"
                  >
                    Detail:
                  </label>
                  <select
                    id="detailLevel"
                    value={guideConfig.detailLevel}
                    onChange={(e) =>
                      setGuideConfig({
                        ...guideConfig,
                        detailLevel: e.target.value as any,
                      })
                    }
                    className="bg-blue-700 text-white border border-blue-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {detailLevels.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Style Selector */}
                <div className="flex items-center">
                  <label htmlFor="style" className="text-blue-100 mr-2 text-sm">
                    Style:
                  </label>
                  <select
                    id="style"
                    value={guideConfig.style}
                    onChange={(e) =>
                      setGuideConfig({
                        ...guideConfig,
                        style: e.target.value as any,
                      })
                    }
                    className="bg-blue-700 text-white border border-blue-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {styles.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Guide Instructions */}
          <div className="bg-amber-50 p-3 border-b border-amber-100 text-sm text-amber-800">
            <p className="font-medium">
              <span className="font-bold">📝 Pro Tips:</span> Try saying{" "}
              <span className="font-semibold">"Show me the medina"</span> for
              images or{" "}
              <span className="font-semibold">
                "Tell me about Al-Quaraouiyine"
              </span>{" "}
              for audio guides. Use{" "}
              <span className="font-semibold">/generate image</span> or{" "}
              <span className="font-semibold">/generate audio</span> commands
              for explicit generation.
            </p>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto bg-gray-50 p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`max-w-3xl ${
                  message.sender === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-3 inline-block ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-amber-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>

                  {message.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={message.imageUrl}
                        alt="Generated visual"
                        className="rounded-md max-w-full h-auto max-h-64 object-cover"
                      />
                    </div>
                  )}

                  {message.audioUrl && (
                    <div className="mt-2">
                      <audio
                        ref={audioRef}
                        controls
                        className="w-full"
                        src={message.audioUrl}
                      >
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1 ml-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </motion.div>
            ))}

            {/* Loading Indicator */}
            {(isLoading || isGeneratingImage || isGeneratingAudio) && (
              <div className="flex items-center">
                <div className="bg-amber-100 text-gray-800 px-4 py-3 rounded-lg rounded-bl-none inline-block">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 ml-2">
                  {isGeneratingImage
                    ? "Creating an image for you..."
                    : isGeneratingAudio
                    ? "Generating audio guide..."
                    : "Thinking..."}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Location Map if applicable */}
          {currentLocation && (
            <div className="border-t border-gray-200 p-4">
              <h3 className="text-blue-800 font-semibold mb-2">
                Location: {currentLocation.name}
              </h3>
              <div className="h-40 bg-blue-50 rounded-lg">
                <MapNavigation destination={currentLocation} />
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === "en"
                    ? "Ask about Fes or request images/audio..."
                    : language === "fr"
                    ? "Posez des questions sur Fès ou demandez des images/audio..."
                    : language === "ar"
                    ? "اسأل عن فاس أو اطلب صور / صوت ..."
                    : "Pregunta sobre Fez o solicita imágenes/audio..."
                }
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || isGeneratingImage || isGeneratingAudio}
              />
              <button
                type="submit"
                className={`px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-r-lg ${
                  isLoading || isGeneratingImage || isGeneratingAudio
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:from-blue-800 hover:to-blue-900"
                }`}
                disabled={
                  isLoading ||
                  isGeneratingImage ||
                  isGeneratingAudio ||
                  !inputValue.trim()
                }
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
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* REDESIGNED: Premium Experiences Section - More elegantly integrated */}
        <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-5">
            <h2 className="text-2xl font-bold">Enhance Your Fes Experience</h2>
            <p className="text-blue-100 mt-2">
              Curated resources to make your journey memorable and authentic
            </p>
          </div>

          {/* Tabbed experience categories */}
          <div className="bg-white p-6">
            <div className="space-y-8">
              {/* Local Expertise Section - Replaces Audio Tours */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                    />
                  </svg>
                  Local Expertise
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {premiumAudioTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">
                          {tour.title}
                        </h4>
                        <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded font-medium">
                          {tour.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm my-2 line-clamp-2">
                        {tour.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <button
                          onClick={() =>
                            handleProductSelect(
                              tour.id,
                              tour.title,
                              tour.price,
                              ProductType.AUDIO_TOUR
                            )
                          }
                          className="text-amber-700 hover:text-amber-900 text-sm font-medium inline-flex items-center"
                        >
                          Unlock for ${tour.price}
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insider Navigation Section - Replaces Digital Maps */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Insider Navigation
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {digitalMaps.map((map) => (
                    <div
                      key={map.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900">{map.title}</h4>
                      <p className="text-gray-600 text-sm my-2 line-clamp-2">
                        {map.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <button
                          onClick={() =>
                            handleProductSelect(
                              map.id,
                              map.title,
                              map.price,
                              ProductType.DIGITAL_MAP
                            )
                          }
                          className="text-blue-700 hover:text-blue-900 text-sm font-medium inline-flex items-center"
                        >
                          Access for ${map.price}
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perfect Itineraries Section - Replaces Custom Itineraries */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Perfect Itineraries
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {itineraryOptions.map((itinerary) => (
                    <div
                      key={itinerary.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">
                          {itinerary.title}
                        </h4>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                          {itinerary.days}{" "}
                          {itinerary.days === 1 ? "day" : "days"}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm my-2 line-clamp-2">
                        {itinerary.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <button
                          onClick={() =>
                            handleProductSelect(
                              itinerary.id,
                              itinerary.title,
                              itinerary.price,
                              ProductType.CUSTOM_ITINERARY
                            )
                          }
                          className="text-green-700 hover:text-green-900 text-sm font-medium inline-flex items-center"
                        >
                          Create for ${itinerary.price}
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Tip */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-blue-800 text-sm flex items-start">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  <strong>Travel Tip:</strong> Our premium guides are crafted by
                  local experts to help you experience the authentic Fes that
                  most tourists miss.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ENHANCED: AI Assistant Access - Renamed from Virtual Guide Rental */}
        <div className="mt-8 rounded-lg overflow-hidden shadow-lg bg-white">
          <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-5">
            <h2 className="text-2xl font-bold">AI Assistant Access Passes</h2>
            <p className="text-indigo-100 mt-2">
              Get extended access to Marhaba, your personal AI travel companion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {virtualGuideOptions.map((option, index) => {
              const isPopular = index === 1;
              return (
                <div
                  key={option.id}
                  className={`bg-white rounded-lg overflow-hidden border ${
                    isPopular
                      ? "border-indigo-300 shadow-md"
                      : "border-gray-200"
                  } relative`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-indigo-600 text-white text-xs text-center font-medium py-1">
                      MOST POPULAR
                    </div>
                  )}
                  <div className={`p-6 ${isPopular ? "pt-8" : ""}`}>
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {option.hours === 24
                          ? "24-Hour Access"
                          : option.hours === 72
                          ? "3-Day Access"
                          : "7-Day Access"}
                      </h3>
                      <div className="text-indigo-700 text-2xl font-bold mt-1">
                        ${option.price}
                      </div>
                    </div>

                    <div className="space-y-3 mb-5">
                      {option.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-gray-700"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        handleProductSelect(
                          option.id,
                          `${
                            option.hours === 24
                              ? "24-Hour"
                              : option.hours === 72
                              ? "3-Day"
                              : "7-Day"
                          } Assistant Access`,
                          option.price,
                          ProductType.VIRTUAL_GUIDE
                        )
                      }
                      className={`w-full py-2 rounded-lg text-white font-medium transition-colors ${
                        isPopular
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-indigo-500 hover:bg-indigo-600"
                      }`}
                    >
                      Get Access
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTEGRATED: Photography & Accommodation in one elegant section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            {/* Photo Spots */}
            <div className="w-full md:w-1/2 p-6 border-r border-gray-100">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Photography Spots
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Discover Instagram-worthy locations with exact coordinates and
                best shooting times
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {photoLocations.slice(0, 4).map((spot) => (
                  <div
                    key={spot.id}
                    className="rounded-lg p-3 bg-gray-50 border border-gray-100 hover:shadow-sm transition-shadow"
                  >
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {spot.title}
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-700 text-xs">
                        ${spot.price}
                      </span>
                      <button
                        onClick={() =>
                          handleProductSelect(
                            spot.id,
                            spot.title,
                            spot.price,
                            ProductType.PHOTO_LOCATION
                          )
                        }
                        className="text-purple-600 hover:text-purple-800 text-xs font-medium inline-flex items-center"
                      >
                        Details
                        <svg
                          className="w-3 h-3 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodations */}
            <div className="hidden md:block md:w-1/2 p-6">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-gray-700 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800">
                  Where to Stay
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Recommended accommodations from our trusted local partners
              </p>

              <div className="space-y-3">
                {affiliateHotels.slice(0, 2).map((hotel) => (
                  <div
                    key={hotel.id}
                    className="flex rounded-lg overflow-hidden border border-gray-100 hover:shadow-sm transition-shadow"
                  >
                    <div className="w-1/3 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {hotel.rating}
                      </span>
                    </div>
                    <div className="w-2/3 p-3">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {hotel.name}
                      </h4>
                      <p className="text-gray-500 text-xs mb-2">
                        From <span className="font-bold">${hotel.price}</span>
                        /night
                      </p>
                      <button
                        onClick={() => window.open(hotel.bookingUrl, "_blank")}
                        className="text-gray-700 hover:text-gray-900 text-xs font-medium inline-flex items-center"
                      >
                        View Details
                        <svg
                          className="w-3 h-3 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View for Accommodations */}
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-gray-700 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">
              Where to Stay
            </h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Recommended accommodations from our trusted local partners
          </p>

          <div className="space-y-3">
            {affiliateHotels.slice(0, 2).map((hotel) => (
              <div
                key={hotel.id}
                className="flex rounded-lg overflow-hidden border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <div className="w-1/3 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {hotel.rating}
                  </span>
                </div>
                <div className="w-2/3 p-3">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {hotel.name}
                  </h4>
                  <p className="text-gray-500 text-xs mb-2">
                    From <span className="font-bold">${hotel.price}</span>/night
                  </p>
                  <button
                    onClick={() => window.open(hotel.bookingUrl, "_blank")}
                    className="text-gray-700 hover:text-gray-900 text-xs font-medium inline-flex items-center"
                  >
                    View Details
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Questions - Keep this section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Suggested Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "What are the must-visit places in Fes?",
              "Tell me about the Chouara Tannery",
              "Show me the Bou Inania Madrasa",
              "Guide me through the history of Fes",
              "Where can I find good Moroccan food?",
              "Show me the Al-Quaraouiyine Mosque",
              "What souvenirs should I buy in Fes?",
              "Tell me about Moroccan mint tea",
              "How do I get to the Blue Gate?",
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="text-left bg-white border border-blue-200 hover:bg-blue-50 text-blue-800 px-4 py-3 rounded-lg transition duration-200 shadow-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Checkout Dialog - Keep this section */}
        {selectedProduct && (
          <Checkout
            open={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
            productTitle={selectedProduct.title}
            productPrice={selectedProduct.price}
            productType={selectedProduct.type}
            productId={selectedProduct.id}
            onPurchaseComplete={handlePurchaseComplete}
          />
        )}

        {/* Premium Features Call-to-Action */}
        <Box
          sx={{
            my: 8,
            py: 6,
            px: 4,
            backgroundColor: "rgba(245, 245, 245, 0.8)",
            borderRadius: 4,
            textAlign: "center",
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
            backgroundSize: "cover",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            maxWidth: "1000px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            color="primary.dark"
          >
            Ready to Enhance Your Journey?
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ maxWidth: 700, mx: "auto", mb: 4 }}
          >
            Now that you've explored our guide to Fes, discover our premium
            resources created by local experts to take your experience to the
            next level.
          </Typography>
          <Button
            component={Link}
            to="/premium"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 50,
              fontWeight: "bold",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: 3,
              },
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            Explore Premium Features
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Guide;
