import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../model/weather.dart';

class CurrentWeather extends HookConsumerWidget {
  const CurrentWeather({
    Key? key,
    required this.weather,
  }) : super(key: key);

  final Weather weather;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _item('AQI', weather.aqi.toString()),
        _item('Description', weather.description),
        _item('Label', weather.label),
        _item('Sunrise', DateFormat.Hm().format(weather.sunrise)),
        _item('Sunset', DateFormat.Hm().format(weather.sunset)),
        _item('Temp (F)', weather.temp.toString()),
        _item('Temp Feels Like (F)', weather.tempFeelsLike.toString()),
        _item('Wind Gust', (weather.windGust ?? '').toString()),
        _item('Wind Speed', weather.windSpeed.toString()),
        Icon(weather.icon),
      ],
    );
  }

  Widget _item(String label, String value) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label),
        const SizedBox(
          width: 15.0,
        ),
        Text(value),
      ],
    );
  }
}
