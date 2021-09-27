// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'day.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$DayTearOff {
  const _$DayTearOff();

  _Day call(
      {required DateTime date,
      required IconData icon,
      required String label,
      required double precipitationChance,
      required double tempMax,
      required double tempMin}) {
    return _Day(
      date: date,
      icon: icon,
      label: label,
      precipitationChance: precipitationChance,
      tempMax: tempMax,
      tempMin: tempMin,
    );
  }
}

/// @nodoc
const $Day = _$DayTearOff();

/// @nodoc
mixin _$Day {
  DateTime get date => throw _privateConstructorUsedError;
  IconData get icon => throw _privateConstructorUsedError;
  String get label => throw _privateConstructorUsedError;
  double get precipitationChance => throw _privateConstructorUsedError;
  double get tempMax => throw _privateConstructorUsedError;
  double get tempMin => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $DayCopyWith<Day> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DayCopyWith<$Res> {
  factory $DayCopyWith(Day value, $Res Function(Day) then) =
      _$DayCopyWithImpl<$Res>;
  $Res call(
      {DateTime date,
      IconData icon,
      String label,
      double precipitationChance,
      double tempMax,
      double tempMin});
}

/// @nodoc
class _$DayCopyWithImpl<$Res> implements $DayCopyWith<$Res> {
  _$DayCopyWithImpl(this._value, this._then);

  final Day _value;
  // ignore: unused_field
  final $Res Function(Day) _then;

  @override
  $Res call({
    Object? date = freezed,
    Object? icon = freezed,
    Object? label = freezed,
    Object? precipitationChance = freezed,
    Object? tempMax = freezed,
    Object? tempMin = freezed,
  }) {
    return _then(_value.copyWith(
      date: date == freezed
          ? _value.date
          : date // ignore: cast_nullable_to_non_nullable
              as DateTime,
      icon: icon == freezed
          ? _value.icon
          : icon // ignore: cast_nullable_to_non_nullable
              as IconData,
      label: label == freezed
          ? _value.label
          : label // ignore: cast_nullable_to_non_nullable
              as String,
      precipitationChance: precipitationChance == freezed
          ? _value.precipitationChance
          : precipitationChance // ignore: cast_nullable_to_non_nullable
              as double,
      tempMax: tempMax == freezed
          ? _value.tempMax
          : tempMax // ignore: cast_nullable_to_non_nullable
              as double,
      tempMin: tempMin == freezed
          ? _value.tempMin
          : tempMin // ignore: cast_nullable_to_non_nullable
              as double,
    ));
  }
}

/// @nodoc
abstract class _$DayCopyWith<$Res> implements $DayCopyWith<$Res> {
  factory _$DayCopyWith(_Day value, $Res Function(_Day) then) =
      __$DayCopyWithImpl<$Res>;
  @override
  $Res call(
      {DateTime date,
      IconData icon,
      String label,
      double precipitationChance,
      double tempMax,
      double tempMin});
}

/// @nodoc
class __$DayCopyWithImpl<$Res> extends _$DayCopyWithImpl<$Res>
    implements _$DayCopyWith<$Res> {
  __$DayCopyWithImpl(_Day _value, $Res Function(_Day) _then)
      : super(_value, (v) => _then(v as _Day));

  @override
  _Day get _value => super._value as _Day;

  @override
  $Res call({
    Object? date = freezed,
    Object? icon = freezed,
    Object? label = freezed,
    Object? precipitationChance = freezed,
    Object? tempMax = freezed,
    Object? tempMin = freezed,
  }) {
    return _then(_Day(
      date: date == freezed
          ? _value.date
          : date // ignore: cast_nullable_to_non_nullable
              as DateTime,
      icon: icon == freezed
          ? _value.icon
          : icon // ignore: cast_nullable_to_non_nullable
              as IconData,
      label: label == freezed
          ? _value.label
          : label // ignore: cast_nullable_to_non_nullable
              as String,
      precipitationChance: precipitationChance == freezed
          ? _value.precipitationChance
          : precipitationChance // ignore: cast_nullable_to_non_nullable
              as double,
      tempMax: tempMax == freezed
          ? _value.tempMax
          : tempMax // ignore: cast_nullable_to_non_nullable
              as double,
      tempMin: tempMin == freezed
          ? _value.tempMin
          : tempMin // ignore: cast_nullable_to_non_nullable
              as double,
    ));
  }
}

/// @nodoc

class _$_Day with DiagnosticableTreeMixin implements _Day {
  const _$_Day(
      {required this.date,
      required this.icon,
      required this.label,
      required this.precipitationChance,
      required this.tempMax,
      required this.tempMin});

  @override
  final DateTime date;
  @override
  final IconData icon;
  @override
  final String label;
  @override
  final double precipitationChance;
  @override
  final double tempMax;
  @override
  final double tempMin;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'Day(date: $date, icon: $icon, label: $label, precipitationChance: $precipitationChance, tempMax: $tempMax, tempMin: $tempMin)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'Day'))
      ..add(DiagnosticsProperty('date', date))
      ..add(DiagnosticsProperty('icon', icon))
      ..add(DiagnosticsProperty('label', label))
      ..add(DiagnosticsProperty('precipitationChance', precipitationChance))
      ..add(DiagnosticsProperty('tempMax', tempMax))
      ..add(DiagnosticsProperty('tempMin', tempMin));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is _Day &&
            (identical(other.date, date) ||
                const DeepCollectionEquality().equals(other.date, date)) &&
            (identical(other.icon, icon) ||
                const DeepCollectionEquality().equals(other.icon, icon)) &&
            (identical(other.label, label) ||
                const DeepCollectionEquality().equals(other.label, label)) &&
            (identical(other.precipitationChance, precipitationChance) ||
                const DeepCollectionEquality()
                    .equals(other.precipitationChance, precipitationChance)) &&
            (identical(other.tempMax, tempMax) ||
                const DeepCollectionEquality()
                    .equals(other.tempMax, tempMax)) &&
            (identical(other.tempMin, tempMin) ||
                const DeepCollectionEquality().equals(other.tempMin, tempMin)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^
      const DeepCollectionEquality().hash(date) ^
      const DeepCollectionEquality().hash(icon) ^
      const DeepCollectionEquality().hash(label) ^
      const DeepCollectionEquality().hash(precipitationChance) ^
      const DeepCollectionEquality().hash(tempMax) ^
      const DeepCollectionEquality().hash(tempMin);

  @JsonKey(ignore: true)
  @override
  _$DayCopyWith<_Day> get copyWith =>
      __$DayCopyWithImpl<_Day>(this, _$identity);
}

abstract class _Day implements Day {
  const factory _Day(
      {required DateTime date,
      required IconData icon,
      required String label,
      required double precipitationChance,
      required double tempMax,
      required double tempMin}) = _$_Day;

  @override
  DateTime get date => throw _privateConstructorUsedError;
  @override
  IconData get icon => throw _privateConstructorUsedError;
  @override
  String get label => throw _privateConstructorUsedError;
  @override
  double get precipitationChance => throw _privateConstructorUsedError;
  @override
  double get tempMax => throw _privateConstructorUsedError;
  @override
  double get tempMin => throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$DayCopyWith<_Day> get copyWith => throw _privateConstructorUsedError;
}
