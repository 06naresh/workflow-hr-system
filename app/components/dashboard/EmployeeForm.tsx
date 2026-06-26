"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Employee {
  id?: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

interface EmployeeFormprops{
  type: "add" | "edit"
  data?:Employee
  onSubmit:(formData: Employee) => void;
}

const EmployeeForm: React.FC<EmployeeFormprops> = ({data, type, onSubmit}) => {

  const router = useRouter();

  const [name, setname] = useState(data?.name ||"");
  const [email, setemail] = useState(data?.email || "");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState(data?.role || "");
  const [department, setdepartment] = useState(data?.department || "");
  const [status, setstatus] = useState(data?.status || "");
  const [error, seterror] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form Submitted!!");

    if (!name || !email) {
      seterror("Required fields missing!");
      return;
    }
    if (type === "add" && !password){
      seterror("Password is required!")
      return;
    } 

    const formData = {name, email, role, department, status};

    if (type === "add"){
      await fetch("/api/employees", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...formData, password}),
      });
    } else {
      await fetch(`/api/employees/${data?.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });
    }
      setname("");
      setemail("");
      setpassword("");
      setrole("");
      setdepartment("");
      setstatus("");
      seterror("");

      router.push("/employees");

      console.log("Employee added");
  };
  return (
    <>
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
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="border-2 border-gray-300 p-2 m-2 rounded-xl"
            placeholder="Enter your email"
          />
        </div>

          <div className={`${type === "edit" ? "hidden" : "" } flex flex-col justify-center my-2`}>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              minLength={6}
              className="border-2 border-gray-300 p-2 m-2 rounded-xl"
              placeholder="Enter your password"
            />
          </div>

        <label htmlFor="role">Select Role</label>

        <select
          id="role"
          value={role}
          onChange={(e) => setrole(e.target.value)}
          className="w-full m-2 p-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose Role --</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>
        <p
          className={`mt-2  mb-3 font-medium ${role === "Admin" ? "text-red-500" : role === "Employee" ? "text-blue-500" : ""}`}
        >
          Selected Role: {role}
        </p>

        <div className="flex flex-col justify-center my-2">
          Department:{" "}
          <input
            type="text"
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
            className="border-2 border-gray-300 p-2 m-2 rounded-xl"
            placeholder="Enter your full name"
          />
        </div>

        <div className="flex flex-col justify-center my-2">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            className="w-full m-2 p-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose Status --</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <p
            className={`mt-2 mb-3 font-medium ${status === "Active" ? "text-green-500" : status === "Inactive" ? "text-yellow-500" : ""}`}
          >
            Selected Status: {status}
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm my-3 text-center">{error}</p>
        )}

        <div className="flex justify-center my-5">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer w-full"
          >
            {type === "add" ? "Add Employee" : "Edit Employee"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
