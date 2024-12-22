/* eslint-disable @typescript-eslint/no-require-imports */
"../global.css";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Image, StyleSheet } from "react-native";
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

const HeaderAnimate: React.FC = () => {
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
          <Image source={require("@/assets/picbook/white_nobg_1024.png")} alt="logo" className="w-16 h-16 border-white border-2 rounded-full" resizeMode="contain" />
        </View>
        <Text style={{ fontFamily: "Kurale" }} className="text-7xl font-black text-white tracking-tight">
          picBook™
        </Text>
      </Animated.View>
    );
  };
  return (
    <View className="flex-1 items-center justify-center m-4">
      <View style={{ height: 300 }} className="flex-row overflow-hidden rounded-xl relative">
        {imageSets.map((images, slotIndex) => {
          return <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 200} />;
        })}
        <View style={styles.overlay} className="rounded-2xl text-center">
          <View style={styles.blurredBackground} />
          <View className="absolute justify-center items-center m-4 p-2">
            <View className="flex-row mb-2">
              <AnimatedTitle />
            </View>
            <View className="flex-row items-center mt-4 bg-black/30 px-4 py-2 rounded-full">
              <View className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
              <Text style={{ fontFamily: "Kurale" }} className="text-sm text-white font-semibold">
                Crafted with imagination and stories
              </Text>
            </View>
            <Text style={{ fontFamily: "Kurale" }} className="text-xl text-gray-300 mt-4 leading-7 font-medium text-center">
              Dive into tales inspired by unique images and discover the art of visual environment telling.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blurredBackground: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#0A0A0A", opacity: 0.5, borderRadius: 15 },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", borderRadius: 10, overflow: "hidden" }
});

export default HeaderAnimate;
