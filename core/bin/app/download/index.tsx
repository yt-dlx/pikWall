import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import { ImageMetadata } from "../../types/types";
import { ProgressBar } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Image, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
    <View className="flex-row items-center py-3 border-b border-gray-800">
      {icon}
      <View className="ml-3">
        <Text className="text-gray-400 text-xs mb-1">{label}</Text>
        <Text className="text-gray-200 font-medium">{value}</Text>
      </View>
    </View>
  );
  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    const fileUri = `${FileSystem.documentDirectory}${ImageData.original_file_name}`;
    const downloadResumable = FileSystem.createDownloadResumable(ImageData.downloadLink, fileUri, {}, (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      setDownloadProgress(progress);
    });
    try {
      await downloadResumable.downloadAsync();
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) errorMessage = error.message;
      else if (typeof error === "string") errorMessage = error;
      Alert.alert("Download Failed", errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "#0A0A0A" }} className="flex-1">
      <View className="p-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-6 flex-row items-center">
          <FontAwesome name="arrow-left" size={18} color={ImageData.primary} />
          <Text style={{ color: ImageData.primary }} className="font-bold text-lg ml-2">
            Go Back To Gallery
          </Text>
        </TouchableOpacity>
        <View className="relative rounded-t-xl overflow-hidden shadow-lg">
          <Image source={{ uri: ImageData.previewLink }} alt="image" className="w-ful h-60" resizeMode="cover" />
          <View style={{ backgroundColor: ImageData.primary + "80" }} className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-0.5">
            <Text className="text-white font-semibold text-lg text-center">{ImageData.original_file_name.replace(".jpg", "")}</Text>
          </View>
        </View>
        <TouchableOpacity
          disabled={isDownloading}
          onPress={handleDownload}
          style={{ backgroundColor: ImageData.primary + "50" }}
          className={`py-2 px-2 rounded-b-lg mb-4 flex-row justify-center items-center ${isDownloading ? "opacity-50" : ""}`}
        >
          <MaterialIcons name="file-download" size={24} color="#ffffff" />
          <Text className="text-white font-bold text-lg">{isDownloading ? "Downloading..." : "Download (Highest Resolution)"}</Text>
        </TouchableOpacity>
        {isDownloading && (
          <View className="mb-6">
            <ProgressBar progress={downloadProgress} color={ImageData.primary} />
            <Text className="text-gray-400 text-sm mt-2">{Math.round(downloadProgress * 100)}% Complete</Text>
          </View>
        )}
        <View className="bg-neutral-900/50 rounded-xl p-4 mb-6">
          <Text className="text-gray-200 font-bold text-lg mb-4">Image Details</Text>
          <InfoRow icon={<Feather name="image" size={20} color="#9ca3af" />} label="Format" value={ImageData.format.toUpperCase()} />
          <InfoRow icon={<MaterialIcons name="palette" size={20} color="#9ca3af" />} label="Mode" value={ImageData.mode} />
          <InfoRow
            label="File Size"
            icon={<AntDesign name="database" size={20} color="#9ca3af" />}
            value={`${ImageData.file_size_megabytes} MB (${ImageData.file_size_bytes.toLocaleString()} Bytes)`}
          />
          <InfoRow icon={<FontAwesome name="expand" size={20} color="#9ca3af" />} label="Resolution" value={`${ImageData.width} × ${ImageData.height}`} />
        </View>
        <View className="bg-neutral-900/50 rounded-xl p-4">
          <Text className="text-gray-200 font-bold text-lg mb-4">Extra Color Palette</Text>
          <View className="flex-wrap flex-row justify-between">
            {Array.from({ length: 46 }, (_, i) => `more_${i + 4}`).map((key, index) => {
              const color = ImageData[key] as string;
              return color ? (
                <View key={index} className="items-center mb-4">
                  <View style={{ backgroundColor: color }} className="w-10 h-10 rounded-xl" />
                  <Text className="text-gray-300 text-xs">{color}</Text>
                </View>
              ) : null;
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
