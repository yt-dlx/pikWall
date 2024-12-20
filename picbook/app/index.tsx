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

import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
            <View className="absolute justify-center items-center m-4 p-2">
              <View className="flex-row mb-2">
                <Text className="text-6xl font-black text-white tracking-tight">picBook™</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full" />
                <Text className="text-sm text-white font-semibold">Crafted with imagination and stories. All rights reserved.</Text>
              </View>
              <Text className="text-xl text-gray-300 mt-4 leading-7 font-medium">
                Dive into tales inspired by unique images and discover the art of <Text className="text-white font-bold">visual environment telling</Text>.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  content: { flex: 1, width: "100%", justifyContent: "center", alignItems: "center" },
  container: { height: "100%", width: "100%", justifyContent: "flex-start", alignItems: "center" },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", overflow: "hidden" }
});

export default IndexPage;
