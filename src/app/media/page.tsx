'use client';

import {Header} from "@/app/Header";
import {useEffect, useState} from "react";
import Link from "next/link";
import {DragDrop} from "@/app/DragDrop/DragDrop";

export default function MediaPage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        getAllImages()
            .then((i) => setImages(i));
    }, [])


    return <div className="dark:text-white">

        <Header>Медиафайлы</Header>

        <div className="p-4">
            <DragDrop/>
        </div>

        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-4 gap-4">
            {
                images.map((i: any) => {
                    return <Link
                        key={i.year}
                        href={`/media/${i.year}`}
                        className="bg-neutral-700 text-white ring-1 ring-austrian-red-border rounded-[8px] p-4 group hover:bg-austrian-red transition-all flex justify-between items-center"
                    >
                        {i.year}
                        <div
                            className="ml-1 py-[2px] px-[5px] bg-neutral-500 rounded-[4px] group-hover:bg-neutral-900 transition-all h-fit">{i.count}</div>

                    </Link>
                })
            }
        </div>
    </div>
}

// ?year=${year}&month=${month}
// async function getFiles(year?: string | null, month?: string | null) {
//     const res = await fetch(`${process.env.API_URL}/admin/files${year ? `?year=${year}` : ''}${month ? `&month=${month}` : ''}`, {cache: 'no-store'})
//     return res.json();
// }

async function getAllImages() {
    const res = await fetch(`${process.env.API_URL}/admin/images/all`, {cache: 'no-store'})
    return res.json();
}
