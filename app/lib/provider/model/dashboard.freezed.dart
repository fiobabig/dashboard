// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'dashboard.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$DashboardTearOff {
  const _$DashboardTearOff();

  _Dashboard call(
      {required String dashboardUid,
      required bool hasData,
      String? ownerUid,
      double? latitude,
      double? longitude,
      Weather? weather,
      List<Day>? days,
      List<Photo>? photos}) {
    return _Dashboard(
      dashboardUid: dashboardUid,
      hasData: hasData,
      ownerUid: ownerUid,
      latitude: latitude,
      longitude: longitude,
      weather: weather,
      days: days,
      photos: photos,
    );
  }
}

/// @nodoc
const $Dashboard = _$DashboardTearOff();

/// @nodoc
mixin _$Dashboard {
  String get dashboardUid => throw _privateConstructorUsedError;
  bool get hasData => throw _privateConstructorUsedError;
  String? get ownerUid => throw _privateConstructorUsedError;
  double? get latitude => throw _privateConstructorUsedError;
  double? get longitude => throw _privateConstructorUsedError;
  Weather? get weather => throw _privateConstructorUsedError;
  List<Day>? get days => throw _privateConstructorUsedError;
  List<Photo>? get photos => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $DashboardCopyWith<Dashboard> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DashboardCopyWith<$Res> {
  factory $DashboardCopyWith(Dashboard value, $Res Function(Dashboard) then) =
      _$DashboardCopyWithImpl<$Res>;
  $Res call(
      {String dashboardUid,
      bool hasData,
      String? ownerUid,
      double? latitude,
      double? longitude,
      Weather? weather,
      List<Day>? days,
      List<Photo>? photos});

  $WeatherCopyWith<$Res>? get weather;
}

/// @nodoc
class _$DashboardCopyWithImpl<$Res> implements $DashboardCopyWith<$Res> {
  _$DashboardCopyWithImpl(this._value, this._then);

  final Dashboard _value;
  // ignore: unused_field
  final $Res Function(Dashboard) _then;

  @override
  $Res call({
    Object? dashboardUid = freezed,
    Object? hasData = freezed,
    Object? ownerUid = freezed,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? weather = freezed,
    Object? days = freezed,
    Object? photos = freezed,
  }) {
    return _then(_value.copyWith(
      dashboardUid: dashboardUid == freezed
          ? _value.dashboardUid
          : dashboardUid // ignore: cast_nullable_to_non_nullable
              as String,
      hasData: hasData == freezed
          ? _value.hasData
          : hasData // ignore: cast_nullable_to_non_nullable
              as bool,
      ownerUid: ownerUid == freezed
          ? _value.ownerUid
          : ownerUid // ignore: cast_nullable_to_non_nullable
              as String?,
      latitude: latitude == freezed
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: longitude == freezed
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      weather: weather == freezed
          ? _value.weather
          : weather // ignore: cast_nullable_to_non_nullable
              as Weather?,
      days: days == freezed
          ? _value.days
          : days // ignore: cast_nullable_to_non_nullable
              as List<Day>?,
      photos: photos == freezed
          ? _value.photos
          : photos // ignore: cast_nullable_to_non_nullable
              as List<Photo>?,
    ));
  }

  @override
  $WeatherCopyWith<$Res>? get weather {
    if (_value.weather == null) {
      return null;
    }

    return $WeatherCopyWith<$Res>(_value.weather!, (value) {
      return _then(_value.copyWith(weather: value));
    });
  }
}

/// @nodoc
abstract class _$DashboardCopyWith<$Res> implements $DashboardCopyWith<$Res> {
  factory _$DashboardCopyWith(
          _Dashboard value, $Res Function(_Dashboard) then) =
      __$DashboardCopyWithImpl<$Res>;
  @override
  $Res call(
      {String dashboardUid,
      bool hasData,
      String? ownerUid,
      double? latitude,
      double? longitude,
      Weather? weather,
      List<Day>? days,
      List<Photo>? photos});

  @override
  $WeatherCopyWith<$Res>? get weather;
}

/// @nodoc
class __$DashboardCopyWithImpl<$Res> extends _$DashboardCopyWithImpl<$Res>
    implements _$DashboardCopyWith<$Res> {
  __$DashboardCopyWithImpl(_Dashboard _value, $Res Function(_Dashboard) _then)
      : super(_value, (v) => _then(v as _Dashboard));

  @override
  _Dashboard get _value => super._value as _Dashboard;

  @override
  $Res call({
    Object? dashboardUid = freezed,
    Object? hasData = freezed,
    Object? ownerUid = freezed,
    Object? latitude = freezed,
    Object? longitude = freezed,
    Object? weather = freezed,
    Object? days = freezed,
    Object? photos = freezed,
  }) {
    return _then(_Dashboard(
      dashboardUid: dashboardUid == freezed
          ? _value.dashboardUid
          : dashboardUid // ignore: cast_nullable_to_non_nullable
              as String,
      hasData: hasData == freezed
          ? _value.hasData
          : hasData // ignore: cast_nullable_to_non_nullable
              as bool,
      ownerUid: ownerUid == freezed
          ? _value.ownerUid
          : ownerUid // ignore: cast_nullable_to_non_nullable
              as String?,
      latitude: latitude == freezed
          ? _value.latitude
          : latitude // ignore: cast_nullable_to_non_nullable
              as double?,
      longitude: longitude == freezed
          ? _value.longitude
          : longitude // ignore: cast_nullable_to_non_nullable
              as double?,
      weather: weather == freezed
          ? _value.weather
          : weather // ignore: cast_nullable_to_non_nullable
              as Weather?,
      days: days == freezed
          ? _value.days
          : days // ignore: cast_nullable_to_non_nullable
              as List<Day>?,
      photos: photos == freezed
          ? _value.photos
          : photos // ignore: cast_nullable_to_non_nullable
              as List<Photo>?,
    ));
  }
}

/// @nodoc

class _$_Dashboard with DiagnosticableTreeMixin implements _Dashboard {
  const _$_Dashboard(
      {required this.dashboardUid,
      required this.hasData,
      this.ownerUid,
      this.latitude,
      this.longitude,
      this.weather,
      this.days,
      this.photos});

  @override
  final String dashboardUid;
  @override
  final bool hasData;
  @override
  final String? ownerUid;
  @override
  final double? latitude;
  @override
  final double? longitude;
  @override
  final Weather? weather;
  @override
  final List<Day>? days;
  @override
  final List<Photo>? photos;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'Dashboard(dashboardUid: $dashboardUid, hasData: $hasData, ownerUid: $ownerUid, latitude: $latitude, longitude: $longitude, weather: $weather, days: $days, photos: $photos)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'Dashboard'))
      ..add(DiagnosticsProperty('dashboardUid', dashboardUid))
      ..add(DiagnosticsProperty('hasData', hasData))
      ..add(DiagnosticsProperty('ownerUid', ownerUid))
      ..add(DiagnosticsProperty('latitude', latitude))
      ..add(DiagnosticsProperty('longitude', longitude))
      ..add(DiagnosticsProperty('weather', weather))
      ..add(DiagnosticsProperty('days', days))
      ..add(DiagnosticsProperty('photos', photos));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is _Dashboard &&
            (identical(other.dashboardUid, dashboardUid) ||
                const DeepCollectionEquality()
                    .equals(other.dashboardUid, dashboardUid)) &&
            (identical(other.hasData, hasData) ||
                const DeepCollectionEquality()
                    .equals(other.hasData, hasData)) &&
            (identical(other.ownerUid, ownerUid) ||
                const DeepCollectionEquality()
                    .equals(other.ownerUid, ownerUid)) &&
            (identical(other.latitude, latitude) ||
                const DeepCollectionEquality()
                    .equals(other.latitude, latitude)) &&
            (identical(other.longitude, longitude) ||
                const DeepCollectionEquality()
                    .equals(other.longitude, longitude)) &&
            (identical(other.weather, weather) ||
                const DeepCollectionEquality()
                    .equals(other.weather, weather)) &&
            (identical(other.days, days) ||
                const DeepCollectionEquality().equals(other.days, days)) &&
            (identical(other.photos, photos) ||
                const DeepCollectionEquality().equals(other.photos, photos)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^
      const DeepCollectionEquality().hash(dashboardUid) ^
      const DeepCollectionEquality().hash(hasData) ^
      const DeepCollectionEquality().hash(ownerUid) ^
      const DeepCollectionEquality().hash(latitude) ^
      const DeepCollectionEquality().hash(longitude) ^
      const DeepCollectionEquality().hash(weather) ^
      const DeepCollectionEquality().hash(days) ^
      const DeepCollectionEquality().hash(photos);

  @JsonKey(ignore: true)
  @override
  _$DashboardCopyWith<_Dashboard> get copyWith =>
      __$DashboardCopyWithImpl<_Dashboard>(this, _$identity);
}

abstract class _Dashboard implements Dashboard {
  const factory _Dashboard(
      {required String dashboardUid,
      required bool hasData,
      String? ownerUid,
      double? latitude,
      double? longitude,
      Weather? weather,
      List<Day>? days,
      List<Photo>? photos}) = _$_Dashboard;

  @override
  String get dashboardUid => throw _privateConstructorUsedError;
  @override
  bool get hasData => throw _privateConstructorUsedError;
  @override
  String? get ownerUid => throw _privateConstructorUsedError;
  @override
  double? get latitude => throw _privateConstructorUsedError;
  @override
  double? get longitude => throw _privateConstructorUsedError;
  @override
  Weather? get weather => throw _privateConstructorUsedError;
  @override
  List<Day>? get days => throw _privateConstructorUsedError;
  @override
  List<Photo>? get photos => throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$DashboardCopyWith<_Dashboard> get copyWith =>
      throw _privateConstructorUsedError;
}
