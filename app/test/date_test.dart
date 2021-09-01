import 'package:dashboard/provider/datetime.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:dashboard/date/view/date_display.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

void main() {
  group('Date', () {
    testWidgets('shows the correct month, day, and day of week', (
      WidgetTester tester,
    ) async {
      final widget = ProviderScope(
        overrides: [
          dateTimeProvider.overrideWithProvider(
            Provider(
              (ref) => DateTime.parse('2016-11-13 00:00:00'),
            ),
          )
        ],
        child: const Directionality(
          textDirection: TextDirection.ltr,
          child: DateDisplay(),
        ),
      );

      await tester.pumpWidget(widget);

      expect(find.text('November 13'), findsOneWidget);
      expect(find.text('Sunday'), findsOneWidget);
    });
  });
}
