import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'types.dart';

final _auth = firebase.FirebaseAuth.instance;
final _db = FirebaseFirestore.instance;

final _authStateProvider = StreamProvider((ref) {
  return _auth.authStateChanges();
});

final _userDocProvider = StreamProvider((ref) {
  final authState = ref.watch(_authStateProvider);

  if (authState.data?.value == null) {
    return const Stream<User>.empty();
  }

  final uid = authState.data!.value!.uid;
  final doc = _db.doc('users/$uid');

  return doc.snapshots().map<User>(
        (a) => User.fromMap(
          uid: uid,
          data: a.data()!,
        ),
      );
});

final userProvider = StateNotifierProvider<UserNotifier, User?>((ref) {
  final userDoc = ref.watch(_userDocProvider);

  return UserNotifier(userDoc.data?.value);
});

class UserNotifier extends StateNotifier<User?> {
  UserNotifier(User? user) : super(user);

  void signInAnonymously() {
    _auth.signInAnonymously();
  }

  void signInWithEmailAndPassword(
    String email,
    String password,
  ) {
    _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  void signOut() {
    _auth.signOut();
  }
}
