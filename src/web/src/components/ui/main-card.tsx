import { Card, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./badge";
import { IMainCardProps } from "@/interfaces/IMainCardProps";


export function MainCard(props : IMainCardProps) {
    const ICONS_SIZE = 150;
    return (
        <div className="relative">
            <Card className="relative overflow-hidden cursor-pointer hover:shadow-hover">
                <CardHeader>
                    <CardTitle>{props.content.title}</CardTitle>
                    <CardDescription>{props.content.description}</CardDescription>
                </CardHeader>
                <props._Icon size={ICONS_SIZE} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-10"/>
            </Card>
            { props.badge ? <Badge className={"absolute top-0 right-5 -translate-y-1/2 z-99 " + props.badge.color}>{props.badge.text}</Badge> : null }

        </div>
    )
}