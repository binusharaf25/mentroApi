import React, { useEffect } from "react";
import useAuthStore from "../../lib/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import Api from "../../lib/api/ApiClient";
import { Navigate, useLocation } from "react-router";
import { LoaderCircle} from 'lucide-react'



const ProtectedRoute = ({ children }) => {
  const { user, token, setAuth, clearAuth } = useAuthStore();
const Location=useLocation()
  const { isError, error, data, isLoading, isSuccess } = useQuery({
    queryKey: ["currwntUser"],
    queryFn: async () => {
      const response = await Api.get("/auth/profile", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return response.data;
    },
    retry: 1,
  });


  // error case
  useEffect(() => {
    if (isError) {
      clearAuth();
    }
  }, [isError, error, clearAuth]);

  //Success case
  useEffect(()=>{
    if(isSuccess && data){
        setAuth(data,token)
    }

  },[isSuccess,data,setAuth,token])

    if(isLoading) {
    <div className="h-screen flex justify-center items-center ">
        return <LoaderCircle className="animate-spin" />
    </div>
  }

  if(error){
    return <Navigate to='/login' state={{from: Location}} replace />
  }
  if(!user){
    return <Navigate to='/login' state={{from:Location}} replace />
  }
  return children;
};

export default ProtectedRoute;
