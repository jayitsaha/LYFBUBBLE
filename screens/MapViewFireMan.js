import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, Animated, Dimensions, TouchableOpacity, View, Text } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { Button } from "react-native-paper";

const { width } = Dimensions.get("window");

const YourComponent = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const scale = new Animated.Value(1);

  const onZoomEventFunction = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  const onZoomStateChangeFunction = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start();
    }
  };

  const rotateImage = () => {
    const newRotationAngle = rotationAngle + 90;
    setRotationAngle(newRotationAngle);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      
      <Button
    icon="rotate-right"
    style={{ marginLeft: 0, width: "80%", alignSelf: "center", marginTop: 150 }}
    mode="outlined"
    color="white"
    onPress={() => {
        rotateImage();
    }}
    >
    ROTATE
    </Button>
      <PinchGestureHandler
        onGestureEvent={onZoomEventFunction}
        onHandlerStateChange={onZoomStateChangeFunction}
      >
        <Animated.View style={[
          { transform: [{ rotate: `${rotationAngle}deg` }] },
          styles.imageContainer
        ]}>
          <Animated.Image
            source={require("../assets/images/map.png")}
            style={{ width: "100%", height: "100%", marginTop: -150, transform: [{ scale: scale }], alignSelf: "center", justifyContent: "center", alignItems: "center" }}
            resizeMode="contain"
          />
        </Animated.View>
      </PinchGestureHandler>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default YourComponent;
