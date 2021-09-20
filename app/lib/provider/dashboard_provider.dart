import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dashboard/provider/auth_state.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'model/dashboard.dart';

final _auth = firebase.FirebaseAuth.instance;
final _db = FirebaseFirestore.instance;

final dashboardProvider =
    StateNotifierProvider<DashboardNotifier, AsyncValue<Dashboard>>((ref) {
  final authState = ref.watch(authStateProvider);

  return authState.when(
    data: (user) {
      if (user == null) {
        return DashboardNotifier.loading();
      }

      if (user.isAnonymous == true) {
        return DashboardNotifier(dashboardUid: user.uid);
      }

      return DashboardNotifier.loading();
    },
    loading: () => DashboardNotifier.loading(),
    error: (e, s) => DashboardNotifier.error(e, s),
  );
});

class DashboardNotifier extends StateNotifier<AsyncValue<Dashboard>> {
  DashboardNotifier({
    required String dashboardUid,
  }) : super(const AsyncValue.loading()) {
    _listen(dashboardUid);
  }

  DashboardNotifier.loading() : super(const AsyncValue.loading());

  DashboardNotifier.error(Object error, StackTrace? stackTrace)
      : super(AsyncValue.error(error, stackTrace));

  StreamSubscription<DocumentSnapshot<Map<String, dynamic>>>? subscription;

  void signInAnonymously() {
    _auth.signInAnonymously();
  }

  void _listen(String dashboardUid) {
    final doc = _db.doc('dashboards/$dashboardUid');

    subscription = doc.snapshots().listen(
      (a) {
        if (!a.exists) {
          state = AsyncValue.data(
            Dashboard.withoutData(
              dashboardUid: a.id,
            ),
          );

          return;
        }

        state = AsyncValue.data(
          Dashboard.fromDoc(
            dashboardUid: a.id,
            doc: a.data()!,
          ),
        );
      },
      onError: (e, s) {
        state = AsyncValue.error(e, s);
      },
    );
  }

  @override
  void dispose() {
    subscription?.cancel();
    super.dispose();
  }
}
