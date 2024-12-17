import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { hp, wp } from "../../helpers/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { theme } from "../../constants/theme";
import { Entypo, Octicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState("loading");
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const uri = item?.webformatURL;
  const fileName = item?.previewURL?.split("/").pop();
  const imageUri = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;
  useEffect(() => {
    (async () => {
      if (mediaPermission?.status !== "granted") {
        const { status } = await requestMediaPermission();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Unable to save images without permission."
          );
        }
      }
    })();
  }, []);
  useEffect(() => {
    if (downloadProgress > 0 && downloadProgress < 1) {
      showToast(`Downloading: ${Math.round(downloadProgress * 100)}%`);
    }
  }, [downloadProgress]);
  const onLoad = () => {
    setStatus("");
  };
  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;
    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;
    if (aspectRatio < 1) {
      //portrait image
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };
  const handleDownloadImage = async () => {
    if (Platform.OS == "web") {
      const anchor = document.createElement("a");
      anchor.href = imageUri;
      anchor.target = "_blank";
      anchor.download = fileName || "download";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      if (mediaPermission?.status !== "granted") {
        Alert.alert(
          "Permission required",
          "This app needs access to your photo library to save images."
        );
        return;
      }

      setStatus("downloading");
      try {
        setDownloadProgress(0);
        showToast(`Downloading: 0%`);
        const uri = await downloadFile();
        if (uri) {
          const asset = await MediaLibrary.createAssetAsync(uri);
          showToast("Image Downloaded");
        } else {
          throw new Error("Download failed");
        }
      } catch (error) {
        Alert.alert("Download failed", error.message);
      } finally {
        setStatus("");
        setDownloadProgress(0);
      }
    }
  };
  const downloadFile = async () => {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        imageUri,
        filePath,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
        }
      );

      const { uri } = await downloadResumable.downloadAsync();
      setStatus("");
      return uri;
    } catch (err) {
      setStatus("");
      Alert.alert("Image Download Error", err.message);
      return null;
    }
  };
  const showToast = (message) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
      visibilityTime: downloadProgress > 0 && downloadProgress < 1 ? 0 : 2500,
    });
  };
  const toastConfig = {
    success: ({ text1, props, ...rest }) => {
      return (
        <View style={styles.toast}>
          <Text style={styles.toastText} numberOfLines={2}>
            {text1}
          </Text>
        </View>
      );
    },
  };

  const handleShareImage = async () => {
    if (Platform.OS == "web") {
      try {
        await navigator.clipboard.writeText(imageUri);
        showToast("Link Copied");
      } catch (err) {
        showToast("Failed to copy link");
      }
    } else {
      setStatus("sharing");
      let uri = await downloadFile();
      if (uri) {
        //share image
        await Sharing.shareAsync(uri);
      }
    }
  };

  return (
    <BlurView style={styles.container} tint="dark" intensity={60}>
      <View style={getSize()}>
        <View style={styles.loading}>
          {status == "loading" && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Octicons name="x" size={24} color={"white"} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status == "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <Octicons name="download" size={24} color={"white"} />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status == "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleShareImage}>
              <Entypo name="share" size={22} color={"white"} />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast config={toastConfig} visibilityTime={2500} />
    </BlurView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderCurve: "continuous",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.white,
  },
});
export default ImageScreen;
