import 'package:dashboard/calendar/calendar.dart';
import 'package:dashboard/date/date.dart';
import 'package:dashboard/provider/provider.dart';
import 'package:dashboard/time/time.dart';
import 'package:dashboard/weather/weather.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class App extends HookConsumerWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);

    final signingIn = useState(false);

    if (!signingIn.value) {
      ref.read(userProvider.notifier).signInWithEmailAndPassword(
            dotenv.env['TEST_EMAIL']!,
            dotenv.env['TEST_PWD']!,
          );
    }

    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
      ),
      home: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              const DateDisplay(),
              const TimeDisplay(),
              if (user != null) ...[
                SelectableText(user.uid),
                SelectableText(user.name),
                const SizedBox(
                  height: 20.0,
                ),
                const CurrentWeather(),
                Text(user.days[0].date.toString()),
                const CalendarWeek(),
              ]
            ],
          ),
        ),
      ),
    );
  }
}
