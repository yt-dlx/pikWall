// src/components/store.ts
import { create } from "zustand";
import { ImageMetadata } from "@/types/database";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  currentImageData: {
    data: ImageMetadata[];
    selectedIndex: number;
  } | null;
  setCurrentImageData: (data: { data: ImageMetadata[]; selectedIndex: number } | null) => void;
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
  hasRestoredState: boolean;
  setHasRestoredState: (value: boolean) => void;
  clearState: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentImageData: null,
      setCurrentImageData: (data) => set({ currentImageData: data }),
      isFullScreen: false,
      setIsFullScreen: (value) => set({ isFullScreen: value }),
      hasRestoredState: false,
      setHasRestoredState: (value) => set({ hasRestoredState: value }),
      clearState: () => set({ currentImageData: null, isFullScreen: false, hasRestoredState: false })
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export const saveStateBeforeWallpaper = async () => {
  try {
    const state = useAppStore.getState();
    await AsyncStorage.setItem("pre-wallpaper-state", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state:", error);
  }
};

export const restoreStateAfterRestart = async () => {
  try {
    const savedState = await AsyncStorage.getItem("pre-wallpaper-state");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      useAppStore.setState({ ...parsedState, hasRestoredState: true });
      await AsyncStorage.removeItem("pre-wallpaper-state");
    }
  } catch (error) {
    console.error("Error restoring state:", error);
  }
};
