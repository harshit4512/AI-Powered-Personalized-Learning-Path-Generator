import { create } from "zustand"

const usePathStore = create((set) => ({

  // ================================
  // SIDEBAR STATE
  // ================================
  isSidebarOpen: false,

  toggleSidebar: (value) =>
    set((state) => ({
      isSidebarOpen: value !== undefined ? value : !state.isSidebarOpen,
    })),

  // ================================
  // BOTTOM SHEET STATE
  // ================================
  selectedWeek: null,
  isBottomSheetOpen: false,
  currentPathId: null,

  openWeek: (weekNumber) =>
    set({
      selectedWeek: weekNumber,
      isBottomSheetOpen: true,
    }),

  closeBottomSheet: () =>
    set({
      selectedWeek: null,
      isBottomSheetOpen: false,
    }),

  setCurrentPathId: (pathId) =>
    set({ currentPathId: pathId }),

  clearPath: () =>
    set({
      selectedWeek: null,
      isBottomSheetOpen: false,
      currentPathId: null,
    }),
}))

export default usePathStore