import { Outlet } from "react-router";
import { OlingoNavbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export function MainLayout() {
    return (
        <div className="grow-wrapper">
            <header>
                <OlingoNavbar />
            </header>
            <main className="bg-dark h-100 grow d-flex">
                <Sidebar />
                <Outlet />
            </main>
        </div>
    )
}