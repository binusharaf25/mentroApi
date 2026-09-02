

import {create} from 'zustand'
import {persist} from 'zustand/middleware'

const useAuthStore=create(
    persist(
       (set,get)=>({
        user:null,
        token:null,
        isAuthenticated:false,

        //set user data and token after successfully login
        setAuth:(userData,token)=>set({
            user:userData,
            token,
            isAuthenticated:true
        }),

        //clear user data after loguot
        clearAuth:()=>set({
            user:null,
            token:null,
            isAuthenticated:false
        }),

        // get token  for use outside of react component
        getToken:()=>get().token,
       }),
       {
        name:'auth-storage',
        partialize:(state)=>({
            user:state.user,
            token:state.token,
            isAuthenticated:state.isAuthenticated
        })
       }
    )
)
export default useAuthStore