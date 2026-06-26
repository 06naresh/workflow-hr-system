import React, { useState } from "react";
import { TimeEntry } from "@/app/lib/DummyTimeEntries";
import { TimeEntryPayload } from "@/app/lib/types";

interface ManualEntryProps {
  onSave: (entry: TimeEntryPayload) => void;
}

const ManualEntryForm: React.FC<ManualEntryProps> = ({onSave}) => {


  const [date,setDate] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [task,setTask] = useState("");
  const [notes,setNotes] = useState("");

  const formatDuration = (start: string, end:string) => {
    if (!start || !end) return "--:--:--";

    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);
    const diff = (endDate.getTime() - startDate.getTime()) / 1000;
    const h = String(Math.floor(diff / 3600)).padStart(2,"0");
    const m = String(Math.floor(diff % 3600) / 60).padStart(2,"0");
    const s = String(Math.floor(diff % 60)).padStart(2,"0");
    return `${h}:${m}:${s}`;
  };

  const habdleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = formatDuration(startTime, endTime);

    const newEntry: TimeEntryPayload = {
      userId: Number(localStorage.getItem("userId")),
      startTime: new Date(`${date}T${startTime}:00`),
      endTime: new Date(`${date}T${endTime}:00`),
      duration: (new Date(`${date}T${endTime}:00`).getTime() - new Date(`${date}T${startTime}:00`).getTime()) / 1000,
      description:task,
    };

    onSave(newEntry);

    setDate("");
    setstartTime("");
    setendTime("");
    setTask("");
    setNotes("");
  }


  return (
    <>
      <div className="flex flex-col items-center border-2 rounded-lg p-3 w-1/2 gap-5">
        <h4 className="text-2xl font-bold border-b-2 self-start">
          Add Manual Entry
        </h4>

        <div className="self-start border-2 rounded-lg overflow-y-auto w-full p-2 ">
          <form onSubmit={habdleSubmit}>
            <div className="flex flex-col justify-center my-2">
              Date:{" "}
              <input
                type="date"
                value={date}
                name="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                required
              />
            </div>
            <div className="flex flex-col justify-center my-2">
              Start Time:{" "}
              <input
                type="time"
                value={startTime}
                name="startTime"
                id="startTime"
                onChange={(e) => setstartTime(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                required
              />
            </div>
            <div className="flex flex-col justify-center my-2">
              End Time:{" "}
              <input
                type="time"
                value={endTime}
                name="endTime"
                id="endTime"
                onChange={(e) => setendTime(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                required
              />
            </div>
            <div className="flex flex-col justify-center my-2">
              <label htmlFor="task">Task Description:</label>{" "}
              <textarea
                name="task"
                value={task}
                id="task"
                rows={3}
                onChange={(e) => setTask(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
                required
              />
            </div>
            <div className="flex flex-col justify-center my-2">
              <label htmlFor="notes">Notes:</label>{" "}
              <textarea
                name="notes"
                value={notes}
                id="notes"
                rows={3}
                onChange={(e) => setNotes(e.target.value)}
                className="border-2 border-gray-300 p-2 m-2 rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="border-2 rounded-2xl shadow-md w-full cursor-pointer p-2 bg-blue-400 hover:bg-blue-500"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManualEntryForm;
