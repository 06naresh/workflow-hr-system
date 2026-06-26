"use client";

import React, { useEffect,useState } from "react";
import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { useRouter } from "next/navigation";
import EmployeeTable from "@/app/components/dashboard/EmployeeTable";

const EmployeePage = () => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(()=>{
      const isLogin = localStorage.getItem("isLogin");
  
      if  (isLogin == "false" || isLogin == null){
        router.push("/login");
      }
    }, []);

    
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
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

          <div
            className={`flex flex-col w-full h-[90vh] border-2 rounded-2xl p-3 ${isSidebarOpen ? "hidden lg:block" : ""}`}
          >
            <div className="flex flex-row justify-between items-center border-2 rounded-lg p-3">
              <h3 className="text-2xl font-bold">Employee List</h3>
              <button
                onClick={() => router.push("/employees/add")}
                className="cursor-pointer"
              >
                <img className="md:w-7 w-4" src="add.png" alt="add" />
              </button>
            </div>

            <div className="mt-4 border-2 rounded-lg p-3 shadow-md overflow-x-auto">
              <EmployeeTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeePage;
