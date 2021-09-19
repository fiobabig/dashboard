import 'package:dashboard/calendar/calendar.dart';
import 'package:dashboard/date/date.dart';
import 'package:dashboard/gallery/gallery.dart';
import 'package:dashboard/provider/dashboard.dart';
import 'package:dashboard/time/time.dart';
import 'package:dashboard/weather/weather.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Main extends HookConsumerWidget {
  const Main({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(dashboardUserProvider)!;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const DateDisplay(),
            const TimeDisplay(),
            SelectableText(user.uid),
            SelectableText(user.name),
            const SizedBox(
              height: 20.0,
            ),
            const CurrentWeather(),
            Text(user.days[0].date.toString()),
            const CalendarWeek(),
            const Text('photos:'),
            const GalleryDisplay(),
          ],
        ),
      ),
    );
  }
}
