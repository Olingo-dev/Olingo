import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import * as z from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input";

export interface CreateContainerDialogRef {
    open: () => void;
}

export interface CreateContainerDialogProps {
    onClose: VoidFunc
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  image: z.string().min(3)
})


const CreateContainerDialog = forwardRef<CreateContainerDialogRef, CreateContainerDialogProps>(({onClose}, ref) => {
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
    }));

    const onSubmit = (data : z.infer<typeof FormSchema>) => {
        fetch(`http://localhost:8080/containers`, {method: "POST", body: JSON.stringify(data, null, 2)})
        .then((res) => {
                if(res.status === 200) {
                    toast(`Created container`, {
                        description: ""
                    })
                }
                setOpen(false);
                onClose()
            }   
        ).catch((err) => {
            toast(`Failed to  create container`, {
                description: `${err}`
            })
        })
    }

    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      image: ""
    },
  })
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Create container</DialogTitle>
                <DialogDescription>
                Create new container yippieeeeee
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Olingo" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <Input placeholder="olingo:latest" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <DialogFooter>
                    <Button onClick={() => {
                        setOpen(false)
                        onClose()
                    }} className="cursor-pointer">Cancel</Button>
                    <Button type="submit" className="cursor-pointer">Create</Button>
                </DialogFooter>
                </form>
            </Form>
            </DialogContent>
            <Toaster />
        </Dialog>
    )
})
export default CreateContainerDialog