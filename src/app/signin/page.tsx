"use client";

import LoginForm from "@/hooks/LoginForm";
import RegisterForm from "@/hooks/RegisterForm";
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState<boolean>(false);

  const handleSignClick = () => {
    setLogin(false);
  };

  const handleRegisterClick = () => {
    setLogin(true);
  };

  return (
    <>
      <section className="w-sceen h-screen flex flex-col gap-10 items-center justify-center">
        {login ? (
          <>
            <RegisterForm />
            <div className="flex justify-center items-center gap-2">
              <p className="text-xs">Already have an account?</p>
              <a
                onClick={handleSignClick}
                className="text-xs text-blue-600 font-bold cursor-pointer"
              >
                Sign in
              </a>
            </div>
          </>
        ) : (
          <>
            <LoginForm />
            <div className="flex justify-center items-center gap-2">
              <p className="text-xs">New to CacaoAPI?</p>
              <a
                onClick={handleRegisterClick}
                className="text-xs text-blue-600 font-bold cursor-pointer"
              >
                Join Now
              </a>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Login;
