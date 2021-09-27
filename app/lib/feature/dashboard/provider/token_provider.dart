import 'dart:math';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'dashboard_provider.dart';

final _random = Random.secure();
final _db = FirebaseFirestore.instance;

final _tokenFamily = FutureProvider.family<String, String>((
  ref,
  dashboardUid,
) async {
  final token = _random.nextInt(10000).toString().padLeft(4, '0');

  await _db.doc('tokens/$token').set({
    'createdAt': FieldValue.serverTimestamp(),
    'dashboardUid': dashboardUid,
  });

  return token;
});

final tokenProvider = Provider<AsyncValue<String>>((ref) {
  final dashboardState = ref.watch(dashboardProvider);

  return dashboardState.when(
    data: (dashboard) {
      if (dashboard.hasData) {
        return const AsyncValue.loading();
      }

      return ref.watch(_tokenFamily(dashboard.dashboardUid));
    },
    loading: () => const AsyncValue.loading(),
    error: (e, s) => AsyncValue.error(e, s),
  );
});
