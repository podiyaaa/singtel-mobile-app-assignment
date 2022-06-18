import React from 'react';
import {
  Animated, Pressable, StyleSheet, Text, View,
} from 'react-native';

export type FlipCardProps = {
  value: string;
}

function FlipCard(props: FlipCardProps) {
  const animatedValue: Animated.Value = new Animated.Value(0);
  let toValue: number = 0;
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  animatedValue.addListener(({ value }) => {
    toValue = value;
  });
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const flipBack = () => {
    Animated.spring(animatedValue, {
      friction: 8,
      tension: 10,
      useNativeDriver: false,
      toValue: 180,
    }).start();
  };
  const flipFront = () => {
    Animated.spring(animatedValue, {
      friction: 8,
      tension: 10,
      useNativeDriver: false,
      toValue: 0,
    }).start();
  };
  const onPress = () => {
    if (toValue === 0) {
      flipBack();
      setTimeout(() => {
        flipFront();
      }, 1000);
    }
  };
  const { value } = props;

  return (
    <View style={style.pressable}>
      <Animated.View style={StyleSheet.flatten([
        style.animatedCard,
        style.backCard,
        {
          transform: [{ rotateY: backInterpolate }],
        }])}
      >
        <Text style={style.backText}>{value}</Text>
      </Animated.View>
      <AnimatedPressable
        onPress={onPress}
        style={StyleSheet.flatten([
          style.animatedCard,
          style.frontCard,
          {
            transform: [{ rotateY: frontInterpolate }],
          }])}
      >
        <Text style={style.frontText}>?</Text>
      </AnimatedPressable>
    </View>
  );
}

export default FlipCard;

const style = StyleSheet.create({
  pressable: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedCard: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCard: {
    backgroundColor: 'white',
  },
  frontCard: {
    position: 'absolute',
    backgroundColor: 'rgb(77,160,237)',
  },
  frontText: {
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
  },
  backText: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
  },
});
