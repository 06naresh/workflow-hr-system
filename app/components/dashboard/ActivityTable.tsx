import React from "react";
import { activityData } from "../../lib/DummyData";

interface ActivityItem {
  name: string;
  action: string;
  time: string;
  status: string
}

interface ActivityTableProps {
  data: ActivityItem[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full border-2 rounded-lg p-3">No Recent Activity</div>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-y-3 border-2 rounded-lg p-3 md:w-1/2 w-full">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <div className=" border-2 rounded-lg p-3 shadow-md overflow-x-auto">
          <table className="w-full border-collapse text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Action</th>
                <th className="px-4 py-2 font-semibold">Time</th>
                <th className="px-4 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  key={index}
                >
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.action}</td>
                  <td className="px-4 py-2">{item.time ? new Date(item.time).toLocaleTimeString() : "--"}</td>
                  <td
                    className={`px-4 py-2 ${item.status === "Active" ? "text-green-600" : item.status === "Done" ? "text-blue-600" : item.status === "Idle" ? "text-yellow-600" : ""}  font-medium`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ActivityTable;
