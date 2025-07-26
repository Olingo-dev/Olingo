import * as React from "react"
import {
  BookOpen,
  Container,
} from "lucide-react"

import { NavMain } from "./nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"


const data = {
  navMain: [
    {
      title: "Containers",
      url: "/",
      icon: Container,
      isActive: true,
      items: [
        {
          title: "New container",
          url: "/containers/create",
        }
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
    }
  ],
}

export function MainSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}