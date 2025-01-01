// src/components/store.ts
import { create } from "zustand";
import { ImageMetadata } from "@/types/database";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CurrentImageData {
  data: ImageMetadata[];
  selectedIndex: number;
  environment_title: string;
}

interface AppState {
  currentImageData: CurrentImageData | null;
  setCurrentImageData: (data: CurrentImageData | null) => void;
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
      clearState: () =>
        set({
          currentImageData: null,
          isFullScreen: false,
          hasRestoredState: false
        })
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          setTimeout(() => {
            state.setHasRestoredState(true);
          }, 0);
        }
      }
    }
  )
);

export const saveStateBeforeWallpaper = async () => {
  try {
    const state = useAppStore.getState();
    await AsyncStorage.setItem("pre-wallpaper-state", JSON.stringify(state));
  } catch {}
};

export const restoreStateAfterRestart = async () => {
  try {
    const savedState = await AsyncStorage.getItem("pre-wallpaper-state");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.currentImageData) {
        useAppStore.setState({
          currentImageData: {
            data: parsedState.currentImageData.data,
            selectedIndex: parsedState.currentImageData.selectedIndex,
            environment_title: parsedState.currentImageData.environment_title || "Default Environment"
          },
          isFullScreen: true,
          hasRestoredState: true
        });
      }
      await AsyncStorage.removeItem("pre-wallpaper-state");
    }
  } catch {}
};
