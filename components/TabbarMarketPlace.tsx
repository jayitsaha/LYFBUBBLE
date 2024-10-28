import React, { useState } from 'react';
import { View, LayoutChangeEvent, StyleSheet } from 'react-native';
import TabbarButton from './TabbarButtonMarketPlace';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function TabBar({ state, descriptors, navigation }) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View
        style={[
          animatedStyle,
          {
            position: "absolute",
            backgroundColor: "#FCF09A",
            borderRadius: 60,
            marginHorizontal: 10,
            height: buttonWidth - 40,
            width: buttonWidth - 20,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 });
          if (!isFocused) {
            if(index == 0){
              console.log("HOME SCREEN")
              
              navigation.navigate(route.name);
            }

            if(index == 1){
              navigation.navigate("UploadProduct");
            }

            if(index == 2){
              console.log("PROFILE");
              navigation.navigate("HomeScreenMarketPlace");
            }

            
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <TabbarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? '#673ab7' : '#222'}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    width: 340,
    height: 90,
    alignContent: "center",
    alignSelf: "center"
  },
});