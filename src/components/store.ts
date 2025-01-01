// src/components/store.ts
import { create } from "zustand";
import { ImageMetadata } from "@/types/database";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CurrentImageData {
  data: ImageMetadata[];
  selectedIndex: number;
  environment_title: string; // Added to store environment title
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
      // Invoked after rehydration completes
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Once rehydration is complete, set hasRestoredState to true.
          setTimeout(() => {
            state.setHasRestoredState(true);
          }, 0);
        }
      }
    }
  )
);

/**
 * saveStateBeforeWallpaper()
 * - Called right before setting a wallpaper to ensure
 *   the current state is saved to a separate AsyncStorage key.
 */
export const saveStateBeforeWallpaper = async () => {
  try {
    const state = useAppStore.getState();
    await AsyncStorage.setItem("pre-wallpaper-state", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state:", error);
  }
};

/**
 * restoreStateAfterRestart()
 * - Called on app launch to see if there's a saved state in
 *   "pre-wallpaper-state". If so, load it and restore the app state,
 *   including `currentImageData` and `isFullScreen`.
 */
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
          // Force isFullScreen to true to navigate directly to the Image page
          isFullScreen: true,
          hasRestoredState: true
        });
      }
      // Remove the pre-wallpaper-state once it's restored
      await AsyncStorage.removeItem("pre-wallpaper-state");
    }
  } catch (error) {
    console.error("Error restoring state:", error);
  }
};
