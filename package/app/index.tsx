// app/index.tsx\
/* eslint-disable @typescript-eslint/no-require-imports */
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import imageSets from "@/database/static";
import Footer from "@/components/Footer";
import Colorizer from "@/components/Colorizer";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, TouchableOpacity } from "react-native";
import { ScrollingSlotProps } from "@/types/components";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay } from "react-native-reanimated";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
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
          <Image key={idx} alt="Scrolling Image" source={{ uri }} className="w-full h-44 rounded-lg mb-2" resizeMode="cover" blurRadius={1.2} />
        ))}
      </Animated.View>
    </View>
  );
};
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const AnimatedTitle: React.FC = () => {
  const scale = useSharedValue(0.95);
  useEffect(() => {
    scale.value = withRepeat(withSequence(withTiming(0.5, { duration: 2000 }), withTiming(0.8, { duration: 2000 })), -1, true);
  }, [scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={animatedStyle} className="items-center">
      <View style={{ backgroundColor: Colorizer("#0A0A0A", 0.5) }} className="rounded-full p-2">
        <Image source={require("@/assets/picbook/white_nobg_1024.png")} alt="logo" className="w-56 h-56 border-2 border-white rounded-full" resizeMode="contain" />
      </View>
    </Animated.View>
  );
};
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const IndexPage: React.FC = () => {
  return (
    <View style={{ backgroundColor: Colorizer("#0A0A0A", 1.0) }} className="h-full w-full">
      <View className="flex-1 justify-center items-center relative">
        <View className="flex-row h-full overflow-hidden relative">
          {imageSets.map((images, slotIndex) => (
            <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 200} />
          ))}
          <LinearGradient colors={["#0A0A0A", "transparent", "transparent", "#0A0A0A"]} locations={[0, 0.2, 0.8, 1]} className="absolute inset-0" />
          <View className="absolute inset-0 flex items-center justify-center">
            <AnimatedTitle />
            <Text style={{ fontFamily: "Kurale", color: Colorizer("#FFFFFF", 1.0) }} className="text-8xl tracking-tight">
              picBook™
            </Text>
            <View style={{ backgroundColor: Colorizer("#0A0A0A", 1.0) }} className="flex-row items-center mt-4 px-4 py-2 rounded-full">
              <View className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
              <Text style={{ fontFamily: "Kurale", color: Colorizer("#FFFFFF", 1.0) }} className="text-sm">
                Crafted with imagination and stories
              </Text>
            </View>
            <Link href="./Home" asChild>
              <TouchableOpacity className="mt-8 rounded-xl overflow-hidden shadow-lg">
                <LinearGradient colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,1)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 40 }} className="flex-row items-center justify-center px-14 py-4">
                  <MaterialIcons name="photo-camera" size={24} color={Colorizer("#0A0A0A", 1.0)} className="mr-2" />
                  <Text style={{ fontFamily: "Kurale", color: Colorizer("#0A0A0A", 1.0) }} className="text-lg">
                    Start Exploring
                  </Text>
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
