import { AppNavBar } from "@/components/navigation/app-navbar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GitCommitHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { VersionApiResponse } from "types/api";
import github from "../assets/icons/github.svg";


export function MainLayout() {
    const [version, setVersion] = useState("");
    useEffect(() => {
        fetch("/api/version")
          .then(res => res.json())
          .then((data: VersionApiResponse) => setVersion(data.version));
      }, []);

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
                        <footer className="bg-sidebar flex justify-end">
                            <a><img src={github}/></a>
                            <p className=" flex items-center p-4"><GitCommitHorizontal className="mr-2" size={16}/> Version: {version}</p>
                        </footer>
                    </article>
                </SidebarProvider>
            </main>
        </div>
    )
}