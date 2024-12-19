import React from "react";
import { ImageMetadata } from "../data/types";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const dataString = params.data as string;
  const ImageData: ImageMetadata = JSON.parse(dataString);

  return (
    <View className="flex-1 bg-[#181b21] p-6 justify-center items-center">
      <TouchableOpacity onPress={() => router.back()} className="mb-4 self-start">
        <Text className="text-pink-400 font-bold text-lg">⬅ Go Back</Text>
      </TouchableOpacity>
      <View className="bg-[#20232a] p-6 rounded-lg shadow-lg w-full max-w-lg">
        <Image source={{ uri: ImageData.previewLink }} alt={ImageData.original_file_name} className="h-64 w-full rounded-lg shadow-md mb-4" />
        <TouchableOpacity className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center mb-6">
          <Text>⬇ Download (Highest Resolution)</Text>
        </TouchableOpacity>
        <Text className="text-gray-300 text-sm mb-2">📄 <Text className="font-semibold">File Name:</Text> {ImageData.original_file_name}</Text>
        <Text className="text-gray-300 text-sm mb-2">🖼️ <Text className="font-semibold">Format:</Text> {ImageData.format}</Text>
        <Text className="text-gray-300 text-sm mb-2">🎨 <Text className="font-semibold">Mode:</Text> {ImageData.mode}</Text>
        <Text className="text-gray-300 text-sm mb-2">📏 <Text className="font-semibold">Size:</Text> {ImageData.file_size_megabytes} MB ({ImageData.file_size_bytes} Bytes)</Text>
        <Text className="text-gray-300 text-sm mb-2">📐 <Text className="font-semibold">Resolution:</Text> {ImageData.width} X {ImageData.height}</Text>
        <Text className="text-gray-300 text-sm mb-2">🎨 <Text className="font-semibold">Primary Color:</Text> {ImageData.primary}</Text>
        <Text className="text-gray-300 text-sm mb-2">🎨 <Text className="font-semibold">Secondary Color:</Text> {ImageData.secondary}</Text>
        <Text className="text-gray-300 text-sm mb-6">🎨 <Text className="font-semibold">Tertiary Color:</Text> {ImageData.tertiary}</Text>
        <View className="flex flex-row flex-wrap justify-start">
          {Array.from({ length: 48 }).map((_, index) => (
            <View
              key={index}
              className={`h-4 w-4 m-1 rounded-full border ${index % 3 === 0 ? "bg-[#a95b45]" : index % 3 === 1 ? "bg-[#5ae783]" : "bg-[#41734d]"}`}
            ></View>
          ))}
        </View>
      </View>
    </View>
  );
}
