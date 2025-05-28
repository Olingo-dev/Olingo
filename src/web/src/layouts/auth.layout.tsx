import { Card } from "@/components/ui/card";
import { Outlet } from "react-router";
import { Version } from "@/components/version";

export function AuthLayout() {
    return (
            <main className="h-screen flex justify-center items-center">
                    <Card className="w-[60%] grid grid-cols-[60%_40%]">
                        <div className="flex flex-col justify-center p-[5%]">
                            <div className="mb-5 flex flex-col justify-center items-center">
                                <img
                                src="/Olingo.svg"
                                alt="Logo"
                                width={60}
                                height={60}
                                className="object-contain mb-5"
                                />
                                <h1 className="font-olingo text-2xl">Olingo</h1>
                            </div>
                            <div className="w-[90%]">
                                <Outlet/>
                            </div>   
                            <Version className="mt-5 justify-center"/>
                        </div>
                        <div className="bg-art bg-center bg-cover mix-blend-lighten"/>
                    </Card>
            </main>
    )
}