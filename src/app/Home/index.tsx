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
import React, { useEffect, useCallback, useState, memo, FC } from "react";
import { SubImagesProps, CardProps, CategoryButtonProps } from "@/types/components";
import { View, Text, TouchableOpacity, FlatList, ScrollView, StatusBar, TextInput } from "react-native";
import Animated, { Easing, runOnJS, useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
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
const AnimatedImage = Animated.createAnimatedComponent(Image);
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
    <View style={{ padding: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colorizer("#643425", 1.0), borderRadius: 4, paddingHorizontal: 12, height: 30 }}>
        <FontAwesome5 name="search" size={16} color={Colorizer("#f2dfce", 0.6)} />
        <TextInput
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Search by image name..."
          placeholderTextColor={Colorizer("#f2dfce", 0.6)}
          style={{ flex: 1, marginLeft: 8, fontFamily: "Kurale_Regular", color: Colorizer("#f2dfce", 1.0) }}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <FontAwesome5 name="times" size={16} color={Colorizer("#f2dfce", 0.6)} />
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
                style={{ fontFamily: "Kurale_Regular", color: Colorizer("#F2EFE0", 1.0), backgroundColor: Colorizer(image.primary, 1.0) }}
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
  const fadeInValue = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(data.images[0]?.previewLink);
  const fadeValue = useSharedValue(1);
  const textOpacity = useSharedValue(1);
  const textScale = useSharedValue(1);
  const updateImageState = useCallback(
    (nextIndex: number) => {
      setCurrentIndex(nextIndex);
      setCurrentImage(data.images[nextIndex]?.previewLink);
    },
    [data.images]
  );
  const animateOut = useCallback(
    (cb: () => void) => {
      fadeValue.value = withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) }, () => {
        runOnJS(cb)();
      });
      textOpacity.value = withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) });
    },
    [fadeValue, textOpacity]
  );
  const animateIn = useCallback(() => {
    textScale.value = 0.9;
    fadeValue.value = withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) });
    textOpacity.value = withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) });
    textScale.value = withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) });
  }, [fadeValue, textOpacity, textScale]);
  const startTransition = useCallback(
    (nextIndex: number) => {
      animateOut(() => {
        updateImageState(nextIndex);
        animateIn();
      });
    },
    [animateOut, animateIn, updateImageState]
  );
  const updateNextImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % data.images.length;
    startTransition(nextIndex);
  }, [currentIndex, data.images.length, startTransition]);
  const handleSubImagePress = useCallback(
    (previewLink: string, index: number) => {
      startTransition(index);
    },
    [startTransition]
  );
  useEffect(() => {
    const interval = setInterval(updateNextImage, 3000);
    return () => clearInterval(interval);
  }, [updateNextImage]);
  useEffect(() => {
    updateImageState(0);
  }, [data, updateImageState]);
  const imageStyle = useAnimatedStyle(() => ({ opacity: fadeValue.value }));
  const fadeInStyle = useAnimatedStyle(() => ({ opacity: fadeInValue.value }));
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value, transform: [{ scale: textScale.value }] }));
  useEffect(() => {
    fadeInValue.value = withTiming(2, { duration: 3000, easing: Easing.ease });
  }, [fadeInValue]);
  return (
    <Animated.View style={fadeInStyle}>
      <View className="rounded-b-lg rounded-t-2xl overflow-hidden border" style={{ backgroundColor: Colorizer("#0D0907", 1.0), borderColor: Colorizer(data.images[currentIndex].primary, 0.4) }}>
        <Link href={{ pathname: "./Image", params: { data: JSON.stringify({ data: data.images, selectedIndex: currentIndex, environment_title: data.environment_title }) } }} asChild>
          <TouchableOpacity>
            <View className="relative aspect-[9/16] w-full overflow-hidden">
              <AnimatedImage source={{ uri: currentImage }} style={[{ width: "100%", height: "100%", borderTopLeftRadius: 8, borderTopRightRadius: 8 }, imageStyle]} contentFit="cover" />
              <View className="absolute bottom-0 left-0 right-0 items-center justify-start">
                <Animated.Text
                  style={[textStyle, { textAlign: "center", fontFamily: "Kurale_Regular", color: Colorizer("#F2EFE0", 1.0), backgroundColor: Colorizer(data.images[currentIndex].primary, 1.0) }]}
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
              onImagePress={handleSubImagePress}
              images={{
                allData: data.images,
                data: data.images.slice(0, 2),
                selectedIndex: currentIndex,
                environment_title: data.environment_title
              }}
            />
          </View>
          <View className="w-1/2">
            <SubImages
              onImagePress={handleSubImagePress}
              images={{
                allData: data.images,
                data: data.images.slice(2, 4),
                selectedIndex: currentIndex,
                environment_title: data.environment_title
              }}
            />
          </View>
        </View>
        <View className="border-t items-center justify-center py-0.5" style={{ backgroundColor: Colorizer(data.images[currentIndex].primary, 1.0) }}>
          <Text style={{ fontFamily: "Dm_Serif_Display_Regular", color: Colorizer("#0D0907", 1.0), fontSize: 10, lineHeight: 16 }}>Generated by picWall AI</Text>
        </View>
      </View>
    </Animated.View>
  );
});
Card.displayName = "Card";
// ============================================================================================
// ============================================================================================
function getCategoryIcon(selected: boolean) {
  const iconSize = selected ? 15 : 10;
  const iconName = selected ? "gripfire" : "swatchbook";
  const iconColor = selected ? Colorizer("#F2EFE0", 1.0) : Colorizer("#0D0907", 1.0);
  return <FontAwesome5 name={iconName} size={iconSize} color={iconColor} />;
}
// ============================================================================================
// ============================================================================================
const CategoryButton: FC<CategoryButtonExtendedProps> = memo(({ category, selected, onPress }) => {
  const translateX = useSharedValue(0);
  useEffect(() => {
    translateX.value = withRepeat(withTiming(50, { duration: 1000 }), -1, true);
  }, [translateX]);
  return (
    <TouchableOpacity
      style={{ borderRadius: 4, overflow: "hidden", padding: 2 }}
      accessibilityLabel={`${category} category button`}
      accessibilityState={{ selected }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={{ alignItems: "center", margin: 2 }}>
        <Animated.View
          style={[{ width: 100, height: 1, backgroundColor: selected ? "#803A21" : "#F5E5CE", borderRadius: 50 }, useAnimatedStyle(() => ({ transform: [{ translateX: -translateX.value }] }))]}
        />
      </View>
      <LinearGradient
        colors={selected ? [Colorizer("#803A21", 1.0), Colorizer("#BA652D", 1.0), Colorizer("#C26F2D", 1.0)] : [Colorizer("#F2EFE0", 1.0), Colorizer("#F5EBDF", 1.0), Colorizer("#F5E5CE", 1.0)]}
        style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {getCategoryIcon(selected)}
          <Text style={{ fontFamily: "Kurale_Regular", color: selected ? Colorizer("#F2EFE0", 1.0) : Colorizer("#0D0907", 1.0) }} className="ml-1 p-1 text-sm">
            {category}
          </Text>
        </View>
      </LinearGradient>
      <View style={{ alignItems: "center", margin: 2 }}>
        <Animated.View
          style={[{ width: 100, height: 1, backgroundColor: selected ? "#C26F2D" : "#F2EFE0", borderRadius: 50 }, useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }))]}
        />
      </View>
    </TouchableOpacity>
  );
});
CategoryButton.displayName = "CategoryButton";
// ============================================================================================
// ============================================================================================
const FilterButton: FC<{ selectedCategory: string }> = memo(({ selectedCategory }) => {
  const fadeInValue = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);
  const fadeInStyle = useAnimatedStyle(() => ({ opacity: fadeInValue.value }));
  useEffect(() => {
    fadeInValue.value = withTiming(1, { duration: 1000, easing: Easing.ease });
  }, [fadeInValue]);
  return (
    <Animated.View style={[fadeInStyle, { paddingHorizontal: 2, marginBottom: 2 }]}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={{ flexDirection: "row", alignItems: "center", backgroundColor: Colorizer("#643425", 0.5), paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 }}
      >
        <FontAwesome5 name="filter" size={15} color={Colorizer("#f2dfce", 1.0)} />
        <Text style={{ marginLeft: 8, fontFamily: "Kurale_Regular", color: Colorizer("#f2dfce", 1.0), fontSize: 14 }}>Filter Styles</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});
FilterButton.displayName = "FilterButton";
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
        <LinearGradient
          colors={["#1a1512", "#2e1c12", Colorizer("#602311", 0.6), "transparent"]}
          style={{ marginTop: 10, paddingTop: 20, paddingRight: 3, paddingLeft: 1, paddingBottom: 10 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Animated.View style={leftIconStyle}>
              <FontAwesome5 name="caret-left" size={24} color="#F2EFE0" />
            </Animated.View>
            <Text style={{ fontFamily: "Lobster_Regular", fontSize: 40, color: "#F2EFE0", textAlign: "center", marginHorizontal: 10 }}>Our Categories</Text>
            <Animated.View style={rightIconStyle}>
              <FontAwesome5 name="caret-right" size={24} color="#F2EFE0" />
            </Animated.View>
          </View>
          <SearchBar onSearch={onSearch} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <CategoryButton key={category.name} category={category.name} selected={category.name === selectedCategory} onPress={() => onSelectCategory(category.name)} />
            ))}
          </ScrollView>
        </LinearGradient>
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
    ({ item, index }: { item: EnvironmentEntry; index: number }) => (
      <View style={{ flex: 1, margin: 1, marginTop: index % 2 !== 0 && index !== 1 ? -38 : 0 }}>
        {index === 0 && <FilterButton selectedCategory={selectedCategory} />}
        <Card data={item} />
      </View>
    ),
    [selectedCategory]
  );
  const keyExtractor = useCallback((item: EnvironmentEntry) => item.environment_title, []);
  const renderEmptyList = useCallback(() => {
    if (searchQuery) {
      return (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontFamily: "Kurale_Regular", color: Colorizer("#F2EFE0", 0.8), fontSize: 16, textAlign: "center" }}>No images found matching "{searchQuery}".</Text>
          <Text style={{ fontFamily: "Kurale_Regular", color: Colorizer("#F2EFE0", 0.8), fontSize: 16, textAlign: "center" }}>You may request images from "Account" Section.</Text>
        </View>
      );
    }
    return null;
  }, [searchQuery]);
  return (
    <View style={{ backgroundColor: Colorizer("#1a1512", 1.0), flex: 1 }} className="relative">
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
