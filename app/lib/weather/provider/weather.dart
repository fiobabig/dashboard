import 'package:dashboard/provider/firebase.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final currentWeatherProvider = Provider((ref) {
  final user = ref.watch(userProvider);

  return user?.weather.current;
});
