import { create } from "zustand"

const getInitialTheme = () => {
  const saved = localStorage.getItem("theme")
  if (saved) return saved === "dark"

  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const applyTheme = (isDark) => {
  const root = document.documentElement
  if (isDark) {
    root.classList.add("dark")
    localStorage.setItem("theme", "dark")
  } else {
    root.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}

const useThemeStore = create((set) => ({
  isDark: false, // ⚠️ DON'T call getInitialTheme here

  initTheme: () => {
    const isDark = getInitialTheme()
    applyTheme(isDark)
    set({ isDark })
  },

  toggleTheme: () =>
    set((state) => {
      const newIsDark = !state.isDark
      applyTheme(newIsDark)
      console.log("Theme changed:", newIsDark)
      return { isDark: newIsDark }
    }),
}))

export default useThemeStore