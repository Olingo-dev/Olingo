import { AppNavBar } from "@/components/navigation/app-navbar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export function MainLayout() {
    return (
        <div className="max-h-screen flex flex-col">
            <header className="h-min">
                <AppNavBar />
            </header>
            <main className="flex-grow flex relative">
                <SidebarProvider>
                    <AppSidebar className="h-full flex-shrink-0"/>
                    <article className="flex-grow">
                        <SidebarTrigger />
                        <Outlet />
                    </article>
                </SidebarProvider>
            </main>
        </div>
    )
}