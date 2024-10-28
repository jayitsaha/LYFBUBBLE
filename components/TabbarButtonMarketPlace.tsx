import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { icon } from "../constants/icons_marketplace";

const TabbarButton = ({ onPress, onLongPress, isFocused, routeName, color, label }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return { transform: [{ scale: scaleValue }], top };
  });



  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tabbarItem}>
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({ color: isFocused ? '#222' : '#222' })}
      </Animated.View>
      <Animated.Text style={[{ color: isFocused ? '#673ab7' : '#222', fontSize: 12 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabbarButton;

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});