import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Page, { PAGE_WIDTH } from '../components/PageLyfSec';
import { BACKGROUND_COLOR, PAGESLYFSEC } from '../constants/constants_home';
import { AntDesign } from '@expo/vector-icons';
import Dot from '../components/DotLyfSec';

export default function LyfSec() {

  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const scrollRef = useAnimatedRef();

  const onIconPress = useCallback(() => {
    if (activeIndex.value === PAGESLYFSEC.length - 1) return;
    scrollRef.current?.scrollTo({ x: PAGE_WIDTH * (activeIndex.value + 1) });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {PAGESLYFSEC.map((page, index) => (
          <Page
            key={index.toString()}
            page={page}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        {/* Paginator */}
        <View style={[styles.fillCenter, { flexDirection: 'row' }]}>
          {PAGESLYFSEC.map((_, index) => {
            return (
              <Dot
                key={index.toString()}
                index={index}
                activeDotIndex={activeIndex}
              />
            );
          })}
        </View>
        {/* Text Container */}
        <View style={styles.fillCenter}>
          <Text style={styles.text}>View Insights</Text>
        </View>
        {/* iconContainer */}
        <View style={styles.fillCenter}>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: 'row',
  },
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45
  },
  text: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.7,
    fontWeight: '500',
  },
});