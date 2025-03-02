import { Home, Settings, Database, Container, Network, File, HardDrive, Book, Users, Group, Package} from "lucide-react"
import { NavigationItem } from "../types/NavigationItem"
const navigationItems: NavigationItem[] = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        group: "General",
        
    },
    {
        title: "Groups",
        url: "/groups",
        icon: Package,
        group: "General",
        
    },
    {
        title: "Containers",
        url: "/containers",
        group: "Docker",
        icon: Container
        
    },
    {
        title: "Networks",
        url: "/networks",
        group: "Docker",
        icon: Network
    },
    {
        title: "Volumes",
        url: "/#",
        group: "Docker",
        icon: Database
    },
    {
        title: "Images",
        url: "/#",
        group: "Docker",
        icon: File
    },
    {
        title: "Nodes",
        url: "/#",
        icon: HardDrive,
        group: "Docker Swarm",
    },
    {
        title: "Users",
        url: "/#",
        icon: Users,
        group: "Management",
    },
    {
        title: "Roles",
        url: "/#",
        icon: Group,
        group: "Management",
    },
    {
        title: "Settings",
        url: "/#",
        icon: Settings,
        group: "",
    },
    {
        title: "Documentation",
        url: "https://docs.olingo.dev",
        icon: Book,
        group: "",
    },
];

export default navigationItems;