import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import ThemeProvider from "../../context/themeProvider";

export default function LayoutDashboard() {
    return (
        <ThemeProvider>
            <div className=" grid grid-cols-20/1fr grid-rows-10/1fr gap-0">
                <div className="row-span-2">
                    <Sidebar />
                </div>
                <div className="col-span-1">
                    <Navbar />
                </div>
                <div className="col-span-1">
                    <Outlet />
                </div>
            </div>
        </ThemeProvider>
    )
}