// app/index.tsx
import { Link } from "expo-router";
import database from "./data/database";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HeaderAnimate from "../components/HeaderAnimate";
import React, { useEffect, useCallback, useState } from "react";
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
  const translateX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(data.images[0]?.previewLink);
  const [nextImage, setNextImage] = useState(data.images[0]?.previewLink);
  const currentImageStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const nextImageStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));
  const updateNextImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % data.images.length;
    setCurrentIndex(nextIndex);
    setNextImage(data.images[nextIndex]?.previewLink);
  }, [currentIndex, data.images]);
  const handleImageTransition = useCallback(() => {
    runOnJS(updateNextImage)();
    translateX.value = -192;
    translateX.value = withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) });
    opacity.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) }, () => {
      runOnJS(setCurrentImage)(nextImage);
      opacity.value = 1;
    });
  }, [opacity, translateX, nextImage, updateNextImage]);
  useGlobalTimer(handleImageTransition);
  const handleSubImagePress = useCallback(
    (previewLink: string, index: number) => {
      runOnJS(setNextImage)(previewLink);
      runOnJS(setCurrentIndex)(index);
      translateX.value = -192;
      translateX.value = withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) });
      opacity.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) }, () => {
        runOnJS(setCurrentImage)(previewLink);
        opacity.value = 1;
      });
    },
    [opacity, translateX]
  );
  const currentColors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  return (
    <View style={{ backgroundColor: currentColors[0] + "20", borderColor: currentColors[0], borderWidth: 0.5 }} className="rounded-3xl overflow-hidden">
      <Link href={{ pathname: "./download", params: { data: JSON.stringify(data.images[currentIndex]) } }} asChild>
        <TouchableOpacity>
          <View style={{ position: "relative", height: 192, width: "100%" }}>
            <Animated.Image
              style={[{ height: "100%", width: "100%", position: "absolute", borderColor: currentColors[0] }, currentImageStyle]}
              className="rounded-t-3xl border"
              source={{ uri: currentImage }}
              alt={data.environment_title}
            />
            <Animated.Image
              style={[{ height: "100%", width: "100%", position: "absolute", borderColor: currentColors[0] }, nextImageStyle]}
              className="rounded-t-3xl border"
              source={{ uri: nextImage }}
              alt={data.environment_title}
            />
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
              <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", textAlign: "center", paddingHorizontal: 15 }}>{data.environment_title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <SubImages images={data.images} currentColors={currentColors} onImagePress={handleSubImagePress} />
      <CardText data={data} currentIndex={currentIndex} />
      <View style={{ backgroundColor: currentColors[0], borderTopWidth: 1, alignItems: "center", justifyContent: "center", borderTopColor: currentColors[0] }}>
        <Text style={{ color: "black", fontSize: 16, lineHeight: 20 }}>picBook™</Text>
      </View>
    </View>
  );
};
const CardText = ({ data, currentIndex }: { data: EnvironmentEntry; currentIndex: number }) => {
  const colors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  return (
    <View style={{ backgroundColor: colors[0] + "30", marginTop: -2 }} className="p-2 m-4 rounded-xl">
      <Text className="text-xs justify-evenly text-justify text-white">{data.environment_prompt}</Text>
    </View>
  );
};
const SubImages = ({ images, currentColors, onImagePress }: { images: ImageMetadata[]; currentColors: string[]; onImagePress: (previewLink: string, index: number) => void }) => (
  <View className="flex flex-row flex-wrap justify-center p-2">
    {images.map((image, index) => (
      <Link key={index} href={{ pathname: "./download", params: { data: JSON.stringify(image) } }} asChild>
        <TouchableOpacity onPress={() => onImagePress(image.previewLink, index)} className="m-1">
          <View className="relative">
            <Image
              style={{ borderColor: currentColors[index % currentColors.length], borderWidth: 1, height: 40, width: 140 }}
              className="mx-auto rounded-lg shadow-2xl shadow-black"
              source={{ uri: image.previewLink }}
              alt={`Sub Image ${index + 1}`}
            />
            <Text style={{ color: "black", backgroundColor: currentColors[index % currentColors.length] }} className="absolute top-1 left-1 px-1 rounded text-sm">
              {currentColors[index % currentColors.length]}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    ))}
  </View>
);
const IndexPage = (): JSX.Element => {
  const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const [data, setData] = useState<EnvironmentEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const someChange = (entry: EnvironmentEntry): EnvironmentEntry => {
      return {
        ...entry,
        images: entry.images.map((image) => ({
          ...image,
          downloadLink: atob(image.downloadLink),
          previewLink: atob(image.previewLink.replace("lowRes", "highRes"))
        }))
      };
    };
    const fetchData = () => {
      const entries = Object.values(database);
      const cards: EnvironmentEntry[] = entries.map((entry) => someChange(entry));
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
    <View style={{ backgroundColor: "#0A0A0A" }} className="flex-1">
      <FlatList
        data={filteredData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="m-4">
            <Card data={item} />
          </View>
        )}
        ListHeaderComponent={
          <View>
            <HeaderAnimate />
            <View className="p-4">
              <View className="flex-row items-center justify-center">
                <FontAwesome name="wpexplorer" size={28} color="white" className="mr-2" />
                <Text className="text-3xl font-bold text-gray-100">Explore Our Collection</Text>
                <Ionicons name="images-outline" size={28} color="white" className="ml-2" />
              </View>
              <TextInput
                className="mt-6 px-4 py-4 rounded-3xl w-full text-gray-300 bg-opacity-10"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                placeholder="Search Your Query..."
                onChangeText={setSearchQuery}
                placeholderTextColor="#dfd2e6"
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

// const CardText = ({ data, currentIndex }: { data: EnvironmentEntry; currentIndex: number }) => {
// const colors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
// const words = data.environment_prompt.split(" ");
// const segmentLength = Math.ceil(words.length / 3);
// return (
// <View style={{ backgroundColor: colors[0] + "20" }} className="p-2 m-2 rounded-xl text-justify justify-center items-center">
// <View className="flex-row flex-wrap">
// {words.map((word, index) => {
// let color = "";
// if (index < segmentLength) color = colors[0];
// else if (index < 2 * segmentLength) color = colors[1];
// else color = colors[2];
// return (
// <Text key={index} style={{ color }} className={`text-xs ${index !== words.length - 1 ? "mr-1" : ""}`}>
// {word}
// </Text>
// );
// })}
// </View>
// </View>
// );
// };
