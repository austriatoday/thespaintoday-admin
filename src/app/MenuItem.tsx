'use client'

import React, {ReactNode} from "react";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

export function MenuItem({children, href, className}: {
    children: ReactNode,
    href: string,
    className?: string
}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const year = searchParams.get('year')

    // console.log({ pathname: pathname + (year ? `?year=${year}` : ''), href, v: pathname + `?year=${year}` === href })

    return <li>
        <Link
            className={`block cursor-pointer w-full px-4 py-2 rounded-[8px] text-[14px] hover:bg-austrian-red-border hover:dark:bg-neutral-900 transition-all ${(pathname + (year ? `?year=${year}` : '')) === href ? 'bg-austrian-red-border dark:bg-neutral-900' : null} ${className}`}
            href={href}>{children}</Link>
    </li>
}
