// app/Home/index.tsx
import { Link } from "expo-router";
import { Image } from "expo-image";
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
import React, { useEffect, useCallback, useState, memo } from "react";
import { SubImagesProps, CardProps, CategoryButtonProps } from "@/types/components";
import { View, Text, TouchableOpacity, FlatList, ScrollView, StatusBar } from "react-native";
import Animated, { Easing, runOnJS, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

interface Category {
  name: string;
  database: Record<string, EnvironmentEntry>;
}

interface CategoryButtonExtendedProps extends CategoryButtonProps {
  selected: boolean;
  onPress: () => void;
}
const AnimatedImage = Animated.createAnimatedComponent(Image);
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
            <Image
              source={{ uri: image.previewLink }}
              style={{
                height: 64,
                borderWidth: 1,
                width: "100%",
                borderRadius: 4,
                borderColor: Colorizer(image.primary, 0.5)
              }}
              cachePolicy="disk"
              contentFit="cover"
            />
            <Text
              className="absolute m-1 bottom-1 right-1 px-2 text-xs rounded-2xl"
              style={{
                fontFamily: "Kurale",
                color: Colorizer("#070808", 1.0),
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

const Card: React.FC<CardProps> = memo(({ data }) => {
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
      fadeValue.value = withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }, () => {
        runOnJS(cb)();
      });
      textOpacity.value = withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) });
    },
    [fadeValue, textOpacity]
  );
  const animateIn = useCallback(() => {
    textScale.value = 0.9;
    fadeValue.value = withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) });
    textOpacity.value = withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) });
    textScale.value = withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) });
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
  React.useEffect(() => {
    const interval = setInterval(updateNextImage, 4000);
    return () => clearInterval(interval);
  }, [updateNextImage]);
  React.useEffect(() => {
    updateImageState(0);
  }, [data, updateImageState]);
  const imageStyle = useAnimatedStyle(() => ({ opacity: fadeValue.value }));
  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }]
  }));
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
            <AnimatedImage
              source={{ uri: currentImage }}
              style={[
                {
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8
                },
                imageStyle
              ]}
              contentFit="cover"
            />
            <View className="absolute bottom-0 left-0 right-0 items-center justify-start">
              <Animated.Text
                style={[
                  textStyle,
                  {
                    textAlign: "center",
                    fontFamily: "Kurale",
                    color: Colorizer("#070808", 1.0),
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
        <Text style={{ fontFamily: "Achemost", color: Colorizer("#070808", 1.0), fontSize: 12, lineHeight: 16 }}>picBook</Text>
      </View>
    </View>
  );
});
Card.displayName = "Card";

function getCategoryIcon(category: string, selected: boolean) {
  const iconColor = selected ? Colorizer("#E9E9EA", 1.0) : Colorizer("#000000", 1.0);
  switch (category) {
    case "Anime":
      return <Ionicons name="planet-outline" size={16} color={iconColor} />;
    case "Portrait":
      return <Ionicons name="person-circle-outline" size={16} color={iconColor} />;
    case "Lightning":
      return <Ionicons name="flash-outline" size={16} color={iconColor} />;
    case "Cinematic":
      return <Ionicons name="videocam-outline" size={16} color={iconColor} />;
    case "Photography":
      return <Ionicons name="camera-outline" size={16} color={iconColor} />;
    default:
      return <Ionicons name="help-circle-outline" size={16} color={iconColor} />;
  }
}

const CategoryButton: React.FC<CategoryButtonExtendedProps> = memo(({ category, selected, onPress }) => (
  <TouchableOpacity style={{ backgroundColor: selected ? Colorizer("#BE2528", 1.0) : Colorizer("#E9E9EA", 1.0) }} className="px-6 py-2 rounded-2xl mx-0.5" activeOpacity={0.7} onPress={onPress}>
    <View className="flex-row items-center">
      {getCategoryIcon(category, selected)}
      <Text style={{ fontFamily: "Kurale", color: selected ? Colorizer("#E9E9EA", 1.0) : Colorizer("#000000", 1.0) }} className="ml-2 text-base">
        {category}
      </Text>
    </View>
  </TouchableOpacity>
));
CategoryButton.displayName = "CategoryButton";

const HeaderComponent: React.FC<{ categories: Category[]; selectedCategory: string; onSelectCategory: (categoryName: string) => void }> = memo(({ categories, selectedCategory, onSelectCategory }) => (
  <>
    <HeaderAnimate />
    <View className="py-8 px-2">
      <View className="flex-row items-center justify-center">
        <FontAwesome name="wpexplorer" size={24} color={Colorizer("#E9E9EA", 1.0)} className="m-2" />
        <Text style={{ fontFamily: "Achemost", color: Colorizer("#E9E9EA", 1.0) }} className="text-2xl text-center">
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
));
HeaderComponent.displayName = "HeaderComponent";

const HomePage = (): JSX.Element => {
  const [cardData, setCardData] = useState<EnvironmentEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Anime");
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
      <View className="flex-1 m-0.5">
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
