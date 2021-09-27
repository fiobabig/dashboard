import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../model/photo.dart';

class GalleryDisplay extends HookConsumerWidget {
  const GalleryDisplay({
    Key? key,
    required this.photos,
  }) : super(key: key);

  final List<Photo> photos;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      children: photos
          .map(
            (e) => Image.network(e.url),
          )
          .toList(),
    );
  }
}
