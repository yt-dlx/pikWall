import { Text, View, ImageBackground } from "react-native";

export default function Index() {
  return (
    <ImageBackground source={{ uri: "https://source.unsplash.com/random/1920x1080/?wallpaper,art" }} className="flex-1 justify-center items-center" resizeMode="cover">
      <View className="bg-black/60 w-full h-full justify-center items-center">
        <Text className="text-4xl font-bold text-white mb-4">Wallpaper Expo 2024</Text>
        <Text className="text-lg text-gray-300 text-center px-4">Discover stunning wallpapers curated from artists around the world. Explore, admire, and transform your device or space.</Text>
      </View>
    </ImageBackground>
  );
}
