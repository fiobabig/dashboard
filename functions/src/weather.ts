import * as functions from "firebase-functions";
import axios from "axios";
import { OwmClient } from "@curium.rocks/openweathermap-client";
import { Day, Weather, WeatherIcon } from "./types";
import { firestore } from "firebase-admin";

const client = new OwmClient(axios);

export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<[Weather, Day[]]> {
  const data = await client.onecall.getData({
    appid: functions.config().weather.key,
    lat: latitude,
    lon: longitude,
    units: "imperial",
  });
  
  const days = data.daily.map<Day>( a => {
    return {
      date: firestore.Timestamp.fromMillis((a.dt + data.timezone_offset) * 1000),
      icon: icon(a.weather?.[0].id),
      label: a.weather?.[0].main,
      precipitationChance: a.pop,
      tempMax: a.temp.max,
      tempMin: a.temp.min,
    };
  });
  
  const aqi = await getAqi(latitude, longitude);
  const { sunset, sunrise, temp, feels_like, wind_speed } = data.current;
  const details = data.current.weather?.[0];

  const weather: Weather = {
    aqi,
    description: details?.description,
    icon: icon(details.id),
    label: details?.main,
    sunrise: firestore.Timestamp.fromMillis((sunrise + data.timezone_offset) * 1000),
    sunset: firestore.Timestamp.fromMillis((sunset + data.timezone_offset) * 1000),
    temp: temp,
    tempFeelsLike: feels_like,
    windGust: (data.current as any).wind_gust ?? null, // what I get for not making my own damned types
    windSpeed: wind_speed,
  };

  return [weather, days];
}

async function getAqi(latitude: number, longitude: number): Promise<number> {
  const resp = await axios.get("http://api.airvisual.com/v2/nearest_city", {
    params: {
      lat: latitude,
      lon: longitude,
      key: functions.config().pollution.key,
    },
  });

  return resp.data.data.current.pollution.aqius;
}

function icon(id: number): WeatherIcon | null {
  if (id >= 200 && id <= 299) {
    return "thunderstorm";
  } else if (id >= 300 && id <= 399) {
    return "drizzle";
  } else if (id >= 500 && id <= 599) {
    return "rain";
  } else if (id >= 600 && id <= 699) {
    return "snow";
  } else if (id >= 700 && id <= 799) {
    return "atmo";
  } else if (id === 800) {
    return "clear";
  } else if (id >= 801 && id <= 899) {
    return "clouds";
  }

  return null;
}
