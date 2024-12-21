/* eslint-disable @typescript-eslint/no-require-imports */
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Text, Dimensions, StatusBar, ActivityIndicator, Image, Alert, Animated, Easing } from "react-native";

interface ImageDataProps {
  width: number;
  height: number;
  primary: string;
  previewLink: string;
  original_file_name: string;
}

interface PreviewImageProps {
  ImageData: ImageDataProps;
  screenWidth: number;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ ImageData, screenWidth }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const aspectRatio = ImageData.width / ImageData.height;
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
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  return (
    <View style={{ position: "relative" }}>
      <LinearGradient colors={["#0A0A0A", "transparent"]} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, zIndex: 10 }} />
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", zIndex: 50 }}>
        {!imageLoading && (
          <>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolate }], borderRadius: 9999, justifyContent: "center", alignItems: "center" }}>
              <Image
                style={{ backgroundColor: ImageData.primary, width: 40, height: 40, borderRadius: 9999 }}
                source={require("../../assets/picbook/picbook_white_nobg.png")}
                resizeMode="contain"
                alt="logo"
              />
            </Animated.View>
            <Text style={{ fontFamily: "Kurale", fontSize: 20, fontWeight: "900", color: "white", textAlign: "center" }}>picBook™</Text>
          </>
        )}
      </View>
      <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: "hidden", elevation: 4 }}>
        {imageLoading && (
          <View style={{ height: imageHeight, justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
            <ActivityIndicator size="large" color={ImageData.primary} />
            <Text style={{ fontFamily: "Kurale", color: ImageData.primary, marginTop: 10 }}>Loading HD Image Preview...</Text>
          </View>
        )}
        <Animated.Image
          style={!imageLoading ? { width: screenWidth, height: imageHeight, borderTopLeftRadius: 20, borderTopRightRadius: 20, transform: [{ scale: scaleValue }] } : { width: 0, height: 0 }}
          source={{ uri: ImageData.previewLink.replace("lowRes", "highRes") }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          resizeMode="cover"
          onError={(e) => {
            setImageLoading(false);
            console.error("Image failed to load", e);
            Alert.alert("Error", "Failed to load image. Please try again.");
          }}
        />
        <View style={{ backgroundColor: ImageData.primary + "90", position: "absolute", bottom: 0, left: 0, right: 0, padding: 4 }}>
          <Text style={{ fontFamily: "Kurale", color: "white", fontWeight: "600", fontSize: 16, textAlign: "center" }}>{ImageData.original_file_name.replace(".jpg", "")}</Text>
        </View>
      </View>
    </View>
  );
};
export default function DownloadScreen() {
  const params = useLocalSearchParams();
  const rawDataString = params.data as string;
  const ImageData: ImageDataProps = JSON.parse(rawDataString);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <PreviewImage ImageData={ImageData} screenWidth={screenWidth} />
        <View style={{ flex: 1, backgroundColor: "#0A0A0A" }} className="pt-0.5">
          <View style={{ backgroundColor: ImageData.primary + "80" }} className="w-3/6 p-1 rounded-r-3xl">
            <Text className="text-white text-4xl">Image Details</Text>
          </View>
          <View style={{ backgroundColor: "#191919", height: screenHeight, marginTop: 10, borderRadius: 30, padding: 20, borderColor: ImageData.primary + "80", borderWidth: 2 }} className="mx-1">
            <Text className="text-white text-base">Additional Details Placeholder</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
