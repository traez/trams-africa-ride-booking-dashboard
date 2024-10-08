"use client";
import { useState, ChangeEvent, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { StateContext } from "@/lib/StateProvider";
/* ChangeEvent is a TypeScript type that represents the shape of event objects emitted by HTML elements (e.g., <input>, <textarea>, or <select>) when their value changes. It is provided by React's type definitions (@types/react) and helps ensure type safety when handling form elements in React applications. */

const libraries: "places"[] = ["places"];
/* Creates a constant libraries that specifies the Google Maps libraries to be loaded. Here, it's defined as an array with only the "places" library. */

export default function PlacesAutocomplete() {
  const { logHelloWorld } = useContext(StateContext)!;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });
  /*  Calls the useJsApiLoader hook to load the Google Maps API.
googleMapsApiKey: Retrieves the API key from the environment variable (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY). If it's not found, it defaults to an empty string.
libraries: The array defined earlier specifying which libraries should be loaded.
The hook returns two properties:
isLoaded: Boolean value indicating if the API has been successfully loaded.
loadError: If there was an error loading the API, it will be stored in this variable. */

  const [locations, setLocations] = useState<{
    pickup: string;
    destination: string;
  }>({
    pickup: "",
    destination: "",
  });
  /* State to manage input values for pickup and destination locations as an object with two properties */

  const [suggestions, setSuggestions] = useState<{
    pickup: string[];
    destination: string[];
  }>({
    pickup: [],
    destination: [],
  });
  /* State to manage suggestions based on user input for both pickup and destination locations */

  const [activeInput, setActiveInput] = useState<
    "pickup" | "destination" | null
  >(null);
  console.log(locations);
  /* State to track which input field is currently active (either pickup or destination) for managing suggestions */

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    locationType: "pickup" | "destination"
  ) => {
    const { value } = event.target;
    setLocations((prev) => ({ ...prev, [locationType]: value }));
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
  /* 
  The handleInputChange function is designed to process changes in the input fields for both pickup and destination locations. It takes two parameters: the event triggered by the input change, and the locationType, which specifies whether the change pertains to the pickup or destination field. Within the function, the input value is extracted from the event using destructuring. This value is then used to update the locations state by merging the current state with the new value corresponding to the active input field (either pickup or destination). The activeInput state is also updated to indicate which input field is currently being edited, facilitating the display of relevant suggestions.

Before proceeding to fetch place predictions, the function checks if the Google Maps API has been loaded by verifying the existence of the window.google object. If the API is available, a new instance of AutocompleteService is created to interact with the Google Maps Places API. When the user types a value into the input field, the function calls getPlacePredictions to retrieve location predictions based on the current input. If the API call is successful and returns predictions, the suggestions state is updated with these predictions, specifically extracting the descriptions of each predicted place. In cases where the input field is empty, the function clears any existing suggestions for the corresponding input field, ensuring that users only see relevant options.
  */

  const handleSuggestionClick = (
    suggestion: string,
    locationType: "pickup" | "destination"
  ) => {
    setLocations((prev) => ({ ...prev, [locationType]: suggestion }));
    setSuggestions({ pickup: [], destination: [] });
    setActiveInput(null);
  };
  /* 
  The handleSuggestionClick function handles the event when a user clicks on a suggestion from the dropdown menu. It takes two parameters: the selected suggestion (a string) and the locationType, which indicates whether the suggestion pertains to the pickup or destination input. Within the function, the state for locations is updated by replacing the current input value with the selected suggestion, ensuring that the user’s choice is reflected in the input field. After updating the input, the function clears the suggestions for both pickup and destination to prevent any visual clutter in the dropdown. Finally, it resets the activeInput state to null, indicating that no input field is currently active or selected, enhancing user experience by providing a clean interface.
  */

  if (loadError)
    return <div className="text-red-500">Error loading Google Maps</div>;
  if (!isLoaded) return <div className="text-gray-700">Loading...</div>;
  /*   If there was an error loading the Google Maps API (loadError), displays an error message styled with Tailwind CSS.
If the Google Maps API is still loading (!isLoaded), shows a "Loading..." message.
*/

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="pickup"
            className="w-24 text-right text-sm font-medium text-gray-700"
          >
            Pickup:
          </label>
          <div className="flex-1">
            <input
              id="pickup"
              type="text"
              value={locations.pickup}
              onChange={(e) => handleInputChange(e, "pickup")}
              placeholder="Enter pickup location"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
        </div>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="destination"
            className="w-24 text-right text-sm font-medium text-gray-700"
          >
            Destination:
          </label>
          <div className="flex-1">
            <input
              id="destination"
              type="text"
              value={locations.destination}
              onChange={(e) => handleInputChange(e, "destination")}
              placeholder="Enter destination"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
        </div>
      </div>
      <button
        onClick={logHelloWorld}
        className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
      >
        Log Hello World
      </button>
    </div>
  );
}
/* 
The return statement of the component renders a user interface for entering pickup and destination locations, leveraging the Google Maps Places Autocomplete functionality. It begins by creating a flexbox container that centers its content and provides a margin at the top. Inside this container, there is a maximum width defined for the input section, ensuring a clean layout with adequate spacing between elements.

The UI consists of two input fields, one for the pickup location and another for the destination. Each input field is accompanied by a label for clarity, enhancing the overall user experience. As the user types into the pickup or destination input, the corresponding suggestions appear in a dropdown menu, which is conditionally rendered based on whether there are any suggestions available and if the respective input field is active. Each suggestion is styled to provide a visual cue on hover, allowing users to easily select a suggestion by clicking it, which subsequently updates the input field with their choice.
*/