import { useEffect } from "react"
import {  Routes, Route, Navigate } from "react-router-dom"
import useAuthStore from "./store/useAuthStore"
import useThemeStore from "./store/useThemeStore"
import ProtectedRoute from "./components/shared/ProtectedRoute"
import AuthSuccess from "./pages/AuthSuccess"
// pages
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import OnboardingPage from "./pages/OnboardingPage"
import HomePage from "./pages/HomePage"
import PathPage from "./pages/PathPage"

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const initTheme = useThemeStore((state) => state.initTheme)

 useEffect(() => {
  // this applies dark class to <html>
  // MUST run before anything renders
  checkAuth()
}, [])

  return (
   
      <Routes>

        {/* public routes — no login needed */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/authsuccess" element={<AuthSuccess/>}/>
        {/* protected routes — login required */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/path/:pathId"
          element={
            <ProtectedRoute>
              <PathPage />
            </ProtectedRoute>
          }
        />

        {/* catch unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

  )
}

export default App