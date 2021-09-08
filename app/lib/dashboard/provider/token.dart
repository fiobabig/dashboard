import 'dart:math';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:dashboard/provider/provider.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final _random = Random.secure();
final _db = FirebaseFirestore.instance;

final _tokenGenerateProvider = FutureProvider<String>((ref) async {
  final user = ref.watch(userProvider);

  if (user != null) {
    return '';
  }

  final token = _random.nextInt(10000).toString().padLeft(4, '0');

  await _db.doc('tokens/$token').set({
    'createdAt': FieldValue.serverTimestamp(),
  });

  return token;
});

final tokenProvider = Provider<String>((ref) {
  final token = ref.watch(_tokenGenerateProvider);

  return token.data?.value ?? '';
});
