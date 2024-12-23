// app/Image/index.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import Footer from "@/components/Footer";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { DownloadScreenProps } from "@/types/home";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useRef } from "react";
import { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from "react-native-reanimated";
import { ScrollView, View, Text, Dimensions, StatusBar, ActivityIndicator, Image, TouchableOpacity, Alert, Animated, GestureResponderEvent } from "react-native";
// ==================================================================================================
// ==================================================================================================
const PreviewImage: React.FC<{ data: DownloadScreenProps; screenWidth: number }> = ({ data, screenWidth }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const aspectRatio = data.data[0].width / data.data[0].height;
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
            <Animated.View style={{ borderRadius: 9999, justifyContent: "center", alignItems: "center", transform: [{ rotate: rotateInterpolate }] }}>
              <Image className="w-10 h-10 rounded-full" style={{ backgroundColor: data.data[0].primary }} source={require("@/assets/picbook/white_nobg_1024.png")} alt="logo" resizeMode="contain" />
            </Animated.View>
            <Text className="text-center mb-1.5 leading-6" style={{ fontFamily: "Kurale", fontSize: 20, fontWeight: "900", color: "white" }}>
              picBook™
            </Text>
          </>
        )}
      </View>
      <View className="rounded-t-2xl overflow-hidden elevation-4">
        {imageLoading && (
          <View className="justify-center items-center bg-[#0A0A0A]" style={{ height: imageHeight }}>
            <ActivityIndicator size="large" color={data.data[0].primary} />
            <Text className="mt-2.5" style={{ fontFamily: "Kurale", marginTop: 10, color: data.data[0].primary }}>
              Loading HD Image Preview...
            </Text>
          </View>
        )}
        <Animated.Image
          className="rounded-t-2xl"
          style={!imageLoading ? { width: screenWidth, height: imageHeight, transform: [{ scale: scaleValue }] } : { width: 0, height: 0 }}
          source={{ uri: data.data[0].previewLink.replace("lowRes", "highRes") }}
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
// ==================================================================================================
// ==================================================================================================
const PressToDownload: React.FC<{ onDownload?: (event: GestureResponderEvent) => void }> = ({ onDownload }) => {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withSequence(withTiming(1.08, { duration: 800, easing: Easing.inOut(Easing.ease) }), withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })), -1, true);
  }, [scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <TouchableOpacity onPress={onDownload} activeOpacity={0.8} className="m-2 rounded-2xl bg-[rgba(255,255,255,0.3)] bg-opacity-30 overflow-hidden">
      <Animated.View className="p-3 flex-row items-center justify-center" style={animatedStyle}>
        <FontAwesome5 name="download" size={15} color="#FFFFFF" className="mr-2" />
        <Text className="text-base" style={{ fontFamily: "Kurale", fontSize: 16, color: "#FFFFFF" }}>
          Press To Download
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
// ==================================================================================================
// ==================================================================================================
const DownloadScreen = () => {
  const params = useLocalSearchParams();
  const rawDataString = params.data as string;
  const { width: screenWidth } = Dimensions.get("window");
  const data: DownloadScreenProps = JSON.parse(rawDataString);
  return (
    <View className="flex-1 bg-[#0A0A0A]">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <PreviewImage data={data} screenWidth={screenWidth} />
        <View className="p-2 m-2 mt-2.5 border-2 rounded-2xl bg-[#111111]" style={{ borderColor: `${data.data[0].primary}80` }}>
          <Text className="mb-2" style={{ fontFamily: "Kurale", fontSize: 24, marginBottom: 8, color: data.data[0].primary }}>
            {data.data[0].original_file_name.replace(".jpg", "")}
          </Text>
          <View className="flex-row items-center my-1">
            <FontAwesome5 name="adjust" size={16} style={{ marginLeft: 5 }} color={data.data[0].primary} />
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: data.data[0].primary }}>
              Mode:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}>
              {data.data[0].mode}
            </Text>
          </View>
          <View className="flex-row items-center my-1">
            <FontAwesome5 name="file-alt" size={16} style={{ marginLeft: 5 }} color={data.data[0].primary} />
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: data.data[0].primary }}>
              FileSize:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}>
              {data.data[0].file_size_megabytes} mb
            </Text>
          </View>
          <View className="flex-row items-center my-1">
            <FontAwesome5 name="ruler-combined" size={16} style={{ marginLeft: 5 }} color={data.data[0].primary} />
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: data.data[0].primary }}>
              Dimensions:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}>
              {data.data[0].width} x {data.data[0].height}
            </Text>
          </View>
          <View className="p-2 m-2 bg-opacity-20 rounded-2xl" style={{ backgroundColor: `${data.data[0].primary}20` }}>
            <Text className="text-20 ml-2" style={{ fontFamily: "Kurale", fontSize: 20, marginLeft: 8, color: data.data[0].primary }}>
              Environment:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}>
              {data.environment_prompt}
            </Text>
            <Text className="text-20 ml-2 mt-2" style={{ fontFamily: "Kurale", fontSize: 20, marginLeft: 8, color: data.data[0].primary }}>
              Moral:
            </Text>
            <Text className="text-16 ml-2" style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}>
              {data.environment_moral}
            </Text>
          </View>
          <PressToDownload onDownload={() => Alert.alert("Download initiated!")} />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};
export default DownloadScreen;
