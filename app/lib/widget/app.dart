import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../feature/admin/admin.dart' as admin;
import '../feature/dashboard/dashboard.dart' as dashboard;

class App extends HookConsumerWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
      ),
      routes: {
        '/': (context) => _pick(context),
        '/dashboard': (context) => const dashboard.Page(),
        '/admin': (context) => const admin.Page(),
      },
    );
  }

  _pick(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/dashboard');
            },
            child: const Text('Dashboard'),
          ),
          const SizedBox(width: 20.0),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/admin');
            },
            child: const Text('Admin'),
          ),
        ],
      ),
    );
  }
}
