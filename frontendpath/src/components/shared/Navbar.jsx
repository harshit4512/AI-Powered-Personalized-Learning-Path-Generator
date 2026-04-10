import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../../store/useAuthStore"
import usePathStore from "../../store/usePathStore"
import ThemeToggle from "./ThemeToggle"
import { logout as logoutApi } from "../../api/auth.api"

const Navbar = ({ onCreatePath }) => {
  const [profileOpen, setProfileOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const toggleSidebar = usePathStore((state) => state.toggleSidebar)

  // close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleLogout = async () => {
    try {
      await logoutApi()
    } catch (_) {}
    logout()
    navigate("/login")
  }

  // get initials from name
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="
      fixed top-0 left-0 right-0 z-40
      h-16
      bg-white/80 dark:bg-zinc-950/80
      backdrop-blur-md
      border-b border-zinc-200 dark:border-zinc-800/60
      transition-colors duration-300
    ">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">

        {/* LEFT — sidebar toggle + logo */}
        <div className="flex items-center gap-3">

          {/* sidebar toggle button */}
          <button
            onClick={toggleSidebar}
            className="
              w-9 h-9 rounded-lg
              flex items-center justify-center
              text-zinc-500 dark:text-zinc-400
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              hover:text-zinc-900 dark:hover:text-white
              transition-all duration-200
            "
            aria-label="Toggle sidebar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="
              w-7 h-7 rounded-lg bg-blue-500
              flex items-center justify-center flex-shrink-0
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-base text-zinc-900 dark:text-white hidden sm:block">
              PathAI
            </span>
          </Link>
        </div>

        {/* RIGHT — theme + create + profile */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* theme toggle */}
          <ThemeToggle />

          {/* create new path button */}
          <button
            onClick={onCreatePath}
            className="
              flex items-center gap-1.5
              px-3 py-2 rounded-lg
              bg-blue-500 hover:bg-blue-600
              text-white text-sm font-medium
              transition-colors duration-200
            "
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" />
            </svg>
            <span className="hidden sm:block">New Path</span>
          </button>

          {/* profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="
                flex items-center gap-2
                px-2 py-1.5 rounded-lg
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition-colors duration-200
              "
            >
              {/* avatar */}
              <div className="
                w-8 h-8 rounded-full
                bg-blue-500
                flex items-center justify-center
                text-white text-xs font-bold
                flex-shrink-0
              ">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user?.name)
                )}
              </div>

              {/* name — hidden on mobile */}
              <span className="
                hidden sm:block
                text-sm font-medium
                text-zinc-700 dark:text-zinc-300
                max-w-[100px] truncate
              ">
                {user?.name?.split(" ")[0]}
              </span>

              {/* chevron */}
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                className={`
                  text-zinc-400 transition-transform duration-200
                  ${profileOpen ? "rotate-180" : ""}
                `}
              >
                <path d="M6 9l6 6 6-6"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* dropdown menu */}
            {profileOpen && (
              <div className="
                absolute right-0 top-full mt-2
                w-56 rounded-xl
                bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50
                overflow-hidden
                z-50
              ">
                {/* user info */}
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                    {user?.email}
                  </p>
                </div>

                {/* menu items */}
                <div className="p-1">
                  <button
                    onClick={() => {
                      setProfileOpen(false)
                      navigate("/home")
                    }}
                    className="
                      w-full flex items-center gap-3
                      px-3 py-2 rounded-lg
                      text-sm text-zinc-600 dark:text-zinc-400
                      hover:bg-zinc-50 dark:hover:bg-zinc-800
                      hover:text-zinc-900 dark:hover:text-white
                      transition-colors duration-200
                    "
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <polyline points="9 22 9 12 15 12 15 22"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Home
                  </button>

                  <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />

                  <button
                    onClick={handleLogout}
                    className="
                      w-full flex items-center gap-3
                      px-3 py-2 rounded-lg
                      text-sm text-red-500 dark:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-500/10
                      transition-colors duration-200
                    "
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <polyline points="16 17 21 12 16 7"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="21" y1="12" x2="9" y2="12"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar