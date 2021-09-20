import 'package:dashboard/admin/admin.dart' as admin;
import 'package:dashboard/dashboard/dashboard.dart' as dashboard;
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class App extends HookConsumerWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
      ),
      routes: {
        '/': (context) => const Text('pick a page, noober'),
        '/dashboard': (context) => const dashboard.Page(),
        '/admin': (context) => const admin.Page(),
      },
    );
  }
}
