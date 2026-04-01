import getMe from "../api/auth.api"
import { create } from "zustand"

const useAuthStore = create((set) => ({
    // ================================
    // STATE
    // ================================
    user: null,
    isLoading: true,

    // true on first load
    // prevents flash of login page

    // ================================
    // ACTIONS
    // ================================

    setUser: (userData) => set({ user: userData }),

    login: (userData) => set({
        user: userData,
        isLoading: false,
    }),

    logout: () => set({
        user: null,
        isLoading: false
    }),

    updateUser: (updatedData) =>
        set((state) => ({
            user: { ...state.user, ...updatedData },
        })),

    // ================================
    // CHECK AUTH ON APP LOAD
    // calls /api/auth/me
    // cookie sent automatically
    // ================================

    checkAuth:async()=>{
        try{
            set({isLoading:true})
            const data = await getMe()
            set({user:data.user,isLoading:false})
        }
        catch(error){
             // not logged in
      set({ user: null, isLoading: false })
        }
    },

}))

export default useAuthStore;
