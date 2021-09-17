import 'package:dashboard/provider/provider.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Login extends HookConsumerWidget {
  const Login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: ElevatedButton(
        child: const Text('login with google'),
        onPressed: () {
          ref.read(userProvider.notifier).signInWithGoogle();
        },
      ),
    );
  }
}
