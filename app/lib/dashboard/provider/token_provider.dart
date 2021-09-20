import 'dart:math';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dashboard/provider/dashboard_provider.dart';
import 'package:dashboard/provider/model/dashboard.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final _random = Random.secure();
final _db = FirebaseFirestore.instance;

final tokenProvider =
    StateNotifierProvider<TokenNotifier, AsyncValue<String?>>((ref) {
  final dashboardState = ref.watch(dashboardProvider);

  return dashboardState.when(
    data: (dashboard) {
      if (dashboard.hasData) {
        return TokenNotifier.loading();
      }

      return TokenNotifier(dashboard: dashboard);
    },
    loading: () => TokenNotifier.loading(),
    error: (e, s) => TokenNotifier.error(e, s),
  );
});

class TokenNotifier extends StateNotifier<AsyncValue<String>> {
  TokenNotifier({
    required Dashboard dashboard,
  }) : super(const AsyncValue.loading()) {
    _generate(dashboard);
  }

  TokenNotifier.loading() : super(const AsyncValue.loading());

  TokenNotifier.error(Object error, StackTrace? stackTrace)
      : super(AsyncValue.error(error, stackTrace));

  Future<void> _generate(Dashboard dashboard) async {
    state = const AsyncValue.loading();

    state = await AsyncValue.guard(() async {
      final token = _random.nextInt(10000).toString().padLeft(4, '0');

      await _db.doc('tokens/$token').set({
        'createdAt': FieldValue.serverTimestamp(),
        'dashboardUid': dashboard.dashboardUid,
      });

      return token;
    });
  }
}
