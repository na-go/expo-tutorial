import { FC } from 'react';
import { View, Image } from 'react-native';

interface EmojiStickerProps {
  imageSize: number;
  stickerSource: any;
}

export const EmojiSticker: FC<EmojiStickerProps> = ({ imageSize, stickerSource }) => {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
