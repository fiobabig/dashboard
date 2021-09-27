import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../model/model.dart';
import '../../../provider/auth_state_provider.dart';

final _auth = firebase.FirebaseAuth.instance;
final _db = FirebaseFirestore.instance;

final _dashboardFamily = StreamProvider.family<Dashboard, String>((ref, id) {
  return _db.doc('dashboards/$id').snapshots().map(
    (snapshot) {
      if (!snapshot.exists) {
        return Dashboard.withoutData(
          dashboardUid: snapshot.id,
        );
      }

      return Dashboard.fromDoc(
        dashboardUid: snapshot.id,
        doc: snapshot.data()!,
      );
    },
  );
});

final dashboardProvider =
    StateNotifierProvider<DashboardNotifier, AsyncValue<Dashboard>>((ref) {
  final authState = ref.watch(authStateProvider);

  return authState.when(
    data: (user) {
      if (user == null) {
        return DashboardNotifier.loading();
      }

      if (user.isAnonymous == true) {
        final dashboardState = ref.watch(_dashboardFamily(user.uid));

        return dashboardState.map(
          data: (value) => DashboardNotifier(value),
          loading: (_) => DashboardNotifier.loading(),
          error: (value) =>
              DashboardNotifier.error(value.error, value.stackTrace),
        );
      }

      return DashboardNotifier.loading();
    },
    loading: () => DashboardNotifier.loading(),
    error: (e, s) => DashboardNotifier.error(e, s),
  );
});

class DashboardNotifier extends StateNotifier<AsyncValue<Dashboard>> {
  DashboardNotifier(AsyncValue<Dashboard> state) : super(state);
  DashboardNotifier.loading() : super(const AsyncValue.loading());
  DashboardNotifier.error(Object exception, StackTrace? stackTrace)
      : super(AsyncValue.error(exception, stackTrace));

  void signInAnonymously() {
    _auth.signInAnonymously();
  }
}
