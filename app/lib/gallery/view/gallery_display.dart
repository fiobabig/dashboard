import 'package:dashboard/gallery/provider/photo.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class GalleryDisplay extends HookConsumerWidget {
  const GalleryDisplay({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final photos = ref.watch(photoProvider);

    if (photos == null) {
      return const SizedBox(); // no idea what we want to actually do here, or if we care
    }

    return Column(
      children: photos
          .map(
            (e) => Image.network(e.url),
          )
          .toList(),
    );
  }
}
