import 'package:dashboard/provider/firebase.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class App extends HookConsumerWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider).state;
    return MaterialApp(
      home: Column(
        children: [
          if (user == null)
            OutlinedButton(
              child: const Text('signin'),
              onPressed: () {
                FirebaseAuth.instance.signInAnonymously();
              },
            ),
          if (user != null) ...[
            SelectableText(user.uid),
            SelectableText(user.name),
            OutlinedButton(
              child: const Text('signout'),
              onPressed: () {
                FirebaseAuth.instance.signOut();
              },
            ),
          ]
        ],
      ),
    );
  }
}
