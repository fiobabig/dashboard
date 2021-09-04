import 'package:dashboard/provider/firebase.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final daysProvider = Provider((ref) {
  final user = ref.watch(userProvider);

  return user?.days;
});
