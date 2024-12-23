// app/Home/index.tsx
import { Link } from "expo-router";
import database from "@/database";
import Footer from "@/components/Footer";
import { EnvironmentEntry } from "@/types/database";
import HexToRGBA from "@/components/HexToRGBA";
import HeaderAnimate from "@/components/HeaderAnimated";
import React, { useEffect, useCallback, useState, memo } from "react";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, ListRenderItem } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from "react-native-reanimated";
import { SubImageProps, SubImagesProps, CardTextProps, CardProps, AlphabetGroupProps, CategoryButtonProps, GroupedData } from "@/types/components";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const SubImage: React.FC<SubImageProps> = memo(({ image, index, onImagePress, environmentData }) => (
  <Link
    href={{
      pathname: "./Image",
      params: {
        data: JSON.stringify({
          selectedIndex: index,
          data: environmentData.data,
          environment_title: environmentData.environment_title,
          environment_moral: environmentData.environment_moral,
          environment_prompt: environmentData.environment_prompt
        })
      }
    }}
    asChild
  >
    <TouchableOpacity onPress={() => onImagePress(image.previewLink, index)} className="m-0.5 flex-1">
      <View className="relative">
        <Image style={{ borderColor: HexToRGBA(image.primary, 1.0), borderWidth: 0.5, width: "100%", height: 40 }} className="rounded-lg shadow-2xl shadow-black" source={{ uri: image.previewLink }} alt={`Sub Image ${index + 1}`} />
        <Text style={{ color: HexToRGBA("#FFFFFF", 1.0), fontFamily: "Kurale", backgroundColor: HexToRGBA(image.primary, 0.8) }} className="absolute top-1 left-1 px-1 rounded-lg text-sm">
          ({index}): {image.primary}
        </Text>
      </View>
    </TouchableOpacity>
  </Link>
));
SubImage.displayName = "SubImage";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const SubImages: React.FC<SubImagesProps> = memo(({ images, onImagePress }) => (
  <View className="flex flex-col justify-start p-1 space-y-1">
    {images.data.slice(0, 4).map((image, index) => (
      <SubImage key={index} image={image} index={index} onImagePress={onImagePress} environmentData={images} />
    ))}
  </View>
));
SubImages.displayName = "SubImages";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const CardText: React.FC<CardTextProps> = memo(({ data, currentIndex }) => {
  const colors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  return (
    <View style={{ padding: 1, margin: 4, borderRadius: 12 }}>
      <Text style={{ fontFamily: "Kurale", color: HexToRGBA(colors[0], 1.0), fontSize: 20, fontWeight: "bold" }}>Environment:</Text>
      <Text style={{ fontFamily: "Kurale", color: HexToRGBA(colors[0], 1.0), fontSize: 12 }}>{data.environment_prompt}</Text>
    </View>
  );
});
CardText.displayName = "CardText";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const Card: React.FC<CardProps> = memo(({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(data.images[0]?.previewLink);
  const currentColors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  const updateNextImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % data.images.length;
    setCurrentIndex(nextIndex);
    setCurrentImage(data.images[nextIndex]?.previewLink);
  }, [currentIndex, data.images]);
  const handleSubImagePress = useCallback((previewLink: string, index: number) => {
    setCurrentImage(previewLink);
    setCurrentIndex(index);
  }, []);
  useEffect(() => {
    const interval = setInterval(updateNextImage, 4000);
    return () => clearInterval(interval);
  }, [updateNextImage]);

  return (
    <View style={{ backgroundColor: HexToRGBA(currentColors[0], 0.2), borderColor: HexToRGBA(currentColors[0], 1.0), borderWidth: 1 }} className="rounded-3xl overflow-hidden">
      <Link
        href={{
          pathname: "./Image",
          params: {
            data: JSON.stringify({
              data: data.images,
              selectedIndex: currentIndex,
              environment_title: data.environment_title,
              environment_moral: data.environment_moral,
              environment_prompt: data.environment_prompt
            })
          }
        }}
        asChild
      >
        <TouchableOpacity>
          <View style={{ position: "relative", height: 300, width: "100%" }}>
            <Image style={{ width: "100%", height: "100%" }} className="rounded-t-3xl" source={{ uri: currentImage }} alt={data.environment_title} />
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontFamily: "Kurale", color: HexToRGBA("#FFFFFF", 1.0), fontSize: 30, fontWeight: "bold", textAlign: "center", paddingHorizontal: 15 }}>{data.environment_title || ""}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <View className="flex flex-row p-2">
        <View style={{ width: "50%" }}>
          <SubImages
            currentColors={currentColors}
            onImagePress={handleSubImagePress}
            images={{
              data: data.images,
              selectedIndex: currentIndex,
              environment_title: data.environment_title,
              environment_moral: data.environment_moral,
              environment_prompt: data.environment_prompt
            }}
          />
        </View>
        <View style={{ width: "50%" }}>
          <CardText data={data} currentIndex={currentIndex} />
        </View>
      </View>
      <View style={{ backgroundColor: HexToRGBA(currentColors[0], 1.0), borderTopWidth: 1, alignItems: "center", justifyContent: "center", borderTopColor: HexToRGBA(currentColors[0], 1.0) }}>
        <Text style={{ fontFamily: "Kurale", color: HexToRGBA("#0A0A0A", 1.0), fontSize: 16, lineHeight: 20 }}>picBook™</Text>
      </View>
    </View>
  );
});
Card.displayName = "Card";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const AlphabetGroup: React.FC<AlphabetGroupProps> = memo(({ title, items }) => {
  const bounce = useSharedValue(0);
  useEffect(() => {
    bounce.value = withRepeat(withSequence(withTiming(-5, { duration: 500 }), withTiming(0, { duration: 500 })), -1, true);
  }, [bounce]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bounce.value }] }));
  return (
    <View className="bg-[#1b1b1b] m-1 p-1 rounded-l-3xl">
      <View className="flex-row m-4">
        <Animated.View style={animatedStyle}>
          <FontAwesome5 name="layer-group" size={28} color={HexToRGBA("#FFFFFF", 1.0)} className="mr-2" />
        </Animated.View>
        <Text className="text-2xl font-bold text-center text-white" style={{ fontFamily: "Kurale" }}>
          Sub-Category - &quot;{title}&quot;
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} className="mx-1" style={{ width: 300 }}>
            <Card data={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
});
AlphabetGroup.displayName = "AlphabetGroup";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const CategoryButton: React.FC<CategoryButtonProps> = memo(({ category }) => (
  <TouchableOpacity className="px-4 py-2 bg-white rounded-xl mx-0.5" activeOpacity={0.7} onPress={() => console.log(`Selected category: ${category}`)}>
    <Text style={{ fontFamily: "Kurale" }} className="text-black text-sm font-medium">
      {category}
    </Text>
  </TouchableOpacity>
));
CategoryButton.displayName = "CategoryButton";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const HeaderComponent: React.FC = memo(() => (
  <>
    <HeaderAnimate />
    <View className="p-4">
      <View className="flex-row items-center justify-center">
        <FontAwesome name="wpexplorer" size={28} color={HexToRGBA("#FFFFFF", 1.0)} className="mr-2" />
        <Text style={{ fontFamily: "Kurale" }} className="text-3xl font-bold text-gray-100">
          Explore Our Collection
        </Text>
        <Ionicons name="images-outline" size={28} color={HexToRGBA("#FFFFFF", 1.0)} className="ml-2" />
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
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
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
      const entries = Object.values(database) as EnvironmentEntry[];
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
        const filteredItems = items.filter((item) => item.environment_title.toLowerCase().includes(searchQuery.toLowerCase()) || item.environment_moral.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filteredItems.length > 0) acc[letter] = filteredItems;
        return acc;
      }, {} as { [key: string]: EnvironmentEntry[] })
    : groupedData;
  const renderGroup: ListRenderItem<[string, EnvironmentEntry[]]> = useCallback(({ item }) => <AlphabetGroup title={item[0]} items={item[1]} />, []);
  const getItemLayout = useCallback((_: unknown, index: number) => ({ length: 400, offset: 400 * index, index }), []);
  const keyExtractor = useCallback((item: [string, EnvironmentEntry[]]) => item[0], []);
  return (
    <View style={{ backgroundColor: HexToRGBA("#0A0A0A", 1.0) }} className="flex-1">
      <FlatList
        windowSize={3}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        renderItem={renderGroup}
        keyExtractor={keyExtractor}
        ListFooterComponent={Footer}
        removeClippedSubviews={true}
        getItemLayout={getItemLayout}
        updateCellsBatchingPeriod={50}
        data={Object.entries(filteredGroups)}
        ListHeaderComponent={HeaderComponent}
      />
    </View>
  );
};
export default HomePage;
