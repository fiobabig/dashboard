import 'package:dashboard/dashboard/provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Login extends HookConsumerWidget {
  const Login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final token = ref.watch(tokenProvider);

    return Scaffold(
      body: token.when(
        data: (value) => Text('token: $value'),
        loading: () => const CircularProgressIndicator(),
        error: (e, s) {
          FlutterError.reportError(FlutterErrorDetails(exception: e, stack: s));
          return ErrorWidget(e);
        },
      ),
    );
  }
}
