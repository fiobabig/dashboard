import 'package:dashboard/calendar/calendar.dart';
import 'package:dashboard/date/date.dart';
import 'package:dashboard/gallery/gallery.dart';
import 'package:dashboard/provider/model/dashboard.dart';
import 'package:dashboard/time/time.dart';
import 'package:dashboard/weather/weather.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Main extends HookConsumerWidget {
  const Main({
    Key? key,
    required this.dashboard,
  }) : super(key: key);

  final Dashboard dashboard;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const DateDisplay(),
            const TimeDisplay(),
            SelectableText(dashboard.dashboardUid),
            SelectableText(dashboard.ownerUid ?? 'no user'),
            const SizedBox(
              height: 20.0,
            ),
            dashboard.weather == null
                ? const Text('got no weather.  man.')
                : CurrentWeather(
                    weather: dashboard.weather!,
                  ),
            dashboard.days == null
                ? const Text('end of days')
                : CalendarWeek(
                    days: dashboard.days!,
                  ),
            const Text('photos:'),
            dashboard.days == null
                ? const Text('no gallery')
                : GalleryDisplay(
                    photos: dashboard.photos!,
                  )
          ],
        ),
      ),
    );
  }
}
