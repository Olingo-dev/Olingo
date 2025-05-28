import { useEffect, useState } from "react";
import { VersionApiResponse } from "types/api";

interface IVersionComponentProps {
    className?: string
}

export function Version(props: IVersionComponentProps) {
const [version, setVersion] = useState("");
    useEffect(() => {
        fetch("/api/version")
          .then(res => res.json())
          .then((data: VersionApiResponse) => setVersion(data.version));
      }, []);
    return (<p className={`flex items-center text-secondary text-sm ${props.className}`}>Version: {version}</p>)
}