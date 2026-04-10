import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import usePathStore from "../../store/usePathStore"

const Sidebar = () => {
  const isSidebarOpen = usePathStore((state) => state.isSidebarOpen)
  const toggleSidebar = usePathStore((state) => state.toggleSidebar)
  const location = useLocation()

  // close sidebar on route change
  useEffect(() => {
    toggleSidebar(false)
  }, [location.pathname])

  // close on escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") toggleSidebar(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <>
      {/* overlay — closes sidebar on click */}
      {isSidebarOpen && (
        <div
          onClick={() => toggleSidebar(false)}
          className="
            fixed inset-0 z-40
            bg-black/40 dark:bg-black/60
            backdrop-blur-sm
            transition-opacity duration-300
          "
        />
      )}

      {/* sidebar panel */}
      <aside className={`
        fixed top-0 left-0 z-50
        h-full w-64
        bg-white dark:bg-zinc-900
        border-r border-zinc-200 dark:border-zinc-800
        shadow-xl shadow-zinc-200/50 dark:shadow-zinc-900/80
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
      `}>

        {/* header */}
        <div className="
          flex items-center justify-between
          px-4 py-4
          border-b border-zinc-100 dark:border-zinc-800
        ">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-base text-zinc-900 dark:text-white">PathAI</span>
          </div>

          <button
            onClick={() => toggleSidebar(false)}
            className="
              w-7 h-7 rounded-lg
              flex items-center justify-center
              text-zinc-400 hover:text-zinc-900 dark:hover:text-white
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition-colors duration-200
            "
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* nav items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

          {/* active item */}
          <Link
            to="/home"
            className="
              flex items-center gap-3
              px-3 py-2.5 rounded-xl
              bg-blue-50 dark:bg-blue-500/10
              text-blue-600 dark:text-blue-400
              font-medium text-sm
              transition-colors duration-200
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <polyline points="9 22 9 12 15 12 15 22"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Home
          </Link>

          {/* coming soon section */}
          <div className="pt-4">
            <p className="
              px-3 mb-2
              text-xs font-medium
              text-zinc-400 dark:text-zinc-600
              uppercase tracking-wider
            ">
              Coming Soon
            </p>

            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
                label: "Analytics",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4"
                      stroke="currentColor" strokeWidth="2" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
                label: "Community",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
                label: "AI Chatbot",
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3"
                      stroke="currentColor" strokeWidth="2" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                      stroke="currentColor" strokeWidth="2" />
                  </svg>
                ),
                label: "Settings",
              },
            ].map((item) => (
              <button
                key={item.label}
                disabled
                className="
                  w-full flex items-center gap-3
                  px-3 py-2.5 rounded-xl
                  text-zinc-400 dark:text-zinc-600
                  text-sm
                  cursor-not-allowed
                  opacity-60
                "
              >
                {item.icon}
                {item.label}
                <span className="
                  ml-auto text-xs
                  px-1.5 py-0.5 rounded-md
                  bg-zinc-100 dark:bg-zinc-800
                  text-zinc-400 dark:text-zinc-600
                ">
                  Soon
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="
          px-4 py-4
          border-t border-zinc-100 dark:border-zinc-800
        ">
          <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center">
            PathAI v1.0 — Built for SIH 2025
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar