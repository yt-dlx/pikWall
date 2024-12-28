// app/Image/index.tsx
/* eslint-disable @typescript-eslint/no-require-imports */
import * as FileSystem from "expo-file-system";
import Colorizer from "@/components/Colorizer";
import { ImageMetadata } from "@/types/database";
import { useLocalSearchParams } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from "react-native-reanimated";
import { ScrollView, View, Text, Dimensions, StatusBar, ActivityIndicator, Image, TouchableOpacity, Alert, Animated, Modal } from "react-native";
// ============================================================================================
// ============================================================================================
const SuccessModal: React.FC<{ visible: boolean; message: string; onClose: () => void }> = ({ visible, message, onClose }) => {
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
  }, [modalOpacity, modalScale, visible]);
  const backdropStyle = useAnimatedStyle(() => ({ opacity: modalOpacity.value }));
  const modalStyle = useAnimatedStyle(() => ({ opacity: modalOpacity.value, transform: [{ scale: modalScale.value }] }));
  return visible ? (
    <View className="absolute inset-0 justify-center items-center">
      <Animated.View style={[{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: Colorizer("#070808", 0.5) }, backdropStyle]} />
      <Animated.View
        className="rounded-lg p-5 items-center shadow-lg"
        style={[
          {
            backgroundColor: Colorizer("#E9E9EA", 1.0),
            width: "80%",
            shadowColor: Colorizer("#000000", 0.25),
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10
          },
          modalStyle
        ]}
      >
        <Ionicons name="checkmark-done-circle" size={50} color={Colorizer("#28a745", 1.0)} />
        <Text className="mt-2.5 text-2xl font-bold text-center" style={{ fontFamily: "Kurale", color: Colorizer("#000000", 1.0) }}>
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
// ============================================================================================
// ============================================================================================
const ErrorModal: React.FC<{ visible: boolean; message: string; onClose: () => void }> = ({ visible, message, onClose }) => {
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
  }, [modalOpacity, modalScale, visible]);
  const backdropStyle = useAnimatedStyle(() => ({ opacity: modalOpacity.value }));
  const modalStyle = useAnimatedStyle(() => ({ opacity: modalOpacity.value, transform: [{ scale: modalScale.value }] }));
  return visible ? (
    <View className="absolute inset-0 justify-center items-center">
      <Animated.View style={[{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: Colorizer("#000000", 0.5) }, backdropStyle]} />
      <Animated.View
        className="rounded-lg p-5 items-center shadow-lg"
        style={[
          {
            backgroundColor: Colorizer("#E9E9EA", 1.0),
            width: "80%",
            shadowColor: Colorizer("#000000", 0.25),
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10
          },
          modalStyle
        ]}
      >
        <MaterialIcons name="error" size={50} color={Colorizer("#dc3545", 1.0)} />
        <Text className="mt-2.5 text-2xl font-bold text-center" style={{ fontFamily: "Kurale", color: Colorizer("#000000", 1.0) }}>
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
// ============================================================================================
// ============================================================================================
const DownloadingModal: React.FC<{ visible: boolean; percentage: number; downloadRate: number; eta: number; primaryColor: string }> = ({ visible, percentage, downloadRate, eta, primaryColor }) => {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  };
  const animatedProgress = useSharedValue(percentage / 100);
  useEffect(() => {
    animatedProgress.value = withTiming(percentage / 100, { duration: 500, easing: Easing.linear });
  }, [animatedProgress, percentage]);
  const progressBarStyle = useAnimatedStyle(() => ({ width: `${animatedProgress.value * 100}%` }));
  return visible ? (
    <View className="absolute inset-0 justify-center items-center">
      <View className="absolute inset-0" style={{ backgroundColor: Colorizer(primaryColor, 0.3) }} />
      <View
        className="bg-white rounded-lg p-5 items-center shadow-lg"
        style={{ backgroundColor: Colorizer("#E9E9EA", 1.0), shadowColor: Colorizer("#000000", 0.25), shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 }}
      >
        <ActivityIndicator size="large" color={Colorizer(primaryColor, 1.0)} />
        <Text className="mt-3 text-lg" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Kurale" }}>
          Downloading...
        </Text>
        <Text className="mt-2 text-base" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Kurale" }}>
          {percentage.toFixed(2)}%
        </Text>
        <View className="w-4/5 h-2.5 rounded overflow-hidden mt-2.5">
          <Animated.View className="h-full bg-primary" style={[{ backgroundColor: Colorizer(primaryColor, 1.0) }, progressBarStyle]} />
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
// ============================================================================================
// ============================================================================================
const PreviewImage: React.FC<{
  selectedImage: ImageMetadata;
  screenWidth: number;
  onViewFullScreen: () => void;
}> = ({ selectedImage, screenWidth, onViewFullScreen }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const aspectRatio = selectedImage.width / selectedImage.height;
  const imageHeight = (screenWidth / aspectRatio) * 0.7;
  const scaleValue = useRef(new Animated.Value(1.1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const scaleAnimation = Animated.sequence([
      Animated.timing(scaleValue, { toValue: 1.4, duration: 4000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1.1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
    ]);
    Animated.loop(scaleAnimation).start();
    Animated.loop(Animated.timing(rotateValue, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true })).start();
  }, [scaleValue, rotateValue]);
  const rotateInterpolate = rotateValue.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  return (
    <View className="relative">
      <View className="absolute inset-0 justify-center items-center z-50">
        {!imageLoading && (
          <View className="items-center">
            <Animated.View className="rounded-full justify-center items-center" style={{ transform: [{ rotate: rotateInterpolate }] }}>
              <Image
                className="w-10 h-10 rounded-full bg-transparent"
                style={{ backgroundColor: Colorizer(selectedImage.primary, 1.0) }}
                source={require("@/assets/picbook/picBook_red.png")}
                resizeMode="contain"
                alt="image"
              />
            </Animated.View>
            <Text className="mb-6 text-center leading-6" style={{ fontFamily: "Kurale", color: Colorizer(selectedImage.primary, 1.0) }}>
              picBook™
            </Text>
          </View>
        )}
      </View>
      <View className="rounded-t-3xl overflow-hidden shadow-lg">
        {imageLoading && (
          <View className="flex justify-center items-center bg-black h-[${imageHeight}]" style={{ backgroundColor: Colorizer("#070808", 1.0), height: imageHeight }}>
            <ActivityIndicator size="large" color={Colorizer(selectedImage.primary, 1.0)} />
            <Text className="mt-2.5" style={{ fontFamily: "Kurale", color: Colorizer(selectedImage.primary, 1.0) }}>
              Loading HD Image Preview...
            </Text>
          </View>
        )}
        <Animated.Image
          className="w-full"
          style={!imageLoading ? { height: imageHeight, transform: [{ scale: scaleValue }], borderTopLeftRadius: 20, borderTopRightRadius: 20 } : { width: 0, height: 0 }}
          source={{ uri: selectedImage.previewLink.replace("lowRes", "highRes") }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          resizeMode="cover"
          onError={(e) => {
            setImageLoading(false);
            console.error("Image failed to load", e);
            Alert.alert("Error", "Failed to load image. Please try again.");
          }}
        />
      </View>
      <TouchableOpacity
        onPress={onViewFullScreen}
        activeOpacity={0.8}
        className="absolute bottom-5 right-5 px-4 py-2 rounded-full z-50"
        style={{ backgroundColor: Colorizer(selectedImage.primary, 0.8) }}
      >
        <Text className="text-white text-base" style={{ fontFamily: "Kurale" }}>
          View FullScreen
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// ============================================================================================
// ============================================================================================
const DownloadButton: React.FC<{ onDownload?: (event: any) => void; colors: { primary: string; secondary: string; tertiary: string } }> = ({ onDownload, colors }) => {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(withSequence(withTiming(1.08, { duration: 0, easing: Easing.inOut(Easing.ease) }), withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })), -1, true);
  }, [scale]);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <TouchableOpacity onPress={onDownload} activeOpacity={0.8} className="m-2 rounded-full overflow-hidden" style={{ backgroundColor: Colorizer(colors.primary, 0.4) }}>
      <Animated.View className="flex-row items-center justify-center p-3" style={animatedStyle}>
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
// ============================================================================================
// ============================================================================================
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
      console.error("Error downloading or saving the image:", error);
      setIsDownloading(false);
      showAlert("Error", "An error occurred while downloading or saving the image.", "error");
    }
  };
  return (
    <View className="flex-1" style={{ backgroundColor: Colorizer("#070808", 1.0) }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <PreviewImage selectedImage={selectedImage} screenWidth={screenWidth} onViewFullScreen={() => setIsFullScreen(true)} />
        <View className="p-4 m-3 mt-2.5 border-2 rounded-3xl" style={{ borderColor: Colorizer(selectedImage.primary, 1.0), backgroundColor: Colorizer("#111111", 1.0) }}>
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
          <View className="p-2 m-2 rounded-2xl" style={{ backgroundColor: Colorizer(selectedImage.primary, 0.2) }}>
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
          <DownloadButton onDownload={downloadAndSaveImage} colors={{ primary: selectedImage.primary, secondary: selectedImage.primary, tertiary: selectedImage.primary }} />
        </View>
      </ScrollView>
      <Modal visible={isFullScreen} transparent={false} onRequestClose={() => setIsFullScreen(false)} presentationStyle="fullScreen" statusBarTranslucent>
        <View className="flex-1" style={{ backgroundColor: Colorizer("#070808", 1.0) }}>
          <TouchableOpacity onPress={() => setIsFullScreen(false)} className="absolute top-14 left-8 z-10">
            <FontAwesome5 name="times" size={50} color={Colorizer("#E9E9EA", 1.0)} />
          </TouchableOpacity>
          <View className="flex-1 justify-center items-center">
            <Image
              source={{
                uri: selectedImage.previewLink.replace("lowRes", "highRes")
              }}
              alt="image"
              className="w-full h-full"
              style={{ resizeMode: "contain" }}
            />
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
