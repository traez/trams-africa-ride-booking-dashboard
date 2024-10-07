"use client";
import { useState, ChangeEvent } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

/* ChangeEvent is a TypeScript type that represents the shape of event objects emitted by HTML elements (e.g., <input>, <textarea>, or <select>) when their value changes. It is provided by React's type definitions (@types/react) and helps ensure type safety when handling form elements in React applications. */

const libraries: "places"[] = ["places"];
/* Creates a constant libraries that specifies the Google Maps libraries to be loaded. Here, it's defined as an array with only the "places" library. */

export default function PlacesAutocomplete() {
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

  const [address, setAddress] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  /*   address: Holds the user's input in the text field. Initially, it's an empty string.
setAddress: Function to update the value of address.
suggestions: An array of suggestion strings for the location input.
setSuggestions: Function to update the value of suggestions. */

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    /*   Defines a function handleInputChange to handle changes to the input field.
event: ChangeEvent<HTMLInputElement>: Specifies that the event will be a change event on an HTML input element.
setAddress(event.target.value);: Updates the address state with the current input value. */

    if (!window.google) return;
    /*  Checks if the window.google object is defined (indicating that the Google Maps library is loaded). If window.google is undefined, the return statement will exit the current function early, preventing the following lines from being executed. */

    const autocompleteService =
      new window.google.maps.places.AutocompleteService();
    /*  Creates a new instance of AutocompleteService from the window.google object to interact with the Places API. */

    if (event.target.value) {
      autocompleteService.getPlacePredictions(
        { input: event.target.value },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions.map((p) => p.description));
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };
  /*   If there is a value in the input field (event.target.value), it makes a request to the getPlacePredictions method of the AutocompleteService:
input: event.target.value: The current input text.
predictions, status: Callback parameters containing an array of predictions and the request status.
Checks if the status is OK and predictions are available, then:
Maps through the predictions and extracts their description.
Updates the suggestions state with these descriptions.
If the input field is cleared, set the suggestions state back to an empty array. */

  if (loadError)
    return <div className="text-red-500">Error loading Google Maps</div>;
  if (!isLoaded) return <div className="text-gray-700">Loading...</div>;
  /*   If there was an error loading the Google Maps API (loadError), displays an error message styled with Tailwind CSS.
If the Google Maps API is still loading (!isLoaded), shows a "Loading..." message.
*/

  return (
    <div className="flex flex-col items-center mt-8">
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="Enter a location"
        className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />
      <div className="w-80 border border-gray-200 shadow-md rounded-md">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-2 hover:bg-blue-100 cursor-pointer"
            onClick={() => {
              setAddress(suggestion);
              setSuggestions([]);
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}
/* 
Container: The outer div uses Tailwind CSS for a vertically centered layout (flex flex-col items-center mt-8).

Input Field:
An <input> element allows users to enter a location with a controlled value (value={address}) and updates the state through handleInputChange.
It includes styles like borders and focus effects using Tailwind CSS.
Suggestions Dropdown:

A div displays suggestions below the input, with each suggestion styled (p-2 hover:bg-blue-100 cursor-pointer).
Clicking a suggestion updates the input and clears the suggestions list.
Overall, this component enables users to type a location and select from dynamically displayed suggestions. */
