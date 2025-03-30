import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menubar, MenubarContent, MenubarItem, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MenubarMenu } from "@radix-ui/react-menubar";
import { Ellipsis } from "lucide-react";

export function ContainersPage() {
    return (
        <div className="p-3">
            <h1 className="text-xl bg-sidebar p-2 rounded-md">Containers</h1>
            <Menubar className="max-w-max bg-navbackground my-4" >
                <MenubarMenu>
                    <MenubarTrigger>Create</MenubarTrigger>
                    <MenubarContent>
                    <MenubarItem>
                        From image
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>From git</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>From blank</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Export</MenubarTrigger>
                    <MenubarContent>
                    <MenubarItem>
                        To CSV
                    </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <Table>
            <TableHeader>
                <TableRow className="bg-navbackground">
                <TableHead>Container status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Networks</TableHead>
                <TableHead>Mounts</TableHead>
                <TableHead>CT IPv4/IPv6</TableHead>
                <TableHead>Ports</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-sidebar">
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium"><Badge>Active</Badge></TableCell>
                    <TableCell>My-db</TableCell>
                    <TableCell>9fef05c2-4ca7-4c99-a6c7-e2345a4ef373</TableCell>
                    <TableCell><a>postgres:latest</a></TableCell>
                    <TableCell>
                        <Badge>Bridge</Badge>
                    </TableCell>
                    <TableCell>
                    <Badge>9fef05c2</Badge>
                    <Badge>postgress-data</Badge>
                    <Badge>9fef05c2</Badge>
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
                                <DropdownMenuItem className="text-destructive-foreground bg-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium"><Badge>Active</Badge></TableCell>
                    <TableCell>My-db</TableCell>
                    <TableCell>9fef05c2-4ca7-4c99-a6c7-e2345a4ef373</TableCell>
                    <TableCell><a>postgres:latest</a></TableCell>
                    <TableCell>
                        <Badge>Bridge</Badge>
                    </TableCell>
                    <TableCell>
                    <Badge>9fef05c2</Badge>
                    <Badge>postgress-data</Badge>
                    <Badge>9fef05c2</Badge>
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
                                <DropdownMenuItem className="text-destructive-foreground bg-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium"><Badge>Active</Badge></TableCell>
                    <TableCell>My-db</TableCell>
                    <TableCell>9fef05c2-4ca7-4c99-a6c7-e2345a4ef373</TableCell>
                    <TableCell><a>postgres:latest</a></TableCell>
                    <TableCell>
                        <Badge>Bridge</Badge>
                    </TableCell>
                    <TableCell>
                    <Badge>9fef05c2</Badge>
                    <Badge>postgress-data</Badge>
                    <Badge>9fef05c2</Badge>
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
                                <DropdownMenuItem className="text-destructive-foreground bg-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </div>
    )
}