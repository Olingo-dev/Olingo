import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export type NavigationItem = {
    title: string,
    url: string,
    group?: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    description?: string
    subItems?: NavigationItem[]
    future?: boolean
}