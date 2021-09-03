import { firestore } from "firebase-admin";

export interface User {
  uid: string;
  name: string;
  location: firestore.GeoPoint;
  weather: Weather;
}

export interface Weather {
  aqi: number;
  description: string;
  icon: WeatherIcon | null;
  label: string;
  sunrise: number;
  sunset: number;
  timezoneOffset: number;
  temp: number;
  tempFeelsLike: number;
  windGust: number | null;
  windSpeed: number;
}

export type WeatherIcon =
  | "thunderstorm"
  | "drizzle"
  | "rain"
  | "snow"
  | "atmo"
  | "clear"
  | "clouds";

export interface Tempurature {
  morning: number;
  day: number;
  evening: number;
  night: number;
  min: number;
  max: number;
}
