// yarn remove expo-file-system expo-media-library native-base react-native-awesome-alerts react-native-svg
// yarn add expo-file-system expo-media-library native-base react-native-awesome-alerts react-native-svg
import React, { useState } from "react";
import { Alert } from "react-native";
import { Center, Button, NativeBaseProvider } from "native-base";
import AwesomeAlert from "react-native-awesome-alerts";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const App = () => {
  const [showAlert, setShowAlert] = useState(false);

  const downloadAndSaveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Please grant media library permissions to save the image.");
        return;
      }

      setShowAlert(true);
      const imageUrl = "https://raw.githubusercontent.com/yt-dlx/picbook/lowRes/Abstract%20Symphony%20In%20Painted%20Passage%20(2).jpg";
      const fileUri = FileSystem.documentDirectory + "downloaded_image.jpg";

      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      if (!uri) {
        Alert.alert("Download failed", "Unable to download the image.");
        setShowAlert(false);
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (!album) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      setShowAlert(false);
      Alert.alert("Success", "Image has been saved to your gallery.");
    } catch (error) {
      console.error("Error downloading or saving the image:", error);
      setShowAlert(false);
      Alert.alert("Error", "An error occurred while downloading or saving the image.");
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Button onPress={downloadAndSaveImage} colorScheme="primary">
          Download and Save Image
        </Button>
        <AwesomeAlert
          show={showAlert}
          showProgress={true}
          title="Downloading"
          message="Please wait while the image is being downloaded."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
      </Center>
    </NativeBaseProvider>
  );
};

export default App;
