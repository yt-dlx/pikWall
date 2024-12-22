/* eslint-disable @typescript-eslint/no-require-imports */
import Footer from "@/components/Footer";
import { ImageMetadata } from "@/types/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useRef } from "react";
import { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from "react-native-reanimated";
import { ScrollView, View, Text, Dimensions, StatusBar, ActivityIndicator, Image, TouchableOpacity, Alert, Animated, GestureResponderEvent } from "react-native";

type DownloadScreenProps = {
  environment_title: string;
  environment_prompt: string;
  environment_moral: string;
  data: ImageMetadata[];
};

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
    <View style={{ position: "relative" }}>
      <LinearGradient colors={["#0A0A0A", "transparent"]} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, zIndex: 10 }} />
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", zIndex: 50 }}>
        {!imageLoading && (
          <>
            <Animated.View style={{ borderRadius: 9999, justifyContent: "center", alignItems: "center", transform: [{ rotate: rotateInterpolate }] }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: data.data[0].primary }}
                source={require("../../assets/picbook/picbook_white_nobg.png")}
                resizeMode="contain"
                alt="logo"
              />
            </Animated.View>
            <Text style={{ fontFamily: "Kurale", fontSize: 20, fontWeight: "900", color: "white", textAlign: "center" }}> picBook™ </Text>
          </>
        )}
      </View>
      <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: "hidden", elevation: 4 }}>
        {imageLoading && (
          <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A", height: imageHeight }}>
            <ActivityIndicator size="large" color={data.data[0].primary} /> <Text style={{ fontFamily: "Kurale", marginTop: 10, color: data.data[0].primary }}> Loading HD Image Preview... </Text>
          </View>
        )}
        <Animated.Image
          style={!imageLoading ? { width: screenWidth, height: imageHeight, borderTopLeftRadius: 20, borderTopRightRadius: 20, transform: [{ scale: scaleValue }] } : { width: 0, height: 0 }}
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

const PressToDownload: React.FC<{ onDownload?: (event: GestureResponderEvent) => void }> = ({ onDownload }) => {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withSequence(withTiming(1.08, { duration: 800, easing: Easing.inOut(Easing.ease) }), withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })), -1, true);
  }, [scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <TouchableOpacity onPress={onDownload} activeOpacity={0.8} style={{ margin: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.3)", overflow: "hidden" }}>
      <Animated.View style={[{ padding: 12, flexDirection: "row", alignItems: "center", justifyContent: "center" }, animatedStyle]}>
        <FontAwesome5 name="download" size={15} color="#FFFFFF" style={{ marginRight: 8 }} /> <Text style={{ fontFamily: "Kurale", fontSize: 16, color: "#FFFFFF" }}> Press To Download </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const DownloadScreen = () => {
  const params = useLocalSearchParams();
  const rawDataString = params.data as string;
  const { width: screenWidth } = Dimensions.get("window");
  const data: DownloadScreenProps = JSON.parse(rawDataString);

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <PreviewImage data={data} screenWidth={screenWidth} />
        <View style={{ padding: 8, margin: 10, marginTop: 10, borderWidth: 2, borderRadius: 20, backgroundColor: "#111111", borderColor: `${data.data[0].primary}80` }}>
          <Text style={{ fontFamily: "Kurale", fontSize: 24, marginBottom: 8, color: data.data[0].primary }}> {data.data[0].original_file_name.replace(".jpg", "")} </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}>
            <FontAwesome5 name="adjust" size={16} color={`${data.data[0].primary}`} style={{ marginLeft: 20 }} />
            <Text style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}` }}> Mode: </Text>
            <Text style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}> {data.data[0].mode} </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}>
            <FontAwesome5 name="file-alt" size={16} color={`${data.data[0].primary}`} style={{ marginLeft: 20 }} />
            <Text style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}` }}> FileSize: </Text>
            <Text style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}> {data.data[0].file_size_megabytes} mb </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 4 }}>
            <FontAwesome5 name="ruler-combined" size={16} color={`${data.data[0].primary}`} style={{ marginLeft: 20 }} />
            <Text style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}` }}> Dimensions: </Text>
            <Text style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}>
              {data.data[0].width} x {data.data[0].height}
            </Text>
          </View>
          <View style={{ padding: 10, margin: 8, backgroundColor: `${data.data[0].primary}20`, borderRadius: 20 }}>
            <Text style={{ fontFamily: "Kurale", fontSize: 20, marginLeft: 8, color: `${data.data[0].primary}` }}> Environment: </Text>
            <Text style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}> {data.environment_prompt} </Text>
            <Text style={{ fontFamily: "Kurale", fontSize: 20, marginLeft: 8, color: `${data.data[0].primary}` }}> Moral: </Text>
            <Text style={{ fontFamily: "Kurale", fontSize: 16, marginLeft: 8, color: `${data.data[0].primary}90` }}> {data.environment_moral} </Text>
          </View>
          <PressToDownload onDownload={() => Alert.alert("Download initiated!")} />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default DownloadScreen;
