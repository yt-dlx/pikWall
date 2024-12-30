// app/index.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import { Link } from "expo-router";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import imageSets from "@/database/static";
import Footer from "@/components/Footer";
import Colorizer from "@/components/Colorizer";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollingSlotProps } from "@/types/components";
import { Text, View, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay, withSpring, Easing } from "react-native-reanimated";
// ============================================================================================
// ============================================================================================
const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse, delay }) => {
  const imageHeight = 200;
  const totalHeight = images.length * imageHeight;
  const scrollValue = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);
  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 1500 }));
    scale.value = withDelay(delay, withSpring(1));
    scrollValue.value = withDelay(delay, withRepeat(withTiming(totalHeight, { duration: 15000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }), -1, reverse));
  }, [scrollValue, totalHeight, reverse, delay, opacity, scale]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -scrollValue.value % totalHeight }, { scale: scale.value }],
    opacity: opacity.value
  }));
  return (
    <View style={{ flex: 1, overflow: "hidden", paddingHorizontal: 0.5 }}>
      <Animated.View style={[animatedStyle, { flexDirection: "column" }]}>
        {images.concat(images).map((uri, idx) => (
          <Image key={idx} source={uri} contentFit="cover" cachePolicy="memory-disk" style={{ height: imageHeight, borderRadius: 10, width: "100%", margin: 2 }} />
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
    scale.value = withRepeat(
      withSequence(withTiming(1.05, { duration: 2000, easing: Easing.bezier(0.4, 0, 0.2, 1) }), withTiming(0.95, { duration: 2000, easing: Easing.bezier(0.4, 0, 0.2, 1) })),
      -1,
      true
    );
  }, [scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={animatedStyle} className="items-center">
      <View className="rounded-full p-2 shadow-2xl" style={{ backgroundColor: Colorizer("#070808", 0.7), justifyContent: "center", alignItems: "center" }}>
        <Image
          alt="logo"
          cachePolicy="memory-disk"
          contentFit="contain"
          source={require("@/assets/picWall/picWall_red.png")}
          style={{ width: 200, height: 200, borderWidth: 2, borderRadius: 9999, borderColor: Colorizer("#BE2528", 0.9) }}
        />
      </View>
    </Animated.View>
  );
};
// ============================================================================================
// ============================================================================================
const IndexPage: React.FC = () => {
  const buttonScale = useSharedValue(1);
  const buttonAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: buttonScale.value }] }));
  const onPressIn = () => {
    buttonScale.value = withSpring(0.95);
  };
  const onPressOut = () => {
    buttonScale.value = withSpring(1);
  };
  return (
    <View style={{ backgroundColor: Colorizer("#070808", 1.0) }} className="h-full w-full">
      <View className="flex-1 justify-center items-center relative">
        <View className="flex-row h-full overflow-hidden relative">
          {imageSets.map((images, slotIndex) => (
            <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 300} />
          ))}
          <LinearGradient colors={["rgba(7,8,8,1)", "rgba(7,8,8,0.5)", "rgba(7,8,8,0.2)", "rgba(7,8,8,0.5)", "rgba(7,8,8,1)"]} locations={[0, 0.2, 0.5, 0.8, 1]} className="absolute inset-0" />
          <View className="absolute inset-0 justify-center items-center">
            <AnimatedTitle />
            <View>
              <Text
                className="text-center"
                style={{
                  fontSize: 80,
                  fontFamily: "Kurale",
                  textShadowRadius: 50,
                  color: Colorizer("#BE2528", 1.0),
                  textShadowOffset: { width: 8, height: 8 },
                  textShadowColor: Colorizer("#BE2528", 1.0)
                }}
              >
                picWall
              </Text>
              <Text className="text-center absolute inset-x-0 top-0" style={{ fontFamily: "Kurale", color: Colorizer("#E9E9EA", 1.0), fontSize: 80 }}>
                picWall
              </Text>
            </View>
            <View className="flex-row items-center px-2 yp-2 mt-44 rounded-full" style={{ backgroundColor: Colorizer("#BE2528", 0.9) }}>
              <Text className="text-lg font-bold" style={{ fontFamily: "Kurale", color: Colorizer("#070808", 1.0) }}>
                This ia a development preview build. Except changes and bugs.
              </Text>
            </View>
            <Link href="./Home" asChild>
              <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut} className="mt-2 rounded-3xl overflow-hidden shadow-2xl">
                <Animated.View style={buttonAnimatedStyle}>
                  <LinearGradient colors={["#ffffff", "#f0f0f0"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="flex-row items-center justify-center px-10 py-3">
                    <MaterialIcons name="photo-camera" size={28} color={Colorizer("#070808", 1.0)} className="mr-3" />
                    <Text className="text-xl" style={{ fontFamily: "Kurale", color: Colorizer("#070808", 1.0) }}>
                      Start Exploring
                    </Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};
export default IndexPage;
