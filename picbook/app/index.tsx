/* eslint-disable @typescript-eslint/no-require-imports */
// app/index.tsx
import "../global.css";
import { Link } from "expo-router";
import database from "./data/database";
import React, { useEffect, useCallback } from "react";
import { ImageMetadata, EnvironmentEntry } from "../types/types";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, runOnJS } from "react-native-reanimated";

let globalInterval: NodeJS.Timeout | null = null;
const subscribers = new Set<() => void>();
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

const Card = ({ data }: { data: EnvironmentEntry }) => {
  const opacity = useSharedValue(1);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const [currentImage, setCurrentImage] = React.useState(data.images[0]?.previewLink);
  const updateImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % data.images.length;
    setCurrentIndex(nextIndex);
    setCurrentImage(data.images[nextIndex]?.previewLink);
  }, [currentIndex, data.images]);
  const handleImageTransition = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) }, () => {
      runOnJS(updateImage)();
      opacity.value = withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) });
    });
  }, [opacity, updateImage]);
  useGlobalTimer(handleImageTransition);
  const handleSubImagePress = useCallback(
    (previewLink: string, index: number) => {
      opacity.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.ease) }, () => {
        runOnJS(setCurrentIndex)(index);
        runOnJS(setCurrentImage)(previewLink.replace("lowRes", "highRes"));
        opacity.value = withTiming(1, { duration: 200, easing: Easing.in(Easing.ease) });
      });
    },
    [opacity]
  );
  return (
    <View className="bg-[#101216] rounded-lg shadow-black shadow-2xl overflow-hidden">
      <Animated.Image style={[{ height: 192, width: "100%" }, animatedStyle]} source={{ uri: currentImage }} alt={data.environment_title} />
      <SubImages images={data.images} onImagePress={handleSubImagePress} />
      <CardText title={data.environment_title} description={data.environment_moral} />
    </View>
  );
};

const SubImages = ({ images, onImagePress }: { images: ImageMetadata[]; onImagePress: (previewLink: string, index: number) => void }) => (
  <View className="flex flex-row flex-wrap justify-center p-2">
    {images.map((image, index) => (
      <Link key={index} href={{ pathname: "./Home", params: { data: JSON.stringify(image) } }} asChild>
        <TouchableOpacity onPress={() => onImagePress(image.previewLink, index)}>
          <Image className="h-20 w-20 m-2 rounded-lg shadow-black shadow" source={{ uri: image.previewLink }} alt={`Sub Image ${index + 1}`} />
        </TouchableOpacity>
      </Link>
    ))}
  </View>
);

const CardText = ({ title, description }: { title: string; description: string }) => (
  <View className="p-4 text-center justify-center items-center">
    <Text className="text-2xl font-semibold text-gray-100 mb-2">{title}</Text>
    <Text className="text-gray-400">{description}</Text>
  </View>
);

const HeaderSection = ({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (query: string) => void }) => (
  <View className="bg-[#13151a] p-4 m-2 rounded-2xl">
    <View className="items-center">
      <Image source={require("../assets/images/logo.png")} alt="logo" style={{ width: 100, height: 100, resizeMode: "contain" }} />
    </View>
    <Text className="text-6xl font-extrabold text-orange-400 text-center">picBook™</Text>
    <Text className="text-xl text-gray-300 mt-4">Dive Into Tales Inspired By Unique Images And Discover The Art Of Visual Environment Telling.</Text>
    <TextInput
      className="bg-gray-800 text-gray-300 mt-6 px-4 py-4 rounded-2xl w-full"
      placeholder="Search Your Favourites..."
      onChangeText={setSearchQuery}
      placeholderTextColor="orange"
      value={searchQuery}
    />
  </View>
);

const decode = (entry: EnvironmentEntry): EnvironmentEntry => {
  return {
    ...entry,
    images: entry.images.map((image) => ({
      ...image,
      previewLink: atob(image.previewLink),
      downloadLink: atob(image.downloadLink)
    }))
  };
};

const IndexPage = (): JSX.Element => {
  const [data, setData] = React.useState<EnvironmentEntry[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  useEffect(() => {
    const fetchData = () => {
      const entries = Object.values(database);
      const cards: EnvironmentEntry[] = entries.map((entry) => decode(entry));
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
  const filteredData = data.filter((item) => item.environment_title.toLowerCase().includes(searchQuery.toLowerCase()) || item.environment_moral.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <View className="flex-1 bg-[#181b21]">
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="m-2">
            <Card data={item} />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <HeaderSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <View className="p-4">
              <Text className="text-3xl font-bold text-gray-100 text-center">Explore Our Collection</Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default IndexPage;
