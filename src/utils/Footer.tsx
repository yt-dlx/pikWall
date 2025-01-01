// src/utils/Footer.tsx
import Colorizer from "./Colorizer";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// ============================================================================================
// ============================================================================================
const Footer: React.FC = () => (
  <View style={{ backgroundColor: Colorizer("#060403", 1.0) }} className="relative w-full py-4">
    <View className="flex flex-col sm:flex-row items-center justify-between px-4">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="book" size={16} style={{ color: Colorizer("#C26F2D", 1.0) }} />
        <Text style={{ fontFamily: "Lobster_Regular", color: Colorizer("#C26F2D", 1.0) }} className="text-sm">
          picWall
        </Text>
      </View>
      <Text style={{ fontFamily: "Caveat_Bold", color: Colorizer("#F2EFE0", 1.0) }} className="text-center text-xs mt-1">
        Crafted with ♥ in India. All rights reserved.
      </Text>
    </View>
  </View>
);
export default Footer;
