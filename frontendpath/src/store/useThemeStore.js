import {create} from "zustand"

// ================================
// CHECK INITIAL THEME
// reads from localStorage first
// falls back to system preference
// ================================

const getInitialTheme =()=>{
    const saved =localStorage.getItem("theme")
    if(saved) return saved ==="dark"
    return wiindow.matchMedia("(prefer-color-scheme:dark)").matches
}
    // ================================
// APPLY THEME TO HTML ELEMENT
// tailwind watches class on <html>
// ================================

const applyTheme =(isDark)=>{
    const root=document.documentElement

    if(isDark){
        root.classList.add("dark")
        localStorage.setItem("theme","dark")
    }
    else{
        root.classList.remove("dark")
        localStorage.setItem("theme","light")
    }
}

const useThemeStore = create((set)=>({
      // ================================
  // STATE
  // ================================

  isDark:getInitialTheme(),

    // ================================
  // ACTIONS
  // ================================

  toggleTheme:()=>set((state)=>{
      const newIsDark=!state.isDark
      applyTheme(newIsDark)
      return {isDark:newIsDark}
  }),

   // call this once on app load
  // to apply saved theme immediately

  initTheme:()=>set((state)=>{
    applyTheme(state.isDark)
    return {}
  }),
}))


export default useThemeStore