import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import useThemeStore from "../store/useThemeStore"
import ThemeToggle from "../components/shared/ThemeToggle"

// ================================
// FEATURES DATA
// ================================
const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "AI Generated Roadmap",
    desc: "Tell us your goal and we instantly generate a week-by-week personalized learning path tailored just for you.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Week by Week Plan",
    desc: "Topics are broken down day by day so you always know exactly what to study and in what order.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Track Your Progress",
    desc: "Tick topics as you complete them. Watch your progress bar fill up and stay motivated every single day.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Curated Resources",
    desc: "Every topic comes with hand-picked links from YouTube, MDN, freeCodeCamp and more — no more googling.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Multiple Paths",
    desc: "Create separate roadmaps for DSA, Full Stack, Data Science and more. Switch between them anytime.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Secure & Private",
    desc: "Your data is yours. We use secure cookie-based authentication and never share your information.",
  },
]

// ================================
// HOW IT WORKS DATA
// ================================
const steps = [
  {
    number: "01",
    title: "Tell us your goal",
    desc: "Choose what you want to learn — Full Stack, DSA, Data Science and more. Set your timeline and daily hours.",
  },
  {
    number: "02",
    title: "AI builds your roadmap",
    desc: "Our AI instantly generates a structured week-by-week plan with curated video and article links per topic.",
  },
  {
    number: "03",
    title: "Learn and track progress",
    desc: "Open your dashboard, tick topics as you complete them, and watch your progress grow every day.",
  },
]

// ================================
// LANDING PAGE COMPONENT
// ================================
const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false)
  const isDark = useThemeStore((state) => state.isDark)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="
      min-h-screen
      bg-white dark:bg-black
      text-zinc-900 dark:text-white
      transition-colors duration-300
      overflow-x-hidden
    ">

      {/* ================================ */}
      {/* NAVBAR                          */}
      {/* ================================ */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? "bg-white/80 dark:bg-black backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/50"
          : "bg-transparent"
        }
      `}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="
              w-8 h-8 rounded-lg
              bg-blue-500
              flex items-center justify-center
              flex-shrink-0
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-bold text-lg text-zinc-900 dark:text-white">
              PathAI
            </span>
          </Link>

          {/* desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it Works"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="
                  text-sm text-zinc-600 dark:text-zinc-400
                  hover:text-zinc-900 dark:hover:text-white
                  transition-colors duration-200
                "
              >
                {link}
              </a>
            ))}
          </div>

          {/* right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="
                hidden sm:block
                text-sm text-zinc-600 dark:text-zinc-400
                hover:text-zinc-900 dark:hover:text-white
                transition-colors
              "
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="
                px-4 py-2
                rounded-lg
                bg-blue-500 hover:bg-blue-600
                text-white text-sm font-medium
                transition-colors duration-200
              "
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>

      {/* ================================ */}
      {/* HERO SECTION                    */}
      {/* ================================ */}
      <section className="
        relative min-h-screen
        flex flex-col items-center justify-center
        text-center px-6
        pt-16
        overflow-hidden
      ">

        {/* dark mode orb background */}
        <div className="
          absolute inset-0
          pointer-events-none
          overflow-hidden
        ">
          {/* top center glow */}
          <div className="
            absolute top-0 left-1/2 -translate-x-1/2
            w-[900px] h-[500px]
            rounded-[50%]
            bg-blue-600/10 dark:bg-blue-600/20
            blur-[100px]
          "/>

          {/* left orb */}
          <div className="
            absolute top-1/3 left-[200px]
            w-[500px] h-[500px]
            rounded-full
            bg-indigo-500/5 dark:bg-indigo-500/10
            blur-[120px]
          "/>

          {/* right orb */}
          <div className="
            absolute top-1/3 right-[200px]
            w-[500px] h-[500px]
            rounded-full
            bg-blue-500/5 dark:bg-blue-500/10
            blur-[120px]
          "/>

          {/* arc effect — dark mode only */}
          <div className="
            hidden dark:block
            absolute top-[-120px] left-1/2 -translate-x-1/2
            w-[1000px] h-[600px]
            rounded-[50%]
            border border-blue-500/10
            blur-sm
          "/>
          <div className="
            hidden dark:block
            absolute top-[80px] left-1/2 -translate-x-1/2
            w-[800px] h-[500px]
            rounded-[50%]
            border border-indigo-400/10
            blur-sm
          "/>
        </div>

        {/* content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">

          {/* badge */}
          <div className="flex justify-center">
            <span className="
              inline-flex items-center gap-2
              px-4 py-1.5
              rounded-full
              bg-blue-50 dark:bg-blue-500/10
              border border-blue-200 dark:border-blue-500/20
              text-blue-600 dark:text-blue-400
              text-xs font-medium
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/>
              Powered by Groq AI
            </span>
          </div>

          {/* headline */}
          <h1 className="
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            font-bold
            leading-tight
            tracking-tight
            text-zinc-900 dark:text-white
          ">
            Learn Anything.
            <br />
            <span className="
              bg-gradient-to-r from-blue-500 to-indigo-500
              bg-clip-text text-transparent
            ">
              With a Roadmap
            </span>
            <br />
            Built for You.
          </h1>

          {/* subtext */}
          <p className="
            text-base sm:text-lg
            text-zinc-500 dark:text-zinc-400
            max-w-2xl mx-auto
            leading-relaxed
          ">
            Tell us your goal. We generate a personalized week-by-week
            learning path with curated resources — so you always know
            exactly what to study next.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="
                w-full sm:w-auto
                px-8 py-3.5
                rounded-xl
                bg-blue-500 hover:bg-blue-600
                text-white font-medium text-sm
                transition-colors duration-200
                flex items-center justify-center gap-2
              "
            >
              Start Learning Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="
                w-full sm:w-auto
                px-8 py-3.5
                rounded-xl
                bg-zinc-100 dark:bg-zinc-900
                hover:bg-zinc-200 dark:hover:bg-zinc-800
                border border-zinc-200 dark:border-zinc-800
                text-zinc-700 dark:text-zinc-300
                font-medium text-sm
                transition-colors duration-200
                flex items-center justify-center gap-2
              "
            >
              See How It Works
            </a>
          </div>

          {/* goals pill row */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              "Full Stack Dev",
              "DSA & CP",
              "Data Science",
              "Android Dev",
              "DevOps & Cloud",
            ].map((goal) => (
              <span
                key={goal}
                className="
                  px-3 py-1.5
                  rounded-full
                  bg-zinc-100 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  text-zinc-600 dark:text-zinc-400
                  text-xs font-medium
                "
              >
                {goal}
              </span>
            ))}
          </div>

        </div>

        {/* scroll indicator */}
        <div className="
          absolute bottom-8 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2
          text-zinc-400 dark:text-zinc-600
          animate-bounce
        ">
          <span className="text-xs">Scroll to explore</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

      </section>

      {/* ================================ */}
      {/* HOW IT WORKS SECTION            */}
      {/* ================================ */}
      <section
        id="how-it-works"
        className="
          py-24 px-6
          bg-zinc-50 dark:bg-zinc-900/50
          border-y border-zinc-100 dark:border-zinc-800/50
        "
      >
        <div className="max-w-6xl mx-auto">

          {/* heading */}
          <div className="text-center space-y-4 mb-16">
            <p className="
              text-blue-500 dark:text-blue-400
              text-sm font-medium tracking-widest uppercase
            ">
              Simple Process
            </p>
            <h2 className="
              text-3xl sm:text-4xl font-bold
              text-zinc-900 dark:text-white
            ">
              How It Works
            </h2>
            <p className="
              text-zinc-500 dark:text-zinc-400
              max-w-xl mx-auto text-sm leading-relaxed
            ">
              From your goal to a complete learning roadmap in under 30 seconds.
            </p>
          </div>

          {/* steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">

                {/* connector line between steps */}
                {index < steps.length - 1 && (
                  <div className="
                    hidden md:block
                    absolute top-8 left-[calc(100%-0px)] w-full h-px
                    bg-gradient-to-r
                    from-zinc-200 dark:from-zinc-700
                    to-transparent
                    z-0
                  "/>
                )}

                <div className="
                  relative z-10
                  p-6 rounded-2xl
                  bg-white dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  space-y-4
                ">
                  {/* step number */}
                  <div className="
                    w-12 h-12 rounded-xl
                    bg-blue-50 dark:bg-blue-500/10
                    border border-blue-100 dark:border-blue-500/20
                    flex items-center justify-center
                  ">
                    <span className="
                      text-blue-500 dark:text-blue-400
                      font-bold text-lg
                    ">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="
                    text-lg font-semibold
                    text-zinc-900 dark:text-white
                  ">
                    {step.title}
                  </h3>

                  <p className="
                    text-zinc-500 dark:text-zinc-400
                    text-sm leading-relaxed
                  ">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================ */}
      {/* FEATURES SECTION                */}
      {/* ================================ */}
      <section
        id="features"
        className="py-24 px-6"
      >
        <div className="max-w-6xl mx-auto">

          {/* heading */}
          <div className="text-center space-y-4 mb-16">
            <p className="
              text-blue-500 dark:text-blue-400
              text-sm font-medium tracking-widest uppercase
            ">
              Why PathAI
            </p>
            <h2 className="
              text-3xl sm:text-4xl font-bold
              text-zinc-900 dark:text-white
            ">
              Everything You Need to Learn
            </h2>
            <p className="
              text-zinc-500 dark:text-zinc-400
              max-w-xl mx-auto text-sm leading-relaxed
            ">
              A complete learning system designed for students
              who want to learn smarter, not harder.
            </p>
          </div>

          {/* features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="
                  group
                  p-6 rounded-2xl
                  bg-zinc-50 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  hover:border-blue-200 dark:hover:border-blue-500/30
                  hover:bg-blue-50/50 dark:hover:bg-blue-500/5
                  transition-all duration-300
                  space-y-4
                "
              >
                {/* icon */}
                <div className="
                  w-10 h-10 rounded-xl
                  bg-blue-50 dark:bg-blue-500/10
                  border border-blue-100 dark:border-blue-500/20
                  flex items-center justify-center
                  text-blue-500 dark:text-blue-400
                  group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20
                  transition-colors duration-300
                ">
                  {feature.icon}
                </div>

                <h3 className="
                  font-semibold text-base
                  text-zinc-900 dark:text-white
                ">
                  {feature.title}
                </h3>

                <p className="
                  text-zinc-500 dark:text-zinc-400
                  text-sm leading-relaxed
                ">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================ */}
      {/* CTA SECTION                     */}
      {/* ================================ */}
      <section className="
        py-24 px-6
        bg-zinc-50 dark:bg-zinc-900/50
        border-t border-zinc-100 dark:border-zinc-800/50
      ">
        <div className="
          max-w-3xl mx-auto
          text-center space-y-8
        ">

          {/* glow behind CTA */}
          <div className="relative">
            <div className="
              absolute inset-0
              flex items-center justify-center
              pointer-events-none
            ">
              <div className="
                w-[600px] h-[200px]
                bg-blue-500/5 dark:bg-blue-500/10
                blur-[80px]
                rounded-full
              "/>
            </div>

            <div className="relative space-y-6">
              <h2 className="
                text-3xl sm:text-4xl lg:text-5xl
                font-bold
                text-zinc-900 dark:text-white
                leading-tight
              ">
                Ready to start your
                <br />
                <span className="
                  bg-gradient-to-r from-blue-500 to-indigo-500
                  bg-clip-text text-transparent
                ">
                  learning journey?
                </span>
              </h2>

              <p className="
                text-zinc-500 dark:text-zinc-400
                text-sm sm:text-base
                leading-relaxed max-w-xl mx-auto
              ">
                Join students who are already learning smarter
                with AI-generated personalized roadmaps.
                It's completely free to get started.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="
                    w-full sm:w-auto
                    px-8 py-3.5
                    rounded-xl
                    bg-blue-500 hover:bg-blue-600
                    text-white font-medium text-sm
                    transition-colors duration-200
                    flex items-center justify-center gap-2
                  "
                >
                  Create Free Account
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="/login"
                  className="
                    w-full sm:w-auto
                    px-8 py-3.5
                    rounded-xl
                    bg-white dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800
                    hover:bg-zinc-50 dark:hover:bg-zinc-800
                    text-zinc-700 dark:text-zinc-300
                    font-medium text-sm
                    transition-colors duration-200
                    flex items-center justify-center
                  "
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================================ */}
      {/* FOOTER                          */}
      {/* ================================ */}
      <footer className="
        py-8 px-6
        border-t border-zinc-200 dark:border-zinc-800
      ">
        <div className="
          max-w-6xl mx-auto
          flex flex-col sm:flex-row
          items-center justify-between
          gap-4
        ">
          {/* logo */}
          <div className="flex items-center gap-2">
            <div className="
              w-6 h-6 rounded-md
              bg-blue-500
              flex items-center justify-center
            ">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="
              text-sm font-semibold
              text-zinc-900 dark:text-white
            ">
              PathAI
            </span>
          </div>

          <p className="
            text-xs text-zinc-400 dark:text-zinc-600
          ">
            © 2025 PathAI. Built for SIH 2025.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="
                text-xs text-zinc-500 dark:text-zinc-400
                hover:text-zinc-900 dark:hover:text-white
                transition-colors
              "
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="
                text-xs text-zinc-500 dark:text-zinc-400
                hover:text-zinc-900 dark:hover:text-white
                transition-colors
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage