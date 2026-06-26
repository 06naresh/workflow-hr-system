import React from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

const Navbar = (props: NavbarProps) => {
  const pathname = usePathname();

  const TitleChange=()=>{
    switch (pathname){
      case "/dashboard":
      return "Dashboard";

      case "/employees":
      return "Employees";

      case "/employees/add":
        return "Add Employee"

      case "/time-tracking":
        return "Time Tracking"

      default:
        return "Edit Employee"
    }
  }

  const hidediv =
    pathname === "/employees/add" || pathname.startsWith("/employees/edit/");

  return (
    <>
      <nav className=" flex flex-row justify-between items-center lg:gap-5 gap-2 w-full h-[10vh] border-2 rounded-2xl p-3">
        <div
          className="lg:hidden cursor-pointer flex items-center justify-center"
          onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
        >
          <img
            className="md:w-10 w-5"
            src={props.isSidebarOpen ? "/close.png" : "/menu.png"}
            alt={props.isSidebarOpen ? "Close" : "Menu"}
          />
        </div>

        <div className="p-1 flex items-center justify-center">
          <p className="md:text-3xl text-2xl font-bold">{TitleChange()}</p>
        </div>

        {!hidediv && (
          <div className="flex flex-row lg:gap-5 gap-2">
            <div className="flex flex-row justify-center items-center md:gap-2 gap-0.5 cursor-pointer border-2 rounded-lg p-2">
              <img className="md:w-7 w-4" src="user.png" alt="user" />
              <p className="md:text-lg text-sm font-medium">krishna</p>
            </div>

            <div className="flex flex-row justify-center items-center cursor-pointer border-2 rounded-lg p-2">
              <button onClick={props.handleLogout} className="cursor-pointer">
                <img className="md:w-7 w-4" src="logout.png" alt="logout" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

