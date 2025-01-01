// src/utils/store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AppState {
  clearState: () => void;
  lastState: Record<string, any> | null;
  setLastState: (state: Record<string, any>) => void;
}
const useAppState = create(
  persist<AppState>((set) => ({ lastState: null, setLastState: (state) => set({ lastState: state }), clearState: () => set({ lastState: null }) }), {
    name: "app-state",
    storage: createJSONStorage(() => AsyncStorage)
  })
);
export default useAppState;
