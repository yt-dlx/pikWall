import React from "react";
import { ImageMetadata } from "../data/types";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dataString = params.data as string;
  const ImageData: ImageMetadata = JSON.parse(dataString);
  console.log(ImageData);

  return (
    <View className="flex-1 bg-[#181b21] p-4 justify-center items-center">
      <TouchableOpacity onPress={() => router.back()} className="mb-4 self-start">
        <Text className="text-pink-400 font-bold text-lg">Go Back</Text>
      </TouchableOpacity>
      <Image source={{ uri: ImageData.previewLink }} alt={ImageData.original_file_name} className="h-96 w-96 rounded-lg shadow-lg" />
      <Text className="text-xl font-bold text-white mt-4">{ImageData.title}</Text>
      {/* Download Button */}
      <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg mb-4 self-center" onPress={() => console.log("Download button pressed")}>
        <Text className="text-white font-bold text-lg">⬇️ Download (Highest Resolution)</Text>
      </TouchableOpacity>
      {/* Metadata Section */}
      <View className="bg-[#1f232b] p-4 rounded-lg shadow-lg">
        <Text className="text-white mb-2">
          <Text className="text-blue-400 font-bold">File Name: </Text>
          {ImageData.original_file_name}
        </Text>
        <Text className="text-white mb-2">
          <Text className="text-blue-400 font-bold">Format: </Text>
          {ImageData.format}
        </Text>
        <Text className="text-white mb-2">
          <Text className="text-blue-400 font-bold">Mode: </Text>
          {ImageData.mode}
        </Text>
        <Text className="text-white mb-2">
          <Text className="text-blue-400 font-bold">Size: </Text>
          {ImageData.size}
        </Text>
        <Text className="text-white mb-2">
          <Text className="text-blue-400 font-bold">Resolution: </Text>
          {ImageData.resolution}
        </Text>
        <Text className="text-white mb-2">
          <Text className="text-blue-400 font-bold">Primary Color: </Text>
          {ImageData.primary_color}
        </Text>
        <Text className="text-white mb-2">
          <Text className="text-blue-400 font-bold">Secondary Color: </Text>
          {ImageData.secondary_color}
        </Text>
        <Text className="text-white mb-2">
          <Text className="text-blue-400 font-bold">Tertiary Color: </Text>
          {ImageData.tertiary_color}
        </Text>
      </View>
    </View>
  );
}
