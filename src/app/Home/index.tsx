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
import Footer from "@/components/Footer";
import Colorizer from "@/components/Colorizer";
import { EnvironmentEntry } from "@/types/database";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HeaderAnimate from "@/components/HeaderAnimated";
import { SubImagesProps, CardProps, CategoryButtonProps } from "@/types/components";
import { View, Text, TouchableOpacity, FlatList, ScrollView, StatusBar } from "react-native";
import Animated, { Easing, runOnJS, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
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
  { name: "Aerial View", database: AerialView },
  { name: "Portrait Perfect", database: PortraitPerfect },
  { name: "Hyper Closeups", database: HyperCloseups },
  { name: "Nature Wonders", database: NatureWonders },
  { name: "Anime Landscapes", database: AnimeLandscapes },
  { name: "Natural Landscapes", database: NaturalLandscapes },
  { name: "Minimalist Abstract", database: MinimalistAbstract },
  { name: "Antique Look Object", database: AntiqueLookObject },
  { name: "Cosmic And Lightning", database: CosmicAndLightning },
  { name: "Mountains And Beaches", database: MountainsAndBeaches }
];
// ============================================================================================
// ============================================================================================
const SubImages: React.FC<SubImagesProps> = React.memo(({ images, onImagePress }) => (
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
            <Image
              source={{ uri: image.previewLink }}
              style={{ height: 64, borderWidth: 1, width: "100%", borderRadius: 4, borderColor: Colorizer(image.primary, 0.5) }}
              cachePolicy="memory-disk"
              contentFit="cover"
            />
            <Text
              className="absolute m-1 bottom-1 right-1 px-2 text-xs rounded-2xl"
              style={{ fontFamily: "Linotte_Bold", color: Colorizer("#000000", 1.0), backgroundColor: Colorizer(image.primary, 1.0) }}
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
const Card: React.FC<CardProps> = React.memo(({ data }) => {
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
    textScale.value = 0.9;
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
  const textStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value, transform: [{ scale: textScale.value }] }));
  return (
    <View className="rounded-2xl overflow-hidden border" style={{ backgroundColor: Colorizer("#111415", 1.0), borderColor: Colorizer(data.images[currentIndex].primary, 0.4) }}>
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
            <AnimatedImage source={{ uri: currentImage }} style={[{ width: "100%", height: "100%", borderTopLeftRadius: 8, borderTopRightRadius: 8 }, imageStyle]} contentFit="cover" />
            <View className="absolute bottom-0 left-0 right-0 items-center justify-start">
              <Animated.Text
                style={[
                  textStyle,
                  {
                    textAlign: "center",
                    fontFamily: "Linotte_Bold",
                    color: Colorizer("#000000", 1.0),
                    backgroundColor: Colorizer(data.images[currentIndex].primary, 0.8)
                  }
                ]}
                className="text-sm m-1 px-3 rounded-2xl"
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
        <Text style={{ fontFamily: "Linotte_Bold", color: Colorizer("#000000", 1.0), fontSize: 12, lineHeight: 16 }}>picWall</Text>
      </View>
    </View>
  );
});
Card.displayName = "Card";
// ============================================================================================
// ============================================================================================
function getCategoryIcon(selected: boolean) {
  const iconName = selected ? "checkmark-circle" : "ellipse-outline";
  const iconColor = selected ? Colorizer("#E9E9EA", 1.0) : Colorizer("#000000", 1.0);
  return <Ionicons name={iconName} size={20} color={iconColor} />;
}
// ============================================================================================
// ============================================================================================
const CategoryButton: React.FC<CategoryButtonExtendedProps> = React.memo(({ category, selected, onPress }) => (
  <TouchableOpacity
    style={{ borderRadius: 10, overflow: "hidden", margin: 4 }}
    activeOpacity={0.7}
    onPress={onPress}
    accessibilityLabel={`${category} category button`}
    accessibilityState={{ selected }}
  >
    <LinearGradient
      colors={selected ? [Colorizer("#5f1314", 1.0), Colorizer("#981e20", 1.0), Colorizer("#BE2528", 1.0)] : [Colorizer("#E9E9EA", 1.0), Colorizer("#d2d2d3", 1.0), Colorizer("#bababb", 1.0)]}
      style={{ paddingHorizontal: 24, paddingVertical: 10 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View className="flex-row items-center">
        {getCategoryIcon(selected)}
        <Text style={{ fontFamily: "Linotte_Bold", color: selected ? Colorizer("#E9E9EA", 1.0) : Colorizer("#000000", 1.0) }} className="ml-2 text-base">
          {category}
        </Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
));
CategoryButton.displayName = "CategoryButton";
// ============================================================================================
// ============================================================================================
const HeaderComponent: React.FC<{ categories: Category[]; selectedCategory: string; onSelectCategory: (categoryName: string) => void }> = React.memo(
  ({ categories, selectedCategory, onSelectCategory }) => (
    <>
      <HeaderAnimate />
      <View className="py-8 px-2">
        <View className="flex-row items-center justify-center">
          <FontAwesome name="wpexplorer" size={24} color={Colorizer("#E9E9EA", 1.0)} className="m-2" />
          <Text style={{ fontFamily: "Linotte_Bold", color: Colorizer("#E9E9EA", 1.0) }} className="text-2xl text-center">
            Explore Our Collection
          </Text>
          <Ionicons name="images-outline" size={24} color={Colorizer("#E9E9EA", 1.0)} className="m-2" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2 mb-3">
          {categories.map((category) => (
            <CategoryButton key={category.name} category={category.name} selected={category.name === selectedCategory} onPress={() => onSelectCategory(category.name)} />
          ))}
        </ScrollView>
      </View>
    </>
  )
);
HeaderComponent.displayName = "HeaderComponent";
// ============================================================================================
// ============================================================================================
const HomePage = (): JSX.Element => {
  const [cardData, setCardData] = React.useState<EnvironmentEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Anime");
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
    <View style={{ backgroundColor: Colorizer("#000000", 1.0), flex: 1 }} className="relative">
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
