import 'package:dashboard/dashboard/provider/provider.dart';
import 'package:dashboard/provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Login extends HookConsumerWidget {
  const Login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final token = ref.watch(tokenProvider);

    useEffect(() {
      ref.read(dashboardProvider.notifier).signInAnonymously();
    }, const []);

    return Scaffold(body: Text('token: $token'));
  }
}
