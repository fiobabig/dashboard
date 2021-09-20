import 'package:dashboard/dashboard/view/login.dart';
import 'package:dashboard/provider/dashboard_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'main.dart';

class Page extends HookConsumerWidget {
  const Page({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    useEffect(() {
      ref.read(dashboardProvider.notifier).signInAnonymously();
    }, const []);

    final dashboard = ref.watch(dashboardProvider);

    return Scaffold(
      body: dashboard.when(
        data: (value) => !value.hasData
            ? const Login()
            : Main(
                dashboard: value,
              ),
        loading: () => const CircularProgressIndicator(),
        error: (e, s) {
          FlutterError.reportError(FlutterErrorDetails(exception: e, stack: s));
          return ErrorWidget(e);
        },
      ),
    );
  }
}
