"use client";
  
import React, {useEffect, useState } from "react";
import Charts from "../../components/dashboard/Charts";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import SummaryCards from "../../components/dashboard/SummaryCards";
import ActivityTable from "../../components/dashboard/ActivityTable";
import { useRouter } from "next/navigation";

const page = () => {

  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [activityData, setActivityData] = useState([]);


  useEffect(()=>{
    const isLogin = localStorage.getItem("isLogin");

    if  (isLogin == "false" || isLogin == null){
      router.push("/login");
    }

    const fetchData = async () => {

      const statsRes = await fetch("api/dashboard/stats");
      setStats(await statsRes.json());

      const chartRes = await fetch("api/dashboard/chart");
      setChartData(await chartRes.json());

      const activityRes = await fetch("api/dashboard/activity");
      setActivityData(await activityRes.json());
    };

    fetchData();
  }, []);


  const handleLogout = ()=>{
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    router.push("/login");
  }



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
            className={`flex flex-col gap-4 w-full h-full border-2 rounded-2xl p-3 ${isSidebarOpen ? "hidden lg:block" : ""}`}
          >
            <SummaryCards data={stats}/>

            <div className="flex md:flex-row flex-col gap-4 w-full h-full">
              <Charts data= {chartData}/>
              <ActivityTable data = {activityData}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
