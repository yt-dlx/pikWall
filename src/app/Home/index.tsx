// app/Home/index.tsx
import { Link } from "expo-router";
import Footer from "@/components/Footer";
import Colorizer from "@/components/Colorizer";
import AnimeDatabase from "@/database/Anime";
import PortraitDatabase from "@/database/Portrait";
import { EnvironmentEntry } from "@/types/database";
import LightningDatabase from "@/database/Lightning";
import CinematicDatabase from "@/database/Cinematic";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import PhotographyDatabase from "@/database/Photography";
import HeaderAnimate from "@/components/HeaderAnimated";
import React, { useEffect, useCallback, useState, useRef, memo } from "react";
import { SubImagesProps, CardProps, CategoryButtonProps } from "@/types/components";
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, StatusBar, Animated } from "react-native";
// ============================================================================================
// ============================================================================================
interface Category {
  name: string;
  database: Record<string, EnvironmentEntry>;
}
interface CategoryButtonExtendedProps extends CategoryButtonProps {
  selected: boolean;
  onPress: () => void;
}
// ============================================================================================
// ============================================================================================
const categories: Category[] = [
  { name: "Anime", database: AnimeDatabase },
  { name: "Portrait", database: PortraitDatabase },
  { name: "Lightning", database: LightningDatabase },
  { name: "Cinematic", database: CinematicDatabase },
  { name: "Photography", database: PhotographyDatabase }
];
// ============================================================================================
// ============================================================================================
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
            <Image source={{ uri: image.previewLink }} className="w-full h-16 rounded-md border" style={{ borderColor: Colorizer(image.primary, 0.5) }} resizeMode="cover" />
            <Text
              className="absolute bottom-0.5 right-0.5 px-1 py-0.5 text-[10px] rounded-full"
              style={{ color: Colorizer("#E9E9EA", 1.0), fontFamily: "Kurale", backgroundColor: Colorizer(image.primary, 1.0) }}
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
// ============================================================================================
// ============================================================================================
const Card: React.FC<CardProps> = memo(({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(data.images[0]?.previewLink);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const updateImageState = useCallback(
    (nextIndex: number) => {
      setCurrentIndex(nextIndex);
      setCurrentImage(data.images[nextIndex]?.previewLink);
    },
    [data.images]
  );
  const startFadeTransition = useCallback(
    (nextIndex: number) => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 2000, useNativeDriver: true }).start(() => {
        updateImageState(nextIndex);
        Animated.timing(fadeAnim, { toValue: 1, duration: 2000, useNativeDriver: true }).start();
      });
    },
    [fadeAnim, updateImageState]
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
    const interval = setInterval(updateNextImage, 1500 * 2);
    return () => clearInterval(interval);
  }, [updateNextImage]);
  useEffect(() => {
    updateImageState(0);
  }, [data, updateImageState]);
  return (
    <View className="rounded-xl overflow-hidden border mb-2" style={{ backgroundColor: Colorizer("#111415", 1.0), borderColor: Colorizer(data.images[currentIndex].primary, 0.5) }}>
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
          <View className="relative aspect-[9/16] w-full overflow-hidden">
            <Animated.Image source={{ uri: currentImage }} style={{ width: "100%", height: "100%", opacity: fadeAnim, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} resizeMode="cover" />
            <View className="absolute top-0 left-0 right-0 items-center justify-start">
              <Text
                style={{ fontFamily: "Kurale", backgroundColor: Colorizer(data.images[currentIndex].primary, 0.6), color: Colorizer("#E9E9EA", 1.0) }}
                className="text-xl font-bold rounded-full text-center px-2 m-2"
              >
                {data.images[currentIndex].original_file_name.replace(/_/g, " ").replace(".jpg", "")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <View className="flex flex-row p-0.5">
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
      <View className="border-t items-center justify-center py-0.5" style={{ backgroundColor: Colorizer(data.images[currentIndex].primary, 1.0) }}>
        <Text style={{ fontFamily: "Kurale", color: Colorizer("#070808", 1.0), fontSize: 12, lineHeight: 16 }} className="font-bold">
          picBook™
        </Text>
      </View>
    </View>
  );
});
Card.displayName = "Card";
// ============================================================================================
// ============================================================================================
const CategoryButton: React.FC<CategoryButtonExtendedProps> = memo(({ category, selected, onPress }) => (
  <TouchableOpacity style={{ backgroundColor: selected ? Colorizer("#BE2528", 1.0) : Colorizer("#E9E9EA", 1.0) }} className="px-6 py-2 rounded mx-0.5" activeOpacity={0.7} onPress={onPress}>
    <Text style={{ fontFamily: "Kurale", color: selected ? Colorizer("#E9E9EA", 1.0) : Colorizer("#000000", 1.0) }} className="text-base font-bold">
      {category}
    </Text>
  </TouchableOpacity>
));
CategoryButton.displayName = "CategoryButton";
// ============================================================================================
// ============================================================================================
const HeaderComponent: React.FC<{ categories: Category[]; selectedCategory: string; onSelectCategory: (categoryName: string) => void }> = memo(({ categories, selectedCategory, onSelectCategory }) => (
  <>
    <HeaderAnimate />
    <View className="py-8 px-2">
      <View className="flex-row items-center justify-center">
        <FontAwesome name="wpexplorer" size={24} color={Colorizer("#E9E9EA", 1.0)} className="mr-1" />
        <Text style={{ fontFamily: "Kurale", color: Colorizer("#E9E9EA", 1.0) }} className="text-2xl font-bold text-center">
          Explore Our Collection
        </Text>
        <Ionicons name="images-outline" size={24} color={Colorizer("#E9E9EA", 1.0)} className="ml-1" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2 mb-3">
        {categories.map((category) => (
          <CategoryButton key={category.name} category={category.name} selected={category.name === selectedCategory} onPress={() => onSelectCategory(category.name)} />
        ))}
      </ScrollView>
    </View>
  </>
));
HeaderComponent.displayName = "HeaderComponent";
// ============================================================================================
// ============================================================================================
const HomePage = (): JSX.Element => {
  const [cardData, setCardData] = useState<EnvironmentEntry[]>([]);
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
    const fetchData = () => {
      const category = categories.find((c) => c.name === selectedCategory);
      if (!category) return;
      const allEntries: EnvironmentEntry[] = Object.values(category.database);
      const processedEntries = allEntries.map(processImageUrls);
      const shuffledEntries = [...processedEntries].sort(() => Math.random() - 0.5);
      setCardData(shuffledEntries);
    };
    fetchData();
  }, [selectedCategory]);
  const renderCard = useCallback(
    ({ item }: { item: EnvironmentEntry }) => (
      <View style={{ flex: 1, padding: 1 }}>
        <Card data={item} />
      </View>
    ),
    []
  );
  const keyExtractor = useCallback((item: EnvironmentEntry) => item.environment_title, []);
  return (
    <View style={{ backgroundColor: Colorizer("#070808", 1.0), flex: 1 }} className="relative">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <FlatList
        windowSize={3}
        data={cardData}
        numColumns={2}
        initialNumToRender={4}
        renderItem={renderCard}
        maxToRenderPerBatch={4}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
        ListFooterComponent={Footer}
        updateCellsBatchingPeriod={50}
        contentContainerStyle={{ padding: 1 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={<HeaderComponent categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />}
      />
    </View>
  );
};

export default HomePage;
