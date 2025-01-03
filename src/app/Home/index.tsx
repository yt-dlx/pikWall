// app/Home/index.tsx
import MountainsAndBeaches from "@/database/Mountains And Beaches";
import CosmicAndLightning from "@/database/Cosmic And Lightning";
import AntiqueLookObject from "@/database/Antique Look Object";
import MinimalistAbstract from "@/database/Minimalist Abstract";
import NaturalLandscapes from "@/database/Natural Landscapes";
import AnimeLandscapes from "@/database/Anime Landscapes";
import NatureWonders from "@/database/Nature Wonders";
import HyperCloseups from "@/database/Hyper Closeups";
import PortraitPerfect from "@/database/Portrait Perfect";
import AerialView from "@/database/Aerial View";
// ============================================================================================
// ============================================================================================
import { Link } from "expo-router";
import { Image } from "expo-image";
import Colorizer from "@/utils/Colorizer";
import Footer from "@/components/Footer";
import { FontAwesome5 } from "@expo/vector-icons";
import { EnvironmentEntry } from "@/types/database";
import { LinearGradient } from "expo-linear-gradient";
import HeaderAnimate from "@/components/HeaderAnimated";
import React, { useEffect, useRef, useCallback, useState, memo, FC } from "react";
import { SubImagesProps, CardProps, CategoryButtonProps } from "@/types/components";
import { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import { Animated, View, Text, TouchableOpacity, FlatList, ScrollView, StatusBar, TextInput } from "react-native";
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
  {
    name: "All Shuffled",
    database: {
      ...AerialView,
      ...PortraitPerfect,
      ...HyperCloseups,
      ...NatureWonders,
      ...AnimeLandscapes,
      ...NaturalLandscapes,
      ...MinimalistAbstract,
      ...AntiqueLookObject,
      ...CosmicAndLightning,
      ...MountainsAndBeaches
    }
  },
  { name: "Aerial View", database: AerialView },
  { name: "Portrait Perfect", database: PortraitPerfect },
  { name: "Hyper Closeups", database: HyperCloseups },
  { name: "Nature Wonders", database: NatureWonders },
  { name: "Antique Looking", database: AntiqueLookObject },
  { name: "Anime Landscapes", database: AnimeLandscapes },
  { name: "Cosmic-Lightning", database: CosmicAndLightning },
  { name: "Natural Landscapes", database: NaturalLandscapes },
  { name: "Minimalist Abstract", database: MinimalistAbstract },
  { name: "Mountains-Beaches", database: MountainsAndBeaches }
];
// ============================================================================================
// ============================================================================================
const SearchBar: FC<{ onSearch: (text: string) => void }> = memo(({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };
  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colorizer("#242424", 1.0), borderRadius: 9999, paddingHorizontal: 12, height: 30 }}>
        <FontAwesome5 name="search" size={16} color={Colorizer("#FFFFFF", 0.6)} />
        <TextInput
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Search by image name..."
          placeholderTextColor={Colorizer("#FFFFFF", 0.6)}
          style={{ flex: 1, marginLeft: 8, fontFamily: "Kurale_Regular", color: Colorizer("#FFFFFF", 1.0) }}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <FontAwesome5 name="times" size={16} color={Colorizer("#FFFFFF", 0.6)} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
SearchBar.displayName = "SearchBar";
// ============================================================================================
// ============================================================================================
const SubImages: FC<SubImagesProps> = memo(({ images, onImagePress }) => (
  <View className="flex flex-col justify-start">
    {images.data.map((image, index) => {
      const fullDataIndex = images.allData.findIndex((img) => img.original_file_name === image.original_file_name);
      return (
        <Link key={index} href={{ pathname: "./Image", params: { data: JSON.stringify({ selectedIndex: fullDataIndex, data: images.allData, environment_title: images.environment_title }) } }} asChild>
          <TouchableOpacity onPress={() => onImagePress(image.previewLink, fullDataIndex)} className="p-[0.2px] flex-1">
            <View className="relative">
              <Image
                source={{ uri: image.previewLink }}
                style={{ height: 50, borderWidth: 1, width: "100%", borderRadius: 4, borderColor: Colorizer(image.primary, 0.5) }}
                cachePolicy="memory-disk"
                contentFit="cover"
              />
              <Text
                className="absolute m-1 bottom-1 right-1 px-2 text-xs rounded-2xl"
                style={{ fontFamily: "Kurale_Regular", color: Colorizer("#FFFFFF", 1.0), backgroundColor: Colorizer(image.primary, 1.0) }}
              >
                {image.primary.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      );
    })}
  </View>
));
SubImages.displayName = "SubImages";
// ============================================================================================
// ============================================================================================
const Card: FC<CardProps> = memo(({ data }) => {
  const textScale = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const imageFadeValue = useRef(new Animated.Value(1)).current;
  const [currentImage, setCurrentImage] = useState<string>(data.images[0]?.previewLink);
  const updateImageState = useCallback(
    (nextIndex: number) => {
      setCurrentIndex(nextIndex);
      setCurrentImage(data.images[nextIndex]?.previewLink);
    },
    [data.images]
  );
  const animateImageOut = useCallback(
    (cb: () => void) => {
      Animated.timing(imageFadeValue, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }).start(() => cb());
    },
    [imageFadeValue]
  );
  const animateImageIn = useCallback(() => {
    Animated.timing(imageFadeValue, { toValue: 1, duration: 3000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }).start();
  }, [imageFadeValue]);
  const animateText = useCallback(() => {
    Animated.timing(textOpacity, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }).start();
    Animated.timing(textScale, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }).start();
  }, [textOpacity, textScale]);
  const startTransition = useCallback(
    (nextIndex: number) => {
      animateImageOut(() => {
        updateImageState(nextIndex);
        animateImageIn();
        animateText();
      });
    },
    [animateImageOut, animateImageIn, animateText, updateImageState]
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.images.length;
      startTransition(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, data.images.length, startTransition]);
  useEffect(() => {
    updateImageState(0);
  }, [data, updateImageState]);
  return (
    <View className="rounded-3xl overflow-hidden border mb-1" style={{ backgroundColor: Colorizer("#0C0C0C", 1.0), borderColor: Colorizer(data.images[currentIndex].primary, 0.2) }}>
      <Link href={{ pathname: "./Image", params: { data: JSON.stringify({ data: data.images, selectedIndex: currentIndex, environment_title: data.environment_title }) } }} asChild>
        <TouchableOpacity>
          <View className="relative aspect-[9/16] w-full overflow-hidden">
            <Animated.Image source={{ uri: currentImage }} style={{ width: "100%", height: "100%", borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: imageFadeValue }} />
            <View className="absolute bottom-0 left-0 right-0 items-center justify-start">
              <Animated.Text
                style={{
                  opacity: textOpacity,
                  textAlign: "center",
                  fontFamily: "Kurale_Regular",
                  transform: [{ scale: textScale }],
                  color: Colorizer("#FFFFFF", 1.0),
                  backgroundColor: Colorizer(data.images[currentIndex].primary, 10.0)
                }}
                className="text-sm m-1 px-1 rounded-xl"
              >
                {data.images[currentIndex].original_file_name.replace(/_/g, " ").replace(".jpg", "")}
              </Animated.Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <View className="flex flex-row p-0.5">
        <View className="w-1/2">
          <SubImages
            onImagePress={(previewLink, index) => startTransition(index)}
            images={{ allData: data.images, data: data.images.slice(0, 2), selectedIndex: currentIndex, environment_title: data.environment_title }}
          />
        </View>
        <View className="w-1/2">
          <SubImages
            onImagePress={(previewLink, index) => startTransition(index)}
            images={{ allData: data.images, data: data.images.slice(2, 4), selectedIndex: currentIndex, environment_title: data.environment_title }}
          />
        </View>
      </View>
      <View className="border-t items-center justify-center py-0.5" style={{ backgroundColor: Colorizer(data.images[currentIndex].primary, 1.0) }}>
        <Text style={{ fontFamily: "Dm_Serif_Display_Regular", color: Colorizer("#0C0C0C", 1.0), fontSize: 10 }}>picWall AI</Text>
      </View>
    </View>
  );
});
Card.displayName = "Card";
// ============================================================================================
// ============================================================================================
const CategoryButton: FC<CategoryButtonExtendedProps> = memo(({ category, selected, onPress }) => {
  const getCategoryFirstImage = () => {
    const categoryData = categories.find((c) => c.name === category)?.database;
    if (!categoryData) return "";
    const firstEntry = Object.values(categoryData)[0];
    if (!firstEntry?.images?.[0]) return "";
    return `${firstEntry.images[0].previewLink}lowRes/${firstEntry.images[0].original_file_name}`;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ margin: 1, width: 110, height: 60, borderRadius: 15, overflow: "hidden", borderWidth: 1, borderColor: selected ? Colorizer("#FFFFFF", 0.5) : "transparent" }}
    >
      <View style={{ borderRadius: 4, overflow: "hidden", width: "100%", height: "100%" }}>
        <Image source={{ uri: getCategoryFirstImage() }} style={{ width: "100%", height: "100%", borderRadius: 15 }} contentFit="cover" />
        <LinearGradient colors={["transparent", Colorizer("#0C0C0C", 0.5), Colorizer("#0C0C0C", 1.0)]} style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 15 }} />
        <View style={{ position: "absolute", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
          <Text style={{ fontFamily: "Kurale_Regular", color: Colorizer("#FFFFFF", 1.0), fontSize: 12, textAlign: "center", paddingHorizontal: 4 }}> {category} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
CategoryButton.displayName = "CategoryButton";
// ============================================================================================
// ============================================================================================
const HeaderComponent: FC<{ categories: Category[]; selectedCategory: string; onSelectCategory: (categoryName: string) => void; onSearch: (text: string) => void }> = memo(
  ({ categories, selectedCategory, onSelectCategory, onSearch }) => {
    const fadeInValue = useSharedValue(0);
    const leftIconTranslate = useSharedValue(0);
    const rightIconTranslate = useSharedValue(0);
    const fadeInStyle = useAnimatedStyle(() => ({ opacity: fadeInValue.value }));
    const leftIconStyle = useAnimatedStyle(() => ({ transform: [{ translateX: leftIconTranslate.value }] }));
    const rightIconStyle = useAnimatedStyle(() => ({ transform: [{ translateX: rightIconTranslate.value }] }));
    useEffect(() => {
      fadeInValue.value = withTiming(1, { duration: 1500, easing: Easing.ease });
      leftIconTranslate.value = withRepeat(withTiming(-30, { duration: 1000, easing: Easing.ease }), -1, true);
      rightIconTranslate.value = withRepeat(withTiming(30, { duration: 1000, easing: Easing.ease }), -1, true);
    }, [fadeInValue, leftIconTranslate, rightIconTranslate]);
    return (
      <Animated.View style={fadeInStyle}>
        <View className="-m-2">
          <HeaderAnimate />
        </View>
        <View style={{ marginTop: 10, paddingTop: 20, paddingRight: 3, paddingLeft: 1, paddingBottom: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Animated.View style={leftIconStyle}>
              <FontAwesome5 name="caret-left" size={24} color="#FFFFFF" />
            </Animated.View>
            <Text style={{ fontFamily: "Lobster_Regular", fontSize: 40, color: "#FFFFFF", textAlign: "center", marginHorizontal: 10 }}>Our Categories</Text>
            <Animated.View style={rightIconStyle}>
              <FontAwesome5 name="caret-right" size={24} color="#FFFFFF" />
            </Animated.View>
          </View>
          <SearchBar onSearch={onSearch} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <CategoryButton key={category.name} category={category.name} selected={category.name === selectedCategory} onPress={() => onSelectCategory(category.name)} />
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    );
  }
);
HeaderComponent.displayName = "HeaderComponent";
// ============================================================================================
// ============================================================================================
const HomePage = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<EnvironmentEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Shuffled");
  const getAllCombinedData = useCallback(() => {
    const allCombinedCategory = categories.find((c) => c.name === "All Shuffled");
    if (!allCombinedCategory) return [];
    return Object.values(allCombinedCategory.database);
  }, []);
  const processImageUrls = useCallback(
    (entry: EnvironmentEntry): EnvironmentEntry => ({
      ...entry,
      images: entry.images.map((image) => ({
        ...image,
        previewLink: `${image.previewLink}lowRes/${image.original_file_name}`,
        downloadLink: `${image.downloadLink}blob/highRes/${image.original_file_name}`
      }))
    }),
    []
  );
  useEffect(() => {
    const fetchData = () => {
      const category = categories.find((c) => c.name === selectedCategory);
      if (!category) return;
      const allEntries: EnvironmentEntry[] = Object.values(category.database);
      const processedEntries = allEntries.map(processImageUrls);
      const shuffledEntries = [...processedEntries].sort(() => Math.random() - 0.5);
      setFilteredData(shuffledEntries);
    };
    fetchData();
  }, [selectedCategory, processImageUrls]);
  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      const searchText = text.toLowerCase().trim();
      if (!searchText) {
        const category = categories.find((c) => c.name === selectedCategory);
        if (!category) return;
        const entries = Object.values(category.database).map(processImageUrls);
        setFilteredData(entries);
        return;
      }
      const matchesSearch = (imageName: string) => {
        const normalizedName = imageName.toLowerCase().replace(/_/g, " ").replace(".jpg", "");
        return normalizedName.includes(searchText);
      };
      const getMatchingImages = (entry: EnvironmentEntry) => {
        return entry.images.filter((img) => matchesSearch(img.original_file_name));
      };
      const allEntries = getAllCombinedData().map(processImageUrls);
      const matchingEntries = allEntries.reduce(
        (acc, entry) => {
          const matchingImages = getMatchingImages(entry);
          if (matchingImages.length > 0) {
            const matchEntry = { ...entry, images: matchingImages };
            const hasExactMatch = matchingImages.some((img) => img.original_file_name.toLowerCase().replace(/_/g, " ").replace(".jpg", "").startsWith(searchText));
            if (hasExactMatch) acc.exactMatches.push(matchEntry);
            else acc.partialMatches.push(matchEntry);
          }
          return acc;
        },
        { exactMatches: [] as EnvironmentEntry[], partialMatches: [] as EnvironmentEntry[] }
      );
      const sortedResults = [...matchingEntries.exactMatches, ...matchingEntries.partialMatches];
      const finalResults =
        selectedCategory === "All Shuffled"
          ? sortedResults
          : sortedResults.filter((entry) => {
              const categoryData = categories.find((c) => c.name === selectedCategory)?.database || {};
              return entry.environment_title in categoryData;
            });
      setFilteredData(finalResults);
    },
    [selectedCategory, processImageUrls, getAllCombinedData]
  );
  const renderItem = useCallback(
    ({ item }: { item: EnvironmentEntry; index: number }) => (
      <View style={{ flex: 1, margin: 1 }}>
        <Card data={item} />
      </View>
    ),
    []
  );
  const keyExtractor = useCallback((item: EnvironmentEntry) => item.environment_title, []);
  const renderEmptyList = useCallback(() => {
    if (searchQuery) {
      return (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontFamily: "Kurale_Regular", color: Colorizer("#FFFFFF", 0.8), fontSize: 16, textAlign: "center" }}>No images found matching "{searchQuery}".</Text>
          <Text style={{ fontFamily: "Kurale_Regular", color: Colorizer("#FFFFFF", 0.8), fontSize: 16, textAlign: "center" }}>You may request images from "Account" Section.</Text>
        </View>
      );
    }
    return null;
  }, [searchQuery]);
  return (
    <View style={{ backgroundColor: Colorizer("#0C0C0C", 1.0), flex: 1 }} className="relative">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <FlatList
        windowSize={3}
        data={filteredData}
        numColumns={2}
        initialNumToRender={4}
        renderItem={renderItem}
        maxToRenderPerBatch={4}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
        ListFooterComponent={Footer}
        ListEmptyComponent={renderEmptyList}
        updateCellsBatchingPeriod={50}
        contentContainerStyle={{ padding: 1 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={<HeaderComponent categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} onSearch={handleSearch} />}
      />
    </View>
  );
};
export default HomePage;
