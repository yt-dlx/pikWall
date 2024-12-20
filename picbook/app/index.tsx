/* eslint-disable @typescript-eslint/no-require-imports */
const imageSets: string[][] = [
  [
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Soft Glow Of Pastel Skies (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Soft Glow Of Pastel Skies (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Tranquility Under Emerald Canopy (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Tranquility Under Emerald Canopy (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Dreamscape Of Blush Meadows (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Dreamscape Of Blush Meadows (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Crimson Glow Over Silent Steppe (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Crimson Glow Over Silent Steppe (2).jpg"
  ],
  [
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Tranquility Under Emerald Canopy (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Tranquility Under Emerald Canopy (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Dreamscape Of Blush Meadows (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Dreamscape Of Blush Meadows (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Crimson Glow Over Silent Steppe (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Crimson Glow Over Silent Steppe (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Soft Glow Of Pastel Skies (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Soft Glow Of Pastel Skies (4).jpg"
  ],
  [
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Dreamscape Of Blush Meadows (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Dreamscape Of Blush Meadows (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Crimson Glow Over Silent Steppe (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Crimson Glow Over Silent Steppe (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Soft Glow Of Pastel Skies (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Soft Glow Of Pastel Skies (4).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Tranquility Under Emerald Canopy (1).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Tranquility Under Emerald Canopy (4).jpg"
  ],
  [
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Crimson Glow Over Silent Steppe (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Crimson Glow Over Silent Steppe (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Soft Glow Of Pastel Skies (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Soft Glow Of Pastel Skies (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Tranquility Under Emerald Canopy (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Tranquility Under Emerald Canopy (3).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Dreamscape Of Blush Meadows (2).jpg",
    "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/The Dreamscape Of Blush Meadows (3).jpg"
  ]
];

import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";

interface ScrollingSlotProps {
  images: string[];
  reverse: boolean;
}

const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse }) => {
  const imageHeight = 144;
  const totalHeight = images.length * imageHeight;
  const scrollValue = useSharedValue(0);
  useEffect(() => {
    scrollValue.value = withRepeat(withTiming(totalHeight, { duration: 10000 }), -1, reverse);
  }, [scrollValue, totalHeight, reverse]);
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = -scrollValue.value % totalHeight;
    return {
      transform: [{ translateY }]
    };
  });
  return (
    <View className="flex-1 overflow-hidden">
      <Animated.View style={animatedStyle} className="flex-col">
        {images.concat(images).map((uri: string, idx: number) => (
          <Image key={idx} alt="image" source={{ uri }} className="w-full h-36" resizeMode="cover" blurRadius={1.8} />
        ))}
      </Animated.View>
    </View>
  );
};

const IndexPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View className="flex-row h-full overflow-hidden relative">
          {imageSets.map((images, slotIndex) => {
            const isEven = slotIndex % 2 === 0;
            return <ScrollingSlot key={slotIndex} images={images} reverse={isEven} />;
          })}
          <LinearGradient colors={["#0A0A0A", "transparent"]} style={styles.gradient} />
          <LinearGradient colors={["transparent", "#0A0A0A"]} style={styles.gradient} />
          <View style={styles.overlay}>
            <View className="absolute justify-center items-center m-8 p-8">
              <Image source={require("../assets/images/logo.png")} alt="image" style={styles.logo} />
              <View className="flex-row mt-4">
                <View className="w-2 h-2 rounded-full bg-white mr-2" />
                <Text className="text-sm text-white font-semibold">Crafted with imagination and stories. All rights reserved.</Text>
              </View>
              <Link href={{ pathname: "./home" }} asChild>
                <TouchableOpacity style={styles.button}>
                  <LinearGradient colors={["rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)"]} style={styles.buttonGradient}>
                    <Text style={styles.buttonText}>Explore picBook™</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: { marginRight: 8 },
  logo: { width: 400, height: 240, marginBottom: 10 },
  button: { marginTop: 20, borderRadius: 30, overflow: "hidden" },
  gradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  content: { flex: 1, width: "100%", justifyContent: "center", alignItems: "center" },
  container: { height: "100%", width: "100%", justifyContent: "flex-start", alignItems: "center" },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  buttonGradient: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30 }
});

export default IndexPage;
