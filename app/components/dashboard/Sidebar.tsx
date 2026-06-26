"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActivefont = (path: string) => {
    return pathname === path ? "font-bold" : "";
  };

  const isActiveborder = (path: string) => {
    return pathname === path ? "border-3" : "";
  };

  return (
    <>
      <div className="flex flex-col gap-y-5 w-full h-full border-2 rounded-2xl">
        <img
          className="w-10 h-10 m-2 cursor-pointer"
          onClick={() => router.push("/dashboard")}
          src="/home.png"
          alt="Home"
        />

        <div className="m-2 flex flex-col gap-5">
          <div
            className={`flex flex-row gap-2 justify-center cursor-pointer border-2 ${isActiveborder("/dashboard")} rounded-lg p-2`}
            onClick={() => router.push("/dashboard")}
          >
            <img className="w-7" src="/dashboard.png" alt="dashboard icon" />
            <p className={`text-xl ${isActivefont("/dashboard")}`}>Dashboard</p>
          </div>

          <div
            className={`flex flex-row gap-2 justify-center cursor-pointer border-2 ${isActiveborder("/employees")} rounded-lg p-2`}
            onClick={() => router.push("/employees")}
          >
            <img className="w-7" src="/employee.png" alt="employee icon" />
            <p className={`text-xl ${isActivefont("/employees")}`}>Employees</p>
          </div>

          <div
            className={`flex flex-row gap-2 justify-center cursor-pointer border-2 ${isActiveborder("/time-tracking")} rounded-lg p-2`}
            onClick={() => router.push("/time-tracking")}
          >
            <img className="w-7" src="/tracking.png" alt="Time Tracking icon" />
            <p className={`text-xl ${isActivefont("/time-tracking")}`}>
              Time Tracking
            </p>
          </div>

          <div className="flex flex-row gap-2 justify-center cursor-pointer border-2 rounded-lg p-2">
            <img className="w-7" src="/report.png" alt="report icon" />
            <p className="text-xl">Reports</p>
          </div>

          <div className="flex flex-row gap-2 justify-center cursor-pointer border-2 rounded-lg p-2">
            <img className="w-7" src="/setting.png" alt="setting icon" />
            <p className="text-xl">Setting</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
