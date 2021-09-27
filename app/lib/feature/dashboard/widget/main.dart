import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../model/dashboard.dart';
import '../feature/date_time/date_time.dart';
import 'calendar_week.dart';
import 'current_weather.dart';
import 'gallery_display.dart';

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
            dashboard.photos == null
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
