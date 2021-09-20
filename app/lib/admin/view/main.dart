import 'package:dashboard/provider/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class Main extends HookConsumerWidget {
  const Main({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);
    final controller = useTextEditingController();

    return Scaffold(
      body: user.when(
        data: (value) {
          return Column(
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

                  controller.text = '';
                },
              ),
              const Text('Linked Dashboards'),
              ...value!.dashboards.entries.map((e) => Text(e.key)),
            ],
          );
        },
        loading: () => const CircularProgressIndicator(),
        error: (e, s) {
          FlutterError.reportError(FlutterErrorDetails(exception: e, stack: s));
          return ErrorWidget(e);
        },
      ),
    );
  }
}
