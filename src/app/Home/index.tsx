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
import * as React from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Footer from "@/utils/Footer";
import Colorizer from "@/utils/Colorizer";
import { FontAwesome5 } from "@expo/vector-icons";
import { EnvironmentEntry } from "@/types/database";
import { LinearGradient } from "expo-linear-gradient";
import HeaderAnimate from "@/utils/HeaderAnimated";
import { SubImagesProps, CardProps, CategoryButtonProps } from "@/types/components";
import { View, Text, TouchableOpacity, FlatList, ScrollView, StatusBar } from "react-native";
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
  { name: "Mountains-Beaches", database: MountainsAndBeaches },
  { name: "Antique Look Object", database: AntiqueLookObject },
  { name: "Minimalist Abstract", database: MinimalistAbstract },
  { name: "Natural Landscapes", database: NaturalLandscapes },
  { name: "Cosmic-Lightning", database: CosmicAndLightning },
  { name: "Anime Landscapes", database: AnimeLandscapes },
  { name: "Nature Wonders", database: NatureWonders },
  { name: "Hyper Closeups", database: HyperCloseups },
  { name: "Portrait Perfect", database: PortraitPerfect },
  { name: "Aerial View", database: AerialView }
];
// ============================================================================================
// ============================================================================================
const SubImages: React.FC<SubImagesProps> = React.memo(({ images, onImagePress }) => (
  <View className="flex flex-col justify-start">
    {images.data.map((image, index) => (
      <Link key={index} href={{ pathname: "./Image", params: { data: JSON.stringify({ selectedIndex: index, data: images.data, environment_title: images.environment_title }) } }} asChild>
        <TouchableOpacity onPress={() => onImagePress(image.previewLink, index)} className="p-[0.2px] flex-1">
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
    ))}
  </View>
));
SubImages.displayName = "SubImages";
// ============================================================================================
// ============================================================================================
const Card: React.FC<CardProps> = React.memo(({ data }) => {
  const fadeInValue = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [currentImage, setCurrentImage] = React.useState<string>(data.images[0]?.previewLink);
  const fadeValue = useSharedValue(1);
  const textOpacity = useSharedValue(1);
  const textScale = useSharedValue(1);
  const updateImageState = React.useCallback(
    (nextIndex: number) => {
      setCurrentIndex(nextIndex);
      setCurrentImage(data.images[nextIndex]?.previewLink);
    },
    [data.images]
  );
  const animateOut = React.useCallback(
    (cb: () => void) => {
      fadeValue.value = withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }, () => {
        runOnJS(cb)();
      });
      textOpacity.value = withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) });
    },
    [fadeValue, textOpacity]
  );
  const animateIn = React.useCallback(() => {
    textScale.value = 0.8;
    fadeValue.value = withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) });
    textOpacity.value = withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) });
    textScale.value = withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) });
  }, [fadeValue, textOpacity, textScale]);
  const startTransition = React.useCallback(
    (nextIndex: number) => {
      animateOut(() => {
        updateImageState(nextIndex);
        animateIn();
      });
    },
    [animateOut, animateIn, updateImageState]
  );
  const updateNextImage = React.useCallback(() => {
    const nextIndex = (currentIndex + 1) % data.images.length;
    startTransition(nextIndex);
  }, [currentIndex, data.images.length, startTransition]);
  const handleSubImagePress = React.useCallback(
    (previewLink: string, index: number) => {
      startTransition(index);
    },
    [startTransition]
  );
  React.useEffect(() => {
    const interval = setInterval(updateNextImage, 4000);
    return () => clearInterval(interval);
  }, [updateNextImage]);
  React.useEffect(() => {
    updateImageState(0);
  }, [data, updateImageState]);
  const imageStyle = useAnimatedStyle(() => ({ opacity: fadeValue.value }));
  const fadeInStyle = useAnimatedStyle(() => ({ opacity: fadeInValue.value }));
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value, transform: [{ scale: textScale.value }] }));
  React.useEffect(() => {
    fadeInValue.value = withTiming(2, { duration: 2000, easing: Easing.ease });
  }, []);
  return (
    <Animated.View style={fadeInStyle}>
      <View className="rounded-b-lg rounded-t-2xl overflow-hidden border" style={{ backgroundColor: Colorizer("#171717", 1.0), borderColor: Colorizer(data.images[currentIndex].primary, 0.4) }}>
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
            <SubImages onImagePress={handleSubImagePress} images={{ data: data.images.slice(0, 2), selectedIndex: currentIndex, environment_title: data.environment_title }} />
          </View>
          <View className="w-1/2">
            <SubImages onImagePress={handleSubImagePress} images={{ data: data.images.slice(2, 4), selectedIndex: currentIndex, environment_title: data.environment_title }} />
          </View>
        </View>
        <View className="border-t items-center justify-center py-0.5" style={{ backgroundColor: Colorizer(data.images[currentIndex].primary, 1.0) }}>
          <Text style={{ fontFamily: "Dm_Serif_Display_Regular", color: Colorizer("#171717", 1.0), fontSize: 10, lineHeight: 16 }}>Generated by picWall AI</Text>
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
  const iconColor = selected ? Colorizer("#F2EFE0", 1.0) : Colorizer("#171717", 1.0);
  return <FontAwesome5 name={iconName} size={iconSize} color={iconColor} />;
}
// ============================================================================================
// ============================================================================================
const CategoryButton: React.FC<CategoryButtonExtendedProps> = React.memo(({ category, selected, onPress }) => {
  const translateX = useSharedValue(0);
  React.useEffect(() => {
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
          <Text style={{ fontFamily: "Caveat_Bold", color: selected ? Colorizer("#F2EFE0", 1.0) : Colorizer("#171717", 1.0) }} className="ml-1 p-1 text-lg">
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
const HeaderComponent: React.FC<{ categories: Category[]; selectedCategory: string; onSelectCategory: (categoryName: string) => void }> = React.memo(
  ({ categories, selectedCategory, onSelectCategory }) => {
    const fadeInValue = useSharedValue(0);
    const leftIconTranslate = useSharedValue(0);
    const rightIconTranslate = useSharedValue(0);
    const fadeInStyle = useAnimatedStyle(() => ({ opacity: fadeInValue.value }));
    const leftIconStyle = useAnimatedStyle(() => ({ transform: [{ translateX: leftIconTranslate.value }] }));
    const rightIconStyle = useAnimatedStyle(() => ({ transform: [{ translateX: rightIconTranslate.value }] }));
    React.useEffect(() => {
      fadeInValue.value = withTiming(1, { duration: 2000, easing: Easing.ease });
      leftIconTranslate.value = withRepeat(withTiming(-30, { duration: 1000, easing: Easing.ease }), -1, true);
      rightIconTranslate.value = withRepeat(withTiming(30, { duration: 1000, easing: Easing.ease }), -1, true);
    }, []);
    return (
      <Animated.View style={fadeInStyle}>
        <HeaderAnimate />
        <LinearGradient
          colors={[Colorizer("#1a1512", 1.0), Colorizer("#2e1c12", 0.8), Colorizer("#602311", 0.6), "transparent"]}
          style={{ borderRadius: 4, margin: 4, paddingTop: 20, paddingRight: 3, paddingLeft: 1 }}
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
  const [cardData, setCardData] = React.useState<EnvironmentEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Antique Look Object");
  React.useEffect(() => {
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
  const renderCard = React.useCallback(
    ({ item }: { item: EnvironmentEntry }) => (
      <View className="flex-1 m-0.5">
        <Card data={item} />
      </View>
    ),
    []
  );
  const keyExtractor = React.useCallback((item: EnvironmentEntry) => item.environment_title, []);
  return (
    <View style={{ backgroundColor: Colorizer("#171717", 1.0), flex: 1 }} className="relative">
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
