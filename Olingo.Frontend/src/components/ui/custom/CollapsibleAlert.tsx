import { Alert, AlertTitle, AlertDescription } from "../alert";
import { useState, type ComponentProps } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";
import { ChevronsUpDown } from "lucide-react";


interface ICollapsibleAlertProps {
    variant?: ComponentProps<typeof Alert>["variant"];
    title: string;
    description: string;
}

export function CollapsibleAlert({ title, description, variant }: ICollapsibleAlertProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Alert variant={variant}>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger>
                    <AlertTitle>
                        <div className="w-max flex items-center justify-between" role="button">
                            {title}
                            <ChevronsUpDown size={16} className="cursor-pointer"/>
                        </div>
                    </AlertTitle>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <AlertDescription>
                        <div className="w-max">
                            {description}
                        </div>
                    </AlertDescription>
                </CollapsibleContent>
            </Collapsible>
        </Alert>
    );
}

