import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#181b21" barStyle="light-content" />
      <View className="flex-1 bg-[#1a1a2e]">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}
