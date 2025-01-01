// src/app/index.tsx
import { Link, useRouter } from "expo-router";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import imageSets from "@/database/static";
import Footer from "@/components/Footer";
import Colorizer from "@/components/Colorizer";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollingSlotProps } from "@/types/components";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, withDelay, withSpring, Easing, FadeIn, FadeInDown } from "react-native-reanimated";
import { useAppStore, restoreStateAfterRestart } from "@/components/store";

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
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -scrollValue.value % totalHeight }, { scale: scale.value }],
    opacity: opacity.value
  }));
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
      style={[
        animatedStyle,
        {
          shadowColor: Colorizer("#000000", 1.0),
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 12
        }
      ]}
      className="items-center mb-4"
      entering={FadeIn.delay(300).duration(1500)}
    >
      <View className="rounded-full p-1" style={{ backgroundColor: Colorizer("#000000", 0.8), justifyContent: "center", alignItems: "center" }}>
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

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [isRestoring, setIsRestoring] = useState(true);
  const currentImageData = useAppStore((state) => state.currentImageData);
  const isFullScreen = useAppStore((state) => state.isFullScreen);
  const hasRestoredState = useAppStore((state) => state.hasRestoredState);
  const buttonScale = useSharedValue(1);
  const buttonGlow = useSharedValue(0);
  const buttonRotate = useSharedValue(0);
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
  useEffect(() => {
    const restoreState = async () => {
      await restoreStateAfterRestart();
      setIsRestoring(false);
    };
    restoreState();
  }, []);
  useEffect(() => {
    if (!isRestoring && currentImageData && isFullScreen) {
      const navigateToImage = async () => {
        await router.replace("/Home");
        await router.push("/Image");
      };
      navigateToImage();
    }
  }, [isRestoring, currentImageData, isFullScreen, router]);
  if (isRestoring) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colorizer("#000000", 1.0) }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: Colorizer("#000000", 1.0) }} className="h-full w-full">
      <View className="flex-1 justify-center items-center relative">
        <View className="flex-row h-full overflow-hidden relative">
          {imageSets.map((images, slotIndex) => (
            <ScrollingSlot key={slotIndex} images={images} reverse={slotIndex % 2 === 0} delay={slotIndex * 400} />
          ))}
          <LinearGradient
            colors={[Colorizer("#070808", 1.0), Colorizer("#070808", 0.4), Colorizer("#070808", 0.1), Colorizer("#070808", 0.4), Colorizer("#070808", 1.0)]}
            locations={[0, 0.2, 0.5, 0.8, 1]}
            className="absolute inset-0"
          />
          <View className="absolute inset-0 justify-center items-center mt-20">
            <AnimatedTitle />
            <Animated.View entering={FadeInDown.delay(600).duration(1500).springify()}>
              <View>
                <Text
                  className="text-center"
                  style={{
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
                <Text
                  className="text-center absolute inset-x-0 top-0"
                  style={{
                    fontFamily: "Dm_Serif_Display_Regular",
                    color: Colorizer("#E9E9EA", 1.0),
                    fontSize: 80
                  }}
                >
                  picWall
                </Text>
                <Animated.View style={{ alignSelf: "center" }} entering={FadeInDown.delay(600).duration(1500).springify()}>
                  <View style={{ backgroundColor: Colorizer("#000000", 0.9), borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4, marginTop: 8 }}>
                    <Text className="text-center" style={{ fontFamily: "Caveat_Bold", color: Colorizer("#E9E9EA", 1.0), fontSize: 16 }}>
                      Crafted with <Text style={{ color: Colorizer("#BE2528", 1.0) }}>♥</Text> in India
                    </Text>
                  </View>
                </Animated.View>
              </View>
              <Link href="./Home" asChild>
                <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut} className="mt-44 rounded-2xl overflow-hidden">
                  <Animated.View style={[buttonAnimatedStyle, { shadowColor: Colorizer("#000000", 1.0), shadowOffset: { width: 0, height: 4 } }]}>
                    <LinearGradient
                      colors={[Colorizer("#FFFFFF", 1.0), Colorizer("#F0F0F0", 1.0)]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="flex-row items-center justify-center px-10 py-4"
                    >
                      <FontAwesome5 name="camera-retro" size={32} color={Colorizer("#000000", 1.0)} style={{ marginRight: 12 }} />
                      <Text className="text-2xl" style={{ fontFamily: "Lobster_Regular", color: Colorizer("#000000", 1.0) }}>
                        Let's Explore Wallpapers
                      </Text>
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

export default IndexPage;
