import 'package:dashboard/weather/provider/weather.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:intl/intl.dart';

class CurrentWeather extends HookConsumerWidget {
  const CurrentWeather({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(currentWeatherProvider);

    if (data == null) {
      return const SizedBox(); // no idea what we want to actually do here, or if we care
    }

    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _item('AQI', data.aqi.toString()),
        _item('Description', data.description),
        _item('Label', data.label),
        _item('Sunrise', DateFormat.Hm().format(data.sunrise)),
        _item('Sunset', DateFormat.Hm().format(data.sunset)),
        _item('Temp (F)', data.temp.toString()),
        _item('Temp Feels Like (F)', data.tempFeelsLike.toString()),
        _item('Wind Gust', (data.windGust ?? '').toString()),
        _item('Wind Speed', data.windSpeed.toString()),
        Icon(data.icon),
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
