import 'package:dashboard/provider/user.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'login.dart';
import 'main.dart';

class Page extends HookConsumerWidget {
  const Page({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);

    return user == null || user.isAnonymous ? const Login() : const Main();
  }
}
