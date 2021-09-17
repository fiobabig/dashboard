import 'package:dashboard/provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Main extends HookConsumerWidget {
  const Main({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = useTextEditingController();

    return Scaffold(
      body: Column(
        children: [
          TextField(
            controller: controller,
            decoration: const InputDecoration(
              hintText: 'Dashboard code token numbers on the screen',
            ),
          ),
          ElevatedButton(
            child: const Text('Add Dashboard'),
            onPressed: () async {
              await ref
                  .read(
                    userProvider.notifier,
                  )
                  .linkDashboard(
                    controller.text,
                  );
            },
          ),
        ],
      ),
    );
  }
}
