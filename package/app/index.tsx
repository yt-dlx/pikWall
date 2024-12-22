/* eslint-disable @typescript-eslint/no-require-imports */
const imageSets: string[][] = [
  [
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Soft Glow Of Pastel Skies (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Soft Glow Of Pastel Skies (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Tranquility Under Emerald Canopy (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Tranquility Under Emerald Canopy (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Dreamscape Of Blush Meadows (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Dreamscape Of Blush Meadows (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Crimson Glow Over Silent Steppe (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Crimson Glow Over Silent Steppe (2).jpg"
  ],
  [
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Tranquility Under Emerald Canopy (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Tranquility Under Emerald Canopy (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Dreamscape Of Blush Meadows (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Dreamscape Of Blush Meadows (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Crimson Glow Over Silent Steppe (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Crimson Glow Over Silent Steppe (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Soft Glow Of Pastel Skies (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Soft Glow Of Pastel Skies (4).jpg"
  ],
  [
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Dreamscape Of Blush Meadows (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Dreamscape Of Blush Meadows (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Crimson Glow Over Silent Steppe (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Crimson Glow Over Silent Steppe (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Soft Glow Of Pastel Skies (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Soft Glow Of Pastel Skies (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Tranquility Under Emerald Canopy (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Tranquility Under Emerald Canopy (4).jpg"
  ],
  [
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Crimson Glow Over Silent Steppe (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Crimson Glow Over Silent Steppe (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Soft Glow Of Pastel Skies (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Soft Glow Of Pastel Skies (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Tranquility Under Emerald Canopy (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Tranquility Under Emerald Canopy (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Dreamscape Of Blush Meadows (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Dreamscape Of Blush Meadows (3).jpg"
  ]
];
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Footer from "@/components/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay } from "react-native-reanimated";

interface ScrollingSlotProps {
  images: string[];
  reverse: boolean;
  delay: number;
}

const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse, delay }) => {
  const imageHeight = 144;
  const totalHeight = images.length * imageHeight;
  const scrollValue = useSharedValue(0);
  const opacity = useSharedValue(0);
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
          <Image key={idx} alt="image" source={{ uri }} className="w-full h-36 rounded-lg mb-2" resizeMode="cover" blurRadius={1.2} />
        ))}
      </Animated.View>
    </View>
  );
};
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
      <View className=" bg-black/60 rounded-full">
        <Image source={require("../assets/picbook/white_nobg_1024.png")} alt="logo" className="w-56 h-56 border-white border-2 rounded-full" resizeMode="contain" />
      </View>
      <Text style={{ fontFamily: "Kurale" }} className="text-8xl font-black text-white tracking-tight">
        picBook™
      </Text>
    </Animated.View>
  );
};
const IndexPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View className="flex-row h-full overflow-hidden relative">
          {imageSets.map((images, slotIndex) => (
            <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 200} />
          ))}
          <LinearGradient colors={["#0A0A0A", "transparent", "transparent", "#0A0A0A"]} locations={[0, 0.2, 0.8, 1]} style={styles.gradient} />
          <View style={styles.overlay}>
            <View className="absolute justify-center items-center">
              <AnimatedTitle />
              <View className="flex-row items-center mt-4 bg-black/50 px-4 py-2 rounded-full">
                <View className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                <Text style={{ fontFamily: "Kurale" }} className="text-sm text-white font-semibold">
                  Crafted with imagination and stories
                </Text>
              </View>
              <Link href="./home" asChild>
                <TouchableOpacity style={styles.buttonContainer}>
                  <LinearGradient colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,1)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonGradient}>
                    <MaterialIcons name="photo-camera" size={24} color="black" style={styles.icon} />
                    <Text style={{ fontFamily: "Kurale", ...styles.buttonText }}>Start Exploring</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: { marginRight: 8 },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
  gradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  container: { height: "100%", width: "100%", backgroundColor: "#0A0A0A" },
  content: { flex: 1, width: "100%", justifyContent: "center", alignItems: "center" },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  buttonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12 },
  buttonContainer: { marginTop: 32, borderRadius: 12, overflow: "hidden", elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 }
});

export default IndexPage;
