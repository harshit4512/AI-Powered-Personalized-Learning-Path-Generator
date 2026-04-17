import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import { getMe } from "../api/auth.api.js"

const AuthSuccess = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe()

        // save user in store
        login(data.user)

        // redirect based on onboarding
        if (!data.user.isOnboardingComplete) {
          navigate("/onboarding")
        } else {
          navigate("/home")
        }
      } catch (err) {
        navigate("/login") // fallback if something fails
      }
    }

    fetchUser()
  }, [login, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Signing you in...</p>
    </div>
  )
}

export default AuthSuccess