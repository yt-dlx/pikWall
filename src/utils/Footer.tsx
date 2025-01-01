// src/utils/Footer.tsx
import Colorizer from "./Colorizer";
import { Text, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
// ============================================================================================
// ============================================================================================
const Footer: React.FC = () => (
  <View style={{ backgroundColor: Colorizer("#060403", 1.0) }} className="relative w-full p-2">
    <View style={{ backgroundColor: Colorizer("#060403", 0.6), borderRadius: 9999, paddingHorizontal: 12 }}>
      <Text style={{ fontFamily: "Caveat_Bold", color: Colorizer("#F2EFE0", 1.0), fontSize: 16, textAlign: "center" }}>
        Crafted with <AntDesign name="heart" size={10} color={Colorizer("#C26F2D", 1.0)} /> in India. All rights reserved
      </Text>
    </View>
  </View>
);
export default Footer;
