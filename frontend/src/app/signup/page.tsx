"use client";
import React, { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { GiPositionMarker } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import { InputForm } from "@/components/InputForm";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { post_req } from "../../api/post";
import Loading from "@/pages/Loading";
import { useQuery } from "@tanstack/react-query";
import { authCheck } from "@/api/entryPage";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [city, setCity] = React.useState("");

  const [error, setError] = React.useState("");

  const valideForm = (): boolean => {
    return (
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword ||
      email === "" ||
      phone === "" ||
      city === ""
    );
  };

  const signup = async () => {
    if (valideForm()) return;
    if (password !== confirmPassword) {
      setError("Password and Confirm Password must be the same");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (phone.length < 10) {
      setError("Phone number must be at least 10 characters");
      return;
    }
    const data = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      email: email,
      phone_number: phone,
      city: city,
    };
    const res = await post_req("signup/", data);
    if (res.status === "ok") {
      // TODO: redirect to '/' page
      window.location.href = "/";
    } else {
      // material ui snackbar
      const message: string =
        res.res.email || "" + (res.res.password && " " + res.res.password);

      setError(message);
    }
  };
  const { data, isLoading } = useQuery({
    queryFn: async () => await authCheck("login-auth/"),
    queryKey: ["login-auth"],
  });
  if (isLoading || !data) {
    return <Loading />;
  } else
    return (
      <>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-10%)] h-[calc(100vh-10%)] flex rounded-3xl bg-white shadow-2xl">
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
            <div className="w-[80%] h-full flex flex-col justify-center ">
              <a
                href="/login"
                className="w-fit self-end text-[#1272E2] text-[16px] select-none flex items-center gap-1"
              >
                <IoIosArrowRoundBack size={24} />
                Back to login
              </a>
              {/* back to login */}
              <h1 className="w-full h-[46px] text-[32px] text-start">Signup</h1>
              <p className="w-full text-[16px] text-[#777777] mb-8">
                Create an account to continue
              </p>
              <div
                className="w-full flex flex-col gap-6 overflow-y-auto"
                // id="signupForm"
              >
                <InputForm
                  id="s-email"
                  placeholder="Email"
                  Icon={MdEmail}
                  type="email"
                  value={email}
                  required={true}
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex flex-row gap-4">
                  <InputForm
                    id="s-first-name"
                    placeholder="First Name"
                    Icon={FaUserTie}
                    type="text"
                    value={firstName}
                    required={true}
                    handleChange={(e) => setFirstName(e.target.value)}
                  />
                  <InputForm
                    id="last-name"
                    placeholder="Last Name"
                    Icon={FaUser}
                    type="text"
                    value={lastName}
                    required={true}
                    handleChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <InputForm
                  id="password"
                  placeholder="Password"
                  Icon={AiFillLock}
                  type="password"
                  value={password}
                  required={true}
                  handleChange={(e) => setPassword(e.target.value)}
                />
                <InputForm
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  Icon={AiFillLock}
                  type="password"
                  value={confirmPassword}
                  required={true}
                  handleChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputForm
                  id="FaPhone"
                  placeholder="Phone Number"
                  Icon={FaPhone}
                  type="tel"
                  value={phone}
                  required={true}
                  handleChange={(e) => setPhone(e.target.value)}
                />
                <InputForm
                  id="city"
                  placeholder="City"
                  Icon={GiPositionMarker}
                  type="text"
                  value={city}
                  required={true}
                  handleChange={(e) => setCity(e.target.value)}
                />
                <button
                  className="w-full min-h-[68px] rounded-[10px] bg-color-orange text-white hover:bg-color-blue select-none mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
                  id="submit-signup"
                  type="submit"
                  onClick={signup}
                  disabled={valideForm()}
                >
                  Signup
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

export default Signup;
