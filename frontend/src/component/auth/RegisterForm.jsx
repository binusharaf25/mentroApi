import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios, { Axios } from "axios";
import { is } from "zod/v4/locales";
import Api from "../../lib/api/ApiClient";
import globalError from "../../utils/globalError";

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return <div></div>;
// }

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });

  const [error, setError] = useState(null);
   const navigate = useNavigate();

  const handleIputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    if (!formValues.name || !formValues.email || !formValues.password) {
      setError("all fields are required");
      return;
    }
    if (formValues.password != formValues.comfirmPassword) {
      setError("the password do not match");
      return;
    }

    //Mutation
    registerMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      comfirmPassword: formValues.comfirmPassword,
    });
  };
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await Api.post("/auth/register", userData);
      return response.data;
    },
    onSuccess: (data) => {
      alert("User creation successed");
      console.log(data);
      navigate("/login");
    },
    onError: (error) => {
      setError(globalError(error));
      // if(error.response && error.response.data && error.response.data.message){
      //   setError(error.response.data.message)
      // }else{
      //   setError("An error occur");
      // }
    },
  });

 
  return (
    <div className="w-full">
      <Card className="w-full border-border">
        <CardHeader className={"space-y-1 pb-4"}>
          <CardTitle className={"text-xl text-center"}>
            Create an account
          </CardTitle>
          <CardDescription>Enter your detailss to register</CardDescription>

          {/* form section  */}
          <form onSubmit={handleSubmit}>
            <CardContent className={"space-y-4 pt-0"}>
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2 pt-10">
                <label htmlFor="" className="text-sm font-medium text-left">
                  Full Name:
                </label>
                <Input
                  value={formValues.name}
                  onChange={handleIputChange}
                  type="text"
                  name="name"
                  placeholder="farah Ali"
                />
              </div>
              <div className="space-y-2 pt-4">
                <label htmlFor="" className="text-sm font-medium text-left">
                  Email:
                </label>
                <Input
                  type="email"
                  value={formValues.email}
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
                  value={formValues.password}
                  onChange={handleIputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="space-y-2 pt-4">
                <label htmlFor="" className="text-sm font-medium text-left">
                  Comfirm Password:
                </label>
                <Input
                  value={formValues.comfirmPassword}
                  onChange={handleIputChange}
                  type="password"
                  name="comfirmPassword"
                  placeholder="Password"
                />
              </div>
              {/* Register Button  */}
              <div className="py-4">
                <Button
                  type="submit"
                  className="my-4 w-full cursor-pointer   h-8"
                >
                  {registerMutation.isPending ? (
                    <span className="flex text-center justify-center">
                      <LoaderCircle />
                      Creating an account....
                    </span>
                  ) : (
                    "Create an account"
                  )}
                </Button>
              </div>
              <div></div>
            </CardContent>

            <CardFooter className={"flex justify-center pt-0"}>
              <div className="text-center text-sm">
                ALready have an account?
                <a
                  href=""
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => Navigate("/login")}
                >
                  sign in
                </a>
              </div>
            </CardFooter>
          </form>
        </CardHeader>
      </Card>
    </div>
  );
};

export default RegisterForm;
