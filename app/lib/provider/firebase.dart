import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final _authStateProvider = StreamProvider((ref) {
  return FirebaseAuth.instance.authStateChanges();
});

final _userDocProvider = StreamProvider((ref) {
  final authState = ref.watch(_authStateProvider);

  if (authState.data?.value == null) {
    return const Stream<User>.empty();
  }

  final uid = authState.data!.value!.uid;
  final doc = FirebaseFirestore.instance.doc('users/$uid');

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

@immutable
class User {
  // ignore: prefer_const_constructors_in_immutables
  User({required this.uid, required this.name});

  User.fromMap({
    required this.uid,
    required Map<String, dynamic> data,
  }) {
    name = data['name'];
  }

  late final String uid;
  late final String name;
}

class UserNotifier extends StateNotifier<User?> {
  UserNotifier(User? user) : super(user);

  void signInAnonymously() {
    FirebaseAuth.instance.signInAnonymously();
  }

  void signInWithEmailAndPassword(
    String email,
    String password,
  ) {
    FirebaseAuth.instance.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  void signOut() {
    FirebaseAuth.instance.signOut();
  }
}
