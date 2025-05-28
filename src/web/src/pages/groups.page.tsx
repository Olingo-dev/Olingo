import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Group, GroupApiResponse } from "types/api";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormSchema } from "@/lib/schemas/validation";
import { z } from "zod";

export function GroupsPage() {


    const [groups, setGroups] = useState<Group[]>([]);
        useEffect(() => {
            fetch("/api/groups").then(response => response.json()).then((data: GroupApiResponse) => {
                setGroups(data.groups)
            });
        }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            groupName: "",
        },
        })
        
        function onSubmit(data: z.infer<typeof FormSchema>) {
            console.log(data);
        }

    return (
    <div className="p-3">
        <h1 className="text-xl bg-sidebar p-2 rounded-md">Groups</h1>
        <Sheet>
            <SheetTrigger>
                <Button>
                    <Plus /> New group
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Create a new group</SheetTitle>
                    <SheetDescription>
                        Create a new group to organize your Docker containers. This grouping is for organizational purposes only and does not affect container behavior.
                    </SheetDescription>
                </SheetHeader>
                <div className="grow">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                            control={form.control}
                            name="groupName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Group name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="my-awesome-group" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </form>
                    </Form>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="destructive">Cancel</Button>
                    </SheetClose>
                    <Button type="submit">Create</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
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
    </div>
    );
}