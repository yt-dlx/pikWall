/* eslint-disable @typescript-eslint/no-require-imports */
import "../global.css";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({ Kurale: require("../assets/fonts/Kurale.ttf") });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-black font-kurale">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
