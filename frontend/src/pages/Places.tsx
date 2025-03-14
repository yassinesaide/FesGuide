import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPlaces } from "../services/api";
import { Place } from "../types";

const Places = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const data = await getPlaces();
        setPlaces(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch places. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(places.map((place) => place.category))];

  // Filter places by category
  const filteredPlaces =
    activeCategory === "all"
      ? places
      : places.filter((place) => place.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        Discover Places in Fes
      </h1>

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          Filter by Category
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? "bg-blue-700 text-white"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Places Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
      ) : filteredPlaces.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
          No places found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={
                  place.image_url ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-blue-900">
                    {place.name}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {place.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {place.description}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/places/${place.id}`}
                    className="text-blue-700 hover:text-blue-900 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Places;
