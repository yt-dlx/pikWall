// components/Footer.tsx
import Colorizer from "./Colorizer";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// ============================================================================================
// ============================================================================================
const Footer: React.FC = () => (
  <View style={{ backgroundColor: Colorizer("#0A0A0A", 1.0) }} className="relative w-full py-4">
    <View className="flex flex-col sm:flex-row items-center justify-between px-4">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="book" size={16} style={{ color: Colorizer("#BE2528", 1.0) }} />
        <Text style={{ fontFamily: "Linotte_Heavy", color: Colorizer("#BE2528", 1.0) }} className="text-sm">
          picWall
        </Text>
      </View>
      <Text style={{ fontFamily: "Linotte_Bold", color: Colorizer("#E9E9EA", 1.0) }} className="text-center text-xs">
        Crafted with imagination and stories. All rights reserved.
      </Text>
    </View>
  </View>
);
export default Footer;
