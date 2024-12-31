// src/app/Image/index.tsx
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import Colorizer from "@/components/Colorizer";
import { ImageMetadata } from "@/types/database";
import { useLocalSearchParams } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useRef } from "react";
import { setWallpaper, TYPE_SCREEN } from "rn-wallpapers";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { View, Text, Dimensions, StatusBar, ActivityIndicator, TouchableOpacity, Alert, Modal, Animated, Easing, ScrollView } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const SuccessModal: React.FC<{ visible: boolean; message: string; onClose: () => void }> = ({ visible, message, onClose }) => {
  const [modalAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    if (visible) Animated.timing(modalAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    else Animated.timing(modalAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
  }, [visible, modalAnim]);
  const backdropStyle = { opacity: modalAnim };
  const scale = modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });
  const modalStyle = { opacity: modalAnim, transform: [{ scale }] };
  if (!visible) return null;
  return (
    <View className="absolute inset-0 justify-center items-center">
      <Animated.View className="absolute top-0 left-0 right-0 bottom-0" style={[{ backgroundColor: Colorizer("#000000", 0.5) }, backdropStyle]} />
      <Animated.View
        className="w-4/5 p-5 rounded-lg items-center shadow-lg"
        style={[
          { backgroundColor: Colorizer("#E9E9EA", 1.0), shadowColor: Colorizer("#000000", 0.25), shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 },
          modalStyle
        ]}
      >
        <Ionicons name="checkmark-done-circle" size={50} color={Colorizer("#28a745", 1.0)} />
        <Text className="mt-2.5 text-2xl text-center" style={{ fontFamily: "Linotte_Bold", color: Colorizer("#000000", 1.0) }}>
          Success
        </Text>
        <Text className="my-2.5 text-center" style={{ fontFamily: "Linotte_Bold", color: Colorizer("#000000", 1.0) }}>
          {message}
        </Text>
        <TouchableOpacity className="mt-2.5 px-5 py-2 rounded" style={{ backgroundColor: Colorizer("#007BFF", 1.0) }} onPress={onClose}>
          <Text className="text-white" style={{ fontFamily: "Linotte_Bold" }}>
            OK
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const ErrorModal: React.FC<{ visible: boolean; message: string; onClose: () => void }> = ({ visible, message, onClose }) => {
  const [modalAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    if (visible) Animated.timing(modalAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    else Animated.timing(modalAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
  }, [visible, modalAnim]);
  const backdropStyle = { opacity: modalAnim };
  const scale = modalAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });
  const modalStyle = { opacity: modalAnim, transform: [{ scale }] };
  if (!visible) return null;
  return (
    <View className="absolute inset-0 justify-center items-center">
      <Animated.View className="absolute top-0 left-0 right-0 bottom-0" style={[{ backgroundColor: Colorizer("#000000", 0.5) }, backdropStyle]} />
      <Animated.View
        className="w-4/5 p-5 rounded-lg items-center shadow-lg"
        style={[
          { backgroundColor: Colorizer("#E9E9EA", 1.0), shadowColor: Colorizer("#000000", 0.25), shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 },
          modalStyle
        ]}
      >
        <MaterialIcons name="error" size={50} color={Colorizer("#dc3545", 1.0)} />
        <Text className="mt-2.5 text-2xl text-center" style={{ fontFamily: "Linotte_Bold", color: Colorizer("#000000", 1.0) }}>
          Error
        </Text>
        <Text className="my-2.5 text-center" style={{ fontFamily: "Linotte_Bold", color: Colorizer("#000000", 1.0) }}>
          {message}
        </Text>
        <TouchableOpacity className="mt-2.5 px-5 py-2 rounded" style={{ backgroundColor: Colorizer("#007BFF", 1.0) }} onPress={onClose}>
          <Text className="text-white" style={{ fontFamily: "Linotte_Bold" }}>
            OK
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
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
  if (!visible) return null;
  return (
    <View className="absolute inset-0 justify-center items-center">
      <View className="absolute inset-0" style={{ backgroundColor: Colorizer(primaryColor, 0.3) }} />
      <View
        className="rounded-lg p-5 items-center shadow-lg"
        style={{ backgroundColor: Colorizer("#E9E9EA", 1.0), shadowColor: Colorizer("#000000", 0.25), shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 }}
      >
        <ActivityIndicator size="large" color={Colorizer(primaryColor, 1.0)} />
        <Text className="mt-3 text-lg" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Linotte_Bold" }}>
          Downloading...
        </Text>
        <Text className="mt-2 text-base" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Linotte_Bold" }}>
          {percentage.toFixed(2)}%
        </Text>
        <View className="w-4/5 h-2.5 rounded overflow-hidden mt-2.5 bg-gray-300">
          <Animated.View style={{ width: widthInterpolated, backgroundColor: Colorizer(primaryColor, 1.0), height: "100%" }} />
        </View>
        <View className="flex-row mt-4 w-full justify-between px-2">
          <View className="items-center">
            <Text className="text-xs" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Linotte_Bold" }}>
              Rate: {formatBytes(downloadRate)}/s
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-xs" style={{ color: Colorizer(primaryColor, 1.0), fontFamily: "Linotte_Bold" }}>
              ETA: {formatTime(eta)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
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
      <View className="absolute inset-0 z-50 justify-center items-center">
        {!imageLoading && (
          <View className="items-center">
            <Animated.View className="justify-center items-center rounded-full">
              <Image style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: Colorizer("#000000", 0.8) }} source={require("@/assets/picWall/picWall.png")} contentFit="contain" />
            </Animated.View>
          </View>
        )}
      </View>
      {imageLoading && (
        <View className="absolute inset-0 z-40 justify-center items-center" style={{ backgroundColor: Colorizer("#000000", 1.0) }}>
          <ActivityIndicator size="large" color={Colorizer(selectedImage.primary, 1.0)} />
          <Text className="mt-2.5" style={{ fontFamily: "Linotte_Bold", color: Colorizer(selectedImage.primary, 1.0) }}>
            Loading HD Image Preview...
          </Text>
        </View>
      )}
      <Animated.View className="overflow-hidden rounded-t-3xl" style={[{ width: "100%", height: imageHeight, borderTopLeftRadius: 20, borderTopRightRadius: 20, transform: [{ scale: scaleValue }] }]}>
        <Image
          contentFit="cover"
          cachePolicy="memory-disk"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          source={{ uri: selectedImage.previewLink.replace("lowRes", "highRes") }}
          style={{ width: "100%", height: "100%", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          onError={() => {
            setImageLoading(false);
            Alert.alert("Error", "Failed to load image. Please try again.");
          }}
        />
      </Animated.View>
      <TouchableOpacity
        onPress={onViewFullScreen}
        className="absolute w-full bottom-5 mx-4 px-4 py-2 rounded-full z-50"
        style={{ backgroundColor: Colorizer(selectedImage.secondary, 0.9), borderRadius: 9999, borderWidth: 1, borderColor: Colorizer(selectedImage.primary, 1.0) }}
        activeOpacity={0.8}
      >
        <Text className="text-white text-base" style={{ fontFamily: "Kurale_Regular" }}>
          View Current Wallpaper In Full-Screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

interface DownloadButtonProps {
  onDownload?: (event: any) => void;
  colors: { primary: string; secondary: string; tertiary: string };
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onDownload, colors }) => {
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
        <View className="flex-row items-center justify-center">
          <Text className="text-white text-lg" style={{ fontFamily: "Lobster_Regular" }}>
            Download Wallpaper
          </Text>
          <FontAwesome5 name="download" size={15} color={Colorizer("#E9E9EA", 1.0)} style={{ marginHorizontal: 8 }} />
          <Text className="text-white text-lg" style={{ fontFamily: "Lobster_Regular" }}>
            (Highest Quality)
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

interface OtherImagesProps {
  primaryColor: string;
  tertiaryColor: string;
  setCurrentIndex: (index: number) => void;
  otherImages: { img: ImageMetadata; idx: number }[];
}

const OtherImages: React.FC<OtherImagesProps> = ({ otherImages, setCurrentIndex, primaryColor, tertiaryColor }) => (
  <View className="p-1 my-2 rounded-2xl" style={{ backgroundColor: Colorizer(primaryColor, 0.2) }}>
    <View className="p-1 rounded-2xl" style={{ backgroundColor: Colorizer(tertiaryColor, 0.2) }}>
      <Text className="ml-2 text-xl" style={{ fontFamily: "Lobster_Regular", color: Colorizer("#E9E9EA", 1.0) }}>
        Other Wallpapers:
      </Text>
      <View className="flex-row flex-wrap my-1">
        {otherImages.map(({ img, idx }) => (
          <TouchableOpacity
            key={idx}
            className="relative rounded-2xl overflow-hidden mx-0.5 flex-1"
            style={{ aspectRatio: 9 / 16, borderRadius: 10, borderWidth: 1, borderColor: Colorizer(primaryColor, 1.0) }}
            onPress={() => setCurrentIndex(idx)}
          >
            <Image source={{ uri: img.previewLink }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            <View className="absolute top-1 left-1 bg-black/50 px-1 py-1 rounded-lg">
              <Text className="text-white text-xs" style={{ fontFamily: "Kurale_Regular" }}>
                {img.original_file_name.replace(".jpg", "")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </View>
);

interface FullScreenViewProps {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
  selectedImage: ImageMetadata;
  showAlert: (title: string, message: string, iconName: "error" | "checkmark-done-circle") => void;
}

const FullScreenView: React.FC<FullScreenViewProps> = ({ isFullScreen, setIsFullScreen, selectedImage, showAlert }) => {
  return (
    <Modal visible={isFullScreen} transparent={false} onRequestClose={() => setIsFullScreen(false)} presentationStyle="fullScreen" statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: Colorizer("#000000", 1.0) }}>
        <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }} showsHorizontalScrollIndicator={false}>
          <Image
            contentFit="contain"
            source={{ uri: selectedImage.previewLink.replace("lowRes", "highRes") }}
            style={{ height: Dimensions.get("window").height, width: undefined, aspectRatio: selectedImage.width / selectedImage.height }}
          />
        </ScrollView>
        <View style={{ position: "absolute", bottom: 10, left: 10, right: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <LinearGradient
            colors={[Colorizer(selectedImage.tertiary, 0.8), Colorizer(selectedImage.tertiary, 0.6), Colorizer(selectedImage.tertiary, 0.4)]}
            style={{ flex: 1, height: 40, borderRadius: 10, marginHorizontal: 1 }}
            start={[0, 0]}
            end={[1, 0]}
          >
            <TouchableOpacity
              onPress={async () => {
                try {
                  await setWallpaper({ uri: selectedImage.previewLink.replace("lowRes", "highRes") }, TYPE_SCREEN.LOCK);
                  showAlert("Success", "Lock screen wallpaper set successfully.", "checkmark-done-circle");
                } catch (error) {
                  showAlert("Error", "Failed to set lock screen wallpaper.", "error");
                }
              }}
              style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%" }}
            >
              <Ionicons name="image" size={20} color={Colorizer("#E9E9EA", 1.0)} style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 12, color: "#FFFFFF", fontFamily: "Lobster_Regular" }}>Set LockScreen</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={[Colorizer(selectedImage.tertiary, 0.8), Colorizer(selectedImage.tertiary, 0.6), Colorizer(selectedImage.tertiary, 0.4)]}
            style={{ flex: 1, height: 40, borderRadius: 10, marginHorizontal: 1 }}
            start={[0, 0]}
            end={[1, 0]}
          >
            <TouchableOpacity
              onPress={async () => {
                try {
                  await setWallpaper({ uri: selectedImage.previewLink.replace("lowRes", "highRes") }, TYPE_SCREEN.HOME);
                  showAlert("Success", "Home screen wallpaper set successfully.", "checkmark-done-circle");
                } catch (error) {
                  showAlert("Error", "Failed to set home screen wallpaper.", "error");
                }
              }}
              style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%" }}
            >
              <Ionicons name="image" size={20} color={Colorizer("#E9E9EA", 1.0)} style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 12, color: "#FFFFFF", fontFamily: "Lobster_Regular" }}>Set HomeScreen</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={[Colorizer(selectedImage.tertiary, 0.8), Colorizer(selectedImage.tertiary, 0.6), Colorizer(selectedImage.tertiary, 0.4)]}
            style={{ flex: 1, height: 40, borderRadius: 10, marginHorizontal: 1 }}
            start={[0, 0]}
            end={[1, 0]}
          >
            <TouchableOpacity
              onPress={async () => {
                try {
                  await setWallpaper({ uri: selectedImage.previewLink.replace("lowRes", "highRes") }, TYPE_SCREEN.BOTH);
                  showAlert("Success", "Both screen wallpapers set successfully.", "checkmark-done-circle");
                } catch (error) {
                  showAlert("Error", "Failed to set both screen wallpapers.", "error");
                }
              }}
              style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%" }}
            >
              <Ionicons name="image" size={20} color={Colorizer("#E9E9EA", 1.0)} style={{ marginRight: 10 }} />
              <Text style={{ fontSize: 12, color: "#FFFFFF", fontFamily: "Lobster_Regular" }}>Set BothScreens</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const ImagePage = () => {
  const params = useLocalSearchParams();
  const [eta, setEta] = useState<number>(0);
  const rawDataString = params.data as string;
  const Sanitized = JSON.parse(rawDataString);
  const downloadStartTime = useRef<number>(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [percentage, setPercentage] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadRate, setDownloadRate] = useState<number>(0);
  const [alertIcon, setAlertIcon] = useState<"error" | "checkmark-done-circle">("checkmark-done-circle");
  const [currentIndex, setCurrentIndex] = useState(parseInt(Sanitized.selectedIndex as unknown as string) || 0);
  const selectedImage = Sanitized.data[currentIndex];
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
  const allImages: { img: ImageMetadata; idx: number }[] = (Sanitized.data as ImageMetadata[]).map((img, idx) => ({ img, idx }));
  const otherImages = allImages.filter(({ idx }) => idx !== currentIndex);
  return (
    <View className="flex-1" style={{ backgroundColor: Colorizer("#000000", 1.0) }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView className="flex-1">
        <PreviewImage selectedImage={selectedImage} screenWidth={screenWidth} onViewFullScreen={() => setIsFullScreen(true)} />
        <View className="p-4 border-4 rounded-3xl" style={{ borderColor: Colorizer(selectedImage.primary, 1.0), backgroundColor: Colorizer("#111111", 1.0) }}>
          <Text className="mb-2 text-5xl" style={{ fontFamily: "Lobster_Regular", color: Colorizer(selectedImage.primary, 1.0) }}>
            {selectedImage.original_file_name.replace(".jpg", "")}
          </Text>
          {[
            { label: "Mode", value: selectedImage.mode },
            { label: "FileSize", value: `${selectedImage.file_size_megabytes} mb` },
            { label: "Dimensions", value: `${selectedImage.width} x ${selectedImage.height}` }
          ].map((item, index) => (
            <View key={index} className="flex-row items-center my-2">
              <FontAwesome5 name={index === 0 ? "adjust" : index === 1 ? "file-alt" : "ruler-combined"} size={16} color={Colorizer(selectedImage.primary, 1.0)} className="ml-1" />
              <View className="flex-row items-center mx-1">
                <Text style={{ fontFamily: "Lobster_Regular", color: Colorizer(selectedImage.primary, 1.0) }}>{item.label}:</Text>
                <Text className="ml-2" style={{ fontFamily: "Kurale_Regular", color: Colorizer(selectedImage.primary, 1.0) }}>
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
          <DownloadButton onDownload={downloadAndSaveImage} colors={{ primary: selectedImage.primary, secondary: selectedImage.primary, tertiary: selectedImage.primary }} />
          <OtherImages otherImages={otherImages} setCurrentIndex={setCurrentIndex} primaryColor={selectedImage.primary} tertiaryColor={selectedImage.tertiary} />
        </View>
      </ScrollView>
      <FullScreenView isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} selectedImage={selectedImage} showAlert={showAlert} />
      <DownloadingModal visible={isDownloading} percentage={percentage} downloadRate={downloadRate} eta={eta} primaryColor={selectedImage.primary} />
      <SuccessModal visible={alertVisible && alertIcon === "checkmark-done-circle"} message={alertMessage} onClose={hideAlert} />
      <ErrorModal visible={alertVisible && alertIcon === "error"} message={alertMessage} onClose={hideAlert} />
    </View>
  );
};

export default ImagePage;
