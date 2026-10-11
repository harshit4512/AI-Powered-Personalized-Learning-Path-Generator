import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import { login as loginApi } from "../api/auth.api"
import useThemeStore from "../store/useThemeStore"
import { getAllPaths } from "../api/path.api"


const LoginPage = () => {
  const isDark = useThemeStore((state) => state.isDark)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const data = await loginApi({ email, password })
      login(data.user)


      const allpath = await getAllPaths()



      if(allpath.count>0){
        navigate("/home")
      }
      else{
        navigate("/onboarding")
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-950 transition-colors duration-300">

      {/* ================================ */}
      {/* LEFT SIDE — BRANDING            */}
      {/* ================================ */}
      <div className="
        hidden lg:flex
        w-1/2
        flex-col
        justify-between
        p-12
        bg-zinc-950 dark:bg-zinc-900
        relative
        overflow-hidden
      ">

        {/* background orb effect */}
        <div className="
          absolute top-[-100px] left-[-100px]
          w-[500px] h-[500px]
          rounded-full
          bg-blue-600/20
          blur-[120px]
          pointer-events-none
        "/>

        <div className="
          absolute bottom-[-100px] right-[-80px]
          w-[400px] h-[400px]
          rounded-full
          bg-indigo-500/20
          blur-[100px]
          pointer-events-none
        "/>

        {/* logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="
              w-9 h-9 rounded-lg
              bg-blue-500
              flex items-center justify-center
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              PathAI
            </span>
          </div>
        </div>

        {/* main branding text */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <p className="text-blue-400 text-sm font-medium tracking-widest uppercase">
              AI Powered Learning
            </p>
            <h1 className="
              text-4xl xl:text-5xl
              font-bold
              text-white
              leading-tight
            ">
              Your personal
              <br />
              <span className="text-blue-400">learning path</span>
              <br />
              starts here
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed max-w-sm">
              Tell us your goal. We generate a personalized
              week-by-week roadmap with curated resources
              just for you.
            </p>
          </div>

          {/* feature pills */}
          <div className="flex flex-wrap gap-2">
            {["AI Generated", "Week by Week", "Track Progress"].map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1.5
                  rounded-full
                  bg-white/10
                  text-white/70
                  text-xs
                  font-medium
                  border border-white/10
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* bottom tagline */}
        <div className="relative z-10">
          <p className="text-zinc-600 text-sm">
            Helping students learn smarter, not harder.
          </p>
        </div>
      </div>

      {/* ================================ */}
      {/* RIGHT SIDE — LOGIN FORM         */}
      {/* ================================ */}
      <div className="
        w-full lg:w-1/2
        flex items-center justify-center
        p-6 sm:p-12
      ">
        <div className="w-full max-w-md space-y-8">

          {/* mobile logo — only shows on small screens */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="
              w-8 h-8 rounded-lg
              bg-blue-500
              flex items-center justify-center
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-zinc-900 dark:text-white">
              PathAI
            </span>
          </div>

          {/* heading */}
          <div className="space-y-2">
            <h2 className="
              text-2xl sm:text-3xl font-bold
              text-zinc-900 dark:text-white
            ">
              Welcome back
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Login to continue your learning journey
            </p>
          </div>

          {/* error message */}
          {error && (
            <div className="
              p-3 rounded-lg
              bg-red-50 dark:bg-red-500/10
              border border-red-200 dark:border-red-500/20
              text-red-600 dark:text-red-400
              text-sm
            ">
              {error}
            </div>
          )}

          {/* form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* email */}
            <div className="space-y-1.5">
              <label className="
                text-sm font-medium
                text-zinc-700 dark:text-zinc-300
              ">
                Email Address
              </label>
              <div className="relative">
                <div className="
                  absolute left-3 top-1/2 -translate-y-1/2
                  text-zinc-400
                ">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="m22 6-10 7L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="
                    w-full pl-10 pr-4 py-3
                    rounded-lg
                    bg-zinc-50 dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800
                    text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                    text-sm
                    outline-none
                    focus:border-blue-500 dark:focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20
                    transition-all duration-200
                  "
                />
              </div>
            </div>

            {/* password */}
            <div className="space-y-1.5">
              <label className="
                text-sm font-medium
                text-zinc-700 dark:text-zinc-300
              ">
                Password
              </label>
              <div className="relative">
                <div className="
                  absolute left-3 top-1/2 -translate-y-1/2
                  text-zinc-400
                ">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3" y="11" width="18" height="11"
                      rx="2" ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 11V7a5 5 0 0 1 10 0v4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="
                    w-full pl-10 pr-10 py-3
                    rounded-lg
                    bg-zinc-50 dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800
                    text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                    text-sm
                    outline-none
                    focus:border-blue-500 dark:focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20
                    transition-all duration-200
                  "
                />
                {/* show/hide password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-zinc-400 hover:text-zinc-600
                    dark:hover:text-zinc-300
                    transition-colors
                  "
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="1" y1="1" x2="23" y2="23"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12" cy="12" r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full py-3
                rounded-lg
                bg-blue-500 hover:bg-blue-600
                disabled:bg-blue-400
                text-white font-medium text-sm
                transition-colors duration-200
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <div className="
                    w-4 h-4 rounded-full
                    border-2 border-white/30
                    border-t-white
                    animate-spin
                  "/>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              <span className="text-xs text-zinc-400">or continue with</span>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* google button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="
                w-full py-3
                rounded-lg
                bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                hover:bg-zinc-50 dark:hover:bg-zinc-800
                text-zinc-700 dark:text-zinc-300
                font-medium text-sm
                transition-colors duration-200
                flex items-center justify-center gap-3
              "
            >
              {/* google icon */}
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>

          </form>

          {/* register link */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
                text-blue-500 hover:text-blue-600
                font-medium
                transition-colors
              "
            >
              Create one
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default LoginPage