import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../provider/user_provider.dart';
import 'login.dart';
import 'main.dart';

class Page extends HookConsumerWidget {
  const Page({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);

    return Scaffold(
      body: user.when(
        data: (value) => value == null ? const Login() : const Main(),
        loading: () => const CircularProgressIndicator(),
        error: (e, s) {
          FlutterError.reportError(FlutterErrorDetails(exception: e, stack: s));
          return ErrorWidget(e);
        },
      ),
    );
  }
}
