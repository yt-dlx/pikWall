// src/utils/store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppState {
  lastState: Record<string, any> | null;
  hasRedirected: boolean; // New property to track if redirection has been done
  setLastState: (state: Record<string, any>) => void;
  clearState: () => void;
  setRedirected: (status: boolean) => void; // New method to set the redirection status
}

const useAppState = create(
  persist<AppState>(
    (set) => ({
      lastState: null,
      hasRedirected: false, // Initialize redirection tracking to false
      setLastState: (state) => set({ lastState: state, hasRedirected: false }), // Reset redirection on state update
      clearState: () => set({ lastState: null, hasRedirected: false }), // Clear state and reset redirection
      setRedirected: (status) => set({ hasRedirected: status }) // Update redirection status
    }),
    {
      name: "app-state",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useAppState;
