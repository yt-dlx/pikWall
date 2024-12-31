// app/_layout.tsx
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
    Linotte_Bold: require("@/assets/fonts/Linotte_Bold.otf"),
    Linotte_Light: require("@/assets/fonts/Linotte_Light.otf"),
    Linotte_Heavy: require("@/assets/fonts/Linotte_Heavy.otf"),
    Linotte_Regular: require("@/assets/fonts/Linotte_Regular.otf"),
    Linotte_Semi_Bold: require("@/assets/fonts/Linotte_Semi_Bold.otf")
  });
  React.useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);
  if (!loaded && !error) return null;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colorizer("#171717", 1.0) }}>
      <StatusBar backgroundColor="#171717" barStyle="light-content" />
      <LinearGradient
        colors={[Colorizer("#171717", 1.0), Colorizer("#171717", 0.8), Colorizer("#171717", 0.6), Colorizer("#171717", 0.4), Colorizer("#171717", 0.2), "transparent"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, zIndex: 50 }}
      />
      <View style={{ flex: 1, backgroundColor: Colorizer("#171717", 1.0) }} className="capitalize">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}
