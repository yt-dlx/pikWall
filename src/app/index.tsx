// src/app/index.tsx
import { Link } from "expo-router";
import { Image } from "expo-image";
import Footer from "@/utils/Footer";
import React, { useEffect } from "react";
import Colorizer from "@/utils/Colorizer";
import imageSets from "@/database/static";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollingSlotProps } from "@/types/components";
import { Text, View, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay, withSpring, Easing, FadeIn, FadeInDown } from "react-native-reanimated";
// ============================================================================================
// ============================================================================================
const ScrollingSlot: React.FC<ScrollingSlotProps> = ({ images, reverse, delay }) => {
  const imageHeight = 220;
  const totalHeight = images.length * imageHeight;
  const scrollValue = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 1500, easing: Easing.bezier(0.4, 0, 0.2, 1) }));
    scale.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 90 }));
    scrollValue.value = withDelay(delay, withRepeat(withTiming(totalHeight, { duration: 30000, easing: Easing.linear }), -1, reverse));
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: -scrollValue.value % totalHeight }, { scale: scale.value }], opacity: opacity.value }));
  return (
    <View style={{ flex: 1, overflow: "hidden", padding: 2 }}>
      <Animated.View style={[animatedStyle]}>
        {images.concat(images).map((uri, idx) => (
          <Image
            key={idx}
            source={uri}
            contentFit="cover"
            cachePolicy="memory-disk"
            style={{
              height: imageHeight,
              borderRadius: 20,
              width: "100%",
              margin: 3,
              shadowColor: Colorizer("#000000", 1.0),
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8
            }}
          />
        ))}
      </Animated.View>
    </View>
  );
};
// ============================================================================================
// ============================================================================================
const AnimatedTitle: React.FC = () => {
  const scale = useSharedValue(0.5);
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 4000, easing: Easing.bezier(0.4, 0, 0.2, 1) }), withTiming(1.0, { duration: 4000, easing: Easing.bezier(0.4, 0, 0.2, 1) })),
      -1,
      true
    );
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View
      style={[animatedStyle, { shadowColor: Colorizer("#000000", 1.0), shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 12, alignItems: "center", marginBottom: 16 }]}
      entering={FadeIn.delay(300).duration(1500)}
    >
      <View style={{ borderRadius: 9999, padding: 4, backgroundColor: Colorizer("#000000", 0.8), justifyContent: "center", alignItems: "center" }}>
        <Image
          alt="logo"
          contentFit="contain"
          cachePolicy="memory-disk"
          source={require("@/assets/picWall/picWall.png")}
          style={{ width: 150, height: 150, borderWidth: 1, borderRadius: 9999, borderColor: Colorizer("#E9E9EA", 1.0) }}
        />
      </View>
    </Animated.View>
  );
};
// ============================================================================================
// ============================================================================================
const AppPage: React.FC = () => {
  const buttonScale = useSharedValue(1);
  const buttonRotate = useSharedValue(0);
  const buttonGlow = useSharedValue(0);
  useEffect(() => {
    buttonGlow.value = withRepeat(
      withSequence(withTiming(1, { duration: 2000, easing: Easing.bezier(0.4, 0, 0.2, 1) }), withTiming(0, { duration: 2000, easing: Easing.bezier(0.4, 0, 0.2, 1) })),
      -1,
      true
    );
  }, []);
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }, { rotate: `${buttonRotate.value}deg` }],
    shadowOpacity: 0.3 + buttonGlow.value * 0.3,
    shadowRadius: 8 + buttonGlow.value * 4
  }));
  const onPressIn = () => {
    buttonScale.value = withSpring(0.94, { damping: 15, stiffness: 90 });
    buttonRotate.value = withSpring(-2, { damping: 15, stiffness: 90 });
  };
  const onPressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 90 });
    buttonRotate.value = withSpring(0, { damping: 15, stiffness: 90 });
  };
  return (
    <View style={{ backgroundColor: Colorizer("#000000", 1.0), height: "100%", width: "100%" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative" }}>
        <View style={{ flexDirection: "row", height: "100%", overflow: "hidden", position: "relative" }}>
          {imageSets.map((images, slotIndex) => (
            <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 400} />
          ))}
          <LinearGradient
            colors={[Colorizer("#070808", 1.0), Colorizer("#070808", 0.4), Colorizer("#070808", 0.1), Colorizer("#070808", 0.4), Colorizer("#070808", 1.0)]}
            locations={[0, 0.2, 0.5, 0.8, 1]}
            style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
          />
          <View style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, justifyContent: "center", alignItems: "center", marginTop: 80 }}>
            <AnimatedTitle />
            <Animated.View entering={FadeInDown.delay(600).duration(1500).springify()}>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 80,
                    textShadowRadius: 60,
                    color: Colorizer("#E9E9EA", 1.0),
                    textShadowOffset: { width: 24, height: 2 },
                    fontFamily: "Dm_Serif_Display_Regular",
                    textShadowColor: Colorizer("#000000", 1.0)
                  }}
                >
                  picWall
                </Text>
                <Text style={{ textAlign: "center", position: "absolute", left: 0, right: 0, top: 0, fontFamily: "Dm_Serif_Display_Regular", color: Colorizer("#E9E9EA", 1.0), fontSize: 80 }}>
                  picWall
                </Text>
                <Animated.View style={{ alignSelf: "center" }} entering={FadeInDown.delay(600).duration(1500).springify()}>
                  <View style={{ backgroundColor: Colorizer("#000000", 0.9), borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8 }}>
                    <Text style={{ textAlign: "center", fontFamily: "Caveat_Bold", color: Colorizer("#E9E9EA", 1.0), fontSize: 16 }}>
                      Crafted with <Text style={{ color: Colorizer("#BE2528", 1.0) }}>♥</Text> in India
                    </Text>
                  </View>
                </Animated.View>
              </View>
              <Link href="./Home" asChild>
                <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut} style={{ marginTop: 176, borderRadius: 24, overflow: "hidden" }}>
                  <Animated.View style={[buttonAnimatedStyle, { shadowColor: Colorizer("#000000", 1.0), shadowOffset: { width: 0, height: 4 } }]}>
                    <LinearGradient
                      colors={[Colorizer("#FFFFFF", 1.0), Colorizer("#F0F0F0", 1.0)]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 40, paddingVertical: 16 }}
                    >
                      <FontAwesome5 name="camera-retro" size={32} color={Colorizer("#000000", 1.0)} style={{ marginRight: 12 }} />
                      <Text style={{ fontSize: 24, fontFamily: "Lobster_Regular", color: Colorizer("#000000", 1.0) }}> Let's Explore Wallpapers </Text>
                    </LinearGradient>
                  </Animated.View>
                </TouchableOpacity>
              </Link>
              <Animated.View entering={FadeIn.delay(1200).duration(1500)} style={{ marginTop: 10, paddingHorizontal: 20, alignItems: "center" }}>
                <Text style={{ fontFamily: "Caveat_Bold", color: Colorizer("#E9E9EA", 0.8), fontSize: 20, textAlign: "center", marginBottom: 4 }}>Personalised AI Wallpapers</Text>
                <Text style={{ fontFamily: "Kurale_Regular", color: Colorizer("#E9E9EA", 0.6), fontSize: 10, textAlign: "center", maxWidth: 200 }}>
                  Create stunning collections, share your moments, and discover amazing photographs from around the world. Join our community of passionate photographers today!
                </Text>
              </Animated.View>
            </Animated.View>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default AppPage;
