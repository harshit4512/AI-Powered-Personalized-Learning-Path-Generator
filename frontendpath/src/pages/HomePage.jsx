import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import Navbar from "../components/shared/Navbar"
import Sidebar from "../components/shared/Sidebar"
import PathCardList from "../components/home/PathCardList"
import Loader from "../components/shared/Loader"
import { getAllPaths } from "../api/path.api"

const HomePage = () => {
  const [paths, setPaths] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  // fetch all paths on mount
  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const data = await getAllPaths()
        console.log(data);
        
        setPaths(data.paths || [])
      } catch (err) {
        setError("Failed to load your paths. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchPaths() 
  },[])

  const handleCreatePath = () => {
    navigate("/onboarding")
  }

  // get first name only
  const firstName = user?.name?.split(" ")[0] || "there"

  return (
    <div className="
      min-h-screen
      bg-zinc-50 dark:bg-zinc-950
      transition-colors duration-300
    ">
      {/* subtle background pattern */}
      <div className="
        fixed inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
        from-blue-50/40 via-transparent to-transparent
        dark:from-blue-950/20 dark:via-transparent dark:to-transparent
      "/>

      {/* navbar */}
      <Navbar onCreatePath={handleCreatePath} />

      {/* sidebar */}
      <Sidebar />

      {/* main content */}
      <main className="
        relative z-10
        pt-16
        px-4 sm:px-6 lg:px-8
        pb-12
        max-w-7xl mx-auto
      ">

        {/* ================================ */}
        {/* PAGE HEADER                     */}
        {/* ================================ */}
        <div className="py-8 space-y-1">
          <h1 className="
            text-2xl sm:text-3xl font-bold
            text-zinc-900 dark:text-white
          ">
            Hi {firstName} 👋
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {paths.length === 0
              ? "Create your first learning path to get started."
              : `You have ${paths.length} learning path${paths.length > 1 ? "s" : ""}.`
            }
          </p>
        </div>

        {/* ================================ */}
        {/* LOADING STATE                   */}
        {/* ================================ */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="
                w-10 h-10 rounded-full
                border-4
                border-zinc-200 dark:border-zinc-700
                border-t-blue-500
                animate-spin
              "/>
              <p className="text-zinc-400 text-sm">Loading your paths...</p>
            </div>
          </div>
        )}

        {/* ================================ */}
        {/* ERROR STATE                     */}
        {/* ================================ */}
        {!isLoading && error && (
          <div className="
            p-4 rounded-xl
            bg-red-50 dark:bg-red-500/10
            border border-red-200 dark:border-red-500/20
            text-red-600 dark:text-red-400
            text-sm
          ">
            {error}
          </div>
        )}

        {/* ================================ */}
        {/* EMPTY STATE                     */}
        {/* ================================ */}
        {!isLoading && !error && paths.length === 0 && (
          <div className="
            flex flex-col items-center justify-center
            py-24 text-center
            space-y-6
          ">
            {/* illustration */}
            <div className="
              w-20 h-20 rounded-2xl
              bg-blue-50 dark:bg-blue-500/10
              border border-blue-100 dark:border-blue-500/20
              flex items-center justify-center
            ">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#3b82f6" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                No learning paths yet
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm">
                Create your first AI-generated roadmap and start
                your learning journey today.
              </p>
            </div>

            <button
              onClick={handleCreatePath}
              className="
                flex items-center gap-2
                px-6 py-3 rounded-xl
                bg-blue-500 hover:bg-blue-600
                text-white font-medium text-sm
                transition-colors duration-200
              "
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" />
              </svg>
              Create Your First Path
            </button>
          </div>
        )}

        {/* ================================ */}
        {/* PATHS LIST                      */}
        {/* ================================ */}
        {!isLoading && !error && paths.length > 0 && (
          <PathCardList paths={paths} />
        )}

      </main>
    </div>
  )
}

export default HomePage