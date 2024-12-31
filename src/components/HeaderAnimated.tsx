// components/HeaderAnimated.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import Colorizer from "./Colorizer";
import React, { useEffect } from "react";
import imageSets from "@/database/static";
import { Text, View, Image } from "react-native";
import { ScrollingSlotProps } from "@/types/components";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay } from "react-native-reanimated";
// ============================================================================================
// ============================================================================================
const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse, delay }) => {
  const imageHeight = 200;
  const totalHeight = images.length * imageHeight;
  const scrollValue = useSharedValue(0);
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 1000 }));
    scrollValue.value = withDelay(delay, withRepeat(withTiming(totalHeight, { duration: 10000 }), -1, reverse));
  }, [scrollValue, totalHeight, reverse, delay, opacity]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -scrollValue.value % totalHeight }], opacity: opacity.value }));
  return (
    <View className="flex-1 overflow-hidden px-1">
      <Animated.View style={animatedStyle} className="flex-col">
        {images.concat(images).map((uri: string, idx: number) => (
          <Image key={idx} source={{ uri }} alt="Scrolling Image" className="w-full h-24 rounded-lg mb-1" resizeMode="cover" blurRadius={0} style={{ height: imageHeight }} />
        ))}
      </Animated.View>
    </View>
  );
};
// ============================================================================================
// ============================================================================================
const AnimatedTitle: React.FC = () => {
  const scale = useSharedValue(0.95);
  useEffect(() => {
    scale.value = withRepeat(withSequence(withTiming(1.05, { duration: 2000 }), withTiming(0.95, { duration: 2000 })), -1, true);
  }, [scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={animatedStyle} className="items-center m-4">
      <View style={{ backgroundColor: Colorizer("#000000", 0.6) }} className="rounded-full p-1">
        <Image source={require("@/assets/picWall/picWall.png")} alt="logo" className="w-24 h-24 rounded-full border-2" style={{ borderColor: Colorizer("#E9E9EA", 1.0) }} resizeMode="contain" />
      </View>
    </Animated.View>
  );
};
// ============================================================================================
// ============================================================================================
const HeaderAnimated: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center mt-4">
      <View className="flex-row overflow-hidden rounded-xl relative" style={{ height: 220 }}>
        {imageSets.map((images, slotIndex) => (
          <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 200} />
        ))}
        <View
          className="absolute inset-0 items-center justify-center rounded-lg overflow-hidden"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", borderRadius: 8 }}
        >
          <View style={{ backgroundColor: Colorizer("#000000", 0.5), borderRadius: 8 }} className="absolute inset-0" />
          <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", margin: 8, padding: 4 }} className="absolute justify-center items-center m-2 p-1">
            <View className="flex-row mb-1">
              <AnimatedTitle />
            </View>
            <Text style={{ fontFamily: "Linotte_Bold", fontSize: 30, color: Colorizer("#E9E9EA", 1.0), letterSpacing: -1, lineHeight: 34 }} className="tracking-tight">
              picWall
            </Text>
            <View
              className="flex-row items-center mt-2 px-2 py-1 rounded-full"
              style={{ backgroundColor: Colorizer("#000000", 0.6), flexDirection: "row", alignItems: "center", marginTop: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9999 }}
            >
              <View className="w-1.5 h-1.5 rounded-full bg-white mr-1" style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colorizer("#E9E9EA", 1.0), marginRight: 4, opacity: 0.5 }} />
              <Text style={{ fontFamily: "Linotte_Bold", fontSize: 12, fontWeight: "600", color: Colorizer("#E9E9EA", 1.0) }} className="text-sm">
                Crafted with imagination and stories
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HeaderAnimated;
