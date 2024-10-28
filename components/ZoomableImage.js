import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  TapGestureHandler,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHTS } = Dimensions.get('window');
const SCREEN_HEIGHT = 400;
const ZoomableImage = ({ source }) => {
  const scale = useSharedValue(1);         // Zoom level
  const translateX = useSharedValue(0);    // Pan X
  const translateY = useSharedValue(0);    // Pan Y
  const doubleTapRef = React.useRef(null); // Ref for double-tap handler

  // Single Tap Handler
  const handleSingleTap = (event) => {
    if (scale.value === 1) {
      const { x, y } = event.nativeEvent; // Make sure nativeEvent is accessed correctly
      const centerX = SCREEN_WIDTH / 2;
      const centerY = SCREEN_HEIGHT / 2;

      // Calculate the translation to zoom into the tap point
      translateX.value = withTiming((centerX - x) * 1.5);
      translateY.value = withTiming((centerY - y) * 1.5);
      scale.value = withTiming(2);  // Zoom to 2x
    }
  };

  // Double Tap Handler
  const handleDoubleTap = () => {
    if (scale.value > 1) {
      // Reset scale and position on double-tap
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
  };

  // Pan Handler to allow scrolling when zoomed in
  const panGestureEvent = (event) => {
    if (scale.value > 1) {
      translateX.value = translateX.value + event.translationX;
      translateY.value = translateY.value + event.translationY;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  // Handle the state change of the tap gesture (register taps)
  const handleTapStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      // Trigger zoom-in on tap
      handleSingleTap({ nativeEvent });
    }
  };

  // Handle the state change of the double-tap gesture
  const handleDoubleTapStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      // Trigger zoom-out on double tap
      handleDoubleTap();
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Pan Gesture for scrolling when zoomed */}
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View>
          {/* Double Tap Handler */}
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={handleDoubleTapStateChange}
            numberOfTaps={2}
          >
            {/* Single Tap Handler */}
            <TapGestureHandler
              onHandlerStateChange={handleTapStateChange}
              numberOfTaps={1}
              waitFor={doubleTapRef}
            >
              <Animated.Image
                source={source}
                style={[styles.image, animatedStyle]}
                resizeMode="contain"
              />
            </TapGestureHandler>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: SCREEN_WIDTH - 20,
    height: 400,
  },
});

export default ZoomableImage;
