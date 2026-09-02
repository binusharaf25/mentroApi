import React from "react";


import LoginForm from "../../auth/LoginForm";
const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
    <div className="absolute inset-0 bg-primary opacity-10"></div>
      <div className="z-10 max-w-md w-full">
        <div className="text-center pb-4">
          <h2 className="text-xl text-primary font-bold">Welcome back ,Member!</h2>
          <p className="text-ms text-gray-400">Login to get access your data</p>
        </div>

        {/* Login form  */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
