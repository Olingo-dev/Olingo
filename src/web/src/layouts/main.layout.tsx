import { AppNavBar } from "@/components/navigation/app-navbar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import github from "../assets/icons/github.svg";
import { Version } from "@/components/version";


export function MainLayout() {

    return (
        <div className="h-screen flex flex-col">
            <header className="h-min">
                <AppNavBar />
            </header>
            <main className="flex relative flex-col h-full">
                <SidebarProvider>
                    <AppSidebar className="flex-shrink-0"/>
                    <article className="flex-grow flex flex-col">
                        <SidebarTrigger />
                        <div className="flex-grow">
                            <Outlet/>
                        </div>
                        <footer className="bg-sidebar flex justify-end p-3">
                            <a><img src={github}/></a>
                            <Version />
                        </footer>
                    </article>
                </SidebarProvider>
            </main>
        </div>
    )
}