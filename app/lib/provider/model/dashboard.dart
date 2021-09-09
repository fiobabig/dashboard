import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'dashboard.freezed.dart';

@freezed
class Dashboard with _$Dashboard {
  const factory Dashboard({
    required String uid,
    required String? ownerUid,
  }) = _Dashboard;
}
