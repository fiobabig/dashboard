import * as functions from "firebase-functions";
import axios from "axios";
import { OwmClient } from "@curium.rocks/openweathermap-client";
import { CurrentWeather } from "./types";

const client = new OwmClient(axios);

export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<CurrentWeather> {
  const weather = await client.onecall.getData({
    appid: functions.config().weather.key,
    lat: latitude,
    lon: longitude,
    units: "imperial",
  });

  const { sunset, sunrise, temp, feels_like, wind_speed } = weather.current;
  const details = weather.current.weather?.[0];

  const aqi = await getAqi(latitude, longitude);

  const result: CurrentWeather = {
    aqi,
    description: details?.description,
    label: details?.main,
    sunrise: sunrise,
    sunset: sunset,
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
