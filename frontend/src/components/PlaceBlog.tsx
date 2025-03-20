import React from "react";
import { useParams, Link } from "react-router-dom";

// Import images
import riadEnter from "../assets/images/riad enter.jpg";
import oldMedinaEnter from "../assets/images/enter of the old medina.jpg";
import qarawinFes from "../assets/images/qarawin fes.jpg";
import darDbegh from "../assets/images/dar dbegh.jpg";
import oldMedinaFes from "../assets/images/old medina fes.jpg";
import bathaEnter from "../assets/images/the enter of batha.jpg";

interface BlogPost {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  content: {
    history: string;
    architecture: string;
    experience: string;
    tips: string[];
    bestTime: string;
    additionalImages?: string[];
  };
}

const blogPosts: Record<string, BlogPost> = {
  "1": {
    id: "1",
    name: "The Old Medina",
    description:
      "The historic heart of Fes, a UNESCO World Heritage site and the world's largest car-free urban area.",
    image: oldMedinaFes,
    location: "Fes el Bali",
    content: {
      history:
        "The Medina of Fes el Bali, founded in the 9th century, represents the oldest and most authentic part of Fes. It was established by Idris I and his son Idris II, who made Fes the capital of their dynasty. The medina grew significantly during the Marinid period (13th-14th centuries) when Fes was the capital of Morocco.",
      architecture:
        "The medina is characterized by its intricate network of narrow streets and alleys, traditional houses with inner courtyards, and numerous historical monuments. The architectural style combines elements from various periods, including Andalusian, Arab, and Berber influences.",
      experience:
        "Walking through the medina is like stepping back in time. The streets are filled with artisans working in their traditional crafts, from leather workers to metalworkers. The sounds, smells, and sights create an immersive experience that captures the essence of medieval Morocco.",
      tips: [
        "Hire a local guide to avoid getting lost",
        "Visit early morning or late afternoon to avoid crowds",
        "Wear comfortable walking shoes",
        "Bring a camera but ask permission before photographing people",
        "Be prepared to negotiate in the souks",
      ],
      bestTime:
        "Spring (March-May) and Fall (September-November) offer the most pleasant temperatures for exploring the medina.",
    },
  },
  "2": {
    id: "2",
    name: "Qarawiyyin Mosque",
    description:
      "The oldest existing and continually operating university in the world, founded in 859 CE.",
    image: qarawinFes,
    location: "Old Medina",
    content: {
      history:
        "Founded in 859 CE by Fatima Al-Fihri, the University of Al-Qarawiyyin is recognized by UNESCO and Guinness World Records as the oldest existing and continually operating educational institution in the world. It began as a mosque and developed into one of the leading spiritual and educational centers of the Islamic Golden Age.",
      architecture:
        "The mosque complex features stunning examples of Moroccan and Islamic architecture, including intricate geometric patterns, carved cedar wood, and beautiful zellij tilework. The courtyard contains a famous marble fountain and is surrounded by ornate archways.",
      experience:
        "While non-Muslims cannot enter the prayer halls, visitors can admire the impressive entrance gates and peek into the courtyard. The library, which has been recently restored, houses thousands of precious manuscripts.",
      tips: [
        "Respect prayer times and dress modestly",
        "Visit early morning for the best photographs",
        "Look for the famous clock mechanism",
        "Consider hiring a guide for historical context",
        "Check opening hours as they vary by season",
      ],
      bestTime:
        "Early morning or late afternoon for the best light and fewer crowds.",
    },
  },
  "3": {
    id: "3",
    name: "Dar Dbegh (Tanneries)",
    description:
      "Famous leather tanneries where traditional methods have been used since medieval times.",
    image: darDbegh,
    location: "Fes el Bali",
    content: {
      history:
        "The Chouara Tannery, dating back to the 11th century, is the largest of the three ancient tanneries in Fes. For nearly a millennium, these tanneries have been processing leather using the same traditional methods passed down through generations. The tanneries played a crucial role in establishing Fes as a major trade center in medieval times.",
      architecture:
        "The tannery consists of numerous stone vessels arranged like a giant color palette when viewed from above. The vessels contain different natural dyes and liquids used in the leather-making process. The surrounding buildings, originally built by leather merchant guilds, feature traditional Moroccan architecture with wooden balconies overlooking the tanning pits.",
      experience:
        "Visiting the tanneries is a unique sensory experience. Watch as artisans process leather using age-old techniques, dipping skins in various dye pits. The famous view from the surrounding leather shops offers the best vantage point to observe the entire process. While the smell can be strong, shops provide mint sprigs to help mask it.",
      tips: [
        "Visit in the morning when workers are most active",
        "Accept the mint leaves offered by shops - they help with the smell",
        "Don't feel obligated to buy from the first shop you visit",
        "Negotiate prices if you plan to purchase leather goods",
        "Tip your guide if they provide detailed explanations",
      ],
      bestTime:
        "Early morning hours when the tanners are most active and the sun isn't too hot. Avoid rainy days as the tanneries might not be operating.",
    },
  },
  "4": {
    id: "4",
    name: "Riad Traditional House",
    description:
      "Experience the beauty of traditional Moroccan architecture in these historic houses.",
    image: riadEnter,
    location: "Old Medina",
    content: {
      history:
        "Riads, traditional Moroccan houses built around a central courtyard, have been a fundamental part of Fes's architectural heritage since the medieval period. These homes were designed to provide privacy for wealthy families while maintaining a connection to nature through their open-air courtyards. Many historic riads in Fes date back to the 14th-17th centuries.",
      architecture:
        "The classic riad design features a symmetrical four-sided layout around a central courtyard, often with a fountain and garden. The architecture emphasizes privacy, with few windows facing the street but elaborate interior decoration including intricate zellij tilework, carved cedar wood ceilings, and ornate plasterwork. The courtyard typically has four gardens representing the four elements of nature.",
      experience:
        "Staying in or visiting a riad offers an authentic glimpse into traditional Moroccan life. The peaceful courtyards provide a stark contrast to the bustling medina outside. Many riads now operate as boutique hotels or restaurants, allowing visitors to experience their grandeur firsthand.",
      tips: [
        "Book a riad stay for an authentic Moroccan experience",
        "Visit during daylight hours to appreciate the architectural details",
        "Look up to see the intricate ceiling work",
        "Ask about the history of specific architectural features",
        "Respect the peaceful atmosphere of these historic spaces",
      ],
      bestTime:
        "Daylight hours are best for appreciating the architecture and natural light effects in the courtyard.",
    },
  },
  "5": {
    id: "5",
    name: "Medina Entrance",
    description:
      "The majestic entrance to the old medina, featuring the famous Blue Gate (Bab Boujloud).",
    image: oldMedinaEnter,
    location: "Fes el Bali",
    content: {
      history:
        "Bab Boujloud, the main western entrance to Fes el Bali, was built in 1913 during the French protectorate. While the current gate is relatively modern, it replaced an older Almohad gate and maintains traditional Moroccan architectural elements. The gate's name 'Boujloud' refers to the tanned leather that was once sold nearby.",
      architecture:
        "The gate is famous for its distinctive horseshoe arches and decorative tilework. The exterior facing Rcif Square is decorated in brilliant blue tiles, while the interior face features green tilework - blue and green being the traditional colors of Fes. The gate's design incorporates both French colonial influences and traditional Moroccan architectural elements.",
      experience:
        "Passing through Bab Boujloud is like stepping into another world. The gate serves as a dramatic threshold between the modern city and the medieval medina. The area around the gate is always bustling with activity, filled with cafes, restaurants, and shops.",
      tips: [
        "Visit at different times to see how the light changes the tiles' appearance",
        "Take photos from both sides to capture the different color schemes",
        "Explore the cafes near the gate for great people-watching",
        "Be aware of your belongings in this busy area",
        "Use this gate as a landmark for navigation",
      ],
      bestTime:
        "Late afternoon when the sun illuminates the blue tiles, or early evening when the gate is beautifully lit.",
    },
  },
  "6": {
    id: "6",
    name: "Batha Quarter",
    description:
      "Historic quarter home to the Dar Batha Museum and beautiful Andalusian gardens.",
    image: bathaEnter,
    location: "Fes el Bali",
    content: {
      history:
        "The Batha Quarter developed during the Marinid dynasty (13th-14th centuries) as an aristocratic neighborhood. The centerpiece of the quarter, Dar Batha, was built in the late 19th century as a summer palace for the Sultan. In 1915, it was converted into a museum of traditional Moroccan crafts, becoming one of the first museums in Morocco.",
      architecture:
        "The quarter features a blend of palatial and residential architecture. Dar Batha itself is a magnificent example of Hispano-Moorish architecture, with its Andalusian garden, intricate zellij tilework, and carved wood decorations. The surrounding area includes traditional houses, religious schools, and small squares.",
      experience:
        "Walking through the Batha Quarter offers a more relaxed experience compared to other parts of the medina. The museum provides insights into Moroccan crafts and artistry, while the Andalusian gardens offer a peaceful retreat with their fountains and ancient trees.",
      tips: [
        "Visit the museum early to avoid crowds",
        "Spend time in the Andalusian gardens",
        "Check for cultural events in the museum's courtyard",
        "Explore the surrounding traditional residential areas",
        "Look for workshops of traditional craftsmen in the vicinity",
      ],
      bestTime:
        "Morning hours when the museum first opens, or late afternoon when the gardens are particularly peaceful.",
    },
  },
};

const PlaceBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Place not found</h2>
          <Link to="/places" className="mt-4 text-fes-blue hover:text-fes-teal">
            ← Back to Places
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.name}</h1>
            <p className="text-xl text-gray-200">{post.description}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Location Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-fes-blue/10 text-fes-blue">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {post.location}
          </span>
        </div>

        {/* History Section */}
        <section
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Historical Background
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {post.content.history}
          </p>
        </section>

        {/* Architecture Section */}
        <section
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Architecture & Design
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {post.content.architecture}
          </p>
        </section>

        {/* Experience Section */}
        <section
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Visitor Experience
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {post.content.experience}
          </p>
        </section>

        {/* Tips Section */}
        <section
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Visitor Tips
          </h2>
          <ul className="space-y-3">
            {post.content.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-fes-teal mt-1 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Best Time to Visit */}
        <section
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Best Time to Visit
          </h2>
          <div className="bg-fes-blue/5 rounded-lg p-6">
            <p className="text-gray-700">{post.content.bestTime}</p>
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-16 border-t pt-8">
          <Link
            to="/places"
            className="inline-flex items-center text-fes-blue hover:text-fes-teal transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Places
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PlaceBlog;
