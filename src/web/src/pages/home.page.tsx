// import { Card, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card";
import { MainCard } from "@/components/ui/main-card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Container, ExternalLink, Eye, HardDrive, Settings, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Group, GroupApiResponse } from "types/api";

export function HomePage() {

    const [groups, setGroups] = useState<Group[]>([]);
    useEffect(() => {
        fetch("/api/groups").then(response => response.json()).then((data: GroupApiResponse) => {
            setGroups(data.groups)
        });
    }, []);

    return (
        <article className="p-10">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <MainCard content={{title: "Containers", description: "View and manage all your containers"}} badge={{text: "Healthy", color: "bg-healthy"}} _Icon={Container}/>
                <MainCard content={{title: "Nodes", description: "Manage your active nodes"}} badge={{text: "Healthy", color: "bg-healthy"}} _Icon={HardDrive}/>
                <MainCard content={{title: "Users", description: "Manage users and their access"}} _Icon={Users}/>
            </div>
            <Separator className="mb-4"/>
            <div className="grid grid-cols-[70%_30%] gap-4">
                <div>
                <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex justify-between">
                                Groups
                                <a href="/groups" className="text-sm flex items-center"> <Settings size={14} className="mr-1"/>Manage groups</a>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-navbackground">
                                        <TableHead>Name</TableHead>
                                        <TableHead>Containers</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Created by</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                    <TableBody className="bg-sidebar"> 
                                    {groups?.length > 0 ? (
                                        groups.map((group) => (
                                            <TableRow className="cursor-pointer" key={group.ID}>
                                            <TableCell>{group.Name}</TableCell>
                                            <TableCell>5</TableCell>
                                            <TableCell>{new Date(group.CreatedAt).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <div className="flex itmes-center">
                                                    <Avatar className="h-4 w-4 mr-2">
                                                        <AvatarImage src="https://avatars.githubusercontent.com/u/37250273?v=4"/>
                                                        <AvatarFallback>53</AvatarFallback>
                                                    </Avatar>
                                                    <p>536b</p>
                                                </div>
                                            </TableCell>
                                            <TableCell><Badge className="bg-healthy">All containers running</Badge></TableCell>
                                            <TableCell>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <a href={`/groups/${group.ID}`}>
                                                                <ExternalLink size={14}/>
                                                            </a>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {group.ID}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </TableCell>
                                            </TableRow>
                                        ))
                                        ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-gray-500">
                                            No groups available
                                            </TableCell>
                                        </TableRow>
                                    )}  
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex justify-between">
                                Recent activity
                                <a href="/users/activity" className="text-sm flex items-center"> <Eye  size={14} className="mr-1"/>View more</a>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <ul>
                            <li className="flex items-center text-sm">
                                <Avatar className="h-4 w-4 mr-2">
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/37250273?v=4"/>
                                    <AvatarFallback>53</AvatarFallback>
                                </Avatar>
                                Deleted network "oligo_network"
                                <span className="ml-2 opacity-25"> March 2 2025, 11:59:05</span>
                            </li>
                            <li className="flex items-center text-sm">
                                <Avatar className="h-4 w-4 mr-2">
                                    <AvatarImage src="https://avatars.githubusercontent.com/u/37250273?v=4"/>
                                    <AvatarFallback>53</AvatarFallback>
                                </Avatar>
                                Created network "oligo_network"
                                <span className="ml-2 opacity-25"> March 2 2025, 11:58:05</span>
                            </li>
                        </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </article>
    )
}