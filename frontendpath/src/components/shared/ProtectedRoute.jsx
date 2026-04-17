import {Navigate} from "react-router-dom"

import useAuthStore from "../../store/useAuthStore.js"
import Loader from "./Loader.jsx"

const ProtectedRoute=({children})=>{
    const user=useAuthStore((state)=>state.user)
    const isLoading=useAuthStore((state)=>state.isLoading)

    if(isLoading) return <Loader/>

    if(!user) return <Navigate to="/login" replace />

    return children
}


export default ProtectedRoute;