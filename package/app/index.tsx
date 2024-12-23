import React from "react";
import { View } from "react-native";
import DownloadAndSaveImage from "@/components/DownloadAndSaveImage";

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      <DownloadAndSaveImage url="https://raw.githubusercontent.com/yt-dlx/picbook/highRes/Abstract%20Symphony%20In%20Painted%20Passage%20(2).jpg" />
    </View>
  );
};

export default App;
