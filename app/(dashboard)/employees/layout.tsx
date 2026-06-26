"use client";
import { EmployeeProvider } from "@/app/components/dashboard/EmployeeTable";

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EmployeeProvider>{children}</EmployeeProvider>;
}
