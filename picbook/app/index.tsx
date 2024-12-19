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
  const currentColors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  return (
    <View
      style={{
        backgroundColor: "#101216",
        borderColor: currentColors[0],
        borderWidth: 1
      }}
      className="rounded-lg shadow-md shadow-black overflow-hidden"
    >
      <Animated.Image style={[{ height: 192, width: "100%" }, animatedStyle]} source={{ uri: currentImage }} alt={data.environment_title} />
      <SubImages images={data.images} onImagePress={handleSubImagePress} />
      <CardText data={data} currentIndex={currentIndex} />
    </View>
  );
};

const CardText = ({ data, currentIndex }: { data: EnvironmentEntry; currentIndex: number }) => {
  const colors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  const words = data.environment_title.split(" ");
  const segmentLength = Math.ceil(words.length / 3);
  return (
    <View className="p-4 text-center justify-center items-center">
      <View className="flex-row flex-wrap">
        {words.map((word, index) => {
          let color = "";
          if (index < segmentLength) color = colors[0];
          else if (index < 2 * segmentLength) color = colors[1];
          else color = colors[2];
          return (
            <Text key={index} style={{ color }} className={`text-2xl font-semibold ${index !== words.length - 1 ? "mr-1" : ""}`}>
              {word}
            </Text>
          );
        })}
      </View>
      <Text className="text-gray-400 text-justify">{data.environment_prompt}</Text>
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

const HeaderSection = () => (
  <View className="bg-[#13151a] p-2 m-2 rounded-2xl">
    <View className="items-center -mt-8">
      <Image source={require("../assets/images/logo.png")} alt="logo" style={{ width: 200, height: 200, resizeMode: "contain" }} />
    </View>
    <Text className="text-xl text-gray-300 text-center m-4 -mt-8">Dive Into Tales Inspired By Unique Images And Discover The Art Of Visual Environment Telling.</Text>
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
  const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const [data, setData] = React.useState<EnvironmentEntry[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  useEffect(() => {
    const fetchData = () => {
      const entries = Object.values(database);
      const cards: EnvironmentEntry[] = entries.map((entry) => decode(entry));
      const shuffledCards = shuffleArray(cards);
      setData(shuffledCards);
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
          <View className="m-4">
            <Card data={item} />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <HeaderSection />
            <View className="p-4">
              <Text className="text-3xl font-bold text-gray-100 text-center">Explore Our Collection</Text>
              <TextInput
                className="bg-gray-800 text-gray-300 mt-6 px-4 py-4 rounded-2xl w-full shadow-2xl shadow-black border border-black"
                placeholder="Search Your Favourites..."
                onChangeText={setSearchQuery}
                placeholderTextColor="gray"
                value={searchQuery}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default IndexPage;
