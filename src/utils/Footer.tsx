// src/utils/Footer.tsx
import Colorizer from "./Colorizer";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// ============================================================================================
// ============================================================================================
const Footer: React.FC = () => (
  <View style={{ backgroundColor: Colorizer("#000000", 1.0), position: "relative", width: "100%", paddingVertical: 16 }}>
    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="book" size={16} style={{ color: Colorizer("#BE2528", 1.0) }} />
        <Text style={{ fontFamily: "Dm_Serif_Display_Regular", color: Colorizer("#BE2528", 1.0), fontSize: 14, marginLeft: 8 }}>picWall</Text>
      </View>
      <Text style={{ fontFamily: "Caveat_Bold", color: Colorizer("#E9E9EA", 1.0), textAlign: "center", fontSize: 12, marginTop: 4 }}>Crafted with ♥ in India. All rights reserved.</Text>
    </View>
  </View>
);
export default Footer;
