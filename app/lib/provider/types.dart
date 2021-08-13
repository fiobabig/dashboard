import 'package:flutter/material.dart';

@immutable
class User {
  // ignore: prefer_const_constructors_in_immutables
  User({
    required this.uid,
    required this.name,
    required this.latitude,
    required this.longitude,
  });

  User.fromMap({
    required this.uid,
    required Map<String, dynamic> data,
  }) {
    name = data['name'];
    latitude = data['location'].latitude;
    longitude = data['location'].longitude;
  }

  late final String uid;
  late final String name;
  late final double latitude;
  late final double longitude;
}
