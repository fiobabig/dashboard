import { firestore } from "firebase-admin";

export interface User {
  uid: string;
  name: string;
  location: firestore.GeoPoint;
  weather: {
    current: CurrentWeather;
  };
}

export interface CurrentWeather {
  aqi: number;
  description: string;
  label: string;
  sunrise: number;
  sunset: number;
  temp: number;
  tempFeelsLike: number;
  windGust: number | null;
  windSpeed: number;
}

export interface Tempurature {
  morning: number;
  day: number;
  evening: number;
  night: number;
  min: number;
  max: number;
}
