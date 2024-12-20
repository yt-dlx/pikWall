import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

const Footer: React.FC = () => (
  <View className="relative w-full py-4">
    <View className="flex flex-col sm:flex-row items-center justify-between px-4">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="book" size={16} color="#cdd6f4" />
        <Text className="text-[#cdd6f4] font-semibold text-sm">picBook™</Text>
      </View>
      <Text className="text-[#a6adc8] text-center text-xs">Crafted with imagination and stories. All rights reserved.</Text>
    </View>
  </View>
);

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View className="flex-1 bg-black">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <Footer />
    </SafeAreaView>
  );
}
