import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

export interface RemoveContainerDialogRef {
    open: () => void;
}

interface RemoveContainerDialogProps {
  containerId: string;
  containerName?: string;
  onClose: VoidFunc
}


const RemoveContainerDialog = forwardRef<RemoveContainerDialogRef, RemoveContainerDialogProps>(({containerId, containerName, onClose}, ref) => {
    const [open, setOpen] = useState(false);
    const [forceRemovalChecked, setForceRemovalChecked] = useState(false);
    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
    }));

    const removeContainer = () => {
        fetch(`http://localhost:8080/containers/${containerId}${forceRemovalChecked ? "?mode=force" : ""}`, {method: "DELETE"})
        .then((res) => {
                if(res.status === 200) {
                    toast(`Removed ${containerName}`, {
                        description: ""
                    })
                }
                setOpen(false);
                onClose()
            }   
        ).catch((err) => {
            toast(`Failed to remove ${containerName}`, {
                description: `${err}`
            })
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                This will permanently delete the container{" "}
                <span className="font-mono">{containerName ?? containerId}</span>.

                <div className="flex items-start gap-3 mt-4">
                    <Checkbox className="cursor-pointer" id="force-removal" checked={forceRemovalChecked} onCheckedChange={(checked) => setForceRemovalChecked(checked as boolean) }/>
                    <div className="grid gap-2">
                    <Label htmlFor="force-removal">Force remove container</Label>
                    <p className="text-muted-foreground text-sm italic">
                        By clicking this checkbox, the client will forcefully remove the container. This can have implications.
                    </p>
                    </div>
                </div>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={() => setOpen(false)} className="cursor-pointer">Cancel</Button>
                <Button onClick={() => removeContainer()} variant="destructive" className="cursor-pointer">Remove</Button>
            </DialogFooter>
            </DialogContent>
            <Toaster />
        </Dialog>
    )
})
export default RemoveContainerDialog