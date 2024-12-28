// app/_layout.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import "@/global.css";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import Colorizer from "@/components/Colorizer";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StatusBar, View } from "react-native";
// ============================================================================================
// ============================================================================================
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({ Kurale: require("@/assets/fonts/Kurale.ttf"), Britany: require("@/assets/fonts/Brittany.otf") });
  React.useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);
  if (!loaded && !error) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colorizer("#111415", 1.0) }}>
      <StatusBar backgroundColor="#111415" barStyle="light-content" />
      <LinearGradient colors={["#111415", "transparent"]} className="absolute top-0 left-0 right-0  h-20 z-50" />
      <View style={{ flex: 1, backgroundColor: Colorizer("#111415", 1.0) }} className="capitalize">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}
