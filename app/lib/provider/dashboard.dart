import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dashboard/provider/model/dashboard.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'auth_state.dart';

final _auth = firebase.FirebaseAuth.instance;
final _db = FirebaseFirestore.instance;

final _docProvider = StreamProvider((ref) {
  final authState = ref.watch(authStateProvider);

  final user = authState.data?.value;

  if (user == null || !user.isAnonymous) {
    return const Stream<Dashboard>.empty();
  }

  final doc = _db.doc('dashboards/${user.uid}');

  doc.set(
    {},
    SetOptions(merge: true),
  );

  return doc.snapshots().map<Dashboard>(
    (a) {
      return Dashboard(
        uid: user.uid,
        ownerUid: null,
      );
    },
  );
});

final dashboardProvider =
    StateNotifierProvider<DashboardNotifier, Dashboard?>((ref) {
  final doc = ref.watch(_docProvider);

  return DashboardNotifier(doc.data?.value);
});

class DashboardNotifier extends StateNotifier<Dashboard?> {
  DashboardNotifier(Dashboard? dashboard) : super(dashboard);

  void signInAnonymously() {
    _auth.signInAnonymously();
  }
}
