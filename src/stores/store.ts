import { create } from "zustand";

type NavStore = {
  isMobileOpen: boolean;
  toggleMobile: () => void;
  closeMobile: () => void;
}

export const useNavStore = create<NavStore>((set) => ({
  isMobileOpen: false,
  toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  closeMobile: () => set({ isMobileOpen: false }),
}));
