"use client";
import { useEffect, useState, useCallback } from "react";
import { Location } from "./LocationAutocomplete";

interface RideOptionsProps {
  pickup: Omit<Location, "address">;
  destination: Omit<Location, "address">;
}

interface EstimateResult {
  vehicleType: string;
  priceEstimate: number;
  tripLength: number;
  tripDistance: number;
}

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;

export default function RideOptions({ pickup, destination }: RideOptionsProps) {
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentDateTime = new Date();

  const formattedDate = currentDateTime.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const fetchEstimate = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}?access_token=${MAPBOX_ACCESS_TOKEN}`;
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
          tripLength: Math.round(duration),
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
  }, [pickup, destination]);

  useEffect(() => {
    fetchEstimate();
  }, [fetchEstimate]);

  return (
    <section className="max-w-[20rem] mx-auto bg-white shadow-md rounded-lg overflow-hidden px-6 py-4">
      <h2 className="text-2xl font-bold mb-2">Booking Summary</h2>
      <p className="border border-gray-300 rounded-lg px-2 py-1">
        <span className="font-semibold">Pickup Coordinates:</span> {pickup.lat},{" "}
        {pickup.lng}
      </p>
      <p className="border border-gray-300 rounded-lg px-2 py-1">
        <span className="font-semibold">Destination Coordinates:</span>{" "}
        {destination.lat}, {destination.lng}
      </p>
      <p className="border border-gray-300 rounded-lg px-2 py-1">
        <span className="font-semibold">Trip Date:</span> {formattedDate}
      </p>
      <p className="border border-gray-300 rounded-lg px-2 py-1">
        <span className="font-semibold">Trip Time:</span> {formattedTime}
      </p>

      {loading && <p>Estimating...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {estimate && (
        <div className="mt-4 space-y-2">
          <h2 className="text-2xl font-bold">Ride Details</h2>
          <p className="border border-gray-300 rounded-lg px-2 py-1">
            <span className="font-semibold">Vehicle Type:</span>{" "}
            {estimate.vehicleType}
          </p>
          <p className="border border-gray-300 rounded-lg px-2 py-1">
            <span className="font-semibold">Price Estimate:</span>{" "}
            <span>&#8358;</span>
            {estimate.priceEstimate}
          </p>
          <p className="border border-gray-300 rounded-lg px-2 py-1">
            <span className="font-semibold">Trip Length:</span>{" "}
            {estimate.tripLength} minutes
          </p>
          <p className="border border-gray-300 rounded-lg px-2 py-1">
            <span className="font-semibold">Trip Distance:</span>{" "}
            {estimate.tripDistance} km
          </p>
        </div>
      )}
    </section>
  );
}

/* 
The RideOptions component is a functional React component designed to display a summary of a ride estimate based on the pickup and destination coordinates provided as props. It utilizes hooks like useState, useEffect, and useCallback to manage its internal state and handle side effects. Upon rendering, the component initializes states for the ride estimate (estimate), loading status (loading), and error messages (error). The current date and time are formatted to provide a clear trip date and time display. The fetchEstimate function, defined using useCallback, is responsible for fetching the estimated ride details from the Mapbox Directions API. It constructs a URL based on the pickup and destination coordinates and the Mapbox access token, initiates the fetch request, processes the response, and extracts the necessary information such as trip distance and duration. If the API call is successful, it randomly selects a vehicle type and calculates a price estimate based on distance and duration.

The component's UI is structured with a summary section that displays the pickup and destination coordinates, formatted trip date, and time. While the estimate is being fetched, a loading message is displayed. If an error occurs during the fetch, an error message is shown to the user. Once the estimate is successfully retrieved, the ride details—vehicle type, price estimate, trip length, and trip distance—are presented in a structured format. The use of Tailwind CSS classes helps style the component for a clean and responsive design. This component effectively encapsulates the functionality for estimating ride details based on user input, providing a user-friendly interface for ride booking scenarios.
*/