import 'package:dashboard/provider/provider.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final photoProvider = Provider((ref) {
  final user = ref.watch(userProvider);

  return user?.photos;
});
