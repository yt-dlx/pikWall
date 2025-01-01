// src/utils/store.ts
import { create } from "zustand";
import { ImageMetadata } from "@/types/database";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WallpaperState {
  currentIndex: number;
  imageData: ImageMetadata[];
  setCurrentIndex: (index: number) => void;
  setImageData: (data: ImageMetadata[]) => void;
  clearState: () => void;
}

export const useWallpaperStore = create<WallpaperState>()(
  persist(
    (set) => ({
      currentIndex: 0,
      imageData: [],
      setCurrentIndex: (index: number) => set({ currentIndex: index }),
      setImageData: (data: ImageMetadata[]) => set({ imageData: data }),
      clearState: () => set({ currentIndex: 0, imageData: [] })
    }),
    {
      name: "wallpaper-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
