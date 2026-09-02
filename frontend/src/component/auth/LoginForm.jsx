import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { useMutation } from "@tanstack/react-query";
import Api from "../../lib/api/ApiClient";
import { data, useNavigate } from "react-router";
import globalError from "../../utils/globalError";
import { LoaderCircle } from "lucide-react";
import useAuthStore from "../../lib/stores/authStore";

const LoginForm = () => {

  //calling zustand
    const {setAuth}  = useAuthStore()

  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //mutation
  const loginMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await Api.post("/auth/login", userData);
      return response.data;
    },
    onSuccess: (data) => {
      //protected dashboard
      if(data.token){
        const user=data.user;
        const token=data.token
        setAuth(user,token)
          navigate('/dashboard')
      }
    
    },
    onError:(err)=>{
      setError(globalError(err))
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formValue.email && !formValue.password){
      setError('All fields are required')
    }


    loginMutation.mutate({
      email:formValue.email,
      password:formValue.password
    })

  };

  const handleIputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <div className="w-full shadow-md">
      <Card className="w-full border-border">
        <CardHeader className={"space-y-1 pb-4"}>
          <CardTitle className={"text-xl text-center"}>
            Login you'll get access
          </CardTitle>
          <CardDescription>Enter your detailss to register</CardDescription>

          {/* form section  */}
          <form onSubmit={handleSubmit}>
            <CardContent className={"space-y-4 pt-0"}>
              {
                error && (
                  <div className="text-destructive bg-destructive/10 text-sm rounded py-2 px-2">{error}</div>
                )
              }
              <div className="space-y-2 pt-4">
                <label htmlFor="" className="text-sm font-medium text-left">
                  Email:
                </label>
                <Input
                  type="email"
                  value={formValue.email}
                  onChange={handleIputChange}
                  name="email"
                  placeholder="example@gmail.com"
                />
              </div>

              <div className="space-y-2 pt-4">
                <label htmlFor="" className="text-sm font-medium text-left">
                  Password:
                </label>
                <Input
                  value={formValue.password}
                  onChange={handleIputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>

              {/* Register Button  */}
              <div className="py-4">
                <Button 
                type="submit" 
                className="w-full cursor-pointer text-center">
                  {
                    loginMutation.isPending?(<span><LoaderCircle /> Login....</span>):('Login')
                  }
                </Button>
              </div>
            </CardContent>

            <CardFooter className={"flex justify-center pt-0"}>
              <div className="text-center text-sm">
                have an account?
                <a
                  href=""
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  register
                </a>
              </div>
            </CardFooter>
          </form>
        </CardHeader>
      </Card>
    </div>
  );
};

export default LoginForm;
