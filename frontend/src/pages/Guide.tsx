import { useState, useRef, useEffect } from "react";
import { askGuide } from "../services/api";

const Guide = () => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("english");
  const [messages, setMessages] = useState<
    { role: "user" | "guide"; content: string }[]
  >([
    {
      role: "guide",
      content:
        "Hello! I'm FesGuide, your AI-powered guide to Fes, Morocco. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "arabic", label: "Arabic" },
    { value: "spanish", label: "Spanish" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user" as const, content: query };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setQuery("");
    setLoading(true);

    try {
      const response = await askGuide(query, language);

      if (response) {
        // Add guide response to chat
        setMessages((prev) => [
          ...prev,
          { role: "guide", content: response.response },
        ]);
      } else {
        // Add error message
        setMessages((prev) => [
          ...prev,
          {
            role: "guide",
            content:
              "I'm sorry, I couldn't process your request at the moment. Please try again later.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error asking guide:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "guide",
          content: "I'm sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-800 text-white p-4">
            <h1 className="text-2xl font-bold">
              <span className="text-amber-400">Fes</span>Guide AI Assistant
            </h1>
            <p className="text-blue-100">
              Ask me anything about Fes, Morocco - monuments, history, culture,
              or practical details.
            </p>
          </div>

          {/* Language Selector */}
          <div className="bg-blue-50 p-4 border-b border-blue-100">
            <div className="flex items-center">
              <label
                htmlFor="language"
                className="text-blue-800 font-medium mr-3"
              >
                Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-blue-300 text-blue-900 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-96 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-amber-100 text-blue-900 rounded-bl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left mb-4">
                <div className="inline-block bg-amber-100 text-blue-900 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
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
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Fes..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-700 text-white rounded-r-lg ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-800"
                }`}
                disabled={loading}
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

        {/* Suggested Questions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Suggested Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              "What are the must-visit places in Fes?",
              "Tell me about the Chouara Tannery",
              "What's the history of Fes?",
              "Where can I find good Moroccan food?",
              "How do I get to the Bou Inania Madrasa?",
              "What souvenirs should I buy in Fes?",
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setQuery(question)}
                className="text-left bg-white border border-blue-200 hover:bg-blue-50 text-blue-800 px-4 py-2 rounded-lg transition duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
