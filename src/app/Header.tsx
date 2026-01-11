import {ReactNode} from "react";

export function Header({children, className}: { children: ReactNode, className?: string }) {
    return <h1
        className={`text-3xl font-bold p-4 sticky top-0 dark:bg-wp-control-panel dark:text-white bg-gray-100 text-gray-800 ring-1 ring-austrian-red-border w-full drop-shadow z-10 ${className}`}>{children}</h1>
}
