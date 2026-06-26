"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"

const page = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [error, seterror] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showComPassword, setShowComPassword] = useState(false);

  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Form submitted:\n Name: ${name}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}, Role: ${role}`);
    if (!email || !password) {
      seterror("Email and password are required!");
    }
    else if(password !== confirmPassword) {
      seterror("Passwords do not match!");
      return;
    }

    try{

      const response = await fetch("/api/auth/signup",{
        method: "POST",
        headers: {"Context-Type": "application/json"},
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          department,
        }),
      });

      const data = await response.json();
      console.log("API Response: ",data);

      if (!response.ok){
        seterror(data.error || "Signup failed");
        return;
      }

      setname("");
      setemail("");
      setpassword("");
      setConfirmPassword("");
      setRole("");
      setDepartment("");
      seterror("");

      console.log("Signup Successful, redirecting to login...");

      router.push("/login");
       
    } catch(error){
      console.error("Signup error:", error);
      seterror("Something went wrong, Please try again.");
    }

  };


  return (
    <>
      <div className="container flex flex-row gap-5 justify-center items-center h-screen mb-[20vh] mt-[-10vh]">
        <div className="card flex flex-col gap-3 border-2 rounded-lg lg:w-1/2 p-5 mt-[30vh]">
          <header className="flex flex-col items-center gap-0.5 border-2 rounded-lg p-5 ">
            <h2 className="text-2xl font-bold">Your Title</h2>
            <p className="text-gray-600">Create account</p>
          </header>

          <form onSubmit={submit} className="border-2 rounded-lg p-5">
            <div className="flex flex-col justify-center my-2">
              Full Name:{" "}
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                placeholder="Enter your full name"
              />
            </div>

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

            <div className="flex flex-col justify-center my-2">
              Confirm Password:{" "}
              <input
                type={showComPassword ? "text" : "password"}
                minLength={6}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute flex justify-center max-md:right-32 right-112 max-md:pt-6 pt-6.5 cursor-pointer"
                onClick={() => setShowComPassword(!showComPassword)}
              >
                <img
                  src={showComPassword ? "view.png" : "eye.png"}
                  alt={showComPassword ? "view" : "eye"}
                  className="w-5 opacity-60 hover:opacity-100"
                />
              </button>
            </div>

            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Role
            </label>

            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose Role --</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>

            {role && (
              <p
                className={`mt-3 font-medium ${
                  role === "Admin"
                    ? "text-red-600"
                    : role === "Manager"
                      ? "text-blue-600"
                      : role === "Employee"
                        ? "text-green-600"
                        : ""
                }`}
              >
                Selected Role: {role}
              </p>
            )}

            <div className="flex flex-col justify-center my-2">
              Department:{" "}
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                placeholder="Enter your dept name"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm my-3 text-center">{error}</p>
            )}

            <div className="flex justify-center my-5">
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer w-full"
              >
                Sign Up
              </button>
            </div>
          </form>

          <footer className="flex justify-center border-2 rounded-lg p-1">
            <p className="text-sm text-gray-600">
              Already have account?{" "}
              <Link href="/login" className="text-red-500">
                Login
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default page;
