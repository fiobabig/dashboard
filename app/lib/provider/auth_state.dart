import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase;

final _auth = firebase.FirebaseAuth.instance;

final authStateProvider = StreamProvider((ref) {
  return _auth.authStateChanges();
});
