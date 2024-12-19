// app/Home/index.tsx
import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { imageUri, title } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-[#181b21] p-4 justify-center items-center">
      <TouchableOpacity onPress={() => router.back()} className="mb-4 self-start">
        <Text className="text-pink-400 font-bold text-lg">Go Back</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri as string }} className="h-96 w-96 rounded-lg shadow-lg" alt={title as string} />}
      {title && <Text className="text-xl font-bold text-white mt-4">{title}</Text>}
    </View>
  );
}
