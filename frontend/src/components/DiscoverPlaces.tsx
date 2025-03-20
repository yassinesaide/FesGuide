import React from "react";
import { Link } from "react-router-dom";

// Import images
import riadEnter from "../assets/images/riad enter.jpg";
import oldMedinaEnter from "../assets/images/enter of the old medina.jpg";
import qarawinFes from "../assets/images/qarawin fes.jpg";
import darDbegh from "../assets/images/dar dbegh.jpg";
import oldMedinaFes from "../assets/images/old medina fes.jpg";
import bathaEnter from "../assets/images/the enter of batha.jpg";

interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
}

const places: Place[] = [
  {
    id: "1",
    name: "The Old Medina",
    description:
      "The historic heart of Fes, a UNESCO World Heritage site and the world's largest car-free urban area.",
    image: oldMedinaFes,
    location: "Fes el Bali",
  },
  {
    id: "2",
    name: "Qarawiyyin Mosque",
    description:
      "The oldest existing and continually operating university in the world, founded in 859 CE.",
    image: qarawinFes,
    location: "Old Medina",
  },
  {
    id: "3",
    name: "Dar Dbegh (Tanneries)",
    description:
      "Famous leather tanneries where traditional methods have been used since medieval times.",
    image: darDbegh,
    location: "Fes el Bali",
  },
  {
    id: "4",
    name: "Riad Traditional House",
    description:
      "Experience the beauty of traditional Moroccan architecture in these historic houses.",
    image: riadEnter,
    location: "Old Medina",
  },
  {
    id: "5",
    name: "Medina Entrance",
    description:
      "The majestic entrance to the old medina, featuring the famous Blue Gate (Bab Boujloud).",
    image: oldMedinaEnter,
    location: "Fes el Bali",
  },
  {
    id: "6",
    name: "Batha Quarter",
    description:
      "Historic quarter home to the Dar Batha Museum and beautiful Andalusian gardens.",
    image: bathaEnter,
    location: "Fes el Bali",
  },
];

const DiscoverPlaces: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Title with decorative elements */}
      <div className="text-center mb-16 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-1 bg-gradient-to-r from-fes-blue to-fes-teal"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-8 animate-fade-in">
          Discover Places in Fes
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
          Explore the magical city of Fes through its most iconic locations
        </p>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.map((place, index) => (
          <div
            key={place.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-fes-blue transition-colors duration-300">
                {place.name}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                {place.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-fes-blue/10 text-fes-blue">
                  {place.location}
                </span>
                <Link
                  to={`/places/${place.id}`}
                  className="text-fes-blue hover:text-fes-teal transition-colors duration-300 group-hover:translate-x-1 transform inline-flex items-center"
                >
                  Explore
                  <svg
                    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add these styles to your global CSS or Tailwind config
const styles = `
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}
`;

// Create a style element and append it to the document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default DiscoverPlaces;
