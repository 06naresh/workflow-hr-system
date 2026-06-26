"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { employees as DummyEmployees } from "@/app/lib/DummyEmployees";

// Define the shape of your employee data
interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

// Props type
interface EmployeeContextType {
  employeeList: Employee[];
  setEmployeeList: React.Dispatch<React.SetStateAction<Employee[]>>;
  fetchEmployees: ()=> Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const useEmployees = () =>{
  const ctx=useContext(EmployeeContext);
  if (!ctx) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return ctx;
};

export function EmployeeProvider({children}: {children: React.ReactNode}) {
  const [employeeList,setEmployeeList] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployeeList(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employeeList, setEmployeeList, fetchEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}

const EmployeeTable = () => {

  const router = useRouter();

  const { employeeList, fetchEmployees } = useEmployees();
  const [ Loading, setLoading ] = useState(true);


  // Deactivate employee by toggling status
  const toggleStatus = async (id: number, currentStatus: string) => {
    await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: currentStatus === "Active" ? "Inactive" : "Active",
      }),
    });

    fetchEmployees();
  };


  useEffect(()=>{
    const load = async ()=>{
      setLoading(true);
      await fetchEmployees();
      setLoading(false);
    };
    load();
  },[]);

  if (Loading) {
    return <div>Loading employees...</div>;
  }


  return (
    <>
      <table className="border-collapse text-sm text-left w-full">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 font-semibold">Name</th>
            <th className="px-4 py-2 font-semibold">Email</th>
            <th className="px-4 py-2 font-semibold">Role</th>
            <th className="px-4 py-2 font-semibold">Department</th>
            <th className="px-4 py-2 font-semibold">Status</th>
            <th className="px-4 py-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((emps, index) => (
            <tr
              className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              key={emps.id}
            >
              <td className="px-4 py-2">{emps.name}</td>
              <td className="px-4 py-2">{emps.email}</td>
              <td className="px-4 py-2">{emps.role}</td>
              <td className="px-4 py-2">{emps.department}</td>
              <td
                className={`px-4 py-2 ${emps.status === "Active" ? "text-green-600" : emps.status === "Inactive" ? "text-yellow-600" : ""}  font-medium`}
              >
                {emps.status}
              </td>
              <td className="px-4 py-2">
                <span
                  onClick={() => router.push(`/employees/edit/${emps.id}`)}
                  className="cursor-pointer text-green-500"
                >
                  Edit
                </span>{" "}
                |{" "}
                <span
                  className="cursor-pointer text-red-500"
                  onClick={() => toggleStatus(emps.id, emps.status)}
                >
                  Deactivate
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeTable;
