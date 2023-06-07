import { FC } from 'react'
import { View, Image } from 'react-native'
import { PanGestureHandler, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated'

const AnimatedImage = Animated.createAnimatedComponent(Image)
const AnimatedView = Animated.createAnimatedComponent(View)


interface EmojiStickerProps {
  imageSize: number
  stickerSource: any
}

export const EmojiSticker: FC<EmojiStickerProps> = ({ imageSize, stickerSource }) => {
  const scaleImage = useSharedValue(imageSize)

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const onDoubleTap = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      } else {
        scaleImage.value = imageSize
      }
    },
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });


  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context: { translateX: number, translateY: number }) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  )
}
