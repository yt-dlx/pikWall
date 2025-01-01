// src/utils/HeaderAnimated.tsx
import Colorizer from "./Colorizer";
import React, { useEffect } from "react";
import imageSets from "@/database/static";
import { Text, View, Image } from "react-native";
import { ScrollingSlotProps } from "@/types/components";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay, FadeInDown } from "react-native-reanimated";
// ============================================================================================
// ============================================================================================
const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse, delay }) => {
  const imageHeight = 150;
  const totalHeight = images.length * imageHeight;
  const scrollValue = useSharedValue(0);
  const opacity = useSharedValue(0);
  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 1000 }));
    scrollValue.value = withDelay(delay, withRepeat(withTiming(totalHeight, { duration: 10000 }), -1, reverse));
  }, [scrollValue, totalHeight, reverse, delay, opacity]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -scrollValue.value % totalHeight }], opacity: opacity.value }));
  return (
    <View style={{ flex: 1, overflow: "hidden", paddingHorizontal: 4 }}>
      <Animated.View style={animatedStyle}>
        {images.concat(images).map((uri: string, idx: number) => (
          <Image key={idx} source={{ uri }} alt="Scrolling Image" style={{ width: "100%", height: 96, borderRadius: 8, marginBottom: 4, resizeMode: "cover" }} />
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
    <Animated.View style={[animatedStyle, { alignItems: "center", marginTop: 40 }]}>
      <View style={{ backgroundColor: Colorizer("#000000", 0.6), borderRadius: 9999, padding: 4 }}>
        <Image
          source={require("@/assets/picWall/picWall.png")}
          alt="logo"
          style={{ width: 96, height: 96, borderRadius: 9999, borderWidth: 2, borderColor: Colorizer("#E9E9EA", 1.0), resizeMode: "contain" }}
        />
      </View>
    </Animated.View>
  );
};
// ============================================================================================
// ============================================================================================
const HeaderAnimated: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", overflow: "hidden", borderRadius: 16, position: "relative", height: 300 }}>
        {imageSets.map((images, slotIndex) => (
          <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 200} />
        ))}
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", borderRadius: 8, overflow: "hidden" }}>
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: Colorizer("#000000", 0.5) }} />
          <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", margin: 8, padding: 4 }}>
            <View style={{ flexDirection: "row", marginBottom: 4 }}>
              <AnimatedTitle />
            </View>
            <Text style={{ fontFamily: "Dm_Serif_Display_Regular", fontSize: 30, color: Colorizer("#E9E9EA", 1.0), letterSpacing: -1, lineHeight: 34 }}> picWall </Text>
            <Animated.View style={{ alignSelf: "center", marginTop: 8 }} entering={FadeInDown.delay(600).duration(1500).springify()}>
              <View style={{ backgroundColor: Colorizer("#000000", 0.9), borderRadius: 12, paddingHorizontal: 12, paddingVertical: 2, marginTop: 2 }}>
                <Text style={{ textAlign: "center", fontFamily: "Caveat_Bold", color: Colorizer("#E9E9EA", 1.0), fontSize: 16 }}>
                  Crafted with <Text style={{ color: Colorizer("#BE2528", 1.0) }}>♥</Text> in India
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HeaderAnimated;
