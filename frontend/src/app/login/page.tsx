"use client";
import React from "react";
import Image from "next/image";
import { AiFillLock } from "react-icons/ai";
import { InputForm } from "@/components/InputForm";
import { MdEmail } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useQuery } from "@tanstack/react-query";
import { authCheck } from "@/api/entryPage";
import Loading from "@/pages/Loading";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");
  // const [loginSuccess, setLoginSuccess] = React.useState(false);

  const login_connection = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    console.log(process.env.VITE_HOST_BACKEND_V1);
    const req = await fetch(process.env.VITE_HOST_BACKEND_V1 + "login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
    const res = await req.json();
    console.log(res);
    if (req.ok) {
      window.location.href = "/";
    } else {
      // material ui snackbar
      setError(res.email + " " + res.password);
    }
  };

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const res = await authCheck("login-auth/");
      if (!res) {
        window.location.href = "/";
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <></>;
  } else
    return (
      <>
        <div className="fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-10%)] h-[calc(100vh-10%)] flex rounded-3xl bg-white shadow-2xl">
          <div className="hidden lg:block relative w-[55%] h-full">
            <Image
              src="/images/login/logo.jpeg"
              alt="login"
              fill
              sizes="100vw 100vh"
              priority
              className="w-full h-full rounded-l-3xl"
            />
          </div>
          <div className="flex justify-center items-center overflow-y-hidden w-full lg:w-[45%] h-full">
            <div className={`w-[80%] flex-col justify-center items-center`}>
              <h1 className="w-full h-[46px] text-[32px]">Sign in</h1>
              <p className="w-full text-[16px] text-[#777777] mb-20">
                Type your email and password to sign in
              </p>
              <div className="w-full flex flex-col gap-4" id="loginForm">
                <InputForm
                  id="l-email"
                  placeholder="Email"
                  Icon={MdEmail}
                  type="email"
                  value={email}
                  required={true}
                  handleChange={(e) => setEmail(e.target.value)}
                />

                <InputForm
                  id="l-password"
                  placeholder="Password"
                  Icon={AiFillLock}
                  type="password"
                  value={password}
                  required={true}
                  handleChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="w-fit self-end text-color-orange text-[14px] mb-9 select-none"
                  onClick={() => (window.location.href = "/")}
                >
                  Forgot password?
                </button>
                <a
                  href="/signup"
                  className="w-fit text-[#1272E2] text-[16px] select-none"
                >
                  Creat an account !{" "}
                </a>
                <button
                  className="w-full h-[68px] rounded-[10px] bg-color-orange text-white hover:bg-color-blue select-none"
                  type="submit"
                  onClick={login_connection}
                >
                  Sign in
                </button>
                <Snackbar
                  open={error !== ""}
                  autoHideDuration={3000}
                  message={error}
                  onClose={() => setError("")}
                >
                  <Alert
                    onClose={() => setError("")}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {error}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};
// };
export default Login;
