import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'auth_state.dart';
import 'model/user.dart';

final _auth = firebase.FirebaseAuth.instance;
final _db = FirebaseFirestore.instance;

final userProvider =
    StateNotifierProvider<UserNotifier, AsyncValue<User?>>((ref) {
  final authState = ref.watch(authStateProvider);

  return authState.when(
    data: (user) {
      if (user == null) {
        return UserNotifier.notLoggedIn();
      }

      if (user.isAnonymous == false) {
        return UserNotifier(user: user);
      }

      return UserNotifier.loading();
    },
    loading: () => UserNotifier.loading(),
    error: (e, s) => UserNotifier.error(e, s),
  );
});

class UserNotifier extends StateNotifier<AsyncValue<User?>> {
  UserNotifier({
    required firebase.User user,
  }) : super(const AsyncValue.loading()) {
    _listen(user);
  }

  UserNotifier.notLoggedIn() : super(const AsyncValue.data(null));

  UserNotifier.loading() : super(const AsyncValue.loading());

  UserNotifier.error(Object error, StackTrace? stackTrace)
      : super(AsyncValue.error(error, stackTrace));

  StreamSubscription<DocumentSnapshot<Map<String, dynamic>>>? subscription;

  void signInWithEmailAndPassword(
    String email,
    String password,
  ) {
    _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  void signInWithGoogle() {
    _auth.signInWithPopup(firebase.GoogleAuthProvider());
  }

  void signOut() {
    _auth.signOut();
  }

  Future<void> linkDashboard(String token) async {
    final doc = _db.doc('tokens/$token');

    await doc.update({
      'ownerUid': state.data!.value!.uid,
    });
  }

  void _listen(firebase.User user) {
    final doc = _db.doc('users/${user.uid}');

    subscription = doc.snapshots().listen(
      (a) async {
        if (!a.exists) {
          await doc.set(
            {
              'name': user.displayName,
              'dashboards': {},
            },
            SetOptions(merge: true),
          );

          return;
        }

        state = AsyncValue.data(
          User.fromDoc(
            uid: a.id,
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
