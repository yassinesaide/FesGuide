import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapNavigationProps {
  destination: {
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

const MapNavigation: React.FC<MapNavigationProps> = ({ destination }) => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(
    null
  );
  const [distance, setDistance] = useState<number | null>(null);
  const [bearing, setBearing] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [isTracking, setIsTracking] = useState(false);
  const [nextDirection, setNextDirection] = useState<string>("");

  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const destinationMarkerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(
        [destination.coordinates.latitude, destination.coordinates.longitude],
        15
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Add destination marker
      const destinationIcon = L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      destinationMarkerRef.current = L.marker(
        [destination.coordinates.latitude, destination.coordinates.longitude],
        { icon: destinationIcon }
      )
        .addTo(mapRef.current)
        .bindPopup(destination.name);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [destination]);

  // Calculate distance between two points in meters
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Calculate bearing between two points
  const calculateBearing = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const λ1 = (lon1 * Math.PI) / 180;
    const λ2 = (lon2 * Math.PI) / 180;

    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) -
      Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    const θ = Math.atan2(y, x);

    return ((θ * 180) / Math.PI + 360) % 360;
  };

  // Convert bearing to cardinal direction
  const getCardinalDirection = (bearing: number): string => {
    const directions = [
      "North",
      "Northeast",
      "East",
      "Southeast",
      "South",
      "Southwest",
      "West",
      "Northwest",
    ];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  // Generate next direction based on distance and bearing
  const generateDirection = (distance: number, bearing: number) => {
    const direction = getCardinalDirection(bearing);

    if (distance < 10) {
      return "You have arrived at your destination!";
    } else if (distance < 50) {
      return `Your destination is very close! Continue ${direction.toLowerCase()}.`;
    } else if (distance < 100) {
      return `Keep walking ${direction.toLowerCase()}, about ${Math.round(
        distance
      )} meters to go.`;
    } else {
      return `Head ${direction.toLowerCase()} for about ${Math.round(
        distance
      )} meters.`;
    }
  };

  // Update map with user's location and route
  const updateMap = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    if (mapRef.current) {
      // Update user marker
      if (!userMarkerRef.current) {
        const userIcon = L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        userMarkerRef.current = L.marker([latitude, longitude], {
          icon: userIcon,
        })
          .addTo(mapRef.current)
          .bindPopup("Your Location");
      } else {
        userMarkerRef.current.setLatLng([latitude, longitude]);
      }

      // Update route line
      if (routeLayerRef.current) {
        mapRef.current.removeLayer(routeLayerRef.current);
      }

      routeLayerRef.current = L.polyline(
        [
          [latitude, longitude],
          [destination.coordinates.latitude, destination.coordinates.longitude],
        ],
        { color: "#2196F3", weight: 4 }
      ).addTo(mapRef.current);

      // Fit map bounds to show both markers
      const bounds = L.latLngBounds(
        [latitude, longitude],
        [destination.coordinates.latitude, destination.coordinates.longitude]
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsTracking(true);

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation(position);
        updateMap(position);

        const dist = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          destination.coordinates.latitude,
          destination.coordinates.longitude
        );

        const bear = calculateBearing(
          position.coords.latitude,
          position.coords.longitude,
          destination.coordinates.latitude,
          destination.coordinates.longitude
        );

        setDistance(dist);
        setBearing(bear);
        setNextDirection(generateDirection(dist, bear));
      },
      (err) => {
        setError("Error getting your location: " + err.message);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      setIsTracking(false);
    };
  };

  const stopTracking = () => {
    setIsTracking(false);
    if (userMarkerRef.current && mapRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
    if (routeLayerRef.current && mapRef.current) {
      mapRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }
  };

  return (
    <div className="navigation-container">
      <div className="destination-info">
        <h3>{destination.name}</h3>
        {userLocation && distance && (
          <p>Distance: {Math.round(distance)} meters</p>
        )}
      </div>

      <div id="map" className="map-container"></div>

      <div className="direction-display">
        {nextDirection && (
          <div className="next-direction">
            <h4>Next Direction:</h4>
            <p>{nextDirection}</p>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>

      <div className="navigation-controls">
        {!isTracking ? (
          <button onClick={startTracking} className="start-btn">
            Start Navigation
          </button>
        ) : (
          <button onClick={stopTracking} className="stop-btn">
            Stop Navigation
          </button>
        )}
      </div>

      <style>{`
        .navigation-container {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin: 1rem 0;
        }

        .map-container {
          height: 400px;
          width: 100%;
          margin: 1rem 0;
          border-radius: 8px;
          overflow: hidden;
        }

        .destination-info {
          margin-bottom: 1rem;
        }

        .destination-info h3 {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .direction-display {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .next-direction {
          text-align: center;
        }

        .next-direction h4 {
          font-size: 1rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .next-direction p {
          font-size: 1.1rem;
          color: #333;
          font-weight: 500;
        }

        .error {
          color: #dc3545;
          padding: 0.5rem;
          margin: 0.5rem 0;
          background: #ffe6e6;
          border-radius: 4px;
        }

        .navigation-controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .start-btn, .stop-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }

        .start-btn {
          background: #28a745;
          color: white;
        }

        .stop-btn {
          background: #dc3545;
          color: white;
        }

        .start-btn:hover {
          background: #218838;
        }

        .stop-btn:hover {
          background: #c82333;
        }
      `}</style>
    </div>
  );
};

export default MapNavigation;
