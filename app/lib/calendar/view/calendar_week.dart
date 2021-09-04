import 'package:dashboard/calendar/provider/provider.dart';
import 'package:dashboard/provider/provider.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class CalendarWeek extends HookConsumerWidget {
  const CalendarWeek({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(daysProvider);

    if (data == null) {
      return const SizedBox(); // no idea what we want to actually do here, or if we care
    }

    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: data.map(
        (a) {
          return _Day(day: a);
        },
      ).toList(),
    );
  }
}

class _Day extends StatelessWidget {
  const _Day({
    Key? key,
    required this.day,
  }) : super(key: key);
  final Day day;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _item('Date', day.date.toString()),
        _item('Label', day.label),
        _item('PrecipitationChance', day.precipitationChance.toString()),
        _item('TempMax', day.tempMax.toString()),
        _item('TempMin', day.tempMin.toString()),
        Icon(day.icon),
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
