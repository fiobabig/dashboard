import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dashboard/provider/model/user.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'auth_state.dart';
import 'model/user.dart';

final _auth = firebase.FirebaseAuth.instance;
final _db = FirebaseFirestore.instance;

final _userDocProvider = StreamProvider((ref) {
  final authState = ref.watch(authStateProvider);

  final user = authState.data?.value;

  if (user == null || user.isAnonymous) {
    return const Stream<User>.empty();
  }

  final doc = _db.doc('users/${user.uid}');

  return doc.snapshots().map<User?>(
    (a) {
      if (a.data() == null) {
        doc.set(
          {
            'location': const GeoPoint(47.63168, -117.23796),
            'name': user.displayName,
            'photos': {},
          },
          SetOptions(merge: true),
        );

        return null;
      }

      return User.fromDoc(
        uid: user.uid,
        doc: a.data()!,
      );
    },
  );
});

final userProvider = StateNotifierProvider<UserNotifier, User?>((ref) {
  final userDoc = ref.watch(_userDocProvider);

  return UserNotifier(userDoc.data?.value);
});

class UserNotifier extends StateNotifier<User?> {
  UserNotifier(User? user) : super(user);

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

    await doc.update(
      {
        'ownerUid': state!.uid,
      },
    );
  }
}
// TODO: Deploy function in the pipeline
// then token should update other tables once you add a token