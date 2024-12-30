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
  const [loaded, error] = useFonts({
    Kurale: require("@/assets/fonts/Kurale.ttf"),
    Brittany: require("@/assets/fonts/Brittany.otf"),
    Monoton: require("@/assets/fonts/Monoton.ttf"),
    Achemost: require("@/assets/fonts/Achemost.otf"),
    LinotteBold: require("@/assets/fonts/LinotteBold.otf"),
    LinotteLight: require("@/assets/fonts/LinotteLight.otf"),
    LinotteHeavy: require("@/assets/fonts/LinotteHeavy.otf"),
    LinotteRegular: require("@/assets/fonts/LinotteRegular.otf"),
    LinotteSemiBold: require("@/assets/fonts/LinotteSemiBold.otf")
  });
  React.useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);
  if (!loaded && !error) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colorizer("#070808", 1.0) }}>
      <StatusBar backgroundColor="#070808" barStyle="light-content" />
      <LinearGradient
        colors={[Colorizer("#070808", 1.0), Colorizer("#070808", 0.8), Colorizer("#070808", 0.6), Colorizer("#070808", 0.4), Colorizer("#070808", 0.2), "transparent"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, zIndex: 50 }}
      />
      <View style={{ flex: 1, backgroundColor: Colorizer("#070808", 1.0) }} className="capitalize">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}
