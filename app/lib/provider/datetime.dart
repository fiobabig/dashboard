import 'package:hooks_riverpod/hooks_riverpod.dart';

final _nowProvider = StreamProvider((ref) {
  return Stream<DateTime>.periodic(
    const Duration(
      milliseconds: 500,
    ),
    (i) => DateTime.now(),
  );
});

final dateTimeProvider = Provider((ref) {
  final now = ref.watch(_nowProvider);

  return now.data?.value ?? DateTime.now();
});
