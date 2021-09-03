import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dashboard/provider/model/weather.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'user.freezed.dart';

@freezed
class User with _$User {
  const factory User({
    required String uid,
    required String name,
    required double latitude,
    required double longitude,
    required Weather weather,
  }) = _User;

  factory User.fromDoc({
    required String uid,
    required Map<String, dynamic> doc,
  }) {
    return User(
      uid: uid,
      name: doc['name'],
      latitude: (doc['location'] as GeoPoint).latitude,
      longitude: (doc['location'] as GeoPoint).longitude,
      weather: Weather.fromDoc(
        doc: doc['weather'],
      ),
    );
  }
}
