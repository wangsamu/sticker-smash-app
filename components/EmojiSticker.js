import { View, Text, Image } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler/';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const EmojiSticker = ({ stickerSource, imageSize }) => {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

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

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value) {
        scaleImage.value = scaleImage.value * 2;
        console.log('tapped twice!');
      }
    },
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      (context.translateX = translateX.value),
        (context.translateY = translateY.value);
    },
    onActive: (event, context) => {
      (translateX.value = event.translationX + context.translateX),
        (translateY.value = event.translationY + context.translateY);
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
            resizeMode='contain'
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
};

export default EmojiSticker;
