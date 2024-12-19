import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";

type CardData = {
  id: string;
  uri: string;
  title: string;
  description: string;
  subImages: string[];
};

export default function IndexPage(): JSX.Element {
  const [data, setData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const placeholderImage = "https://via.placeholder.com/300x150"; // Placeholder image URI
      const cards: CardData[] = Array(12)
        .fill(0)
        .map((_, index) => {
          const subImages = Array(4).fill(placeholderImage);
          return {
            id: index.toString(),
            uri: placeholderImage,
            title: `Card Title ${index + 1}`,
            description: `This is a description for card ${index + 1}.`,
            subImages
          };
        });
      setData(cards);
    };

    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="bg-gray-900 py-16 px-4 items-center">
        <Text className="text-6xl font-extrabold text-pink-400">Stories Behind Pictures</Text>
        <Text className="text-xl text-gray-300 mt-4 text-center">Dive Into Tales Inspired By Unique Images And Discover The Art Of Visual Environment Telling.</Text>
        <Image className="h-16 w-16 mt-8" source={{ uri: "https://example.com/logo.png" }} alt="Logo" />
        <TextInput className="bg-gray-800 text-gray-300 mt-6 px-4 py-2 rounded-full w-3/4" placeholder="Search Your Favourites..." placeholderTextColor="gray" />
      </View>
      <View className="px-4 py-8">
        <Text className="text-2xl font-bold text-gray-100 mb-4">Explore</Text>
        {data.map((item) => (
          <View key={item.id} className="bg-gray-800 mb-4 rounded-lg shadow-lg overflow-hidden">
            {/* Main Image */}
            <Image className="h-40 w-full object-cover" source={{ uri: item.uri }} alt={item.title} />

            {/* Sub Images */}
            <View className="flex flex-row">
              {item.subImages.map((subImageUri, subIndex) => (
                <Image key={subIndex} className="h-20 w-1/4 object-cover" source={{ uri: subImageUri }} alt={`Sub Image ${subIndex + 1}`} />
              ))}
            </View>

            {/* Card Text */}
            <View className="p-4">
              <Text className="text-lg font-semibold text-gray-100 mb-2">{item.title}</Text>
              <Text className="text-gray-400">{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
