// app/Home/index.tsx
import { Link } from "expo-router";
import Footer from "@/components/Footer";
import Colorizer from "@/components/Colorizer";
import AnimeDatabase from "@/database/Anime";
import PortraitDatabase from "@/database/Portrait";
import { EnvironmentEntry } from "@/types/database";
import LightningDatabase from "@/database/Lightning";
import CinematicDatabase from "@/database/Cinematic";
import PhotographyDatabase from "@/database/Photography";
import HeaderAnimate from "@/components/HeaderAnimated";
import React, { useEffect, useCallback, useState, useRef, memo } from "react";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useAnimatedStyle, useSharedValue, withTiming, withRepeat, withSequence } from "react-native-reanimated";
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, StatusBar, ListRenderItem, Animated } from "react-native";
import { SubImagesProps, CardTextProps, CardProps, AlphabetGroupProps, CategoryButtonProps, GroupedData } from "@/types/components";
interface Category {
  name: string;
  database: Record<string, EnvironmentEntry>;
}
interface CategoryButtonExtendedProps extends CategoryButtonProps {
  selected: boolean;
  onPress: () => void;
}
const categories: Category[] = [
  { name: "Anime", database: AnimeDatabase },
  { name: "Portrait", database: PortraitDatabase },
  { name: "Lightning", database: LightningDatabase },
  { name: "Cinematic", database: CinematicDatabase },
  { name: "Photography", database: PhotographyDatabase }
];
const SubImages: React.FC<SubImagesProps> = memo(({ images, onImagePress }) => (
  <View className="flex flex-col justify-start">
    {images.data.map((image, index) => (
      <Link
        key={index}
        href={{
          pathname: "./Image",
          params: {
            data: JSON.stringify({
              selectedIndex: index,
              data: images.data,
              environment_title: images.environment_title,
              environment_moral: images.environment_moral,
              environment_prompt: images.environment_prompt
            })
          }
        }}
        asChild
      >
        <TouchableOpacity onPress={() => onImagePress(image.previewLink, index)} className="p-0.5 flex-1">
          <View className="relative">
            <Image source={{ uri: image.previewLink }} className="w-full h-24 rounded-lg border" style={{ borderColor: Colorizer(image.primary, 0.2) }} resizeMode="cover" />
            <Text
              className="absolute bottom-1 right-1 px-2 py-1 text-xs rounded-full"
              style={{
                color: Colorizer("#E9E9EA", 1.0),
                fontFamily: "Kurale",
                backgroundColor: Colorizer(image.primary, 1.0)
              }}
            >
              {image.primary}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    ))}
  </View>
));
SubImages.displayName = "SubImages";
const CardText: React.FC<CardTextProps> = memo(({ data, currentIndex }) => {
  const colors = [data.images[currentIndex].primary, data.images[currentIndex].secondary, data.images[currentIndex].tertiary];
  return (
    <View className="p-1 rounded-lg" style={{ backgroundColor: Colorizer(colors[0], 0.1) }}>
      <Text className="text-lg text-justify" style={{ fontFamily: "Kurale", color: Colorizer(colors[0], 1.0) }}>
        Environment:
      </Text>
      <Text className="text-sm text-justify" style={{ fontFamily: "Kurale", color: Colorizer(colors[0], 1.0) }}>
        {data.environment_prompt}
      </Text>
    </View>
  );
});
CardText.displayName = "CardText";
const Card: React.FC<CardProps> = memo(({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(data.images[0]?.previewLink);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const animationDuration = 3000;
  const updateImageState = useCallback(
    (nextIndex: number) => {
      setCurrentIndex(nextIndex);
      setCurrentImage(data.images[nextIndex]?.previewLink);
    },
    [data.images]
  );
  const startFadeTransition = useCallback(
    (nextIndex: number) => {
      Animated.timing(fadeAnim, { toValue: 0, duration: animationDuration, useNativeDriver: true }).start(() => {
        updateImageState(nextIndex);
        Animated.timing(fadeAnim, { toValue: 1, duration: animationDuration, useNativeDriver: true }).start();
      });
    },
    [fadeAnim, animationDuration, updateImageState]
  );
  const updateNextImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % data.images.length;
    startFadeTransition(nextIndex);
  }, [currentIndex, data.images.length, startFadeTransition]);
  const handleSubImagePress = useCallback(
    (previewLink: string, index: number) => {
      startFadeTransition(index);
    },
    [startFadeTransition]
  );
  useEffect(() => {
    const interval = setInterval(updateNextImage, animationDuration * 2);
    return () => clearInterval(interval);
  }, [updateNextImage, animationDuration]);
  useEffect(() => {
    updateImageState(0);
  }, [data, updateImageState]);
  return (
    <View className="rounded-3xl overflow-hidden border" style={{ backgroundColor: Colorizer("#111415", 1.0), borderColor: Colorizer(data.images[0].primary, 0.2) }}>
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
          <View className="relative h-80 w-full overflow-hidden">
            <Animated.Image
              source={{ uri: currentImage }}
              style={{
                width: "100%",
                height: "100%",
                opacity: fadeAnim,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
              }}
              resizeMode="cover"
            />
            <View className="absolute inset-0 flex items-center justify-center">
              <Text style={{ fontFamily: "Kurale", color: Colorizer("#E9E9EA", 1.0) }} className="text-3xl text-center px-4">
                {data.images[currentIndex].original_file_name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <View className="flex flex-row p-1">
        <View className="w-1/2">
          <SubImages
            onImagePress={handleSubImagePress}
            images={{
              data: data.images.slice(0, 2),
              selectedIndex: currentIndex,
              environment_title: data.environment_title,
              environment_moral: data.environment_moral,
              environment_prompt: data.environment_prompt
            }}
          />
        </View>
        <View className="w-1/2">
          <SubImages
            onImagePress={handleSubImagePress}
            images={{
              data: data.images.slice(2, 4),
              selectedIndex: currentIndex,
              environment_title: data.environment_title,
              environment_moral: data.environment_moral,
              environment_prompt: data.environment_prompt
            }}
          />
        </View>
      </View>
      <View className="border-t items-center justify-center" style={{ backgroundColor: Colorizer(data.images[currentIndex].primary, 1.0) }}>
        <Text style={{ fontFamily: "Kurale", color: Colorizer("#070808", 1.0), fontSize: 16, lineHeight: 20 }}>picBook™</Text>
      </View>
    </View>
  );
});
Card.displayName = "Card";
const AlphabetGroup: React.FC<AlphabetGroupProps> = memo(({ title, items }) => {
  const bounce = useSharedValue(0);
  useEffect(() => {
    bounce.value = withRepeat(withSequence(withTiming(-5, { duration: 500 }), withTiming(0, { duration: 500 })), -1, true);
  }, [bounce]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: bounce.value }] }));
  return (
    <View className="m-1 p-1 pb-2 rounded-l-3xl" style={{ backgroundColor: Colorizer("#1b1b1b", 1.0) }}>
      <View className="flex-row m-4">
        <Animated.View style={animatedStyle}>
          <FontAwesome5 name="layer-group" size={28} color={Colorizer("#E9E9EA", 1.0)} className="mr-2" />
        </Animated.View>
        <Text className="text-2xl font-bold text-center" style={{ fontFamily: "Kurale", color: Colorizer("#E9E9EA", 1.0) }}>
          Sub-Category - "{title}"
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} className="mx-1 w-[300px]">
            <Card data={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
});
AlphabetGroup.displayName = "AlphabetGroup";
const CategoryButton: React.FC<CategoryButtonExtendedProps> = memo(({ category, selected, onPress }) => (
  <TouchableOpacity style={{ backgroundColor: selected ? "red" : Colorizer("#E9E9EA", 1.0) }} className="px-4 py-2 rounded-lg mx-1" activeOpacity={0.7} onPress={onPress}>
    <Text style={{ fontFamily: "Kurale", color: selected ? Colorizer("#E9E9EA", 1.0) : Colorizer("#000000", 1.0) }} className="text-sm font-bold">
      {category}
    </Text>
  </TouchableOpacity>
));
CategoryButton.displayName = "CategoryButton";
const HeaderComponent: React.FC<{ categories: Category[]; selectedCategory: string; onSelectCategory: (categoryName: string) => void }> = memo(({ categories, selectedCategory, onSelectCategory }) => (
  <>
    <HeaderAnimate />
    <View className="p-4">
      <View className="flex-row items-center justify-center">
        <FontAwesome name="wpexplorer" size={28} color={Colorizer("#E9E9EA", 1.0)} className="mr-2" />
        <Text style={{ fontFamily: "Kurale", color: Colorizer("#E9E9EA", 1.0) }} className="text-3xl font-bold text-center">
          Explore Our Collection
        </Text>
        <Ionicons name="images-outline" size={28} color={Colorizer("#E9E9EA", 1.0)} className="ml-2" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 mb-6">
        {categories.map((category) => (
          <CategoryButton key={category.name} category={category.name} selected={category.name === selectedCategory} onPress={() => onSelectCategory(category.name)} />
        ))}
      </ScrollView>
    </View>
  </>
));
HeaderComponent.displayName = "HeaderComponent";
const HomePage = (): JSX.Element => {
  const [groupedData, setGroupedData] = useState<GroupedData>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("Cinematic");
  useEffect(() => {
    const processImageUrls = (entry: EnvironmentEntry): EnvironmentEntry => ({
      ...entry,
      images: entry.images.map((image) => ({
        ...image,
        previewLink: `${image.previewLink}lowRes/${image.original_file_name}`,
        downloadLink: `${image.downloadLink}blob/highRes/${image.original_file_name}`
      }))
    });
    const groupEntriesByFirstLetter = (entries: EnvironmentEntry[]): { [key: string]: EnvironmentEntry[] } =>
      entries.reduce((acc, card) => {
        const firstLetter = card.environment_title[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(card);
        return acc;
      }, {} as { [key: string]: EnvironmentEntry[] });
    const fetchData = () => {
      const category = categories.find((c) => c.name === selectedCategory);
      if (!category) return;
      const allEntries: EnvironmentEntry[] = Object.values(category.database);
      const processedEntries = allEntries.map(processImageUrls);
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
  }, [selectedCategory]);
  const filteredGroups = groupedData;
  const renderGroup: ListRenderItem<[string, EnvironmentEntry[]]> = useCallback(({ item }) => <AlphabetGroup title={item[0]} items={item[1]} />, []);
  const getItemLayout = useCallback((_: unknown, index: number) => ({ length: 400, offset: 400 * index, index }), []);
  const keyExtractor = useCallback((item: [string, EnvironmentEntry[]]) => item[0], []);
  return (
    <View style={{ backgroundColor: Colorizer("#070808", 1.0), flex: 1 }} className="relative">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
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
        ListHeaderComponent={<HeaderComponent categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />}
      />
    </View>
  );
};
export default HomePage;
