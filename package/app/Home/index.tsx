// app/Home/index.tsx
import { Link } from "expo-router";
import database from "@/database";
import Footer from "@/components/Footer";
import { EnvironmentEntry } from "@/types/types";
import HeaderAnimate from "@/components/HeaderAnimate";
import React, { useEffect, useCallback, useState, memo } from "react";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, ListRenderItem } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, runOnJS, withRepeat, withSequence } from "react-native-reanimated";
import { SubImageProps, SubImagesProps, CardTextProps, CardProps, AlphabetGroupProps, CategoryButtonProps, GroupedData } from "@/types/home";
// ==================================================================================================
// ==================================================================================================
const SubImage: React.FC<SubImageProps> = memo(({ image, index, currentColors, onImagePress, environmentData }) => (
  <Link
    href={{
      pathname: "./Image",
      params: {
        data: JSON.stringify({
          environment_title: environmentData.environment_title,
          environment_prompt: environmentData.environment_prompt,
          environment_moral: environmentData.environment_moral,
          data: environmentData.data
        })
      }
    }}
    asChild
  >
    <TouchableOpacity onPress={() => onImagePress(image.previewLink, index)} className="m-1">
      <View className="relative">
        <Image
          style={{ borderColor: currentColors[index % currentColors.length] + "80", borderWidth: 1, height: 40, width: 120 }}
          className="mx-auto rounded-lg shadow-2xl shadow-black"
          source={{ uri: image.previewLink }}
          alt={`Sub Image ${index + 1}`}
        />
        <Text style={{ fontFamily: "Kurale", color: "black", backgroundColor: currentColors[index % currentColors.length] }} className="absolute top-1 left-1 px-1 rounded text-sm">
          {currentColors[index % currentColors.length]}
        </Text>
      </View>
    </TouchableOpacity>
  </Link>
));
SubImage.displayName = "SubImage";
// ==================================================================================================
// ==================================================================================================
const SubImages: React.FC<SubImagesProps> = memo(({ images, currentColors, onImagePress }) => (
  <View className="flex flex-row flex-wrap justify-center p-2">
    {images.data.map((image, index) => (
      <SubImage key={index} image={image} index={index} currentColors={currentColors} onImagePress={onImagePress} environmentData={images} />
    ))}
  </View>
));
SubImages.displayName = "SubImages";
// ==================================================================================================
// ==================================================================================================
const CardText: React.FC<CardTextProps> = memo(({ data, currentIndex }) => {
  const colors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  return (
    <View style={{ backgroundColor: `${colors[0]}30`, marginTop: -2 }} className="p-2 m-4 rounded-xl">
      <Text style={{ fontFamily: "Kurale" }} className="text-xs justify-evenly text-justify text-white">
        {data.environment_prompt}
      </Text>
    </View>
  );
});
CardText.displayName = "CardText";
// ==================================================================================================
// ==================================================================================================
const Card: React.FC<CardProps> = memo(({ data }) => {
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(data.images[0]?.previewLink);
  const [nextImage, setNextImage] = useState<string>(data.images[0]?.previewLink);
  const setCurrentImageJS = useCallback((image: string) => {
    setCurrentImage(image);
  }, []);
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
      runOnJS(setCurrentImageJS)(nextImage);
      opacity.value = 1;
    });
  }, [opacity, translateX, nextImage, updateNextImage, setCurrentImageJS]);
  const handleSubImagePress = useCallback(
    (previewLink: string, index: number) => {
      setNextImage(previewLink);
      setCurrentIndex(index);
      translateX.value = -192;
      translateX.value = withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) });
      opacity.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) }, () => {
        runOnJS(setCurrentImageJS)(previewLink);
        opacity.value = 1;
      });
    },
    [opacity, translateX, setCurrentImageJS]
  );
  useEffect(() => {
    const interval = setInterval(handleImageTransition, 4000);
    return () => clearInterval(interval);
  }, [handleImageTransition]);
  const currentColors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  return (
    <View style={{ backgroundColor: `${currentColors[0]}20`, borderColor: currentColors[0], borderWidth: 0.5 }} className="rounded-3xl overflow-hidden">
      <Link
        href={{
          pathname: "./Image",
          params: { data: JSON.stringify({ environment_title: data.environment_title, environment_prompt: data.environment_prompt, environment_moral: data.environment_moral, data: data.images }) }
        }}
        asChild
      >
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
              <Text style={{ fontFamily: "Kurale", color: "white", fontSize: 30, fontWeight: "bold", textAlign: "center", paddingHorizontal: 15 }}> {data.environment_title} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <SubImages
        images={{ data: data.images, environment_title: data.environment_title, environment_moral: data.environment_moral, environment_prompt: data.environment_prompt }}
        currentColors={currentColors}
        onImagePress={handleSubImagePress}
      />
      <CardText data={data} currentIndex={currentIndex} />
      <View style={{ backgroundColor: currentColors[0], borderTopWidth: 1, alignItems: "center", justifyContent: "center", borderTopColor: currentColors[0] }}>
        <Text style={{ fontFamily: "Kurale", color: "black", fontSize: 16, lineHeight: 20 }}>picBook™</Text>
      </View>
    </View>
  );
});
Card.displayName = "Card";
// ==================================================================================================
// ==================================================================================================
const AlphabetGroup: React.FC<AlphabetGroupProps> = memo(({ title, items }) => {
  const bounce = useSharedValue(0);
  useEffect(() => {
    bounce.value = withRepeat(withSequence(withTiming(-5, { duration: 500 }), withTiming(0, { duration: 500 })), -1, true);
  }, [bounce]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bounce.value }] }));
  return (
    <View className="m-2 bg-[#161616] rounded-3xl">
      <View className="flex-row m-4">
        <Animated.View style={animatedStyle}>
          <FontAwesome5 name="layer-group" size={28} color="white" className="mr-2" />
        </Animated.View>
        <Text className="text-2xl font-bold text-center text-white" style={{ fontFamily: "Kurale" }}>
          Starting With &quot;{title}&quot;
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} className="mx-2" style={{ width: 300 }}>
            <Card data={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
});
AlphabetGroup.displayName = "AlphabetGroup";
// ==================================================================================================
// ==================================================================================================
const CategoryButton: React.FC<CategoryButtonProps> = memo(({ category }) => (
  <TouchableOpacity className="px-4 py-2 bg-white rounded-xl mx-0.5" activeOpacity={0.7} onPress={() => console.log(`Selected category: ${category}`)}>
    <Text style={{ fontFamily: "Kurale" }} className="text-black text-sm font-medium">
      {category}
    </Text>
  </TouchableOpacity>
));
CategoryButton.displayName = "CategoryButton";
// ==================================================================================================
// ==================================================================================================
const HeaderComponent: React.FC = memo(() => (
  <>
    <HeaderAnimate />
    <View className="p-4">
      <View className="flex-row items-center justify-center">
        <FontAwesome name="wpexplorer" size={28} color="white" className="mr-2" />
        <Text style={{ fontFamily: "Kurale" }} className="text-3xl font-bold text-gray-100">
          Explore Our Collection
        </Text>
        <Ionicons name="images-outline" size={28} color="white" className="ml-2" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 mb-6">
        {["Anime XL", "Realistic XL", "Cartoon 3D", "Black & White", "Abstract"].map((category, index) => (
          <CategoryButton key={index} category={category} />
        ))}
      </ScrollView>
    </View>
  </>
));
HeaderComponent.displayName = "HeaderComponent";
// ==================================================================================================
// ==================================================================================================
const HomePage = (): JSX.Element => {
  const [groupedData, setGroupedData] = useState<GroupedData>({});
  const [searchQuery] = useState<string>("");
  useEffect(() => {
    const processImageUrls = (entry: EnvironmentEntry): EnvironmentEntry => ({
      ...entry,
      images: entry.images.map((image) => ({
        ...image,
        previewLink: `${image.previewLink}lowRes/${image.original_file_name}`,
        downloadLink: `${image.downloadLink}blob/highRes/${image.original_file_name}`
      }))
    });
    const groupEntriesByFirstLetter = (entries: EnvironmentEntry[]) =>
      entries.reduce((acc, card) => {
        const firstLetter = card.environment_title[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(card);
        return acc;
      }, {} as { [key: string]: EnvironmentEntry[] });
    const fetchData = () => {
      const entries = Object.values(database);
      const processedEntries = entries.map(processImageUrls);
      const grouped = groupEntriesByFirstLetter(processedEntries);
      const sortedGrouped = Object.keys(grouped)
        .sort()
        .reduce((acc, key) => {
          acc[key] = grouped[key];
          return acc;
        }, {} as { [key: string]: EnvironmentEntry[] });
      setGroupedData(sortedGrouped);
    };
    fetchData();
  }, []);
  const filteredGroups = searchQuery
    ? Object.entries(groupedData).reduce((acc, [letter, items]) => {
        const filteredItems = items.filter(
          (item) => item.environment_title.toLowerCase().includes(searchQuery.toLowerCase()) || item.environment_moral.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredItems.length > 0) acc[letter] = filteredItems;
        return acc;
      }, {} as { [key: string]: EnvironmentEntry[] })
    : groupedData;
  const renderGroup: ListRenderItem<[string, EnvironmentEntry[]]> = useCallback(({ item }) => <AlphabetGroup title={item[0]} items={item[1]} />, []);
  const getItemLayout = useCallback((_: unknown, index: number) => ({ length: 400, offset: 400 * index, index }), []);
  const keyExtractor = useCallback((item: [string, EnvironmentEntry[]]) => item[0], []);
  return (
    <View style={{ backgroundColor: "#0A0A0A" }} className="flex-1">
      <FlatList
        ListHeaderComponent={HeaderComponent}
        windowSize={3}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        renderItem={renderGroup}
        getItemLayout={getItemLayout}
        ListFooterComponent={Footer}
        keyExtractor={keyExtractor}
        data={Object.entries(filteredGroups)}
      />
    </View>
  );
};

export default HomePage;
