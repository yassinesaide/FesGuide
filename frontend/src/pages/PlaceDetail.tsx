import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPlaceById } from "../services/api";
import { Place } from "../types";

const PlaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getPlaceById(parseInt(id));
        setPlace(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch place details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="bg-red-100 text-red-700 p-6 rounded-lg">
        {error || "Place not found"}
        <div className="mt-4">
          <Link to="/places" className="text-blue-700 hover:text-blue-900">
            ← Back to all places
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/places"
          className="text-blue-700 hover:text-blue-900 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all places
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={
                place.image_url ||
                "https://via.placeholder.com/600x400?text=No+Image"
              }
              alt={place.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-blue-900">{place.name}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {place.category}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
                Description
              </h2>
              <p className="text-gray-700">{place.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-blue-800 mb-1">
                  Location
                </h2>
                <p className="text-gray-700">{place.location}</p>
              </div>

              {place.coordinates && (
                <div>
                  <h2 className="text-lg font-semibold text-blue-800 mb-1">
                    Coordinates
                  </h2>
                  <p className="text-gray-700">{place.coordinates}</p>
                </div>
              )}

              {place.opening_hours && (
                <div>
                  <h2 className="text-lg font-semibold text-blue-800 mb-1">
                    Opening Hours
                  </h2>
                  <p className="text-gray-700">{place.opening_hours}</p>
                </div>
              )}

              {place.ticket_price && (
                <div>
                  <h2 className="text-lg font-semibold text-blue-800 mb-1">
                    Ticket Price
                  </h2>
                  <p className="text-gray-700">{place.ticket_price}</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  place.coordinates || place.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
                View on Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
