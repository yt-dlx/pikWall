// components/HeaderAnimated.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect } from "react";
import imageSets from "@/database/static";
import { Text, View, Image } from "react-native";
import { ScrollingSlotProps } from "@/types/components";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay } from "react-native-reanimated";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse, delay }) => {
  const imageHeight = 96;
  const opacity = useSharedValue(0);
  const scrollValue = useSharedValue(0);
  const totalHeight = images.length * imageHeight;
  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 1000 }));
    scrollValue.value = withDelay(delay, withRepeat(withTiming(totalHeight, { duration: 15000 }), -1, reverse));
  }, [scrollValue, totalHeight, reverse, delay, opacity]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -scrollValue.value % totalHeight }], opacity: opacity.value }));
  return (
    <View className="flex-1 overflow-hidden px-1">
      <Animated.View style={animatedStyle} className="flex-col">
        {images.concat(images).map((uri: string, idx: number) => (
          <Image key={idx} source={{ uri }} alt="image" className="w-full h-24 rounded-lg mb-1" resizeMode="cover" blurRadius={1.0} />
        ))}
      </Animated.View>
    </View>
  );
};
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const HeaderAnimated: React.FC = () => {
  const AnimatedTitle: React.FC = () => {
    const scale = useSharedValue(0.95);
    useEffect(() => {
      scale.value = withRepeat(withSequence(withTiming(1.05, { duration: 2000 }), withTiming(0.95, { duration: 2000 })), -1, true);
    }, [scale]);
    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
    return (
      <Animated.View style={animatedStyle} className="items-center">
        <View className="bg-black/60 rounded-full p-1">
          <Image source={require("@/assets/picbook/white_nobg_1024.png")} alt="logo" className="w-12 h-12 border-2 rounded-full" style={{ borderColor: "white" }} resizeMode="contain" />
        </View>
        <Text style={{ fontFamily: "Kurale", fontSize: 32, fontWeight: "bold", color: "white" }} className="tracking-tight">
          picBook™
        </Text>
      </Animated.View>
    );
  };
  return (
    <View className="flex-1 items-center justify-center m-2">
      <View className="flex-row overflow-hidden rounded-xl relative" style={{ height: 220 }}>
        {imageSets.map((images, slotIndex) => (
          <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 200} />
        ))}
        <View className="absolute inset-0 items-center justify-center rounded-[8px] overflow-hidden">
          <View className="absolute inset-0" style={{ backgroundColor: "#0A0A0A", opacity: 0.5, borderRadius: 8 }} />
          <View className="absolute justify-center items-center m-2 p-1">
            <View className="flex-row mb-1">
              <AnimatedTitle />
            </View>
            <View className="flex-row items-center mt-2 bg-black/30 px-2 py-1 rounded-full">
              <View className="w-1.5 h-1.5 rounded-full bg-white mr-1 animate-pulse" />
              <Text style={{ fontFamily: "Kurale", fontSize: 12, fontWeight: "600", color: "white" }}> Crafted with imagination and stories </Text>
            </View>
            <Text style={{ fontFamily: "Kurale", fontSize: 14, color: "#D1D5DB", textAlign: "center", lineHeight: 20, fontWeight: "500" }} className="mt-2">
              Dive into tales inspired by unique images and discover the art of visual environment telling.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HeaderAnimated;
