import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
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
import { Spinner } from "../ui/spinner";

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
  imageName: z.string().min(3),
  imageTag: z.string().min(1),
})


const CreateContainerDialog = forwardRef<CreateContainerDialogRef, CreateContainerDialogProps>(({onClose}, ref) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
    }));

    const onSubmit = (data : z.infer<typeof FormSchema>) => {
        setLoading(true);
        fetch(`http://localhost:8080/containers`, {method: "POST", body: JSON.stringify(data, null, 2)})
        .then((res) => {
                if(res.status === 200) {
                    toast(`Created container`, {
                        description: ""
                    })
                }
                setOpen(false);
                onClose();
                
            }   
        ).catch((err) => {
            toast(`Failed to  create container`, {
                description: `${err}`
            })
        }).finally(() => setLoading(false));
    }

    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      imageName: "",
      imageTag: ""
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
                            <Input placeholder="e.g., myContainer" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="imageName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., olingo, node, go" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="imageTag"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image tag</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., latest, v1.0.0" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <DialogFooter>
                    <Button onClick={() => {
                        setOpen(false)
                        onClose()
                        setLoading(false) // TODO CANCELATION TOKEN
                    }} className="cursor-pointer">Cancel</Button>
                    <Button type="submit" className="cursor-pointer" disabled={loading}>
                       {
                        loading ? <Fragment><Spinner /> Loading...</Fragment>  : "Create"
                       }
                    </Button>
                </DialogFooter>
                </form>
            </Form>
            </DialogContent>
            <Toaster />
        </Dialog>
    )
})
export default CreateContainerDialog