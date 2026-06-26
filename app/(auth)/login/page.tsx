"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Loginpage = () => {
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted " + email + " " + password);


    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {"Context-Type": "application/json"},
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("API Response: ",data);

    if (!response.ok){
      seterror(data.error || "Login failed");
      return;
    }

    setemail("");
    setpassword("");
    seterror("");

    console.log("Login Successful, redirecting to dashboard...");

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("userId", data.user.id);
    router.push("/dashboard");
    
  };

  return (
    <>
      <div className="container flex flex-row gap-5 justify-center items-center h-screen mx-auto ">
        <div className="flex flex-col gap-3 border-2 rounded-lg lg:w-1/2 w-full p-5 ">
          <header className="flex flex-col items-center gap-0.5 border-2 rounded-lg p-5 ">
            <h2 className="text-2xl font-bold">Your Title</h2>
            <p className="text-gray-600">Sign in to account</p>
          </header>

          <form onSubmit={submit} className="border-2 rounded-lg p-5">
            <div className="flex flex-col justify-center my-2">
              Email:{" "}
              <input
                type="email"
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col justify-center my-2">
              Password:{" "}
              <input
                type={showPassword ? "text" : "password"}
                minLength={6}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute flex justify-center max-md:right-32 right-112 max-md:pt-6 pt-6.5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? "view.png" : "eye.png"}
                  alt={showPassword ? "view" : "eye"}
                  className="w-5 opacity-60 hover:opacity-100"
                />
              </button>
            </div>

            <div className="my-2">
              <input type="checkbox" className="m-2 cursor-pointer" />
              Remember me
            </div>
            <div className="my-2">
              <Link href="#" className="text-blue-500 text-sm mx-2">
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="text-red-500 text-sm my-3 text-center">{error}</p>
            )}

            <div className="flex justify-center my-5">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer w-full"
              >
                Sign In
              </button>
            </div>
          </form>

          <footer className="flex justify-center border-2 rounded-lg p-1">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
