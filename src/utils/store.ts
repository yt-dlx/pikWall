// src/utils/store.ts
import { create } from "zustand";
interface AppState {
  lastState: Record<string, any> | null;
  setLastState: (state: Record<string, any>) => void;
  clearState: () => void;
}
const useAppState = create<AppState>((set) => ({
  lastState: null,
  clearState: () => set({ lastState: null }),
  setLastState: (state) => set({ lastState: state })
}));
export default useAppState;
