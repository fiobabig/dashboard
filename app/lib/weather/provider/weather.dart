import 'package:dashboard/provider/provider.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final weatherProvider = Provider((ref) {
  final user = ref.watch(userProvider);

  return user?.weather;
});
