/* eslint-disable @typescript-eslint/no-require-imports */
import "@/global.css";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView, StatusBar, View } from "react-native";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({ Kurale: require("@/assets/fonts/Kurale.ttf"), Britany: require("@/assets/fonts/Brittany.otf") });
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
    </SafeAreaView>
  );
}
