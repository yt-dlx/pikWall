import React from "react";
import { View } from "react-native";
import DownloadAndSaveImage from "@/components/Downloader";

const App = () => {
  return (
    <View className="flex-1">
      <DownloadAndSaveImage url="https://raw.githubusercontent.com/yt-dlx/picbook/highRes/Abstract%20Symphony%20In%20Painted%20Passage%20(2).jpg" />
    </View>
  );
};

export default App;
