import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Language = "ar" | "en" | "fr" | "es";

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const languages = [
    {
      code: "ar",
      name: "العربية",
      flag: "🇲🇦",
      color: "from-green-500 to-green-600",
    },
    {
      code: "en",
      name: "English",
      flag: "🇬🇧",
      color: "from-blue-500 to-blue-600",
    },
    {
      code: "fr",
      name: "Français",
      flag: "🇫🇷",
      color: "from-red-500 to-blue-600",
    },
    {
      code: "es",
      name: "Español",
      flag: "🇪🇸",
      color: "from-yellow-500 to-red-600",
    },
  ];

  // Find the currently selected language
  const currentLanguage =
    languages.find((lang) => lang.code === selectedLanguage) || languages[1];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelectLanguage = (code: Language) => {
    onSelectLanguage(code);
    setIsExpanded(false);
  };

  return (
    <div className="relative z-20">
      <div className="flex justify-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Current language button */}
          <motion.button
            onClick={toggleExpanded}
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentLanguage.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-xl"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentLanguage.flag}
            </motion.span>
            <span className="font-medium">{currentLanguage.name}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-1"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </motion.svg>
          </motion.button>

          {/* Language dropdown */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute mt-2 w-full bg-white rounded-xl shadow-xl overflow-hidden"
                style={{ minWidth: "180px" }}
              >
                <div className="py-2">
                  {languages.map((language) => (
                    <motion.button
                      key={language.code}
                      onClick={() =>
                        handleSelectLanguage(language.code as Language)
                      }
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                        selectedLanguage === language.code
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-r shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        animate={{
                          background:
                            selectedLanguage === language.code
                              ? "linear-gradient(to right, #4f46e5, #3b82f6)"
                              : "linear-gradient(to right, #e5e7eb, #f3f4f6)",
                        }}
                        transition={{
                          scale: { duration: 0.2 },
                        }}
                      >
                        <span className="text-lg">{language.flag}</span>
                      </motion.div>
                      <div>
                        <p
                          className={`font-medium ${
                            selectedLanguage === language.code
                              ? "text-fes-blue"
                              : "text-gray-700"
                          }`}
                        >
                          {language.name}
                        </p>
                        {selectedLanguage === language.code && (
                          <motion.p
                            className="text-xs text-fes-teal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            Currently selected
                          </motion.p>
                        )}
                      </div>
                      {selectedLanguage === language.code && (
                        <motion.div
                          className="ml-auto text-fes-blue"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageSelector;
