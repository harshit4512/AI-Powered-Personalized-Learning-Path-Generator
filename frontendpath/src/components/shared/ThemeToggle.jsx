import useThemeStore from "../../store/useThemeStore"

const ThemeToggle = () => {
  const isDark = useThemeStore((state) => state.isDark)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className="
        w-9 h-9
        rounded-lg
        flex items-center justify-center
        bg-zinc-100 dark:bg-zinc-800
        hover:bg-zinc-200 dark:hover:bg-zinc-700
        text-zinc-600 dark:text-zinc-400
        hover:text-zinc-900 dark:hover:text-white
        border border-zinc-200 dark:border-zinc-700
        transition-all duration-200
      "
      aria-label="Toggle theme"
    >
      {isDark ? (
        // sun icon — shown in dark mode
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5"
            stroke="currentColor" strokeWidth="2"
          />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        // moon icon — shown in light mode
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle