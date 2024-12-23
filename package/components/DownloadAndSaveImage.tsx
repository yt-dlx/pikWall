import * as FileSystem from "expo-file-system";
import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";

const AlertModal = ({ visible, title, message, iconName, onClose }: { visible: boolean; title: string; message: string; iconName: "error" | "checkmark-done-circle"; onClose: () => void }) => {
  const modalOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0.8);
  useEffect(() => {
    if (visible) {
      modalOpacity.value = withTiming(1, { duration: 300 });
      modalScale.value = withTiming(1, { duration: 300 });
    } else {
      modalOpacity.value = withTiming(0, { duration: 300 });
      modalScale.value = withTiming(0.8, { duration: 300 });
    }
  }, [visible]);
  const backdropStyle = useAnimatedStyle(() => ({ opacity: modalOpacity.value }));
  const modalStyle = useAnimatedStyle(() => ({ opacity: modalOpacity.value, transform: [{ scale: modalScale.value }] }));
  return visible ? (
    <>
      <Animated.View style={[{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }, backdropStyle]} />
      <Animated.View style={[{ backgroundColor: "white", borderRadius: 10, padding: 20, justifyContent: "center", alignItems: "center", position: "absolute" }, modalStyle]}>
        {iconName === "error" ? <MaterialIcons name="error" size={50} color="#dc3545" /> : <Ionicons name="checkmark-done-circle" size={50} color="#28a745" />}
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>{title}</Text>
        <Text style={{ textAlign: "center", marginVertical: 10 }}>{message}</Text>
        <TouchableOpacity style={{ backgroundColor: "#007BFF", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 10 }} onPress={onClose}>
          <Text style={{ color: "white" }}>OK</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  ) : null;
};

const DownloadAndSaveImage: React.FC<{ url: string }> = ({ url }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertIcon, setAlertIcon] = useState<"error" | "checkmark-done-circle">("checkmark-done-circle");
  const animatedProgress = useSharedValue(0);
  const showAlert = (title: string, message: string, iconName: "error" | "checkmark-done-circle") => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertIcon(iconName);
    setAlertVisible(true);
  };
  const hideAlert = () => setAlertVisible(false);
  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`
  }));
  const downloadAndSaveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        showAlert("Permission Required", "Please grant media library permissions to save the image.", "error");
        return;
      }
      setIsDownloading(true);
      animatedProgress.value = 0;

      const fileUri = FileSystem.documentDirectory + "downloaded_image.jpg";
      const downloadResumable = FileSystem.createDownloadResumable(url, fileUri, {}, (downloadProgressEvent) => {
        const progress = downloadProgressEvent.totalBytesWritten / downloadProgressEvent.totalBytesExpectedToWrite;
        runOnJS(() => {
          animatedProgress.value = progress;
        })();
      });
      const result = await downloadResumable.downloadAsync();
      if (!result || !result.uri) {
        runOnJS(showAlert)("Download Failed", "Unable to download the image.", "error");
        runOnJS(setIsDownloading)(false);
        return;
      }
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (!album) await MediaLibrary.createAlbumAsync("Download", asset, false);
      else await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      runOnJS(setIsDownloading)(false);
      runOnJS(showAlert)("Success", "The image has been saved to your gallery.", "checkmark-done-circle");
    } catch (error) {
      console.error("Error downloading or saving the image:", error);
      runOnJS(setIsDownloading)(false);
      runOnJS(showAlert)("Error", "An error occurred while downloading or saving the image.", "error");
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <TouchableOpacity className="bg-blue-500 py-3 px-6 rounded-lg" onPress={downloadAndSaveImage}>
        <Text className="text-white text-lg font-bold">Download and Save Image</Text>
      </TouchableOpacity>
      {isDownloading && (
        <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-5 justify-center items-center">
            <ActivityIndicator size="large" color="#007BFF" />
            <Text className="text-lg mt-3">Downloading...</Text>
            <View style={{ width: "80%", height: 10, backgroundColor: "#e0e0e0", borderRadius: 5, overflow: "hidden", marginTop: 10 }}>
              <Animated.View style={[{ height: "100%", backgroundColor: "#007BFF" }, progressBarStyle]} />
            </View>
          </View>
        </View>
      )}
      <AlertModal visible={alertVisible} title={alertTitle} message={alertMessage} iconName={alertIcon} onClose={hideAlert} />
    </View>
  );
};

export default DownloadAndSaveImage;
