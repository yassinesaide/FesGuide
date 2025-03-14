import React, { useState, useEffect } from "react";
import { trainModel } from "../services/marhabaAI";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Sample training data categories
const trainingCategories = [
  {
    id: "navigation",
    name: "Navigation & Maps",
    description: "Questions about finding places, directions, and maps",
    examples: [
      "How do I get to Bou Inania Madrasa?",
      "Where is the nearest taxi stand?",
      "Can you show me a map of the medina?",
      "What's the best route from my hotel to Al-Qarawiyyin Mosque?",
    ],
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
  },
  {
    id: "monuments",
    name: "Monuments & Attractions",
    description: "Information about historical sites and attractions",
    examples: [
      "What is the history of Al-Qarawiyyin Mosque?",
      "When was Bou Inania Madrasa built?",
      "What are the opening hours for Dar Batha Museum?",
      "Which monuments are must-see in Fes?",
    ],
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
  },
  {
    id: "culture",
    name: "Culture & Customs",
    description: "Questions about local culture, traditions, and etiquette",
    examples: [
      "What should I wear when visiting mosques in Fes?",
      "How do I greet locals in Morocco?",
      "What are traditional Moroccan customs?",
      "Is it customary to tip in restaurants?",
    ],
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
  {
    id: "food",
    name: "Food & Dining",
    description: "Information about local cuisine and restaurants",
    examples: [
      "What are the best traditional dishes to try in Fes?",
      "Can you recommend a good restaurant in the medina?",
      "What is tagine and how is it prepared?",
      "Where can I find authentic Moroccan street food?",
    ],
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: "shopping",
    name: "Shopping & Souks",
    description: "Help with shopping, souvenirs, and haggling",
    examples: [
      "Where can I buy authentic Moroccan ceramics?",
      "How do I haggle in the souks?",
      "What are good souvenirs to bring back from Fes?",
      "Which is the best leather tannery to visit?",
    ],
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    id: "transportation",
    name: "Transportation",
    description: "Questions about getting around Fes and Morocco",
    examples: [
      "How do I get from the airport to my hotel?",
      "Are taxis safe in Fes?",
      "How much should I pay for a petit taxi?",
      "Can I rent a car in Fes?",
    ],
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
];

const TrainModel: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [currentTrainingStep, setCurrentTrainingStep] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState({
    en: true,
    fr: true,
    ar: true,
    es: true,
  });
  const [enableMaps, setEnableMaps] = useState(true);
  const [enableAudio, setEnableAudio] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [customQuestions, setCustomQuestions] = useState("");

  // Toggle a category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle language toggle
  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages((prev) => ({
      ...prev,
      [language]: !prev[language as keyof typeof prev],
    }));
  };

  // Training steps simulation
  const trainingSteps = [
    "Initializing training environment...",
    "Loading language models...",
    "Processing navigation & maps data...",
    "Training on monument information...",
    "Learning cultural customs and etiquette...",
    "Processing local cuisine information...",
    "Analyzing shopping and souk data...",
    "Training on transportation options...",
    "Optimizing response generation...",
    "Finalizing model parameters...",
    "Training complete!",
  ];

  const handleStartTraining = async () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category to train on");
      return;
    }

    if (!Object.values(selectedLanguages).some((v) => v)) {
      alert("Please select at least one language");
      return;
    }

    setIsTraining(true);
    setTrainingProgress(0);
    setCurrentTrainingStep(trainingSteps[0]);

    // Simulate progress updates with training steps
    let step = 0;
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 5) + 3;
        if (newProgress >= 100) {
          clearInterval(interval);
          setCurrentTrainingStep(trainingSteps[trainingSteps.length - 1]);
          return 100;
        }

        // Update training step message
        const stepIndex = Math.min(
          Math.floor((newProgress / 100) * (trainingSteps.length - 1)),
          trainingSteps.length - 2
        );

        if (stepIndex > step) {
          step = stepIndex;
          setCurrentTrainingStep(trainingSteps[step]);
        }

        return newProgress;
      });
    }, 500);

    try {
      await trainModel();
      setTrainingComplete(true);
      setTrainingProgress(100);
      setCurrentTrainingStep(trainingSteps[trainingSteps.length - 1]);
    } catch (error) {
      console.error("Error training model:", error);
    } finally {
      setIsTraining(false);
    }
  };

  // Select all categories
  const selectAllCategories = () => {
    setSelectedCategories(trainingCategories.map((cat) => cat.id));
  };

  // Clear all categories
  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.h1
        className="text-3xl font-bold text-fes-blue mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Train Marhaba AI Model
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-fes-blue mb-4">
              Select Training Categories
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={selectAllCategories}
                className="px-3 py-1 text-xs font-medium rounded-full bg-fes-blue text-white hover:bg-fes-blue/90"
              >
                Select All
              </button>
              <button
                onClick={clearAllCategories}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {trainingCategories.map((category) => (
                <motion.div
                  key={category.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCategories.includes(category.id)
                      ? "border-fes-blue bg-fes-blue/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleCategory(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        selectedCategories.includes(category.id)
                          ? "bg-fes-blue text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-fes-blue">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {category.description}
                      </p>

                      {selectedCategories.includes(category.id) && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-fes-teal mb-1">
                            Sample questions:
                          </p>
                          <ul className="text-xs text-gray-600 space-y-1 pl-3">
                            {category.examples.slice(0, 2).map((example, i) => (
                              <li key={i} className="list-disc list-inside">
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">
                Select Languages to Train
              </h3>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.en}
                    onChange={() => handleLanguageToggle("en")}
                    className="form-checkbox h-5 w-5 text-fes-blue rounded"
                  />
                  <span>English 🇬🇧</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.fr}
                    onChange={() => handleLanguageToggle("fr")}
                    className="form-checkbox h-5 w-5 text-fes-blue rounded"
                  />
                  <span>French 🇫🇷</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.ar}
                    onChange={() => handleLanguageToggle("ar")}
                    className="form-checkbox h-5 w-5 text-fes-blue rounded"
                  />
                  <span>Arabic 🇲🇦</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.es}
                    onChange={() => handleLanguageToggle("es")}
                    className="form-checkbox h-5 w-5 text-fes-blue rounded"
                  />
                  <span>Spanish 🇪🇸</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">
                Additional Capabilities
              </h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableMaps}
                    onChange={() => setEnableMaps(!enableMaps)}
                    className="form-checkbox h-5 w-5 text-fes-blue rounded"
                  />
                  <span>Enable Maps Integration</span>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-fes-amber/20 text-fes-amber rounded-full">
                    Recommended
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableAudio}
                    onChange={() => setEnableAudio(!enableAudio)}
                    className="form-checkbox h-5 w-5 text-fes-blue rounded"
                  />
                  <span>Enable Audio Responses</span>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-fes-teal/20 text-fes-teal rounded-full">
                    Beta
                  </span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Advanced Options</h3>
                <button
                  onClick={() => setAdvancedMode(!advancedMode)}
                  className="text-sm text-fes-blue hover:text-fes-teal"
                >
                  {advancedMode ? "Hide" : "Show"}
                </button>
              </div>

              {advancedMode && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custom Training Questions (one per line)
                    </label>
                    <textarea
                      value={customQuestions}
                      onChange={(e) => setCustomQuestions(e.target.value)}
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fes-blue"
                      placeholder="Add your own questions to train the model on..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Add specific questions you want Marhaba to be able to
                      answer
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleStartTraining}
                disabled={
                  isTraining ||
                  trainingComplete ||
                  selectedCategories.length === 0 ||
                  Object.values(selectedLanguages).every((v) => !v)
                }
                className={`px-6 py-2 rounded-md font-medium ${
                  isTraining ||
                  trainingComplete ||
                  selectedCategories.length === 0 ||
                  Object.values(selectedLanguages).every((v) => !v)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-fes-blue text-white hover:bg-fes-blue/90"
                }`}
              >
                {isTraining
                  ? "Training..."
                  : trainingComplete
                  ? "Training Complete"
                  : "Start Training"}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-fes-blue mb-4">
              Training Status
            </h2>

            {trainingComplete ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-green-700 font-medium">
                    Training complete! The Marhaba AI model is ready to assist
                    tourists.
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <Link
                    to="/"
                    className="px-4 py-2 bg-fes-blue text-white rounded-full text-sm font-medium hover:bg-fes-blue/90"
                  >
                    Try Marhaba Now
                  </Link>
                </div>
              </div>
            ) : isTraining ? (
              <div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-fes-blue">
                      Training Progress
                    </span>
                    <span className="text-gray-600">{trainingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-fes-blue h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${trainingProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <p className="text-sm text-gray-700 font-mono">
                    {currentTrainingStep}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Training Summary
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Categories: {selectedCategories.length} selected</li>
                    <li>
                      • Languages:{" "}
                      {Object.values(selectedLanguages).filter(Boolean).length}{" "}
                      selected
                    </li>
                    <li>
                      • Maps Integration: {enableMaps ? "Enabled" : "Disabled"}
                    </li>
                    <li>
                      • Audio Responses: {enableAudio ? "Enabled" : "Disabled"}
                    </li>
                    {customQuestions && (
                      <li>
                        • Custom Questions:{" "}
                        {
                          customQuestions.split("\n").filter((q) => q.trim())
                            .length
                        }{" "}
                        added
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  Select categories and languages to train the Marhaba AI model.
                </p>

                <div className="bg-fes-blue/5 border border-fes-blue/20 rounded-md p-4">
                  <h3 className="text-sm font-medium text-fes-blue mb-2">
                    Training Benefits
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-fes-teal mt-0.5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Improved accuracy for tourist questions</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-fes-teal mt-0.5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Better multilingual support</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-fes-teal mt-0.5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Enhanced map integration capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-fes-teal mt-0.5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>More detailed responses about Fes</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="bg-fes-cream/20 rounded-lg p-6 border border-fes-cream mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-fes-blue mb-4">
          About Marhaba AI Training
        </h2>
        <p className="text-gray-700 mb-4">
          Marhaba AI is designed to provide accurate and helpful information
          about Fes to tourists in multiple languages. The training process
          enhances the model's knowledge about Fes's history, culture,
          landmarks, and practical tourist information.
        </p>
        <p className="text-gray-700 mb-4">
          By training the model, you're helping Marhaba become a better virtual
          guide for visitors to Fes. The model learns from curated datasets
          about Fes and improves its responses over time.
        </p>
        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="text-fes-blue hover:text-fes-teal transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default TrainModel;
