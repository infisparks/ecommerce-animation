"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type WeatherTheme = "morning" | "night" | "hot" | "sunny" | "cold" | "rainy" | "snow";

export interface WeatherData {
  temperature: number | null;
  weatherCode: number | null;
  condition: WeatherTheme;
  conditionLabel: string;
  isNight: boolean;
  city: string;
  country: string;
  isLoading: boolean;
  error: string | null;
  isOverride: boolean;
  manualOverride: WeatherTheme | null;
  bgMobileImage: string;
  googleWeatherUrl: string;
}

interface WeatherContextType extends WeatherData {
  setManualTheme: (theme: WeatherTheme | null) => void;
  refreshWeather: () => Promise<void>;
}

export const THEME_BACKGROUNDS: Record<WeatherTheme, string> = {
  morning: "/background-morning-mobile.png",
  night: "/background-night-mobile.png",
  hot: "/background-mobile.png",
  sunny: "/background-sunny-mobile.png",
  cold: "/background-cold-mobile.png",
  rainy: "/background-rainy-mobile.png",
  snow: "/background-snow-mobile.png",
};

export const THEME_LABELS: Record<WeatherTheme, string> = {
  morning: "Morning",
  night: "Night",
  hot: "Very Hot",
  sunny: "Sunny & Pleasant",
  cold: "Cold",
  rainy: "Rainy",
  snow: "Snowy",
};

// Check if current client time is night (6:00 PM to 5:59 AM)
export function getIsNightTime(isDayCode?: number): boolean {
  if (isDayCode !== undefined && isDayCode !== null) {
    return isDayCode === 0;
  }
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
}

// Map WMO weather codes, temperature, and time of day to theme
function calculateWeatherTheme(weatherCode: number, temperature: number, isDayCode?: number): {
  theme: WeatherTheme;
  label: string;
} {
  const isNight = getIsNightTime(isDayCode);

  // Snow codes: 71, 73, 75, 77, 85, 86 or temp <= 0°C
  const snowCodes = [71, 73, 75, 77, 85, 86];
  if (snowCodes.includes(weatherCode) || temperature <= 0) {
    return { theme: "snow", label: "Snowy" };
  }

  // Rain codes: 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99
  const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
  if (rainCodes.includes(weatherCode)) {
    return { theme: "rainy", label: "Rainy" };
  }

  // If it's night time, load the Night theme!
  if (isNight) {
    return { theme: "night", label: "Night" };
  }

  // Extreme Hot (>= 35°C)
  if (temperature >= 35) {
    return { theme: "hot", label: "Very Hot" };
  }

  // Cold (<= 14°C)
  if (temperature <= 14) {
    return { theme: "cold", label: "Cold" };
  }

  // Morning / Daytime default
  return { theme: "morning", label: "Morning" };
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  // Instant initial state based on current client hour
  const initialIsNight = getIsNightTime();
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [liveTheme, setLiveTheme] = useState<WeatherTheme>(initialIsNight ? "night" : "morning");
  const [liveLabel, setLiveLabel] = useState<string>(initialIsNight ? "Night" : "Morning");
  const [isNight, setIsNight] = useState<boolean>(initialIsNight);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [manualOverride, setManualOverride] = useState<WeatherTheme | null>(null);

  const fetchWeatherForCoords = async (lat: number, lon: number, cityName?: string, countryName?: string) => {
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day`
      );
      if (!weatherRes.ok) throw new Error("Weather service unavailable");
      const weatherData = await weatherRes.json();

      const currentTemp = Math.round(weatherData.current.temperature_2m);
      const currentCode = weatherData.current.weather_code;
      const isDayVal = weatherData.current.is_day;
      const nightBool = isDayVal === 0;

      setTemperature(currentTemp);
      setWeatherCode(currentCode);
      setIsNight(nightBool);

      const resolved = calculateWeatherTheme(currentCode, currentTemp, isDayVal);
      setLiveTheme(resolved.theme);
      setLiveLabel(resolved.label);

      if (cityName) setCity(cityName);
      if (countryName) setCountry(countryName);
      setError(null);
    } catch (err: any) {
      console.warn("Weather fetch failed, falling back to local time detection:", err);
      const fallbackNight = getIsNightTime();
      setTemperature(fallbackNight ? 24 : 29);
      setIsNight(fallbackNight);
      setLiveTheme(fallbackNight ? "night" : "morning");
      setLiveLabel(fallbackNight ? "Night" : "Morning");
      setError(err?.message || "Failed to load weather");
    } finally {
      setIsLoading(false);
    }
  };

  const loadWeather = useCallback(async () => {
    setIsLoading(true);

    try {
      // 1. Fetch Location via fast ipwho.is service (no user prompt required)
      const ipRes = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(4000) });
      const ipData = await ipRes.json();

      if (ipData && ipData.success && ipData.latitude && ipData.longitude) {
        await fetchWeatherForCoords(
          ipData.latitude,
          ipData.longitude,
          ipData.city || ipData.region || "Your City",
          ipData.country || ""
        );
        return;
      }
    } catch (e) {
      console.log("IP lookup timed out or failed, trying geolocation or fallback");
    }

    // 2. Geolocation API fallback
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await fetchWeatherForCoords(
            position.coords.latitude,
            position.coords.longitude,
            "Local Area"
          );
        },
        async () => {
          // Default fallback
          await fetchWeatherForCoords(28.6139, 77.209, "New Delhi", "India");
        },
        { timeout: 5000 }
      );
    } else {
      await fetchWeatherForCoords(28.6139, 77.209, "New Delhi", "India");
    }
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const activeTheme = manualOverride || liveTheme;
  const activeLabel = manualOverride ? THEME_LABELS[manualOverride] : liveLabel;
  const bgMobileImage = THEME_BACKGROUNDS[activeTheme] || THEME_BACKGROUNDS[initialIsNight ? "night" : "morning"];

  const googleQuery = city ? `${city} weather` : "weather";
  const googleWeatherUrl = `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`;

  return (
    <WeatherContext.Provider
      value={{
        temperature,
        weatherCode,
        condition: activeTheme,
        conditionLabel: activeLabel,
        isNight,
        city,
        country,
        isLoading,
        error,
        isOverride: manualOverride !== null,
        manualOverride,
        bgMobileImage,
        googleWeatherUrl,
        setManualTheme: (theme) => setManualOverride(theme),
        refreshWeather: loadWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
