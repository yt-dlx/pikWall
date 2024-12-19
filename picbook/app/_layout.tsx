/* eslint-disable @typescript-eslint/no-require-imports */
import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, Image, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Footer: React.FC = () => (
  <View className="relative w-full bg-[#13151a] py-4">
    <View className="flex flex-col sm:flex-row items-center justify-between px-4">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="book" size={16} color="#cdd6f4" />
        <Text className="text-[#cdd6f4] font-semibold text-sm">picBook</Text>
      </View>
      <Text className="text-[#a6adc8] text-center text-xs">Crafted with imagination and stories. All rights reserved.</Text>
    </View>
  </View>
);

const HeaderSection = () => (
  <View className="bg-[#13151a] p-4 m-2 rounded-2xl">
    <View className="items-center">
      <Image source={require("../assets/images/logo.png")} alt="logo" style={{ width: 100, height: 100, resizeMode: "contain" }} />
    </View>
    <Text className="text-6xl font-extrabold text-orange-400 text-center">picBook™</Text>
    <Text className="text-xl text-gray-300 mt-4">Dive Into Tales Inspired By Unique Images And Discover The Art Of Visual Environment Telling.</Text>
  </View>
);

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#181b21" barStyle="light-content" />
      <HeaderSection />
      <View className="flex-1 bg-[#1a1a2e]">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <Footer />
    </SafeAreaView>
  );
}
