import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Group, GroupApiResponse } from "types/api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormSchema } from "@/lib/schemas/validation";
import { z } from "zod";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

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
            // TODO SHOW ERROR MESSAGE WHEN SOMETHING FAILS.
            fetch("/api/groups", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data, null, 2)
            }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }

    return (
    <div className="p-3">
        <h1 className="text-xl bg-sidebar p-2 rounded-md">Groups</h1>
        <Dialog>
            <DialogTrigger>
                <Button>
                    <Plus /> New group
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create a new group</DialogTitle>
                <DialogDescription>
                Create a new group to organize your Docker containers. This grouping is for organizational purposes only and does not affect container behavior.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                            control={form.control}
                            name="groupName"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Group name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="my-awesome-group" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                        <Button variant="destructive">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Create</Button>
                                    </DialogFooter>
                                </>
                                )}
                            />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
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