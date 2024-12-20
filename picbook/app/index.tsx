// app/index.tsx
import { Link } from "expo-router";
import database from "./data/database";
import HeaderAnimate from "./HeaderAnimate";
import React, { useEffect, useCallback } from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";
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
        runOnJS(setCurrentImage)(previewLink);
        opacity.value = withTiming(1, { duration: 200, easing: Easing.in(Easing.ease) });
      });
    },
    [opacity]
  );
  const currentColors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  return (
    <View style={{ backgroundColor: "black", borderColor: currentColors[0], borderWidth: 1 }} className="rounded-2xl shadow-md shadow-black overflow-hidden">
      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, alignItems: "center" }}>
        <Text className="text-white text-lg font-bold">{data.environment_title}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity>
            <FontAwesome name="heart-o" size={20} color={currentColors[1]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="bookmark" size={20} color={currentColors[2]} />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.Image
        style={[{ height: 192, width: "100%", borderWidth: 1, marginBottom: 8, borderColor: currentColors[0] }, animatedStyle]}
        source={{ uri: currentImage }}
        alt={data.environment_title}
      />
      <SubImages images={data.images} onImagePress={handleSubImagePress} />
      <CardText data={data} currentIndex={currentIndex} />
      <View style={{ backgroundColor: "#0d0e11", padding: 10, borderTopWidth: 1, alignItems: "center", flexDirection: "row", justifyContent: "space-between", borderTopColor: currentColors[0] }}>
        <Text style={{ color: currentColors[0], fontSize: 16 }}>picBook™</Text>
      </View>
    </View>
  );
};

const CardText = ({ data, currentIndex }: { data: EnvironmentEntry; currentIndex: number }) => {
  const colors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  const words = data.environment_title.split(" ");
  const segmentLength = Math.ceil(words.length / 3);
  return (
    <View className="p-4 text-justify justify-center items-center">
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
      <Text className="m-2 text-justify">
        <Text className="text-white font-bold">Environment: </Text>
        <Text className="text-gray-400">{data.environment_prompt}</Text>
      </Text>
    </View>
  );
};

const SubImages = ({ images, onImagePress }: { images: ImageMetadata[]; onImagePress: (previewLink: string, index: number) => void }) => (
  <View className="flex flex-row flex-wrap justify-center">
    {images.map((image, index) => (
      <Link key={index} href={{ pathname: "./Home", params: { data: JSON.stringify(image) } }} asChild>
        <TouchableOpacity onPress={() => onImagePress(image.previewLink, index)}>
          <Image className="h-20 w-28 mx-auto rounded-lg shadow-2xl shadow-black border border-black" source={{ uri: image.previewLink }} alt={`Sub Image ${index + 1}`} />
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
  const [data, setData] = React.useState<EnvironmentEntry[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
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
    <View style={{ backgroundColor: "#111214" }} className="flex-1">
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
              <Text className="text-3xl font-bold text-gray-100 text-center">Explore Our Collection</Text>
              <TextInput
                className="text-gray-300 mt-6 px-4 py-4 rounded-xl w-full"
                style={{ backgroundColor: "#11181c" }}
                placeholder="Search Your Query..."
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
