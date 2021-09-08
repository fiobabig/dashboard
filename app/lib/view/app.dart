import 'package:dashboard/admin/admin.dart' as admin;
import 'package:dashboard/dashboard/dashboard.dart' as dashboard;
import 'package:dashboard/provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class App extends HookConsumerWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // final signingIn = useState(false);

    // if (!signingIn.value) {
    //   ref.read(userProvider.notifier).signInWithEmailAndPassword(
    //         dotenv.env['TEST_EMAIL']!,
    //         dotenv.env['TEST_PWD']!,
    //       );
    // }

    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
      ),
      routes: {
        '/': (context) => const dashboard.Page(),
        '/admin': (context) => const admin.Page(),
      },
    );
  }
}
