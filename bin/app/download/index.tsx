/* eslint-disable @typescript-eslint/no-require-imports */
import { ImageMetadata } from "../../types/types";
import { ProgressBar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import { View, Image, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Dimensions, Animated } from "react-native";
//  =======================================================================================
//  =======================================================================================
interface ImageProps {
  ImageData: ImageMetadata;
  isHorizontal: boolean;
  screenWidth: number;
  screenHeight: number;
}
//  =======================================================================================
//  =======================================================================================
const HorizontalImage: React.FC<ImageProps> = ({ ImageData, screenWidth }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const aspectRatio = ImageData.width / ImageData.height;
  const imageWidth = screenWidth;
  const imageHeight = imageWidth / aspectRatio;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([Animated.timing(scaleValue, { toValue: 1.2, duration: 2000, useNativeDriver: true }), Animated.timing(scaleValue, { toValue: 1, duration: 2000, useNativeDriver: true })])
    ).start();
  }, [scaleValue]);
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return (
    <View className="relative">
      <View className="absolute inset-0 z-50 flex justify-center items-center">
        <Animated.View style={{ transform: [{ scale: scaleValue }, { rotate: rotateInterpolate }] }} className="rounded-full flex items-center">
          <Image style={{ backgroundColor: ImageData.primary }} alt="logo" source={require("../../assets/picbook/picbook_white_nobg.png")} className="w-10 h-10 rounded-full" resizeMode="contain" />
        </Animated.View>
        <Text style={{ fontFamily: "Kurale" }} className="text-xl font-black text-white tracking-tight">
          picBook™
        </Text>
      </View>
      <View style={{ borderColor: ImageData.primary, borderWidth: 1, borderRadius: 15, overflow: "hidden" }} className="shadow-lg">
        {imageLoading && (
          <View style={{ height: imageHeight, justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
            <ActivityIndicator size="large" color={ImageData.primary} />
            <Text style={{ fontFamily: "Kurale", color: ImageData.primary, marginTop: 10 }}>Loading HD Image Preview...</Text>
          </View>
        )}
        <View className="relative">
          <Image
            alt="horizontal-image"
            resizeMode="cover"
            source={{ uri: ImageData.previewLink.replace("lowRes", "highRes") }}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={(e) => {
              console.error("Image failed to load", e);
              setImageLoading(false);
              Alert.alert("Error", "Failed to load image. Please try again.");
            }}
            style={!imageLoading ? { width: imageWidth, height: imageHeight, borderRadius: 15 } : { width: 0, height: 0 }}
          />
          {!imageLoading && (
            <LinearGradient
              colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.2)"]}
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 15 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          )}
        </View>
        <View style={{ backgroundColor: ImageData.primary + "80" }} className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-0.5 rounded-b-2xl">
          <Text style={{ fontFamily: "Kurale" }} className="text-white font-semibold text-lg text-center">
            {ImageData.original_file_name.replace(".jpg", "")}
          </Text>
        </View>
      </View>
    </View>
  );
};
//  =======================================================================================
//  =======================================================================================
const VerticalImage: React.FC<ImageProps> = ({ ImageData, screenHeight }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const aspectRatio = ImageData.width / ImageData.height;
  const fullHeight = screenHeight * 0.9;
  const fullWidth = fullHeight * aspectRatio;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([Animated.timing(scaleValue, { toValue: 1.2, duration: 1000, useNativeDriver: true }), Animated.timing(scaleValue, { toValue: 1, duration: 2000, useNativeDriver: true })])
    ).start();
    Animated.loop(Animated.timing(rotateValue, { toValue: 1, duration: 6000, useNativeDriver: true })).start();
  }, [scaleValue, rotateValue]);
  const rotateInterpolate = rotateValue.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  return (
    <View style={{ marginTop: 5, height: fullHeight, width: "100%", overflow: "hidden" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View className="relative">
          <View className="absolute inset-0 z-50 flex justify-center items-center">
            <Animated.View style={{ transform: [{ scale: scaleValue }, { rotate: rotateInterpolate }] }} className="rounded-full flex items-center">
              <Image
                style={{ backgroundColor: ImageData.primary }}
                source={require("../../assets/picbook/picbook_white_nobg.png")}
                alt="logo"
                className="w-10 h-10 rounded-full"
                resizeMode="contain"
              />
            </Animated.View>
            <Text style={{ fontFamily: "Kurale" }} className="text-xl font-black text-white tracking-tight">
              picBook™
            </Text>
          </View>
          <View style={{ borderColor: ImageData.primary, borderWidth: 1, borderRadius: 15, overflow: "hidden" }} className="shadow-lg">
            {imageLoading && (
              <View style={{ height: fullHeight, width: fullWidth, justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
                <ActivityIndicator size="large" color={ImageData.primary} />
                <Text style={{ fontFamily: "Kurale", color: ImageData.primary, marginTop: 10 }}>Loading HD Image Preview...</Text>
              </View>
            )}
            <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ width: fullWidth }}>
              <View>
                <Image
                  alt="vertical-image"
                  resizeMode="cover"
                  source={{ uri: ImageData.previewLink.replace("lowRes", "highRes") }}
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  onError={(e) => {
                    console.error("Image failed to load", e);
                    setImageLoading(false);
                    Alert.alert("Error", "Failed to load image. Please try again.");
                  }}
                  style={!imageLoading ? { width: fullWidth, height: fullHeight, borderRadius: 15 } : { width: 0, height: 0 }}
                />
                {!imageLoading && (
                  <LinearGradient
                    colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.2)"]}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: 15 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};
//  =======================================================================================
//  =======================================================================================
export default function DownloadScreen() {
  const params = useLocalSearchParams();
  const rawDataString = params.data as string;
  const ImageData: ImageMetadata = JSON.parse(rawDataString);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
  };
  return (
    <ScrollView style={{ backgroundColor: "#0A0A0A", flex: 1 }}>
      <View style={{ padding: 8 }}>
        <HorizontalImage ImageData={ImageData} isHorizontal={true} screenWidth={screenWidth} screenHeight={screenHeight} />
        <TouchableOpacity
          disabled={isDownloading}
          onPress={handleDownload}
          style={{
            backgroundColor: ImageData.primary + "90",
            paddingVertical: 8,
            paddingHorizontal: 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
            opacity: isDownloading ? 0.5 : 1,
            borderRadius: 10
          }}
        >
          <MaterialIcons name="file-download" size={15} color="#ffffff" />
          <Text style={{ fontFamily: "Kurale", color: "#ffffff", fontWeight: "bold", fontSize: 12, margin: 4 }}>{isDownloading ? "Downloading..." : "Download (Highest Resolution)"}</Text>
          <MaterialIcons name="file-download" size={15} color="#ffffff" />
        </TouchableOpacity>
        {isDownloading && (
          <View style={{ marginBottom: 24 }}>
            <ProgressBar progress={downloadProgress} color={ImageData.primary} />
            <Text style={{ fontFamily: "Kurale", color: "#A9A9A9", fontSize: 12, marginTop: 8 }}>{Math.round(downloadProgress * 100)}% Complete</Text>
          </View>
        )}
        <VerticalImage ImageData={ImageData} isHorizontal={false} screenWidth={screenWidth} screenHeight={screenHeight} />
      </View>
    </ScrollView>
  );
}
//  =======================================================================================
//  =======================================================================================
// interface InfoRowProps {
// icon: JSX.Element;
// label: string;
// value: string | number;
// }
// const ImageDetails: React.FC<{ ImageData: ImageMetadata }> = ({ ImageData }) => {
// const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
// <View className="flex-row items-center py-3 border-b border-gray-800">
// {icon}
// <View className="ml-3">
// <Text style={{ fontFamily: "Kurale" }} className="text-gray-400 text-xs mb-1">
// {label}
// </Text>
// <Text style={{ fontFamily: "Kurale" }} className="text-gray-200 font-medium">
// {value}
// </Text>
// </View>
// </View>
// );
// return (
// <View style={{ backgroundColor: ImageData.primary + "20", borderColor: ImageData.primary, borderWidth: 1 }} className="rounded-xl p-4 mb-6">
// <Text style={{ fontFamily: "Kurale" }} className="text-gray-200 font-bold text-lg mb-4">
// Image Details
// </Text>
// <InfoRow icon={<Feather name="image" size={20} color="#9ca3af" />} label="Format" value={ImageData.format.toUpperCase()} />
// <InfoRow icon={<MaterialIcons name="palette" size={20} color="#9ca3af" />} label="Mode" value={ImageData.mode} />
// <InfoRow label="File Size" icon={<AntDesign name="database" size={20} color="#9ca3af" />} value={`${ImageData.file_size_megabytes} MB (${ImageData.file_size_bytes.toLocaleString()} Bytes)`} />
// <InfoRow icon={<FontAwesome name="expand" size={20} color="#9ca3af" />} label="Resolution" value={`${ImageData.width} × ${ImageData.height}`} />
// </View>
// );
// };
// const ColorPalette: React.FC<{ ImageData: ImageMetadata }> = ({ ImageData }) => {
// return (
// <View style={{ backgroundColor: ImageData.primary + "20", borderColor: ImageData.primary, borderWidth: 1 }} className="rounded-xl p-4">
// <Text style={{ fontFamily: "Kurale" }} className="text-gray-200 font-bold text-lg mb-4">
// Extra Color Palette
// </Text>
// <View className="flex-wrap flex-row justify-between">
// {Array.from({ length: 46 }, (_, i) => `more_${i + 4}`).map((key, index) => {
// const color = ImageData[key] as string;
// return color ? (
// <View key={index} className="items-center mb-4">
// <View style={{ backgroundColor: color }} className="w-10 h-10 rounded-xl" />
// <Text style={{ fontFamily: "Kurale" }} className="text-gray-300 text-xs">
// {color}
// </Text>
// </View>
// ) : null;
// })}
// </View>
// </View>
// );
// };
