import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import Colorizer from "@/components/Colorizer";
import { ImageMetadata } from "@/types/database";
import { useLocalSearchParams } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, StatusBar, ActivityIndicator, TouchableOpacity, Alert, Modal, Animated, Easing, ScrollView } from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
const SuccessModal: React.FC<{ visible: boolean; message: string; onClose: () => void }> = ({ visible, message, onClose }) => {
  const [modalAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    if (visible) {
      Animated.timing(modalAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(modalAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  }, [visible, modalAnim]);
  const backdropStyle = { opacity: modalAnim };
  const scale = modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });
  const modalStyle = { opacity: modalAnim, transform: [{ scale }] };
  return visible ? (
    <View className="absolute inset-0 justify-center items-center">
      <Animated.View style={[{ backgroundColor: Colorizer("#070808", 0.5), position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }, backdropStyle]} />
      <Animated.View
        className="rounded-lg items-center shadow-lg w-4/5 p-5"
        style={[
          { backgroundColor: Colorizer("#E9E9EA", 1.0), shadowColor: Colorizer("#000000", 0.25), shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 },
          modalStyle
        ]}
      >
        <Ionicons name="checkmark-done-circle" size={50} color={Colorizer("#28a745", 1.0)} />
        <Text className="mt-2.5 text-2xl text-center" style={{ fontFamily: "Kurale", color: Colorizer("#000000", 1.0) }}>
          Success
        </Text>
        <Text className="my-2.5 text-center" style={{ fontFamily: "Kurale", color: Colorizer("#000000", 1.0) }}>
          {message}
        </Text>
        <TouchableOpacity className="mt-2.5 px-5 py-2 rounded" style={{ backgroundColor: Colorizer("#007BFF", 1.0) }} onPress={onClose}>
          <Text className="text-white" style={{ fontFamily: "Kurale" }}>
            OK
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  ) : null;
};
const ErrorModal: React.FC<{ visible: boolean; message: string; onClose: () => void }> = ({ visible, message, onClose }) => {
  const [modalAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    if (visible) {
      Animated.timing(modalAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(modalAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  }, [visible, modalAnim]);
  const backdropStyle = { opacity: modalAnim };
  const scale = modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });
  const modalStyle = { opacity: modalAnim, transform: [{ scale }] };
  return visible ? (
    <View className="absolute inset-0 justify-center items-center">
      <Animated.View style={[{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: Colorizer("#000000", 0.5) }, backdropStyle]} />
      <Animated.View
        className="rounded-lg p-5 items-center shadow-lg w-4/5"
        style={[
          { backgroundColor: Colorizer("#E9E9EA", 1.0), shadowColor: Colorizer("#000000", 0.25), shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 },
          modalStyle
        ]}
      >
        <MaterialIcons name="error" size={50} color={Colorizer("#dc3545", 1.0)} />
        <Text className="mt-2.5 text-2xl text-center" style={{ fontFamily: "Kurale", color: Colorizer("#000000", 1.0) }}>
          Error
        </Text>
        <Text className="my-2.5 text-center" style={{ fontFamily: "Kurale", color: Colorizer("#000000", 1.0) }}>
          {message}
        </Text>
        <TouchableOpacity className="mt-2.5 px-5 py-2 rounded" style={{ backgroundColor: Colorizer("#007BFF", 1.0) }} onPress={onClose}>
          <Text className="text-white" style={{ fontFamily: "Kurale" }}>
            OK
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  ) : null;
};
const DownloadingModal: React.FC<{ visible: boolean; percentage: number; downloadRate: number; eta: number; primaryColor: string }> = ({ visible, percentage, downloadRate, eta, primaryColor }) => {
  const [progressAnim] = useState(new Animated.Value(percentage / 100));
  useEffect(() => {
    Animated.timing(progressAnim, { toValue: percentage / 100, duration: 500, easing: Easing.linear, useNativeDriver: false }).start();
  }, [percentage, progressAnim]);
  const widthInterpolated = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  };
  return visible ? (
    <View className="absolute inset-0 justify-center items-center">
      <View className="absolute inset-0" style={{ backgroundColor: Colorizer(primaryColor, 0.3) }} />
      <View
        className="rounded-lg p-5 items-center shadow-lg"
        style={{ backgroundColor: Colorizer("#E9E9EA", 1.0), shadowColor: Colorizer("#000000", 0.25), shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 }}
      >
        <ActivityIndicator size="large" color={Colorizer(primaryColor, 1.0)} />
        <Text className="mt-3 text-lg" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Kurale" }}>
          Downloading...
        </Text>
        <Text className="mt-2 text-base" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Kurale" }}>
          {percentage.toFixed(2)}%
        </Text>
        <View className="w-4/5 h-2.5 rounded overflow-hidden mt-2.5 bg-gray-300">
          <Animated.View style={{ width: widthInterpolated, backgroundColor: Colorizer(primaryColor, 1.0), height: "100%" }} />
        </View>
        <View className="flex-row mt-4 w-full justify-between px-2">
          <View className="items-center">
            <Text className="text-xs" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Kurale" }}>
              Rate: {formatBytes(downloadRate)}/s
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xs" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Kurale" }}>
              ETA: {formatTime(eta)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  ) : null;
};
const PreviewImage: React.FC<{ selectedImage: ImageMetadata; screenWidth: number; onViewFullScreen: () => void }> = ({ selectedImage, screenWidth, onViewFullScreen }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const aspectRatio = selectedImage.width / selectedImage.height;
  const imageHeight = (screenWidth / aspectRatio) * 0.7;
  const scaleValue = useRef(new Animated.Value(1.1)).current;
  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(scaleValue, { toValue: 1.4, duration: 4000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1.1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
    ]);
    Animated.loop(animation).start();
  }, [scaleValue]);
  return (
    <View className="relative">
      <View className="absolute inset-0 justify-center items-center z-50">
        {!imageLoading && (
          <View className="items-center">
            <Animated.View className="rounded-full justify-center items-center">
              <Image style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: Colorizer("#070808", 0.8) }} source={require("@/assets/pikWall/pikWall_white.png")} contentFit="contain" />
            </Animated.View>
          </View>
        )}
      </View>
      {imageLoading && (
        <View className="absolute inset-0 z-40 justify-center items-center" style={{ backgroundColor: Colorizer("#070808", 1.0) }}>
          <ActivityIndicator size="large" color={Colorizer(selectedImage.primary, 1.0)} />
          <Text className="mt-2.5" style={{ fontFamily: "Kurale", color: Colorizer(selectedImage.primary, 1.0) }}>
            Loading HD Image Preview...
          </Text>
        </View>
      )}
      <Animated.View className="overflow-hidden rounded-t-3xl" style={[{ width: "100%", height: imageHeight, borderTopLeftRadius: 20, borderTopRightRadius: 20, transform: [{ scale: scaleValue }] }]}>
        <Image
          style={{ width: "100%", height: "100%", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          source={{ uri: selectedImage.previewLink.replace("lowRes", "highRes") }}
          cachePolicy="memory-disk"
          contentFit="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            Alert.alert("Error", "Failed to load image. Please try again.");
          }}
        />
      </Animated.View>
      <TouchableOpacity
        onPress={onViewFullScreen}
        className="absolute bottom-5 right-5 px-4 py-2 rounded-full z-50"
        style={{ backgroundColor: Colorizer(selectedImage.primary, 0.8) }}
        activeOpacity={0.8}
      >
        <Text className="text-white text-base" style={{ fontFamily: "Kurale" }}>
          View FullScreen
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const DownloadButton: React.FC<{ onDownload?: (event: any) => void; colors: { primary: string; secondary: string; tertiary: string } }> = ({ onDownload, colors }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, { toValue: 1.08, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scaleValue, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [scaleValue]);
  return (
    <TouchableOpacity onPress={onDownload} activeOpacity={0.8} className="mt-2 rounded-2xl overflow-hidden" style={{ backgroundColor: Colorizer(colors.primary, 0.4) }}>
      <Animated.View className="flex-row items-center justify-center p-3" style={{ transform: [{ scale: scaleValue }] }}>
        <View className="flex-row items-center">
          <Text className="text-white text-sm mr-2" style={{ fontFamily: "Kurale" }}>
            Download Wallpaper
          </Text>
          <FontAwesome5 name="download" size={15} color={Colorizer("#E9E9EA", 1.0)} className="mx-2" />
          <Text className="text-white text-sm" style={{ fontFamily: "Kurale" }}>
            (Highest Quality)
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
const DownloadScreen = () => {
  const params = useLocalSearchParams();
  const [eta, setEta] = useState<number>(0);
  const rawDataString = params.data as string;
  const parsedData = JSON.parse(rawDataString);
  const downloadStartTime = useRef<number>(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [percentage, setPercentage] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { width: screenWidth } = Dimensions.get("window");
  const [downloadRate, setDownloadRate] = useState<number>(0);
  const selectedIndex = parseInt(parsedData.selectedIndex as unknown as string) || 0;
  const [alertIcon, setAlertIcon] = useState<"error" | "checkmark-done-circle">("checkmark-done-circle");
  const selectedImage = parsedData.data[selectedIndex];
  const showAlert = (title: string, message: string, iconName: "error" | "checkmark-done-circle") => {
    setAlertMessage(message);
    setAlertIcon(iconName);
    setAlertVisible(true);
  };
  const hideAlert = () => setAlertVisible(false);
  const downloadAndSaveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        showAlert("Permission Required", "Please grant media library permissions to save the image.", "error");
        return;
      }
      setIsDownloading(true);
      setPercentage(0);
      setDownloadRate(0);
      setEta(0);
      downloadStartTime.current = Date.now();
      const fileUri = FileSystem.documentDirectory + selectedImage.original_file_name;
      const downloadResumable = FileSystem.createDownloadResumable(selectedImage.previewLink.replace("lowRes", "highRes"), fileUri, {}, (downloadProgressEvent) => {
        const progress = downloadProgressEvent.totalBytesWritten / downloadProgressEvent.totalBytesExpectedToWrite;
        setPercentage(progress * 100);
        const elapsedTime = (Date.now() - downloadStartTime.current) / 1000;
        if (elapsedTime > 0) {
          const rate = downloadProgressEvent.totalBytesWritten / elapsedTime;
          setDownloadRate(rate);
          const remainingBytes = downloadProgressEvent.totalBytesExpectedToWrite - downloadProgressEvent.totalBytesWritten;
          const estimatedTime = remainingBytes / rate;
          setEta(estimatedTime);
        }
      });
      const result = await downloadResumable.downloadAsync();
      if (!result || !result.uri) {
        showAlert("Download Failed", "Unable to download the image.", "error");
        setIsDownloading(false);
        return;
      }
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (!album) await MediaLibrary.createAlbumAsync("Download", asset, false);
      else await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      setIsDownloading(false);
      showAlert("Success", "The image has been saved to your gallery.", "checkmark-done-circle");
    } catch (error) {
      setIsDownloading(false);
      showAlert("Error", "An error occurred while downloading or saving the image.", "error");
    }
  };
  return (
    <View className="flex-1" style={{ backgroundColor: Colorizer("#070808", 1.0) }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView className="flex-1">
        <PreviewImage selectedImage={selectedImage} screenWidth={screenWidth} onViewFullScreen={() => setIsFullScreen(true)} />
        <View className="p-4 m-1 mt-2.5 border-2 rounded-3xl" style={{ borderColor: Colorizer(selectedImage.primary, 1.0), backgroundColor: Colorizer("#111111", 1.0) }}>
          <Text className="mb-2 text-4xl" style={{ fontFamily: "Kurale", color: Colorizer(selectedImage.primary, 1.0) }}>
            {selectedImage.original_file_name.replace(".jpg", "")}
          </Text>
          {[
            { label: "Mode", value: selectedImage.mode },
            { label: "FileSize", value: `${selectedImage.file_size_megabytes} mb` },
            { label: "Dimensions", value: `${selectedImage.width} x ${selectedImage.height}` }
          ].map((item, index) => (
            <View key={index} className="flex-row items-center my-1">
              <FontAwesome5 name={index === 0 ? "adjust" : index === 1 ? "file-alt" : "ruler-combined"} size={16} color={Colorizer(selectedImage.primary, 1.0)} className="ml-1" />
              <View className="flex-row items-center ml-2">
                <Text style={{ fontFamily: "Kurale", color: Colorizer(selectedImage.primary, 1.0) }}>{item.label}:</Text>
                <Text className="ml-2" style={{ fontFamily: "Kurale", color: Colorizer(selectedImage.primary, 1.0) }}>
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
          <DownloadButton onDownload={downloadAndSaveImage} colors={{ primary: selectedImage.primary, secondary: selectedImage.primary, tertiary: selectedImage.primary }} />
          <View className="p-1 my-2 rounded-2xl" style={{ backgroundColor: Colorizer(selectedImage.primary, 0.2) }}>
            <View className="p-2 m-0.5 rounded-t-2xl" style={{ backgroundColor: Colorizer(selectedImage.tertiary, 0.2) }}>
              <Text className="ml-2 text-xl" style={{ fontFamily: "Kurale", color: Colorizer(selectedImage.primary, 1.0) }}>
                Environment:
              </Text>
              <Text className="ml-2 text-gray-400" style={{ fontFamily: "Kurale", color: Colorizer("#E9E9EA", 0.6) }}>
                {parsedData.environment_prompt}
              </Text>
            </View>
            <View className="p-2 m-0.5 rounded-b-2xl" style={{ backgroundColor: Colorizer(selectedImage.tertiary, 0.2) }}>
              <Text className="ml-2 mt-2 text-xl" style={{ fontFamily: "Kurale", color: Colorizer(selectedImage.primary, 1.0) }}>
                Moral:
              </Text>
              <Text className="ml-2 text-gray-400" style={{ fontFamily: "Kurale", color: Colorizer("#E9E9EA", 0.6) }}>
                {parsedData.environment_moral}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal visible={isFullScreen} transparent={false} onRequestClose={() => setIsFullScreen(false)} presentationStyle="fullScreen" statusBarTranslucent>
        <View className="flex-1" style={{ backgroundColor: Colorizer("#070808", 1.0) }}>
          <TouchableOpacity onPress={() => setIsFullScreen(false)} className="absolute top-14 left-8 z-10">
            <FontAwesome5 name="times" size={50} color={Colorizer("#E9E9EA", 1.0)} />
          </TouchableOpacity>
          <View className="flex-1 justify-center items-center">
            <Image style={{ width: "100%", height: "100%" }} source={{ uri: selectedImage.previewLink.replace("lowRes", "highRes") }} contentFit="contain" />
          </View>
        </View>
      </Modal>
      <DownloadingModal visible={isDownloading} percentage={percentage} downloadRate={downloadRate} eta={eta} primaryColor={selectedImage.primary} />
      <SuccessModal visible={alertVisible && alertIcon === "checkmark-done-circle"} message={alertMessage} onClose={hideAlert} />
      <ErrorModal visible={alertVisible && alertIcon === "error"} message={alertMessage} onClose={hideAlert} />
    </View>
  );
};
export default DownloadScreen;
