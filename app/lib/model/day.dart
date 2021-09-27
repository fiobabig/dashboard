import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import '../lib.dart';

part 'day.freezed.dart';

@freezed
class Day with _$Day {
  const factory Day({
    required DateTime date,
    required IconData icon,
    required String label,
    required double precipitationChance,
    required double tempMax,
    required double tempMin,
  }) = _Day;

  factory Day.fromDoc({
    required Map<String, dynamic> doc,
  }) {
    return Day(
      date: (doc['date'] as Timestamp).toDate().toUtc(),
      icon: _icon(doc['icon']),
      label: doc['label'],
      precipitationChance: doc['precipitationChance'],
      tempMax: doc['tempMax'],
      tempMin: doc['tempMin'],
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
