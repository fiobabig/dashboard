import 'package:dashboard/provider/datetime.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:intl/intl.dart';

class DateDisplay extends HookConsumerWidget {
  const DateDisplay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(dateTimeProvider);

    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          DateFormat('EEEE').format(data), // Weekday
        ),
        Text(
          DateFormat('MMMMd').format(data), // Month Day
        ),
      ],
    );
  }
}
