import React from "react";
import { DbTimeEntry } from "@/app/lib/types";

interface TimeHistoryTableProps {
  data: DbTimeEntry[];
}

const TimeHistoryTable: React.FC<TimeHistoryTableProps> = ({ data }) => {


  const formatDuration = (secs: number | null) => {
    if (!secs) return "--";
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <>
      <div className="flex flex-col gap-y-3 border-2 rounded-lg p-5">
        <h3 className="text-lg font-semibold">Time History Table</h3>
        <div className=" border-2 rounded-lg p-3 shadow-md overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Start Time</th>
                <th className="px-4 py-2 font-semibold">End Time</th>
                <th className="px-4 py-2 font-semibold">Duration</th>
                <th className="px-4 py-2 font-semibold">Task</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">
                    No entries yet
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-2">
                      {new Date(item.startTime).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(item.startTime).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2">
                      { item.endTime ?new Date(item.endTime).toLocaleTimeString() : "--"}
                    </td>
                    <td className="px-4 py-2">{formatDuration(item.duration)}</td>
                    <td className="px-4 py-2">{item.description || "--"}</td>
                    <td
                      className={`px-4 py-2 ${item.endTime ?"text-green-600" : "text-yellow-600"}`}
                    >
                      {item.endTime ? "Completed" : "Running"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TimeHistoryTable;
