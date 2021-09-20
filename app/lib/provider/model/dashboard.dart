import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import 'day.dart';
import 'photo.dart';
import 'weather.dart';

part 'dashboard.freezed.dart';

@freezed
class Dashboard with _$Dashboard {
  const factory Dashboard({
    required String dashboardUid,
    required bool hasData,
    String? ownerUid,
    double? latitude,
    double? longitude,
    Weather? weather,
    List<Day>? days,
    List<Photo>? photos,
  }) = _Dashboard;

  factory Dashboard.withoutData({
    required String dashboardUid,
  }) {
    return Dashboard(
      dashboardUid: dashboardUid,
      hasData: false,
    );
  }

  factory Dashboard.fromDoc({
    required String dashboardUid,
    required Map<String, dynamic> doc,
  }) {
    return Dashboard(
      dashboardUid: dashboardUid,
      ownerUid: doc['ownerUid'],
      hasData: true,
      latitude: (doc['location'] as GeoPoint?)?.latitude,
      longitude: (doc['location'] as GeoPoint?)?.longitude,
      weather: doc['weather'] == null
          ? null
          : Weather.fromDoc(
              doc: doc['weather'],
            ),
      days: doc['days'] == null
          ? null
          : (doc['days'] as List).map(
              (a) {
                return Day.fromDoc(
                  doc: a,
                );
              },
            ).toList(),
      photos: doc['photos'] == null
          ? null
          : Map<String, dynamic>.from(doc['photos'])
              .entries
              .toList()
              .map(
                (a) => Photo(url: a.key),
              )
              .toList(),
    );
  }
}
