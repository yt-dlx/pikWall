// app/index.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import { Link } from "expo-router";
import React, { useEffect } from "react";
import imageSets from "@/database/static";
import Footer from "@/components/Footer";
import Colorizer from "@/components/Colorizer";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollingSlotProps } from "@/types/components";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay } from "react-native-reanimated";
// ============================================================================================
// ============================================================================================
const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse, delay }) => {
  const imageHeight = 144;
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
        {images.concat(images).map((uri, idx) => (
          <Image key={idx} source={{ uri }} alt="Scrolling Image" className="w-full h-36 rounded-lg mb-2" resizeMode="cover" blurRadius={1.2} style={{ height: imageHeight }} />
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
    scale.value = withRepeat(withSequence(withTiming(0.5, { duration: 2000 }), withTiming(0.8, { duration: 2000 })), -1, true);
  }, [scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={animatedStyle} className="items-center">
      <View style={{ backgroundColor: Colorizer("#0A0A0A", 0.5) }} className="rounded-full p-2">
        <Image source={require("@/assets/picbook/white_nobg_1024.png")} alt="logo" className="w-56 h-56 rounded-full border-2 border-white" resizeMode="contain" />
      </View>
    </Animated.View>
  );
};
// ============================================================================================
// ============================================================================================
const IndexPage: React.FC = () => {
  return (
    <View style={{ backgroundColor: Colorizer("#0A0A0A", 1.0) }} className="h-full w-full">
      <View className="flex-1 justify-center items-center relative">
        <View className="flex-row h-full overflow-hidden relative">
          {imageSets.map((images, slotIndex) => (
            <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 200} />
          ))}
          <LinearGradient colors={["#0A0A0A", "transparent", "transparent", "#0A0A0A"]} locations={[0, 0.2, 0.8, 1]} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
          <View className="absolute inset-0 justify-center items-center">
            <AnimatedTitle />
            <Text style={{ fontFamily: "Kurale", color: Colorizer("#FFFFFF", 1.0), fontSize: 64, letterSpacing: -2 }} className="text-center">
              picBook™
            </Text>
            <View className="flex-row items-center px-4 py-2 rounded-full mt-8" style={{ backgroundColor: Colorizer("#0A0A0A", 1.0) }}>
              <View className="w-2 h-2 rounded-full mr-2 opacity-50" style={{ backgroundColor: Colorizer("#FFFFFF", 1.0) }} />
              <Text style={{ fontFamily: "Kurale", color: Colorizer("#FFFFFF", 1.0), fontSize: 14 }}> Crafted with imagination and stories </Text>
            </View>
            <Link href="./Home" asChild>
              <TouchableOpacity
                className="mt-5 rounded-4 overflow-hidden shadow-lg"
                style={{
                  marginTop: 20,
                  borderRadius: 16,
                  overflow: "hidden",
                  shadowColor: Colorizer("#000000", 0.25),
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5
                }}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,1)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ borderRadius: 10 }}
                  className="flex-row items-center justify-center px-14 py-4"
                >
                  <MaterialIcons name="photo-camera" size={24} color={Colorizer("#0A0A0A", 1.0)} className="mr-2" />
                  <Text style={{ fontFamily: "Kurale", color: Colorizer("#0A0A0A", 1.0), fontSize: 18 }}> Start Exploring </Text>
                </LinearGradient>
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
