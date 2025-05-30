
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { LogOut, Sun, User } from "lucide-react"

interface NavBarProps {
    className?: string
}

export function AppNavBar({ className }: NavBarProps) {
    return (
        <nav className={cn(
            "z-50 h-14 border-b bg-navbackground",
            className
        )}>
            <div className="flex h-full items-center px-4 justify-between">
                <div className="flex items-center justify-center">
                    <a className="flex flex-row items-center font-olingo">
                        <img
                            src="/Olingo.svg"
                            alt="Logo"
                            width={35}
                            height={35}
                            className="object-contain mr-3"
                        />
                        Olingo
                    </a>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/37250273?v=4"/>
                                <AvatarFallback>53</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><User />My profile</DropdownMenuItem>
                            <DropdownMenuItem><Sun/>Switch to light</DropdownMenuItem>
                            <DropdownMenuItem className="text-danger" onClick={() => fetch("/b/auth/logout", {method: "POST"}).then(res => res.redirected ? window.location.href = res.url : null)}><LogOut/>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
} 