import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';

@freezed
class User with _$User {
  const factory User({
    required String uid,
    required String name,
    required Map<String, dynamic> dashboards,
  }) = _User;

  factory User.fromDoc({
    required String uid,
    required Map<String, dynamic> doc,
  }) {
    return User(
      uid: uid,
      name: doc['name'],
      dashboards: doc['dashboards'],
    );
  }
}
