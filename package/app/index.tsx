import "../global.css";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <View className="bg-white shadow-lg rounded-lg p-6 w-11/12 max-w-sm">
        <Text className="text-lg font-semibold text-gray-800 text-center">
          Edit <Text className="text-indigo-500">app/index.tsx</Text> to edit this screen.
        </Text>
        <Text className="text-sm text-gray-600 mt-2 text-center">Make it look amazing with Tailwind CSS.</Text>
      </View>
    </View>
  );
}
