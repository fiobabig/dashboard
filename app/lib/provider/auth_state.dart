import 'package:firebase_auth/firebase_auth.dart' as firebase;
import 'package:hooks_riverpod/hooks_riverpod.dart';

final _auth = firebase.FirebaseAuth.instance;

final authStateProvider = StreamProvider((ref) {
  return _auth.authStateChanges();
});
