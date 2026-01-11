"use client";
import Logo from "@/app/Logo";
import {Menu} from "@/app/Menu";
import {MenuItem} from "@/app/MenuItem";
import {usePathname} from "next/navigation";
import {Suspense, useEffect, useState} from "react";

export function MainLayout({children}: any) {
    const [categories, setCategories] = useState<any[]>([]);
    const [years, setYears] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);

    const pathname = usePathname()

    useEffect(() => {
        getCategories().then(c => setCategories(c));
        getYears().then(y => setYears(y));
        getAllImages().then(i => setImages(i));

        return () => {
            setCategories([]);
            setYears([]);
        };
    }, []);

    return <div className="flex">

        <nav
            className="bg-wp-control-panel dark:bg-neutral-950 max-w-[230px] w-full h-screen text-white border-r border-solid border-austrian-red-border overflow-scroll">
            <Logo/>

            <Menu>
                <Suspense>
                    <MenuItem href="/media">Медиафайлы</MenuItem>
                </Suspense>

                <div
                    className={`gap-1 hidden ${pathname.includes('/media') ? "!grid" : null}`}>
                    {images.map((i: any) => (
                        <Suspense>
                            <MenuItem
                                key={i.year}
                                className="justify-between items-center"
                                href={`/media/${i.year}`}>{i.year} год
                                <span
                                    className="ml-2 py-[2px] px-[5px] bg-neutral-600 rounded-[4px] h-fit">{i.count}</span>
                            </MenuItem>
                        </Suspense>))}
                </div>

                <Suspense>
                    <MenuItem href={`/articles/new`}>
                        Создать новую статью
                    </MenuItem>

                    <MenuItem href="/articles">Статьи</MenuItem>
                </Suspense>

                <div
                    className={`gap-1 hidden ${pathname === '/articles' ? "!grid" : null}`}>
                    {years.map((y: any) => (
                        <Suspense>
                            <MenuItem
                                key={y.year}
                                className="justify-between items-center"
                                href={`/articles?year=${y.year}`}>{y.year} год
                                <span
                                    className="ml-2 py-[2px] px-[5px] bg-neutral-600 rounded-[4px] h-fit">{y.count}</span>
                            </MenuItem>
                        </Suspense>))}
                </div>

                <Suspense>
                    <MenuItem href="/categories">Категории</MenuItem>
                </Suspense>

                <div
                    className={`gap-1 hidden ${pathname.includes('categories') ? "!grid" : null}`}>
                    {categories.map((c: any) => (
                        <Suspense>
                            <MenuItem
                                key={c.category_slug}
                                className="justify-between items-center"
                                href={`/categories/${c.category_slug}`}>{c.category_name}
                                <span
                                    className="ml-2 py-[2px] px-[5px] bg-neutral-600 rounded-[4px] h-fit">{c.count}</span>
                            </MenuItem>
                        </Suspense>))}
                </div>

                <Suspense>
                    <MenuItem href="/seo">SEO</MenuItem>
                    <MenuItem href="/views">Просмотры</MenuItem>
                </Suspense>
            </Menu>
        </nav>

        <div className="overflow-scroll h-screen w-full">{children}</div>
    </div>
}

async function getCategories() {
    const res = await fetch(`${process.env.API_URL}/admin/categories`, {cache: 'no-store'})
    return res.json();
}

async function getYears() {
    const res = await fetch(`${process.env.API_URL}/admin/articles/years`, {cache: 'no-store'})
    return res.json();
}

async function getAllImages() {
    const res = await fetch(`${process.env.API_URL}/admin/images/all`, {cache: 'no-store'})
    return res.json();
}
