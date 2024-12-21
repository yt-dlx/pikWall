/* eslint-disable @typescript-eslint/no-require-imports */
import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

const Footer: React.FC = () => (
  <View style={{ backgroundColor: "#0A0A0A" }} className="relative w-full py-4">
    <View className="flex flex-col sm:flex-row items-center justify-between px-4">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="book" size={16} color="#cdd6f4" />
        <Text style={{ fontFamily: "Kurale" }} className="text-[#cdd6f4] font-semibold text-sm">
          picBook™
        </Text>
      </View>
      <Text style={{ fontFamily: "Kurale" }} className="text-[#a6adc8] text-center text-xs">
        Crafted with imagination and stories. All rights reserved.
      </Text>
    </View>
  </View>
);

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({ Kurale: require("../assets/fonts/Kurale.ttf") });
  React.useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);
  if (!loaded && !error) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      <StatusBar backgroundColor="#0A0A0A" barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: "#0A0A0A" }} className="capitalize">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <Footer />
    </SafeAreaView>
  );
}
