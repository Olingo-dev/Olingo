import { LucideIcon } from "lucide-react"

interface IMainCardContent {
    title: string,
    description: string
}
interface IMainCardBadge {
    text: string,
    color: "bg-healthy" | "bg-danger"
}
export interface IMainCardProps {
    content: IMainCardContent,
    badge?: IMainCardBadge,
    _Icon: LucideIcon
}
