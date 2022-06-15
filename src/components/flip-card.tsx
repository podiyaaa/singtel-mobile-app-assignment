import React from 'react';
import {
  Animated, Pressable, StyleSheet, Text,
} from 'react-native';

function FlipCard() {
  const animatedValue = new Animated.Value(0);
  let toValue = 0;
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

  const onPress = () => {
    if (toValue >= 90) {
      Animated.spring(animatedValue, {
        friction: 8,
        tension: 10,
        useNativeDriver: false,
        toValue: 0,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        friction: 8,
        tension: 10,
        useNativeDriver: false,
        toValue: 180,
      }).start();
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={style.pressable}
    >
      <Animated.View style={StyleSheet.flatten([
        style.animatedCard,
        style.backCard,
        {
          transform: [{ rotateY: backInterpolate }],
        }])}
      >
        <Text>Back</Text>
      </Animated.View>
      <Animated.View style={StyleSheet.flatten([
        style.animatedCard,
        style.frontCard,
        {
          transform: [{ rotateY: frontInterpolate }],
        }])}
      >
        <Text>Front</Text>
      </Animated.View>
    </Pressable>
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
});
