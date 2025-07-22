import type { ReactNode } from "react"

export const SideBarGroups = {
    Docker: "Docker",
    Tracing: "Tracing & Audit",
    UserManagement: "Users",
    Other: "Other"
}
type SidebarItem  = {
    name: string,
    group: typeof SideBarGroups[keyof typeof SideBarGroups]
    icon: ReactNode
}

const sideBarConfig: SidebarItem[] = [

]
export default sideBarConfig