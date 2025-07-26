import { MainSidebar } from "@/components/navigation/mainSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
// import { Waypoints } from "lucide-react";
import { Outlet } from "react-router";
// import { toast } from "sonner"
import OlingoLogo from "@/assets/Olingo.svg";



if(typeof window !== 'undefined') {
    // try {
    //     const ws = new WebSocket("ws://localhost:8080/notifications", ["GET"]); // TODO: proxy using api/notifications. later later.
    //     ws.onmessage = (event: MessageEvent) => {
    //         toast("Some Docker event", {
    //             description: `This is a demo. for now all docker events are sent over websocket - ${event.timeStamp}`,
    //             action: {
    //                 label: "View audit",
    //                 onClick: () => {
    //                     console.log("GOTO audit")
    //                 }
    //             }
    //         })
    //     }
    //     ws.onerror = (event : Event) => {
    //         toast("Notifications:", {
    //             position: "top-right",
    //             description: `${event}`,
    //             dismissible: true,
    //         })
    //     }
    //     ws.onopen = (event: Event) => {
    //         toast("Notifications:", {
    //             position: "top-right",
    //             description: `Created a connection with the notifications endpoint - ${event.timeStamp} `,
    //             dismissible: true,
    //             style: {
    //                 backgroundColor: "green"
    //             },
    //             className: "overflow-hidden",
    //             icon: <Waypoints size={125} className="opacity-[0.2] absolute -left-5"/>
    //         })
    //     }
    // } catch(err) {
    //     console.log(err);
    // }
    
}
export default function MainLayout() {
    return (
        <>
            <header className="flex flex-column justify-between items-center w-full p-4 border">
                <section className="flex flex-row items-center">
                    <img src={OlingoLogo} alt="Olingo Logo" className="mr-2 h-auto w-8"/>
                    <h1>Olingo</h1>
                </section>
            </header>
            <section className="relative h-full">
            <SidebarProvider>
                <MainSidebar />
                <main className="bg-main w-full">
                    <SidebarTrigger />
                    <section className="p-4">
                        <Outlet />
                    </section>
                </main>
                <Toaster />
            </SidebarProvider>
            </section>
        </>
    )
}