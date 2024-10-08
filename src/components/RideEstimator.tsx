"use client";
import { useState } from "react";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

interface EstimateResult {
  vehicleType: string;
  priceEstimate: number;
  tripTime: number;
  tripDistance: number;
}

export default function RideEstimator() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEstimate = async () => {
    setLoading(true);
    setError(null);

    try {
      const pickupCoords = await geocodeAddress(pickup);
      const destCoords = await geocodeAddress(destination);

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${destCoords[0]},${destCoords[1]}?access_token=${MAPBOX_ACCESS_TOKEN}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const distance = data.routes[0].distance / 1000; // Convert to km
        const duration = data.routes[0].duration / 60; // Convert to minutes

        const vehicleTypes = ["Economy", "Standard", "Premium"];
        const vehicleType =
          vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
        const priceEstimate = Math.round(distance * 1.5 + duration * 0.5); 

        setEstimate({
          vehicleType,
          priceEstimate,
          tripTime: Math.round(duration),
          tripDistance: Math.round(distance * 10) / 10,
        });
      } else {
        throw new Error("No route found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch estimate. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  /* The fetchEstimate function asynchronously handles the process of estimating a ride by geocoding the pickup and destination addresses, then using the Mapbox Directions API to get route details. It checks for a valid route, calculates the distance and duration, selects a random vehicle type, and computes a simple price estimate. The resulting estimate is then saved to state, and loading/error states are managed throughout the process.
  */

  const geocodeAddress = async (address: string): Promise<[number, number]> => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].center;
    }
    throw new Error("Address not found");
  };
  /* The geocodeAddress function uses the Mapbox Geocoding API to geocode an address, and returns the coordinates of the first result. If the address is not found, it throws an error. */

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold mb-4">Ride Estimator</h2>
        <div className="space-y-4">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              loading || !pickup || !destination
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={fetchEstimate}
            disabled={loading || !pickup || !destination}
          >
            {loading ? "Estimating..." : "Get Estimate"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {estimate && (
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-semibold">Vehicle Type:</span>{" "}
                {estimate.vehicleType}
              </p>
              <p>
                <span className="font-semibold">Price Estimate:</span> $
                {estimate.priceEstimate}
              </p>
              <p>
                <span className="font-semibold">Trip Time:</span>{" "}
                {estimate.tripTime} minutes
              </p>
              <p>
                <span className="font-semibold">Trip Distance:</span>{" "}
                {estimate.tripDistance} km
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
/* 
The return statement contains JSX for rendering the Ride Estimator's user interface, with inputs for the pickup and destination addresses, and a button to trigger the estimation process.
*/