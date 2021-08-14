// ignore_for_file: prefer_const_constructors_in_immutables

import 'package:dashboard/lib.dart';
import 'package:flutter/material.dart';

@immutable
class User {
  User({
    required this.uid,
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.weather,
  });

  User.fromMap({
    required this.uid,
    required Map<String, dynamic> data,
  }) {
    name = data['name'];
    latitude = data['location'].latitude;
    longitude = data['location'].longitude;
    weather = Weather.fromMap(data: data['weather']);
  }

  late final String uid;
  late final String name;
  late final double latitude;
  late final double longitude;
  late final Weather weather;
}

@immutable
class Weather {
  Weather({
    required this.current,
  });

  Weather.fromMap({
    required Map<String, dynamic> data,
  }) {
    current = CurrentWeather.fromMap(data: data['current']);
  }

  late final CurrentWeather current;
}

@immutable
class CurrentWeather {
  CurrentWeather({
    required this.aqi,
    required this.description,
    required this.icon,
    required this.label,
    required this.sunrise,
    required this.sunset,
    required this.temp,
    required this.tempFeelsLike,
    this.windGust,
    required this.windSpeed,
  });

  CurrentWeather.fromMap({
    required Map<String, dynamic> data,
  }) {
    final offset = data['timezoneOffset'];

    aqi = data['aqi'];
    description = data['description'];
    icon = _icon(data['icon']);
    label = data['label'];
    sunrise = DateTime.fromMillisecondsSinceEpoch(
      (data['sunrise'] + offset) * 1000,
      isUtc: true,
    );
    sunset = DateTime.fromMillisecondsSinceEpoch(
      (data['sunset'] + offset) * 1000,
      isUtc: true,
    );
    temp = data['temp'];
    tempFeelsLike = data['tempFeelsLike'];
    windGust = data['windGust'];
    windSpeed = data['windSpeed'];
  }

  late final int aqi;
  late final String description;
  late final IconData icon;
  late final String label;
  late final DateTime sunrise;
  late final DateTime sunset;
  late final double temp;
  late final double tempFeelsLike;
  late final double? windGust;
  late final double windSpeed;

  IconData _icon(String icon) {
    if (icon == 'thunderstorm') {
      return DashboardIcons.clouds_flash;
    } else if (icon == 'drizzle') {
      return DashboardIcons.drizzle;
    } else if (icon == 'rain') {
      return DashboardIcons.rain;
    } else if (icon == 'snow') {
      return DashboardIcons.snow_heavy;
    } else if (icon == 'atmo') {
      return DashboardIcons.mist;
    } else if (icon == 'clear') {
      return DashboardIcons.sun;
    } else if (icon == 'clouds') {
      return DashboardIcons.cloud_sun;
    }

    return DashboardIcons.na;
  }
}
