import React from "react";
import { ImageMetadata } from "../../types/types";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

interface InfoRowProps {
  icon: JSX.Element;
  label: string;
  value: string | number;
}

export default function DownloadScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rawDataString = params.data as string;
  const ImageData: ImageMetadata = JSON.parse(rawDataString);
  const colorSection = [
    { color: ImageData.primary, label: "Primary" },
    { color: ImageData.secondary, label: "Secondary" },
    { color: ImageData.tertiary, label: "Tertiary" }
  ];
  const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
    <View className="flex-row items-center py-3 border-b border-gray-800">
      {icon}
      <View className="ml-3">
        <Text className="text-gray-400 text-xs mb-1">{label}</Text>
        <Text className="text-gray-200 font-medium">{value}</Text>
      </View>
    </View>
  );
  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-6 flex-row items-center">
          <FontAwesome name="arrow-left" size={18} color="#f472b6" />
          <Text className="text-pink-400 font-bold text-lg ml-2">Back</Text>
        </TouchableOpacity>
        <View className="relative mb-6 rounded-xl overflow-hidden shadow-lg">
          <Image source={{ uri: ImageData.previewLink }} alt="image" className="w-full h-64" resizeMode="cover" />
          <View className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
            <Text className="text-white font-semibold text-lg">{ImageData.original_file_name}</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-pink-500 py-4 px-6 rounded-lg mb-8 flex-row justify-center items-center">
          <MaterialIcons name="file-download" size={24} color="#ffffff" />
          <Text className="text-white font-bold text-lg ml-2">Download Image</Text>
        </TouchableOpacity>
        <View className="bg-gray-800/50 rounded-xl p-4 mb-6">
          <Text className="text-gray-200 font-bold text-lg mb-4">Image Details</Text>
          <InfoRow icon={<Feather name="image" size={20} color="#9ca3af" />} label="Format" value={ImageData.format.toUpperCase()} />
          <InfoRow icon={<MaterialIcons name="palette" size={20} color="#9ca3af" />} label="Mode" value={ImageData.mode} />
          <InfoRow
            icon={<AntDesign name="database" size={20} color="#9ca3af" />}
            label="File Size"
            value={`${ImageData.file_size_megabytes} MB (${ImageData.file_size_bytes.toLocaleString()} Bytes)`}
          />
          <InfoRow icon={<FontAwesome name="expand" size={20} color="#9ca3af" />} label="Resolution" value={`${ImageData.width} × ${ImageData.height}`} />
        </View>
        <View className="bg-gray-800/50 rounded-xl p-4">
          <Text className="text-gray-200 font-bold text-lg mb-4">Color Palette</Text>
          <View className="flex-row justify-between">
            {colorSection.map((item, index) => (
              <View key={index} className="items-center">
                <View style={{ backgroundColor: item.color }} className="w-16 h-16 rounded-lg mb-2" />
                <Text className="text-gray-400 text-sm">{item.label}</Text>
                <Text className="text-gray-300 text-xs">{item.color}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
