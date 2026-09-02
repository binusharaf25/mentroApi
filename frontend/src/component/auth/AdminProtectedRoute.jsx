import React, { useEffect } from 'react'
import useAuthStore from '../../lib/stores/authStore'
import { useQuery } from '@tanstack/react-query'
import Api from '../../lib/api/ApiClient'
import { LoaderCircle } from 'lucide-react'
import { Navigate, replace, useLocation } from 'react-router'

const AdminProtectedRoute = ({children}) => {


  const {user,token,setAuth,clearAuth} =useAuthStore()
  const Location=useLocation()

  const {error,isError,data,isSuccess,isLoading}= useQuery({
    queryKey:['currentRole'],
    queryFn:async()=>{
      const response = await Api.get('/auth/profile',{
        headers:{
          Authorization:`bearer  ${token} `
        }
      });
      return response.data
    },
    retry:1
  })


  //Error case
useEffect(()=>{
  if(isError){
    clearAuth()
  }

},[error,isError,clearAuth])


//success case
useEffect(()=>{
  if(isSuccess && data){
    setAuth(data,token)
  }
},[isSuccess,data,setAuth,token])

console.log(user.role)
if(isLoading){
  return <div className='flex justify-center items-center h-screen'>
    <LoaderCircle  className='animate-spin' />
  </div>
}

if(user.role !== 'admin'){
  return <Navigate to={'/dashboard'} state={{from:Location}} replace  />
}

if(error){
  return <Navigate to='/login' state={{from: Location}} replace/>
}
console.log(user)
if(!user){
  return <Navigate to='/login'  state={{from:Location}} replace />
}



  return children
}

export default AdminProtectedRoute