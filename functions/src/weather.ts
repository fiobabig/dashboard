import * as functions from "firebase-functions";
import axios from "axios";
import { OwmClient } from "@curium.rocks/openweathermap-client";
import { Weather, WeatherIcon } from "./types";

const client = new OwmClient(axios);

export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<Weather> {
  const weather = await client.onecall.getData({
    appid: functions.config().weather.key,
    lat: latitude,
    lon: longitude,
    units: "imperial",
  });

  const { sunset, sunrise, temp, feels_like, wind_speed } = weather.current;
  const details = weather.current.weather?.[0];

  const aqi = await getAqi(latitude, longitude);

  const result: Weather = {
    aqi,
    description: details?.description,
    icon: icon(details.id),
    label: details?.main,
    sunrise: sunrise,
    sunset: sunset,
    timezoneOffset: weather.timezone_offset,
    temp: temp,
    tempFeelsLike: feels_like,
    windGust: (weather.current as any).wind_gust ?? null, // what I get for not making my own damned types
    windSpeed: wind_speed,
  };

  return result;
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
