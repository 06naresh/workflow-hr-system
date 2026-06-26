"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/dashboard/Navbar";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { useRouter } from "next/navigation";
import TimeCard from "@/app/components/dashboard/TimerCard";
import ManualEntryForm from "@/app/components/dashboard/ManualEntryForm";
import TimeHistoryTable from "@/app/components/dashboard/TimeHistoryTable";
import { TimeEntryPayload } from "@/app/lib/types";

const TimeTracking = () => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeEntries, setTimeEntries] = useState([]);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin == "false" || isLogin == null) {
      router.push("/login");
    }else{
      fetchEntries();
    }
  }, []);

  const fetchEntries = async ()=>{
    const res = await fetch("/api/time-entries");
    const data = await res.json();
    setTimeEntries(data);
  }

  const saveEntry = async (entry: TimeEntryPayload) => {
    await fetch("/api/time-entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    fetchEntries();
  };

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

        <div className="flex flex-col gap-y-5 lg:w-[80vw] w-full border-2 rounded-3xl :h-screen p-3 flex-1">
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleLogout={handleLogout}
          />

          <div
            className={`flex flex-col border-2 rounded-2xl w-full h-full p-5 gap-5 flex-1 ${isSidebarOpen ? "hidden lg:block" : ""}`}
          >
            <div className="flex flex-row justify-between w-full h-[60vh] border-2 rounded-lg p-5 gap-5">
              <TimeCard onStop={(entry) => saveEntry(entry)} />

              <ManualEntryForm onSave={(entry) => saveEntry(entry)} />
            </div>

            <div className="w-full ">
              <TimeHistoryTable data={timeEntries} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTracking;
