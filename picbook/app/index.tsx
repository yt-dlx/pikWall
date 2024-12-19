import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import database from "./data/database";

type CardData = {
  id: string;
  uri: string;
  title: string;
  description: string;
  subImages: string[];
};

const HeaderSection = () => (
  <View className="bg-[#181b21] py-16 px-4 items-center">
    <Text className="text-6xl font-extrabold text-pink-400">Stories Behind Pictures</Text>
    <Text className="text-xl text-gray-300 mt-4 text-center">Dive Into Tales Inspired By Unique Images And Discover The Art Of Visual Environment Telling.</Text>
    <TextInput className="bg-gray-800 text-gray-300 mt-6 px-4 py-2 rounded-full w-3/4" placeholder="Search Your Favourites..." placeholderTextColor="gray" />
  </View>
);
const Card = ({ data }: { data: CardData }) => (
  <View className="bg-gray-800 mb-6 rounded-lg shadow-black shadow-2xl overflow-hidden">
    <MainImage uri={data.uri} title={data.title} />
    <SubImages images={data.subImages} />
    <CardText title={data.title} description={data.description} />
  </View>
);
const MainImage = ({ uri, title }: { uri: string; title: string }) => <Image className="h-48 w-full object-cover shadow-black shadow" source={{ uri }} alt={title} />;
const SubImages = ({ images }: { images: string[] }) => (
  <View className="flex flex-row flex-wrap justify-center p-2">
    {images.map((uri, index) => (
      <Image key={index} className="h-20 w-20 m-2 rounded-lg shadow-black shadow" source={{ uri }} alt={`Sub Image ${index + 1}`} />
    ))}
  </View>
);
const CardText = ({ title, description }: { title: string; description: string }) => (
  <View className="p-4">
    <Text className="text-lg font-semibold text-gray-100 mb-2">{title}</Text>
    <Text className="text-gray-400">{description}</Text>
  </View>
);

export default function IndexPage(): JSX.Element {
  const [data, setData] = useState<CardData[]>([]);
  useEffect(() => {
    const fetchData = () => {
      const entries = Object.values(database);
      const cards: CardData[] = entries.map((entry, index) => {
        const subImages = entry.images.slice(0, 4).map((image) => atob(image.previewLink));
        return {
          id: index.toString(),
          uri: atob(entry.images[0]?.previewLink) || "https://via.placeholder.com/300x150",
          title: entry.environment_title,
          description: entry.environment_moral,
          subImages
        };
      });
      setData(cards);
    };
    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-[#181b21]">
      <HeaderSection />
      <View className="px-4 py-8">
        <Text className="text-2xl font-bold text-gray-100 mb-4">Explore</Text>
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </View>
    </ScrollView>
  );
}
