import { Card } from "@/components/ui/card";
import { Outlet } from "react-router";
import { Version } from "@/components/version";
import { DottedBackground } from "@/components/dottedBackground";


export function AuthLayout() {
    return (
            <main className="h-screen flex justify-center items-center ">
                    <DottedBackground />
                    <Card className="w-[60%] grid grid-cols-[60%_40%]">
                        <div className="flex flex-col justify-center p-[5%]">
                            <div className="mb-5 flex items-center">
                                <img
                                src="/Olingo.svg"
                                alt="Logo"
                                width={60}
                                height={60}
                                className="object-contain mr-5"
                                />
                                <h1 className="font-olingo text-2xl">Olingo</h1>
                            </div>
                            <div className="w-[90%]">
                                <Outlet/>
                            </div>   
                            <Version className="mt-5"/>
                        </div>
                        <div className="bg-authArt bg-center bg-cover rounded-r-lg"/>
                    </Card>
            </main>
    )
}