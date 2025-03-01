import { Badge } from "@/components/ui/badge";
import { Card, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Container, HardDrive, Users } from "lucide-react";

export function HomePage() {
    const ICONS_SIZE = 150;
    return (
        <article className="p-10">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="relative">
                    <Card className="relative overflow-hidden cursor-pointer hover:shadow-hover">
                        <CardHeader>
                            <CardTitle>Containers</CardTitle>
                            <CardDescription>View and manage all your containers</CardDescription>
                        </CardHeader>
                        <Container size={ICONS_SIZE} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-10"/>
                    </Card>
                    <Badge className="absolute top-0 right-5 -translate-y-1/2 z-99 bg-healthy">Healthy</Badge>
                </div>
                <div className="relative">
                    <Card className="relative overflow-hidden cursor-pointer hover:shadow-hover">
                        <CardHeader>
                            <CardTitle>Nodes</CardTitle>
                            <CardDescription>Manage your active nodes</CardDescription>
                        </CardHeader>
                        <HardDrive size={ICONS_SIZE} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-10"/>
                    </Card>
                    <Badge className="absolute top-[-50%] z-99 top-0 right-5 -translate-y-1/2 bg-healthy">Healthy</Badge>
                </div>
                <Card className="relative overflow-hidden cursor-pointer hover:shadow-hover">
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>Manage users and their access</CardDescription>
                    </CardHeader>
                    <Users size={ICONS_SIZE} className="absolute top-1/2 -translate-y-1/2 right-5 opacity-10"/>
                </Card>
            </div>
            <Separator className="mb-4"/>
            <div className="grid grid-cols-3 gap-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Group name</CardTitle>
                        <CardDescription>Some description</CardDescription>
                    </CardHeader>
                </Card>
                
            </div>
        </article>
    )
}