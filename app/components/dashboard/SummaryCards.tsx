import React from "react";
import { summaryData } from "../../lib/DummyData";

interface SummaryData {
  totalEmployees: number;
  activeEmployees: number;
  totalHoursToday: number;
  totalEntries: number;
}

interface SummaryCardsProps{
  data: SummaryData | null;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({data}) => {

  if (!data) return <div className="w-full border-2 rounded-lg p-3">SummaryLoading..</div>
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-4">
        <div className="border-2 rounded-lg p-3">
          <h3 className="text-lg font-semibold">Total Employees</h3>
          <p className="text-2xl font-bold">{data.totalEmployees}</p>
          <p className="text-green-500">+5 this month</p>
        </div>

        <div className="border-2 rounded-lg p-3">
          <h3 className="text-lg font-semibold">Active Now</h3>
          <p className="text-2xl font-bold">{data.activeEmployees}</p>
          <p className="text-green-500">Currently working</p>
        </div>

        <div className="border-2 rounded-lg p-3">
          <h3 className="text-lg font-semibold">Hours Tracked Today</h3>
          <p className="text-2xl font-bold">{data.totalHoursToday}</p>
          <p className="text-green-500">Across all employees</p>
        </div>

        <div className="border-2 rounded-lg p-3">
          <h3 className="text-lg font-semibold">Total Entries</h3>
          <p className="text-2xl font-bold">{data.totalEntries}</p>
          <p className="text-green-500">All recorded sessions</p>
        </div>
      </div>
    </>
  );
};

export default SummaryCards;
