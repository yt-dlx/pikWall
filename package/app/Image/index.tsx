// app/Image/index.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import Footer from "@/components/Footer";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useRef } from "react";
import { DownloadScreenProps, ImageMetadata } from "@/types/components";
import { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from "react-native-reanimated";
import { ScrollView, View, Text, Dimensions, StatusBar, ActivityIndicator, Image, TouchableOpacity, Alert, Animated, GestureResponderEvent } from "react-native";
// ==================================================================================================
// ==================================================================================================
const PreviewImage: React.FC<{ selectedImage: ImageMetadata; screenWidth: number }> = ({ selectedImage, screenWidth }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const aspectRatio = selectedImage.width / selectedImage.height;
  const imageHeight = (screenWidth / aspectRatio) * 1.5;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([Animated.timing(scaleValue, { toValue: 1.4, duration: 4000, useNativeDriver: true }), Animated.timing(scaleValue, { toValue: 1.1, duration: 2000, useNativeDriver: true })])
    ).start();
    rotateValue.setValue(0);
    Animated.loop(Animated.timing(rotateValue, { toValue: 1, duration: 4000, useNativeDriver: true, easing: Easing.linear })).start();
  }, [scaleValue, rotateValue]);
  const rotateInterpolate = rotateValue.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  return (
    <View className="relative">
      <LinearGradient colors={["#0A0A0A", "transparent"]} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, zIndex: 10 }} />
      <View className="absolute inset-0 justify-center items-center z-50">
        {!imageLoading && (
          <>
            <Animated.View
              style={{
                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: rotateInterpolate }]
              }}
            >
              <Image className="w-10 h-10 rounded-full" style={{ backgroundColor: selectedImage.primary }} source={require("@/assets/picbook/white_nobg_1024.png")} alt="logo" resizeMode="contain" />
            </Animated.View>
            <Text className="text-center mb-1.5 leading-6" style={{ fontFamily: "Kurale", fontSize: 20, fontWeight: "900", color: selectedImage.primary }}>
              picBook™
            </Text>
          </>
        )}
      </View>
      <View className="rounded-t-2xl overflow-hidden elevation-4">
        {imageLoading && (
          <View className="justify-center items-center bg-[#0A0A0A]" style={{ height: imageHeight }}>
            <ActivityIndicator size="large" color={selectedImage.primary} />
            <Text className="mt-2.5" style={{ fontFamily: "Kurale", marginTop: 10, color: selectedImage.primary }}>
              Loading HD Image Preview...
            </Text>
          </View>
        )}
        <Animated.Image
          className="rounded-t-2xl"
          style={!imageLoading ? { width: screenWidth, height: imageHeight, transform: [{ scale: scaleValue }] } : { width: 0, height: 0 }}
          source={{ uri: selectedImage.previewLink.replace("lowRes", "highRes") }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          resizeMode="cover"
          onError={(e) => {
            setImageLoading(false);
            console.error("Image failed to load", e);
            Alert.alert("Error", "Failed to load image. Please try again.");
          }}
        />
      </View>
    </View>
  );
};

const PressToDownload: React.FC<{ onDownload?: (event: GestureResponderEvent) => void; colors: { primary: string; secondary: string; tertiary: string } }> = ({ onDownload, colors }) => {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withSequence(withTiming(1.08, { duration: 0, easing: Easing.inOut(Easing.ease) }), withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })), -1, true);
  }, [scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <TouchableOpacity onPress={onDownload} activeOpacity={0.8} style={{ backgroundColor: `${colors.primary}30` }} className="m-2 rounded-2xl overflow-hidden">
      <Animated.View className="p-3 flex-row items-center justify-center" style={animatedStyle}>
        <FontAwesome5 name="download" size={15} color={colors.primary} className="mr-2" />
        <Text className="text-base" style={{ fontFamily: "Kurale", fontSize: 16, color: colors.primary }}>
          Press To Download
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const DownloadScreen = () => {
  const params = useLocalSearchParams();
  const rawDataString = params.data as string;
  const { width: screenWidth } = Dimensions.get("window");
  const parsedData: DownloadScreenProps = JSON.parse(rawDataString);
  const selectedIndex = parseInt(parsedData.selectedIndex as unknown as string) || 0;
  const selectedImage = parsedData.data[selectedIndex];

  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <PreviewImage selectedImage={selectedImage} screenWidth={screenWidth} />
        <View className="p-2 m-2 mt-2.5 border-2 rounded-2xl bg-[#111111]" style={{ borderColor: `${selectedImage.primary}` }}>
          <Text className="mb-2" style={{ fontFamily: "Kurale", fontSize: 24, marginBottom: 8, color: selectedImage.primary }}>
            {selectedImage.original_file_name.replace(".jpg", "")}
          </Text>
          <View className="flex-row items-center my-1">
            <FontAwesome5 name="adjust" size={16} style={{ marginLeft: 5 }} color={selectedImage.primary} />
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: selectedImage.primary }}>
              Mode:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: selectedImage.primary }}>
              {selectedImage.mode}
            </Text>
          </View>
          <View className="flex-row items-center my-1">
            <FontAwesome5 name="file-alt" size={16} style={{ marginLeft: 5 }} color={selectedImage.primary} />
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: selectedImage.primary }}>
              FileSize:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: selectedImage.primary }}>
              {selectedImage.file_size_megabytes} mb
            </Text>
          </View>
          <View className="flex-row items-center my-1">
            <FontAwesome5 name="ruler-combined" size={16} style={{ marginLeft: 5 }} color={selectedImage.primary} />
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: selectedImage.primary }}>
              Dimensions:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: selectedImage.primary }}>
              {selectedImage.width} x {selectedImage.height}
            </Text>
          </View>
          <View className="p-2 m-2 bg-opacity-20 rounded-2xl" style={{ backgroundColor: `${selectedImage.primary}20` }}>
            <Text className="text-20 ml-2" style={{ fontFamily: "Kurale", fontSize: 20, marginLeft: 8, color: selectedImage.primary }}>
              Environment:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: selectedImage.primary }}>
              {parsedData.environment_prompt}
            </Text>
            <Text className="text-20 ml-2 mt-2" style={{ fontFamily: "Kurale", fontSize: 20, marginLeft: 8, color: selectedImage.primary }}>
              Moral:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: selectedImage.primary }}>
              {parsedData.environment_moral}
            </Text>
          </View>
          <PressToDownload
            onDownload={() => Alert.alert("Download initiated!")}
            colors={{
              primary: selectedImage.primary,
              secondary: selectedImage.primary,
              tertiary: selectedImage.primary
            }}
          />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};
export default DownloadScreen;
