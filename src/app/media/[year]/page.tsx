'use client';

import {Header} from "@/app/Header";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import {format} from "date-fns";
import {ru} from "date-fns/locale/ru";

export default function MediaYearPage() {
    const [images, setImages] = useState([]);

    const params = useParams<{ year: string }>();

    useEffect(() => {
        getAllImagesByYear(params.year)
            .then((i) => setImages(i));
        return () => setImages([]);
    }, [params.year])

    return <div className="dark:text-white">
        <Header>Медиафайлы</Header>

        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-4 gap-4">
            {
                images.map((i: any) => {
                    return <Link
                        key={i.month}
                        href={`/media/${i.year}/${i.month}`}
                        className="bg-neutral-700 text-white ring-1 ring-austrian-red-border rounded-[8px] p-4 group hover:bg-austrian-red transition-all flex justify-between items-center"
                    >
                        {format(i.month, 'LLLL', {locale: ru})}
                        <div
                            className="ml-1 py-[2px] px-[5px] bg-neutral-500 rounded-[4px] group-hover:bg-neutral-900 transition-all h-fit">{i.count}</div>

                    </Link>
                })
            }
        </div>
    </div>
}

async function getAllImagesByYear(year: string) {
    const res = await fetch(`${process.env.API_URL}/admin/images/${year}`, {cache: 'no-store'})
    return res.json();
}
