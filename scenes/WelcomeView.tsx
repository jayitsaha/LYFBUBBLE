import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions, Image } from 'react-native';
import { AppImages } from '../assets';

interface Props {
  animationController: React.MutableRefObject<Animated.Value>;
}

const IMAGE_WIDTH = 350;
const IMAGE_HEIGHT = 350;

const WelcomeView: React.FC<Props> = ({ animationController }) => {
  const window = useWindowDimensions();

  const careRef = useRef<Text | null>(null);

  const slideAnim = animationController.current.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [window.width, window.width, 0],
  });

  const textEndVal = 26 * 2; // 26 being text's height (font size)
  const welcomeTextAnim = animationController.current.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [textEndVal, textEndVal, 0],
  });

  const imageEndVal = IMAGE_WIDTH * 4;
  const imageAnim = animationController.current.interpolate({
    inputRange: [0, 0.6, 0.8],
    outputRange: [imageEndVal, imageEndVal, 0],
  });

  return (

    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Animated.Text
        style={[styles.title, { transform: [{ translateX: imageAnim }], marginBottom: 15 }]}
        ref={careRef}
      >
        GUARDIAN
      </Animated.Text>
      <Animated.Text
        style={[styles.subtitle, { transform: [{ translateX: welcomeTextAnim }], marginBottom: 30 }]}
      >
        Your all-in-one app for a safer, cleaner, and more responsive community. 
        {'\n'}{'\n'}
        Snap a photo, report an incident, and connect directly with the right authorities – be it the police, firefighters, or city cleaners. 
        {'\n'}{'\n'}
        

      </Animated.Text>
      <Image
        style={[styles.image, ]}
        source={AppImages.page5}
      />
    </Animated.View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 100,
  },
  image: {
    maxWidth: IMAGE_WIDTH,
    maxHeight: IMAGE_HEIGHT,
    borderRadius: 50,

  },
  title: {
    color: 'black',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'WorkSans-Bold',
    marginTop: 20
  },
  subtitle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
  
});

export default WelcomeView;
