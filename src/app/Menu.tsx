import React, {ReactNode} from "react";

export function Menu({children}: { children: ReactNode }) {
    return <ul className="mt-4 px-4 grid gap-1">
        {children}
    </ul>
}
