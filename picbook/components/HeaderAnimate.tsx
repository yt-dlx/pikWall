"../global.css";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Image, StyleSheet } from "react-native";
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
          <Image key={idx} alt="image" source={{ uri }} className="w-full h-36" resizeMode="cover" blurRadius={1.4} />
        ))}
      </Animated.View>
    </View>
  );
};

const HeaderAnimate: React.FC = () => {
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

  return (
    <View className="flex-1 items-center justify-center m-4">
      <View className="flex-row h-40 overflow-hidden rounded-xl relative">
        {imageSets.map((images, slotIndex) => {
          const isEven = slotIndex % 2 === 0;
          return <ScrollingSlot key={slotIndex} images={images} reverse={isEven} />;
        })}
        <View style={styles.overlay} className="rounded-2xl text-center">
          <View style={styles.blurredBackground} />
          <View className="absolute justify-center items-center m-4 p-2">
            <View className="flex-row mb-2">
              <Text className="text-6xl font-black text-pink-400 tracking-tight">picBook™</Text>
            </View>
            <View className="flex-row">
              <View className="w-2 h-2 rounded-full" />
              <Text className="text-sm text-pink-400 font-semibold">Crafted with imagination and stories. All rights reserved.</Text>
            </View>
            <Text className="text-xl text-gray-300 mt-4 leading-7 font-medium">
              Dive into tales inspired by unique images and discover the art of <Text className="text-pink-400 font-bold">visual environment telling</Text>.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", borderRadius: 10, overflow: "hidden" },
  blurredBackground: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000000", opacity: 0.8, borderRadius: 10 }
});

export default HeaderAnimate;
