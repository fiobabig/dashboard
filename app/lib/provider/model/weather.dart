import 'package:dashboard/lib.dart';
import 'package:flutter/widgets.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'weather.freezed.dart';

@freezed
class Weather with _$Weather {
  const factory Weather({
    required int aqi,
    required String description,
    required IconData icon,
    required String label,
    required DateTime sunrise,
    required DateTime sunset,
    required double temp,
    required double tempFeelsLike,
    double? windGust,
    required double windSpeed,
  }) = _Weather;

  factory Weather.fromDoc({
    required Map<String, dynamic> doc,
  }) {
    final offset = doc['timezoneOffset'];

    return Weather(
      aqi: doc['aqi'],
      description: doc['description'],
      icon: _icon(doc['icon']),
      label: doc['label'],
      sunrise: DateTime.fromMillisecondsSinceEpoch(
        (doc['sunrise'] + offset) * 1000,
        isUtc: true,
      ),
      sunset: DateTime.fromMillisecondsSinceEpoch(
        (doc['sunset'] + offset) * 1000,
        isUtc: true,
      ),
      temp: doc['temp'],
      tempFeelsLike: doc['tempFeelsLike'],
      windGust: doc['windGust'],
      windSpeed: doc['windSpeed'],
    );
  }

  static IconData _icon(String icon) {
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
