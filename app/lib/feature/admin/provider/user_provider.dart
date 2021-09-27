import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../model/model.dart';
import '../../../provider/auth_state_provider.dart';

final _auth = firebase.FirebaseAuth.instance;
final _db = FirebaseFirestore.instance;

final _userFamily = StreamProvider.family<User?, String>((ref, uid) {
  return _db.doc('users/$uid').snapshots().map(
    (snapshot) {
      if (!snapshot.exists) {
        return null;
      }

      return User.fromDoc(
        uid: snapshot.id,
        doc: snapshot.data()!,
      );
    },
  );
});

final _createUserFamily = FutureProvider.family<void, firebase.User>((
  ref,
  firebaseUser,
) async {
  final doc = _db.doc('users/${firebaseUser.uid}');

  await doc.set(
    {
      'name': firebaseUser.displayName,
      'dashboards': {},
    },
    SetOptions(merge: true),
  );
});

final userProvider =
    StateNotifierProvider<UserNotifier, AsyncValue<User?>>((ref) {
  final authState = ref.watch(authStateProvider);

  return authState.when(
    data: (firebaseUser) {
      if (firebaseUser == null) {
        return UserNotifier.notLoggedIn();
      }

      if (firebaseUser.isAnonymous == true) {
        return UserNotifier.loading();
      }

      final userState = ref.watch(_userFamily(firebaseUser.uid));

      return userState.map(
        data: (user) {
          if (user.value == null) {
            return ref
                .watch(
                  _createUserFamily(firebaseUser),
                )
                .maybeMap(
                  error: (value) => UserNotifier.error(
                    value.error,
                    value.stackTrace,
                  ),
                  orElse: () => UserNotifier.loading(),
                );
          }

          return UserNotifier(user: user.value!);
        },
        loading: (_) => UserNotifier.loading(),
        error: (value) => UserNotifier.error(value.error, value.stackTrace),
      );
    },
    loading: () => UserNotifier.loading(),
    error: (e, s) => UserNotifier.error(e, s),
  );
});

class UserNotifier extends StateNotifier<AsyncValue<User?>> {
  UserNotifier({
    required User user,
  }) : super(AsyncValue.data(user));
  UserNotifier.notLoggedIn() : super(const AsyncValue.data(null));
  UserNotifier.loading() : super(const AsyncValue.loading());
  UserNotifier.error(Object error, StackTrace? stackTrace)
      : super(AsyncValue.error(error, stackTrace));

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
}
