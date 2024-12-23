// components/Footer.tsx
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Footer: React.FC = () => (
  <View style={{ backgroundColor: "#0A0A0A" }} className="relative w-full py-4">
    <View className="flex flex-col sm:flex-row items-center justify-between px-4">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="book" size={16} style={{ color: "#cdd6f4" }} />
        <Text style={{ fontFamily: "Kurale", color: "#cdd6f4" }} className="font-semibold text-sm">
          picBook™
        </Text>
      </View>
      <Text style={{ fontFamily: "Kurale", color: "#a6adc8" }} className="text-center text-xs">
        Crafted with imagination and stories. All rights reserved.
      </Text>
    </View>
  </View>
);

export default Footer;
