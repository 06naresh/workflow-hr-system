"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";
import EmployeeForm from "@/app/components/dashboard/EmployeeForm";
import { useEmployees } from "@/app/components/dashboard/EmployeeTable";

const EmployeeEdit = () => {
  const { id } = useParams();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {employeeList, setEmployeeList} = useEmployees();


  const employee = employeeList.find((e) => e.id === Number(id));


  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin == "false" || isLogin == null) {
      router.push("/login");
    }
  }, []);

  if (!employee) return <p>Employee not found</p>;

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    router.push("/login");
  };

  return (
    <>
      <div className="flex flex-row gap-5 p-2 min-h-screen">
        <div className=" hidden lg:block w-[20vw] border-2 rounded-3xl p-3">
          <Sidebar />
        </div>

        {isSidebarOpen && (
          <div className=" md:static fixed top-[15vh] right-0 left-0 bottom-0 lg:w-[20vw] w-full border-2 rounded-3xl lg:h-screen  p-3 overflow-hidden">
            <Sidebar />
          </div>
        )}
        <div className="flex flex-col gap-y-5 lg:w-[80vw] w-full border-2 rounded-3xl :h-screen p-3">
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleLogout={handleLogout}
          />

          <EmployeeForm
            type="edit"
            data={employee}
            onSubmit={(formData) => {
              const updated = employeeList.map((emp) =>
                emp.id === employee.id ? { ...formData, id: Number(id) } : emp,
              );
              setEmployeeList(updated);
              router.push("/employees");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeEdit;
