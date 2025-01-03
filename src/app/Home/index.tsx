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
import { LinearGradient } from "expo-linear-gradient";
import { EnvironmentEntry } from "@/types/database";
import HeaderAnimate from "@/components/HeaderAnimated";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useRef, useCallback, useState, memo, FC } from "react";
import { SubImagesProps, CardProps, CategoryButtonProps } from "@/types/components";
import { Animated, View, Text, TouchableOpacity, FlatList, StatusBar, TextInput, Modal } from "react-native";
import { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
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
    name: "Shuffle Wallpapers",
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
                style={{ fontFamily: "Kurale_Regular", color: Colorizer("#0C0C0C", 1.0), backgroundColor: Colorizer(image.primary, 1.0) }}
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
    <View className="rounded-xl overflow-hidden border mb-1" style={{ backgroundColor: Colorizer("#0C0C0C", 1.0), borderColor: Colorizer(data.images[currentIndex].primary, 0.2) }}>
      <Link href={{ pathname: "./Image", params: { data: JSON.stringify({ data: data.images, selectedIndex: currentIndex, environment_title: data.environment_title }) } }} asChild>
        <TouchableOpacity>
          <View className="relative aspect-[9/16] w-full overflow-hidden">
            <Animated.Image source={{ uri: currentImage }} style={{ width: "100%", height: "100%", borderTopLeftRadius: 5, borderTopRightRadius: 5, opacity: imageFadeValue }} />
            <View className="absolute bottom-0 left-0 right-0 items-center justify-start">
              <Animated.Text
                style={{
                  opacity: textOpacity,
                  textAlign: "center",
                  fontFamily: "Kurale_Regular",
                  transform: [{ scale: textScale }],
                  color: Colorizer("#0C0C0C", 1.0),
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
const CategoryModal: FC<{ isVisible: boolean; onClose: () => void; onSelectCategory: (category: string) => void; selectedCategory: string }> = ({
  isVisible,
  onClose,
  onSelectCategory,
  selectedCategory
}) => {
  const getCategoryFirstImage = (categoryName: string) => {
    const categoryData = categories.find((c) => c.name === categoryName)?.database;
    if (!categoryData) return "";
    const firstEntry = Object.values(categoryData)[0];
    if (!firstEntry?.images?.[0]) return "";
    return `${firstEntry.images[0].previewLink}lowRes/${firstEntry.images[0].original_file_name}`;
  };
  const modalCategories = [
    "Aerial View",
    "Portrait Perfect",
    "Hyper Closeups",
    "Nature Wonders",
    "Antique Looking",
    "Anime Landscapes",
    "Cosmic-Lightning",
    "Natural Landscapes",
    "Minimalist Abstract",
    "Mountains-Beaches"
  ];
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 justify-end">
        <View className="rounded-t-3xl p-4" style={{ backgroundColor: Colorizer("#0C0C0C", 1.0) }}>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-3xl" style={{ fontFamily: "Lobster_Regular" }}>
              All Categories
            </Text>
            <TouchableOpacity onPress={onClose}>
              <FontAwesome5 name="times" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {modalCategories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  onSelectCategory(category);
                  onClose();
                }}
                style={{
                  margin: 4,
                  width: "47%",
                  height: 100,
                  borderRadius: 10,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: selectedCategory === category ? Colorizer("#FFFFFF", 0.5) : "transparent"
                }}
              >
                <View style={{ borderRadius: 4, overflow: "hidden", width: "100%", height: "100%" }}>
                  <Image source={{ uri: getCategoryFirstImage(category) }} style={{ width: "100%", height: "100%", borderRadius: 10 }} contentFit="cover" />
                  <LinearGradient colors={["transparent", Colorizer("#0C0C0C", 0.5), Colorizer("#0C0C0C", 1.0)]} style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 10 }} />
                  <View style={{ position: "absolute", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, textAlign: "center", paddingHorizontal: 4, fontFamily: "Kurale_Regular", color: Colorizer("#FFFFFF", 1.0) }}> {category} </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};
// ============================================================================================
// ============================================================================================
const CategoryButton: FC<CategoryButtonExtendedProps> = memo(({ category, selected, onPress }) => {
  const [currentImage, setCurrentImage] = useState<string>("");
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (category === "All Categories") {
      const allImages = categories
        .filter((c) => c.name !== "Shuffle Wallpapers")
        .flatMap((c) => Object.values(c.database).flatMap((entry) => entry.images))
        .map((img) => `${img.previewLink}lowRes/${img.original_file_name}`);
      if (allImages.length === 0) return;
      let index = 0;
      setCurrentImage(allImages[index]);
      const interval = setInterval(() => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
          index = (index + 1) % allImages.length;
          setCurrentImage(allImages[index]);
          Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [category, fadeAnim]);
  useEffect(() => {
    if (category === "Shuffle Wallpapers") {
      Animated.loop(
        Animated.sequence([Animated.timing(scaleAnim, { toValue: 1.3, duration: 2000, useNativeDriver: true }), Animated.timing(scaleAnim, { toValue: 1.0, duration: 2000, useNativeDriver: true })])
      ).start();
    }
  }, [category, scaleAnim]);
  const getCategoryFirstImage = () =>
    category === "Shuffle Wallpapers"
      ? require("@/assets/bg-shuffled.png")
      : category === "All Categories"
      ? currentImage
      : (() => {
          const categoryData = categories.find((c) => c.name === category)?.database;
          if (!categoryData) return "";
          const firstEntry = Object.values(categoryData)[0];
          return firstEntry?.images?.[0] ? `${firstEntry.images[0].previewLink}lowRes/${firstEntry.images[0].original_file_name}` : "";
        })();
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1, height: 60, width: "100%", borderWidth: 1, borderRadius: 10, margin: 2, overflow: "hidden" }}>
      <View style={{ borderRadius: 4, overflow: "hidden", width: "100%", height: "100%" }}>
        <Animated.Image
          source={category === "Shuffle Wallpapers" ? getCategoryFirstImage() : { uri: getCategoryFirstImage() }}
          style={{ width: "100%", height: "100%", borderRadius: 10, opacity: fadeAnim, transform: category === "Shuffle Wallpapers" ? [{ scale: scaleAnim }] : [] }}
        />
        <LinearGradient colors={["transparent", Colorizer("#0C0C0C", 0.5), Colorizer("#0C0C0C", 1.0)]} style={{ position: "absolute", width: "100%", height: "100%", borderRadius: 10 }} />
        <View style={{ position: "absolute", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", borderRadius: 10 }}>
          <FontAwesome6 name={category === "All Categories" ? "list" : "image"} size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={{ fontFamily: "Kurale_Regular", color: Colorizer("#FFFFFF", 1.0), fontSize: 14, textAlign: "center", paddingHorizontal: 4 }}>{category}</Text>
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
    const [modalVisible, setModalVisible] = useState(false);
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
        <View className="-m-4">
          <HeaderAnimate />
        </View>
        <View style={{ marginTop: 10, paddingTop: 20, paddingRight: 4, paddingLeft: 4, paddingBottom: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Animated.View style={leftIconStyle}>
              <FontAwesome5 name="caret-left" size={24} color="#FFFFFF" />
            </Animated.View>
            <Text style={{ fontFamily: "Lobster_Regular", fontSize: 40, color: "#FFFFFF", textAlign: "center", marginHorizontal: 10 }}>Our Gallery</Text>
            <Animated.View style={rightIconStyle}>
              <FontAwesome5 name="caret-right" size={24} color="#FFFFFF" />
            </Animated.View>
          </View>
          <SearchBar onSearch={onSearch} />
          <View className="flex-row justify-center">
            <CategoryButton category="Shuffle Wallpapers" selected={selectedCategory === "Shuffle Wallpapers"} onPress={() => onSelectCategory("Shuffle Wallpapers")} />
            <CategoryButton category="All Categories" selected={false} onPress={() => setModalVisible(true)} />
          </View>
          <CategoryModal isVisible={modalVisible} onClose={() => setModalVisible(false)} onSelectCategory={onSelectCategory} selectedCategory={selectedCategory} />
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
  const [selectedCategory, setSelectedCategory] = useState<string>("Shuffle Wallpapers");
  const getAllCombinedData = useCallback(() => {
    const allCombinedCategory = categories.find((c) => c.name === "Shuffle Wallpapers");
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
        selectedCategory === "Shuffle Wallpapers"
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
