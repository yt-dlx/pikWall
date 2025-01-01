// src/app/_layout.tsx
import "@/global.css";
import React from "react";
import { useFonts } from "expo-font";
import useAppState from "@/utils/store";
import Colorizer from "@/utils/Colorizer";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StatusBar, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { lastState, clearState } = useAppState();
  const [loaded, error] = useFonts({
    Caveat_Bold: require("@/assets/fonts/Caveat_Bold.ttf"),
    Kurale_Regular: require("@/assets/fonts/Kurale_Regular.ttf"),
    Caveat_Regular: require("@/assets/fonts/Caveat_Regular.ttf"),
    Caveat_Medium: require("@/assets/fonts/Caveat_Medium.ttf"),
    Lobster_Regular: require("@/assets/fonts/Lobster_Regular.ttf"),
    Caveat_SemiBold: require("@/assets/fonts/Caveat_SemiBold.ttf"),
    Linotte_Bold: require("@/assets/fonts/Linotte_Bold.otf"),
    Linotte_Light: require("@/assets/fonts/Linotte_Light.otf"),
    Linotte_Heavy: require("@/assets/fonts/Linotte_Heavy.otf"),
    Linotte_Regular: require("@/assets/fonts/Linotte_Regular.otf"),
    Linotte_Semi_Bold: require("@/assets/fonts/Linotte_Semi_Bold.otf"),
    Dm_Serif_Display_Italic: require("@/assets/fonts/Dm_Serif_Display_Italic.ttf"),
    Dm_Serif_Display_Regular: require("@/assets/fonts/Dm_Serif_Display_Regular.ttf")
  });

  React.useEffect(() => {
    const initializeApp = async () => {
      if (loaded || error) {
        await SplashScreen.hideAsync();
        if (lastState) {
          router.replace({ pathname: "/Image", params: { data: JSON.stringify({ data: lastState.data, selectedIndex: lastState.selectedIndex, environment_title: lastState.environment_title }) } });
          clearState();
        }
      }
    };
    initializeApp();
  }, [loaded, error, lastState, clearState]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colorizer("#000000", 1.0) }}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <LinearGradient
        colors={[Colorizer("#000000", 1.0), Colorizer("#000000", 0.8), Colorizer("#000000", 0.6), Colorizer("#000000", 0.4), Colorizer("#000000", 0.2), "transparent"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, zIndex: 50 }}
      />
      <View style={{ flex: 1, backgroundColor: Colorizer("#000000", 1.0) }} className="capitalize">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}
