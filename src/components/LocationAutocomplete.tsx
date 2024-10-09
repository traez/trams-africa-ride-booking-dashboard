"use client";
import { useState, ChangeEvent } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { useGeocoding } from "@/lib/useGeocoding";
import RideOptions from "./RideOptions";
import WeatherInsights from "./WeatherInsights";

const libraries: "places"[] = ["places"];

export interface Location {
  address: string;
  lat: number | null;
  lng: number | null;
}

export default function LocationAutocomplete() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [locations, setLocations] = useState<{
    pickup: Location;
    destination: Location;
  }>({
    pickup: { address: "", lat: null, lng: null },
    destination: { address: "", lat: null, lng: null },
  });

  const [suggestions, setSuggestions] = useState<{
    pickup: string[];
    destination: string[];
  }>({
    pickup: [],
    destination: [],
  });

  const [activeInput, setActiveInput] = useState<
    "pickup" | "destination" | null
  >(null);

  const { getGeocode } = useGeocoding();

  const currentDateTime = new Date();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    locationType: "pickup" | "destination"
  ) => {
    const { value } = event.target;
    setLocations((prev) => ({
      ...prev,
      [locationType]: { ...prev[locationType], address: value },
    }));
    setActiveInput(locationType);

    if (!window.google) return;

    const autocompleteService =
      new window.google.maps.places.AutocompleteService();

    if (value) {
      autocompleteService.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions((prev) => ({
              ...prev,
              [locationType]: predictions.map((p) => p.description),
            }));
          }
        }
      );
    } else {
      setSuggestions((prev) => ({ ...prev, [locationType]: [] }));
    }
  };

  const handleSuggestionClick = async (
    suggestion: string,
    locationType: "pickup" | "destination"
  ) => {
    try {
      const results = await getGeocode({ address: suggestion });
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setLocations((prev) => ({
          ...prev,
          [locationType]: {
            address: suggestion,
            lat: lat(),
            lng: lng(),
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }

    setSuggestions({ pickup: [], destination: [] });
    setActiveInput(null);
  };

  if (loadError) {
    return (
      <div
        className="text-red-500 p-4 border border-red-300 rounded-md"
        role="alert"
      >
        <p className="font-bold">Error loading Google Maps</p>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center mt-8 gap-2">
      <article className="w-full max-w-md space-y-4">
        <aside className="flex items-center space-x-4">
          <label
            htmlFor="pickup"
            className="w-24 text-right text-sm font-medium text-gray-700"
          >
            Pickup:
          </label>
          <div className="flex-1 relative">
            <input
              id="pickup"
              type="text"
              value={locations.pickup.address}
              onChange={(e) => handleInputChange(e, "pickup")}
              placeholder="Enter pickup location"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500"
              disabled={!isLoaded}
              aria-busy={!isLoaded}
            />
            {!isLoaded && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="animate-spin h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
            {activeInput === "pickup" && suggestions.pickup.length > 0 && (
              <menu className="w-full border border-gray-200 shadow-md rounded-md mt-1">
                {suggestions.pickup.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion, "pickup")}
                  >
                    {suggestion}
                  </div>
                ))}
              </menu>
            )}
          </div>
        </aside>
        <aside className="flex items-center space-x-4">
          <label
            htmlFor="destination"
            className="w-24 text-right text-sm font-medium text-gray-700"
          >
            Destination:
          </label>
          <div className="flex-1 relative">
            <input
              id="destination"
              type="text"
              value={locations.destination.address}
              onChange={(e) => handleInputChange(e, "destination")}
              placeholder="Enter destination"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500"
              disabled={!isLoaded}
              aria-busy={!isLoaded}
            />
            {!isLoaded && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="animate-spin h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}

            {activeInput === "destination" &&
              suggestions.destination.length > 0 && (
                <menu className="w-full border border-gray-200 shadow-md rounded-md mt-1">
                  {suggestions.destination.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() =>
                        handleSuggestionClick(suggestion, "destination")
                      }
                    >
                      {suggestion}
                    </div>
                  ))}
                </menu>
              )}
          </div>
        </aside>
        <aside className="flex items-center space-x-4">
          <label
            htmlFor="pickup-date"
            className="w-24 text-right text-sm font-medium text-gray-700"
          >
            Pickup Date
          </label>
          <div className="flex-1 relative">
            <input
              id="pickup-date"
              type="date"
              value={currentDateTime.toISOString().split("T")[0]}
              disabled
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
        </aside>
        <aside className="flex items-center space-x-4">
          <label
            htmlFor="pickup-time"
            className="w-24 text-right text-sm font-medium text-gray-700"
          >
            Pickup Time
          </label>
          <div className="flex-1 relative">
            <input
              id="pickup-time"
              type="time"
              value={currentDateTime
                .toTimeString()
                .split(" ")[0]
                .substring(0, 5)}
              disabled
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500"
            />
          </div>
        </aside>
      </article>
     
      {locations.pickup.lat !== null &&
        locations.pickup.lng !== null &&
        locations.destination.lat !== null &&
        locations.destination.lng !== null && (
          <div className="flex flex-col md:flex-row md:space-x-4 w-full">
            <RideOptions
              pickup={{
                lat: locations.pickup.lat,
                lng: locations.pickup.lng,
              }}
              destination={{
                lat: locations.destination.lat,
                lng: locations.destination.lng,
              }}
            />
            <WeatherInsights
              destination={{
                lat: locations.destination.lat,
                lng: locations.destination.lng,
              }}
            />
          </div>
        )}
    </section>
  );
}
/* 
Certainly! The LocationAutocomplete component is a React functional component designed to facilitate location selection for a ride-sharing or delivery service by integrating with Google Maps services. The primary functionalities of this component include capturing user input for pickup and destination locations, providing autocomplete suggestions based on the input, and retrieving geographic coordinates (latitude and longitude) for the selected locations.

Component Structure and State Management
The component uses React hooks such as useState and useJsApiLoader to manage state and load the Google Maps API. Initially, it sets up a state object called locations that holds the pickup and destination details, each containing an address, latitude, and longitude. It also defines a suggestions state to store autocomplete suggestions for both pickup and destination fields, along with an activeInput state to keep track of which input field is currently being interacted with. When the user types in either the pickup or destination input fields, the handleInputChange function is triggered. This function updates the corresponding location's address in the state and uses the Google Maps Places API to fetch location suggestions based on the user’s input.

Autocomplete and Geocoding
As the user types, the component checks for Google Maps availability and utilizes the AutocompleteService to generate a list of place predictions. These suggestions are displayed in a dropdown menu below the respective input field. When a user clicks on a suggestion, the handleSuggestionClick function is called. This function fetches the geographical coordinates of the selected address using the getGeocode function from the useGeocoding hook. If the geocoding request is successful, it updates the locations state with the new address and its corresponding latitude and longitude. The suggestions dropdown is then cleared, and the active input state is reset.

Rendering and Conditional Logic
The component’s render method conditionally displays the autocomplete suggestions, the loading spinner, and the ride options and weather insights based on whether the Google Maps API has loaded successfully. If there are valid coordinates for both the pickup and destination locations, it renders the RideOptions and WeatherInsights components. The RideOptions component presumably uses the geographical coordinates to calculate and display available ride options, while WeatherInsights likely fetches and displays weather information for the destination. The layout is responsive, utilizing Tailwind CSS classes for styling, ensuring a user-friendly experience across various screen sizes.

Overall, this component encapsulates the logic for location selection while providing a seamless and interactive user experience by leveraging the capabilities of the Google Maps API.
*/