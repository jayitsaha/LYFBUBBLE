import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions, Image } from 'react-native';
import { AppImages } from '../assets';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 250;

const RelaxView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const relaxRef = useRef<Text | null>(null);

  const relaxAnimation = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.8],
    outputRange: [-(26 * 2), 0, 0],
  });
  const textAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, -window.width * 2, 0, 0],
  });
  const imageAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8],
    outputRange: [0, 0, -350 * 4, 0, 0],
  });
  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.2, 0.4, 0.8],
    outputRange: [0, 0, -window.width, -window.width],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Animated.Text
        style={[styles.title, { transform: [{ translateY: relaxAnimation }], marginBottom: 15 }]}
        ref={relaxRef}
      >
        GUARDIAN
      </Animated.Text>
      <Animated.Text
        style={[styles.subtitle, { transform: [{ translateX: textAnim }], marginBottom: 30 }]}
      >
        Respond faster, protect better with real-time incident reports.{'\n'}{'\n'}

        Proactive, not reactive. GUARDIAN empowers us to prevent crime.


      </Animated.Text>
      <Image
        style={[styles.image, ]}
        source={AppImages.page2}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  title: {
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
  image: {
    maxWidth: IMAGE_WIDTH,
    maxHeight: IMAGE_HEIGHT,
    borderRadius: 50
  },
});

export default RelaxView;
