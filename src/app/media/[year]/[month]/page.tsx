'use client';

import {Header} from "@/app/Header";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {ImageList} from "@/app/media/ImageList";
import {ImageItem} from "@/app/media/ImageItem";

export default function MediaMonthPage() {
    const [images, setImages] = useState([]);

    const params = useParams<{ year: string, month: string }>();

    useEffect(() => {
        getAllImagesByYear(params.year, params.month)
            .then((i) => setImages(i));
        return () => setImages([]);
    }, [params.year])

    return <div className="dark:text-white">
        <Header>Медиафайлы</Header>

        <ImageList>
            {
                images.map((i: any) => {
                    return <ImageItem
                        key={i.image_id}
                        image={i}
                    >

                    </ImageItem>
                })
            }
        </ImageList>
    </div>
}

async function getAllImagesByYear(year: string, month: string) {
    const res = await fetch(`${process.env.API_URL}/admin/images/${year}/${month}`, {cache: 'no-store'})
    return res.json();
}
