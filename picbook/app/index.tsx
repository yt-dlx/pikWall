// app/index.tsx
import "../global.css";
import { Link } from "expo-router";
import database from "./data/database";
import React, { useEffect, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, runOnJS } from "react-native-reanimated";
//  ====================================================================================
//  ====================================================================================
type CardData = {
  id: string;
  uri: string;
  title: string;
  description: string;
  subImages: string[];
};
let globalInterval: NodeJS.Timeout | null = null;
const subscribers = new Set<() => void>();
//  ====================================================================================
//  ====================================================================================
const useGlobalTimer = (callback: () => void) => {
  useEffect(() => {
    subscribers.add(callback);
    if (!globalInterval) {
      globalInterval = setInterval(() => {
        subscribers.forEach((cb) => cb());
      }, 4000);
    }
    return () => {
      subscribers.delete(callback);
      if (subscribers.size === 0 && globalInterval) {
        clearInterval(globalInterval);
        globalInterval = null;
      }
    };
  }, [callback]);
};
// ====================================================================================
// Card Component
// ====================================================================================
const Card = ({ data }: { data: CardData }) => {
  const opacity = useSharedValue(1);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentImage, setCurrentImage] = React.useState(data.uri);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const updateImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % data.subImages.length;
    setCurrentIndex(nextIndex);
    setCurrentImage(data.subImages[nextIndex]);
  }, [currentIndex, data.subImages]);
  const handleImageTransition = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) }, () => {
      runOnJS(updateImage)();
      opacity.value = withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) });
    });
  }, [opacity, updateImage]);
  useGlobalTimer(handleImageTransition);
  const handleSubImagePress = useCallback(
    (uri: string, index: number) => {
      opacity.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.ease) }, () => {
        runOnJS(setCurrentIndex)(index);
        runOnJS(setCurrentImage)(uri);
        opacity.value = withTiming(1, { duration: 200, easing: Easing.in(Easing.ease) });
      });
    },
    [opacity]
  );
  return (
    <View className="bg-[#101216] mb-6 rounded-lg shadow-black shadow-2xl overflow-hidden">
      <Animated.Image style={[{ height: 192, width: "100%" }, animatedStyle]} source={{ uri: currentImage }} alt={data.title} />
      <SubImages images={data.subImages} onImagePress={handleSubImagePress} data={data} />
      <CardText title={data.title} description={data.description} />
    </View>
  );
};
// ====================================================================================
// SubImages Component
// ====================================================================================
const SubImages = ({ images, onImagePress, data }: { images: string[]; onImagePress: (uri: string, index: number) => void; data: CardData }) => (
  <View className="flex flex-row flex-wrap justify-center p-2">
    {images.map((uri, index) => (
      <Link key={index} href={{ pathname: "./Home", params: { data: JSON.stringify(data) } }} asChild>
        <TouchableOpacity onPress={() => onImagePress(uri, index)}>
          <Image className="h-20 w-20 m-2 rounded-lg shadow-black shadow" source={{ uri }} alt={`Sub Image ${index + 1}`} />
        </TouchableOpacity>
      </Link>
    ))}
  </View>
);
//  ====================================================================================
//  CardText Component
//  ====================================================================================
const CardText = ({ title, description }: { title: string; description: string }) => (
  <View className="p-4">
    <Text className="text-lg font-semibold text-gray-100 mb-2">{title}</Text>
    <Text className="text-gray-400">{description}</Text>
  </View>
);
//  ====================================================================================
//  HeaderSection Component
//  ====================================================================================
const HeaderSection = ({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) => (
  <View className="bg-[#13151a] p-4 m-2 rounded-2xl">
    <Text className="text-6xl font-extrabold text-pink-400">picBook™</Text>
    <Text className="text-xl text-gray-300 mt-4">Dive Into Tales Inspired By Unique Images And Discover The Art Of Visual Environment Telling.</Text>
    <TextInput
      className="bg-gray-800 text-gray-300 mt-6 px-4 py-2 rounded-r-2xl w-full"
      placeholder="Search Your Favourites..."
      placeholderTextColor="gray"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  </View>
);
//  ====================================================================================
//  Footer Component
//  ====================================================================================
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
//  ====================================================================================
//  Main Index Page
//  ====================================================================================
const IndexPage = (): JSX.Element => {
  const [data, setData] = React.useState<CardData[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  useEffect(() => {
    const fetchData = () => {
      const entries = Object.values(database);
      const cards: CardData[] = entries.map((entry, index) => {
        const subImages = entry.images.slice(0, 4).map((image) => atob(image.previewLink));
        return {
          id: index.toString(),
          uri: atob(entry.images[0]?.previewLink) || "https://via.placeholder.com/300x150",
          title: entry.environment_title,
          description: entry.environment_moral,
          subImages
        };
      });
      setData(cards);
    };
    fetchData();
    return () => {
      if (globalInterval) {
        clearInterval(globalInterval);
        globalInterval = null;
      }
      subscribers.clear();
    };
  }, []);
  const filteredData = data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <ScrollView className="flex-1 bg-[#181b21]">
      <HeaderSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <View className="px-4 py-8">
        <Text className="text-2xl font-bold text-gray-100 mb-4">Explore</Text>
        {filteredData.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </View>
      <Footer />
    </ScrollView>
  );
};
export default IndexPage;
