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
  night: "/background-night-mobile.png",
  morning: "/background-morning-mobile.png",
  hot: "/background-mobile.png",
  sunny: "/background-sunny-mobile.png",
  cold: "/background-cold-mobile.png",
  rainy: "/background-rainy-mobile.png",
  snow: "/background-snow-mobile.png",
};

export const THEME_LABELS: Record<WeatherTheme, string> = {
  night: "Night",
  morning: "Morning",
  hot: "Very Hot",
  sunny: "Sunny & Pleasant",
  cold: "Cold",
  rainy: "Rainy",
  snow: "Snowy",
};

// Check if current user device local time is night (6:00 PM to 5:59 AM)
export function getIsNightTime(): boolean {
  if (typeof window === "undefined") {
    return true; // Safe default for evening builds
  }
  const hour = new Date().getHours();
  // 18 = 6 PM, 0..5 = 12 AM to 5:59 AM
  return hour >= 18 || hour < 6;
}

// Map WMO weather codes, temperature, and local time to theme
function calculateWeatherTheme(weatherCode: number, temperature: number): {
  theme: WeatherTheme;
  label: string;
} {
  const isNight = getIsNightTime();

  // If it's night time on the user's phone/device, always prioritize Night wallpaper!
  if (isNight) {
    const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
    if (rainCodes.includes(weatherCode)) {
      return { theme: "rainy", label: "Night • Rainy" };
    }
    const snowCodes = [71, 73, 75, 77, 85, 86];
    if (snowCodes.includes(weatherCode)) {
      return { theme: "snow", label: "Night • Snowy" };
    }
    return { theme: "night", label: "Night" };
  }

  // Daytime conditions:
  const snowCodes = [71, 73, 75, 77, 85, 86];
  if (snowCodes.includes(weatherCode) || temperature <= 0) {
    return { theme: "snow", label: "Snowy" };
  }

  const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];
  if (rainCodes.includes(weatherCode)) {
    return { theme: "rainy", label: "Rainy" };
  }

  if (temperature >= 38) {
    return { theme: "hot", label: "Very Hot" };
  }

  if (temperature <= 12) {
    return { theme: "cold", label: "Cold" };
  }

  return { theme: "morning", label: "Morning" };
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isNight, setIsNight] = useState<boolean>(true);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [liveTheme, setLiveTheme] = useState<WeatherTheme>("night");
  const [liveLabel, setLiveLabel] = useState<string>("Night");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [manualOverride, setManualOverride] = useState<WeatherTheme | null>(null);

  // Client-side mount sync with actual user device time
  useEffect(() => {
    setMounted(true);
    const night = getIsNightTime();
    setIsNight(night);
    if (!manualOverride) {
      setLiveTheme(night ? "night" : "morning");
      setLiveLabel(night ? "Night" : "Morning");
    }
  }, [manualOverride]);

  const fetchWeatherForCoords = async (lat: number, lon: number, cityName?: string, countryName?: string) => {
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`
      );
      if (!weatherRes.ok) throw new Error("Weather service unavailable");
      const weatherData = await weatherRes.json();

      const currentTemp = Math.round(weatherData.current?.temperature_2m ?? 24);
      const currentCode = weatherData.current?.weather_code ?? 0;
      const nightNow = getIsNightTime();

      setTemperature(currentTemp);
      setWeatherCode(currentCode);
      setIsNight(nightNow);

      const resolved = calculateWeatherTheme(currentCode, currentTemp);
      setLiveTheme(resolved.theme);
      setLiveLabel(resolved.label);

      if (cityName) setCity(cityName);
      if (countryName) setCountry(countryName);
      setError(null);
    } catch (err: any) {
      console.warn("Weather fetch notice, using local device time:", err);
      const nightNow = getIsNightTime();
      setTemperature(nightNow ? 24 : 29);
      setIsNight(nightNow);
      setLiveTheme(nightNow ? "night" : "morning");
      setLiveLabel(nightNow ? "Night" : "Morning");
      setError(err?.message || "Failed to load weather");
    } finally {
      setIsLoading(false);
    }
  };

  const loadWeather = useCallback(async () => {
    setIsLoading(true);

    try {
      const ipRes = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(3000) });
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
      console.log("IP lookup timed out, using fallback");
    }

    // Geolocation / local fallback
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
          await fetchWeatherForCoords(28.6139, 77.209, "New Delhi", "India");
        },
        { timeout: 4000 }
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
  const bgMobileImage = THEME_BACKGROUNDS[activeTheme] || (isNight ? "/background-night-mobile.png" : "/background-morning-mobile.png");

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
