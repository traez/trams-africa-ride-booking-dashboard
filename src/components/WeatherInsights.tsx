"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Location } from "./LocationAutocomplete";

interface WeatherInsightsProps {
  destination: Omit<Location, "address">;
}

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{ description: string; icon: string }>;
  };
  daily: Array<{
    dt: number;
    temp: { min: number; max: number };
    weather: Array<{ description: string; icon: string }>;
  }>;
}

const WeatherInsights: React.FC<WeatherInsightsProps> = ({ destination }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

        if (!apiKey) {
          throw new Error("API key is missing. Please check your environment variables.");
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${destination.lat}&lon=${destination.lng}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [destination]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!weatherData) return null;

  const { current, daily } = weatherData;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden px-6 py-4 mt-4">
      <h2 className="text-2xl font-bold mb-4">Weather Insights</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Current Weather</h3>
          <div className="flex items-center">
            <div className="relative w-16 h-16">
              <Image
                src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
                alt={current.weather[0].description}
                fill
                sizes="(min-width: 400px) 100vw"
                className="rounded-t-lg object-cover"
              />
            </div>
            <div>
              <p className="text-3xl font-bold">{Math.round(current.temp)}°C</p>
              <p className="capitalize">{current.weather[0].description}</p>
            </div>
          </div>
          <p>Feels like: {Math.round(current.feels_like)}°C</p>
          <p>Humidity: {current.humidity}%</p>
          <p>Wind speed: {Math.round(current.wind_speed * 3.6)} km/h</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">5-Day Forecast</h3>
          <div className="flex justify-between">
            {daily.slice(1, 6).map((day) => (
              <div key={day.dt} className="text-center">
                <p>
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <div className="relative w-10 h-10 mx-auto">
                  <Image
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                    fill
                    sizes="(min-width: 400px) 100vw"
                    className="rounded-t-lg object-cover"
                  />
                </div>
                <p className="text-sm border border-gray-300 rounded-lg px-2 py-1 mt-2">
                  {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInsights;
/* 
The WeatherInsights component is a functional React component that fetches and displays weather information based on a given destination's coordinates. It receives a destination prop containing latitude and longitude, which is used to retrieve weather data from the OpenWeatherMap API. The component employs React hooks, specifically useState and useEffect, to manage its state and side effects. The weatherData, loading, and error states are defined using useState. When the component mounts or whenever the destination prop changes, the useEffect hook triggers the fetchWeatherData asynchronous function, which handles the API call. The function constructs a URL for the OpenWeatherMap API, incorporates the API key from environment variables, and fetches the weather data. If successful, the fetched data is stored in the weatherData state; if an error occurs, an appropriate error message is set.

The rendered output of the component is divided into two primary sections: current weather conditions and a 5-day forecast. While data is loading, a loading message is displayed. If there is an error, it shows the error message in red. Upon successfully fetching weather data, the current weather conditions, including temperature, feels-like temperature, humidity, wind speed, and an icon representing the weather condition, are displayed. The 5-day forecast section maps through the next five days, showing each day's date, weather icon, and temperature range (maximum and minimum). The use of Tailwind CSS ensures a clean and visually appealing layout, with structured elements that improve user experience. Overall, this component provides a comprehensive weather overview for a specified location, enhancing the functionality of applications that may require weather insights.
*/