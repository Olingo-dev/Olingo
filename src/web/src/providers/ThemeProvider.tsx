import { Theme, ThemeContext } from "@/context/ThemeContext";
import { ReactNode, FC, useState } from "react";

export const ThemeProvider : FC<{children: ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>("dark");
    function toggleTheme() {
        setTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));
    }
    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}