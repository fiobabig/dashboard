import 'package:dashboard/provider/datetime.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:dashboard/time/view/time_display.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

void main() {
  group('Time', () {
    testWidgets('shows the correct time', (
      WidgetTester tester,
    ) async {
      final widget = ProviderScope(
        overrides: [
          dateTimeProvider.overrideWithProvider(
            Provider(
              (ref) => DateTime.parse('2020-01-01 12:34:56'),
            ),
          )
        ],
        child: const Directionality(
          textDirection: TextDirection.ltr,
          child: TimeDisplay(),
        ),
      );

      await tester.pumpWidget(widget);

      expect(find.text('12:34:56'), findsOneWidget);
    });
  });
}
