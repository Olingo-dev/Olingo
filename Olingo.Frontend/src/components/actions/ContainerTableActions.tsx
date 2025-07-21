import { useRef } from "react";
import RemoveContainerDialog, {
  type RemoveContainerDialogRef,
} from "@/components/dialogs/removeContainerDialog";
import type { DockerContainer } from "@/home";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Container, MoreHorizontal, ScanEye } from "lucide-react";

function ContainerTableActions({ container }: { container: DockerContainer }) {
  const dialogRef = useRef<RemoveContainerDialogRef>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-bold flex items-center">
            <Container className="mr-1" size={18} /> Container actions
          </DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(container.Id)}
          >
            Copy container ID
          </DropdownMenuItem>

          <DropdownMenuItem>View details</DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => { // prevent dropdown from closing before dialog is triggered
              dialogRef.current?.open();
            }}
            className="text-destructive focus:text-destructive"
          >
            Remove container
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-bold flex items-center">
            <ScanEye className="mr-1" size={18} /> Tracing
          </DropdownMenuLabel>
          <DropdownMenuItem>View audit log</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveContainerDialog
        ref={dialogRef}
        containerId={container.Id}
        containerName={container.Name}
      />
    </>
  );
}


export default ContainerTableActions