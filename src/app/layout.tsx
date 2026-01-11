import React, {Suspense} from "react";
import {MainLayout} from "@/app/MainLayout";
import {Fira_Sans_Condensed} from "next/font/google";
import {ToastContainer} from "react-toastify";

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import {Metadata} from "next";

const firaSansCondensed = Fira_Sans_Condensed({
    subsets: ['cyrillic'],
    weight: ['400', '500', '600', '700'],
    display: 'swap'
})

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'thespaintoday.com - Панель управления'
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
        <body
            className={firaSansCondensed.className + ' dark:bg-neutral-900'}
        >

        <MainLayout>
            <Suspense>{children}</Suspense>
        </MainLayout>

        <ToastContainer/>
        </body>
        </html>
    )
}
