import { Home, Settings, Database, Container, Network, File, HardDrive, Book, Users, Group} from "lucide-react"
import { NavigationItem } from "./types/NavigationItem"
const navigationItems: NavigationItem[] = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        group: "General",
        
    },
    {
        title: "Containers",
        url: "/containers",
        group: "General",
        icon: Container
        
    },
    {
        title: "Networks",
        url: "/networks",
        group: "General",
        icon: Network
    },
    {
        title: "Volumes",
        url: "/#",
        group: "General",
        icon: Database
    },
    {
        title: "Images",
        url: "/#",
        group: "General",
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