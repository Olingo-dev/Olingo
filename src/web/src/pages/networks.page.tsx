import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Ellipsis } from "lucide-react";
import { lazy, Suspense } from "react";
export function NetworksPage() {


    const NetworkNodeGraph = lazy(() => import("@/components/graphs/network-node-graph"))


    return(
        <div className="p-3">
            <h1 className="text-xl font-olingo bg-sidebar p-2 rounded-md">Networks</h1>
                <Tabs defaultValue="Overview" className="relative mr-auto w-full my-4">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                    value="Overview"
                    className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-accent data-[state=active]:text-foreground data-[state=active]:shadow-none "
                >
                    Overview
                </TabsTrigger>
                <TabsTrigger
                    value="Network graph"
                    className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-accent data-[state=active]:text-foreground data-[state=active]:shadow-none "
                >
                    Network graph
                </TabsTrigger>
                </TabsList>
                <TabsContent value="Overview">
                <Table>
                        <TableHeader>
                            <TableRow className="bg-navbackground">
                            <TableHead>Name</TableHead>
                            <TableHead>Id</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Subnet</TableHead>
                            <TableHead>Containers</TableHead>
                            <TableHead>Created at</TableHead>
                            <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-sidebar">
                            <TableRow className="cursor-pointer">
                                <TableCell>9fef05c2-4ca7-4c99-a6c7-e2345a4ef373</TableCell>
                                <TableCell><a>postgres:latest</a></TableCell>
                                <TableCell>
                                    <Badge>Bridge</Badge>
                                </TableCell>
                                <TableCell>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>76.33.222.42 - bc67:d569:a9d6...</TooltipTrigger>
                                        <TooltipContent>
                                        <p>76.33.222.42 - bc67:d569:a9d6:9a31:98c9:fff3:fa6f:ec05</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    </TooltipProvider>   
                                </TableCell>
                                <TableCell>5432:5432</TableCell>
                                <TableCell>Today</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Container actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View</DropdownMenuItem>
                                            <DropdownMenuItem>Rename</DropdownMenuItem>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Stop</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive-foreground">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            <TableRow className="cursor-pointer">
                                <TableCell>9fef05c2-4ca7-4c99-a6c7-e2345a4ef373</TableCell>
                                <TableCell><a>postgres:latest</a></TableCell>
                                <TableCell>
                                    <Badge>Bridge</Badge>
                                </TableCell>
                                <TableCell>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>76.33.222.42 - bc67:d569:a9d6...</TooltipTrigger>
                                        <TooltipContent>
                                        <p>76.33.222.42 - bc67:d569:a9d6:9a31:98c9:fff3:fa6f:ec05</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    </TooltipProvider>   
                                </TableCell>
                                <TableCell>5432:5432</TableCell>
                                <TableCell>Today</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Container actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View</DropdownMenuItem>
                                            <DropdownMenuItem>Rename</DropdownMenuItem>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Stop</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive-foreground">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            <TableRow className="cursor-pointer">
                                <TableCell>9fef05c2-4ca7-4c99-a6c7-e2345a4ef373</TableCell>
                                <TableCell><a>postgres:latest</a></TableCell>
                                <TableCell>
                                    <Badge>Bridge</Badge>
                                </TableCell>
                                <TableCell>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>76.33.222.42 - bc67:d569:a9d6...</TooltipTrigger>
                                        <TooltipContent>
                                        <p>76.33.222.42 - bc67:d569:a9d6:9a31:98c9:fff3:fa6f:ec05</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    </TooltipProvider>   
                                </TableCell>
                                <TableCell>5432:5432</TableCell>
                                <TableCell>Today</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Container actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View</DropdownMenuItem>
                                            <DropdownMenuItem>Rename</DropdownMenuItem>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Stop</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive-foreground">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="Network graph">
                    <Suspense fallback={
                        <p>Loading network graph</p>
                    }>
                        <NetworkNodeGraph />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    ) 
}