import React, {useState} from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue
} from "react-native-reanimated";
import { PageInterface } from "../constants/constants_home";

import LyfSecDashboard from "../screens/LyfSecDashboard";
import NotificationComponentLyfSec from "../components/NotificationComponentLyfSec";


import { useSharedValue } from 'react-native-reanimated';


const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const Page = ({ page, translateX, index, activeIndex }) => {
  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];

  const rCircleStyle = useAnimatedStyle(() => {
    // if index === 0
    // [ -PAGE_WIDTH, 0, PAGE_WIDTH]
    // [ 0, 1, 0]

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [
        {
          rotate: `${progress * Math.PI}rad`,
        },
      ],
    };
  });


  // const rConstainerStyle = useAnimatedStyle(() => {
    

  //   const opacity = interpolate(
  //     translateX.value,
  //     inputRange,
  //     [0, 1, 0],
  //     Extrapolate.CLAMP
  //   );

  //   return {
  //     opacity,
  //     display: opacity === 0? none: 'flex'
  //   };
  // });









  return (
    <>
    {<Animated.View style={styles.container}>

      {index == 0 && 
      
      <View style={{marginLeft: 60, paddingRight: 60}}>
        <LyfSecDashboard />
      </View>
      
      }


      {index == 1 && 
      <>
      <View >
        <NotificationComponentLyfSec />
      </View>

      {/* <View>
        <Popular />
      </View> */}

      </>
      
      }
      

      


        
      
    </Animated.View>}
    </>
  );
};

const CIRCLE_WIDTH = PAGE_WIDTH * 0.7;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  circleContainer: {
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 120,
  },
  image: {
    height: PAGE_HEIGHT * 0.5,
    aspectRatio: 1,
    position: "absolute",
  },
  circle: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: CIRCLE_WIDTH / 2,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 15,
  },
  description: { textAlign: "center", fontSize: 14, color: "grey" },
});

export { PAGE_WIDTH };

export default Page;