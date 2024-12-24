// components/HeaderAnimated.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import Colorizer from "./Colorizer";
import React, { useEffect } from "react";
import imageSets from "@/database/static";
import { Text, View, Image } from "react-native";
import { ScrollingSlotProps } from "@/types/components";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay } from "react-native-reanimated";
// ============================================================================================
const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse, delay }) => {
  const imageHeight = 96;
  const opacity = useSharedValue(0);
  const scrollValue = useSharedValue(0);
  const totalHeight = images.length * imageHeight;

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 1000 }));
    scrollValue.value = withDelay(delay, withRepeat(withTiming(totalHeight, { duration: 15000 }), -1, reverse));
  }, [scrollValue, totalHeight, reverse, delay, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -scrollValue.value % totalHeight }],
    opacity: opacity.value
  }));

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
// ============================================================================================
const AnimatedTitle: React.FC = () => {
  const scale = useSharedValue(0.95);

  useEffect(() => {
    scale.value = withRepeat(withSequence(withTiming(1.05, { duration: 2000 }), withTiming(0.95, { duration: 2000 })), -1, true);
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Animated.View style={animatedStyle} className="items-center">
      <View style={{ backgroundColor: Colorizer("#000000", 0.6) }} className="rounded-full p-1">
        <Image source={require("@/assets/picbook/white_nobg_1024.png")} alt="logo" className="w-12 h-12 rounded-full border-2" style={{ borderColor: Colorizer("#FFFFFF", 1.0) }} resizeMode="contain" />
      </View>
      <Text
        style={{
          fontFamily: "Kurale",
          fontSize: 28, // Reduced from 32 to 28
          fontWeight: "bold",
          color: Colorizer("#FFFFFF", 1.0),
          letterSpacing: -1, // tracking-tight approximation
          lineHeight: 34 // Ensures adequate spacing
        }}
        className="tracking-tight"
      >
        picBook™
      </Text>
    </Animated.View>
  );
};
// ============================================================================================
const HeaderAnimated: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center m-2">
      <View
        className="flex-row overflow-hidden rounded-xl relative"
        style={{ height: 240 }} // Increased from 220 to 240
      >
        {imageSets.map((images, slotIndex) => (
          <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 200} />
        ))}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8
          }}
          className="absolute inset-0 items-center justify-center rounded-[8px] overflow-hidden"
        >
          <View
            style={{
              backgroundColor: Colorizer("#0A0A0A", 1.0),
              opacity: 0.5,
              borderRadius: 8
            }}
            className="absolute inset-0"
          />
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              margin: 8,
              padding: 4
            }}
            className="absolute justify-center items-center m-2 p-1"
          >
            <View className="flex-row mb-1">
              <AnimatedTitle />
            </View>
            <View
              style={{
                backgroundColor: Colorizer("#000000", 0.3),
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8, // mt-2
                paddingHorizontal: 8, // px-2
                paddingVertical: 4, // py-1
                borderRadius: 9999 // rounded-full
              }}
              className="flex-row items-center mt-2 bg-black/30 px-2 py-1 rounded-full"
            >
              <View
                style={{
                  width: 6, // w-1.5
                  height: 6, // h-1.5
                  borderRadius: 3, // rounded-full
                  backgroundColor: Colorizer("#FFFFFF", 1.0),
                  marginRight: 4, // mr-1
                  opacity: 0.5 // animate-pulse approximation
                }}
                className="w-1.5 h-1.5 rounded-full bg-white mr-1 animate-pulse"
              />
              <Text
                style={{
                  fontFamily: "Kurale",
                  fontSize: 12,
                  fontWeight: "600",
                  color: Colorizer("#FFFFFF", 1.0)
                }}
                className="text-sm"
              >
                Crafted with imagination and stories
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Kurale",
                fontSize: 14,
                color: Colorizer("#D1D5DB", 1.0),
                textAlign: "center",
                lineHeight: 20,
                fontWeight: "500",
                marginTop: 8 // mt-2
              }}
              className="mt-2"
            >
              Dive into tales inspired by unique images and discover the art of visual environment telling.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HeaderAnimated;
