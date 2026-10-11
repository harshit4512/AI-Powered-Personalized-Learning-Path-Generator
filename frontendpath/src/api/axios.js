import axios from "axios"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  // reads VITE_API_URL from .env file
  // http://localhost:5000/api

  withCredentials: true,
  // CRITICAL
  // sends cookies with every request
  // without this auth never works

  headers: {
    "Content-Type": "application/json",
  },
})


// ================================
// RESPONSE INTERCEPTOR
// runs after EVERY response comes back
// before it reaches your component
// ================================
api.interceptors.response.use(

  // SUCCESS HANDLER
  // response is 2xx → just return it normally
  // nothing to do here
  (response) => response,

  // ERROR HANDLER
  // response is NOT 2xx → comes here
  async (error) => {

    // get the original request that failed
    const originalRequest = error.config

    // check if:
    // 1. error is 401 (unauthorized)
    // 2. we haven't already retried this request
    //    _retry flag prevents infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
  !originalRequest.url.includes("/auth/refresh")
    ) {

      // mark this request as already retried
      // so if refresh also fails with 401
      // we don't retry again (infinite loop)
      originalRequest._retry = true

      try {
        // call refresh endpoint
        // backend reads refresh token from cookie
        // sets new access token cookie
        // no body needed — cookie sent automatically
        await api.post("/auth/refresh")

        // refresh succeeded
        // new access token cookie is now set
        // retry the original request
        // new cookie will be sent automatically
        return api(originalRequest)

      } catch (refreshError) {
        // refresh token also expired or invalid
        // user must log in again
        // redirect to login page
        // window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    // for all other errors (400, 403, 404, 500)
    // just reject normally
    // component catch block handles them
    return Promise.reject(error)
  }
)
export default api