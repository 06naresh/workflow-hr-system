"use Client"

import { TimeEntryPayload } from "@/app/lib/types";
import React, { useEffect, useState, useRef } from "react";

interface TimerCardProps{
  onStop: (entry:TimeEntryPayload) => void
}

const TimeCard: React.FC<TimerCardProps> = ({onStop}) => {
  const [isRunning, setisRunning] = useState(false);
  const [seconds, setseconds] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  // Format seconds
  const formatTime = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // start timer
  const handleStart = () =>{
    if (!isRunning){
      setStartTime(new Date());
      setisRunning(true);
      intervalRef.current = setInterval(() => {
        setseconds((prev)=> prev + 1);
      }, 1000);
    }
  }


  // stop timer
  const handleStop = () => {
    if(isRunning && startTime){
      if(intervalRef.current) clearInterval(intervalRef.current);
      
      const endTime= new Date();
      const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      
      const newEntry = {
        userId: Number(localStorage.getItem("userId")),
        startTime,
        endTime,
        duration: durationSeconds,
        description: "Dashboard",
      };

      onStop(newEntry);

      setisRunning(false);
      setseconds(0);
      setStartTime(null);
    }
  }

  // cleanup interval
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center border-2 rounded-lg p-3 w-1/2 gap-5">
        <h4 className="text-2xl font-bold border-b-2 self-start">
          Current Timer
        </h4>
        <div className="self-start my-5">
          <p className="text-4xl font-mono text-blue-600 mb-4">
            {formatTime(seconds)}
          </p>
        </div>

        <div className="flex flex-col gap-3 justify-center w-1/2 my-5">
          <button
            type="button"
            className=" border-2 rounded-2xl p-2 cursor-pointer bg-green-400 hover:bg-green-500"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            type="button"
            className="border-2 rounded-2xl p-2 cursor-pointer bg-red-400 hover:bg-red-500"
            onClick={handleStop}
          >
            End
          </button>
        </div>

        <div
          className="self-start my-5}"
        >
          Status: <span className={`${isRunning ? "text-green-500" : "text-red-500"}`}>{isRunning ? "Running..." : "Stopped..."}</span>
        </div>
      </div>
    </>
  );
};

export default TimeCard;
