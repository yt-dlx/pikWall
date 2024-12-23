import React, { useState } from "react";
import { Alert, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import AwesomeAlert from "react-native-awesome-alerts";

const DownloadAndSaveImage: React.FC<{ url: string }> = ({ url }) => {
  const [showAlert, setShowAlert] = useState(false);
  const downloadAndSaveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Please grant media library permissions to save the image.");
        return;
      }
      setShowAlert(true);
      const fileUri = FileSystem.documentDirectory + "downloaded_image.jpg";
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      if (!uri) {
        Alert.alert("Download failed", "Unable to download the image.");
        setShowAlert(false);
        return;
      }
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (!album) await MediaLibrary.createAlbumAsync("Download", asset, false);
      else await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      setShowAlert(false);
      Alert.alert("Success", "Image has been saved to your gallery.");
    } catch (error) {
      console.error("Error downloading or saving the image:", error);
      setShowAlert(false);
      Alert.alert("Error", "An error occurred while downloading or saving the image.");
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <TouchableOpacity className="bg-blue-500 py-3 px-6 rounded-lg" onPress={downloadAndSaveImage}>
        <Text className="text-white text-lg font-bold">Download and Save Image</Text>
      </TouchableOpacity>
      <AwesomeAlert
        show={showAlert}
        showProgress={true}
        title="Downloading"
        message="Please wait while the image is being downloaded."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        customView={<ActivityIndicator size="large" color="#007BFF" />}
      />
    </View>
  );
};

export default DownloadAndSaveImage;
