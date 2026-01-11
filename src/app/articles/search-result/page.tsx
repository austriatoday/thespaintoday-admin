"use client";

import {Header} from "@/app/Header";
import {ArticleList} from "@/app/articles/ArticleList";
import {ArticleItem} from "@/app/articles/ArticleItem";
import Link from "next/link";
import {Pagination} from "@/app/Pagination";
import {
    useRouter,
    useSearchParams
} from "next/navigation";
import {useEffect, useState} from "react";
import {SearchBar} from "@/app/SearchBar/SearchBar";

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);

    const searchParams = useSearchParams();
    const searchValue = searchParams.get("search")!;

    useEffect(() => {
        search(searchValue).then((res) => {
            setArticles(res)
        });

        return () => setArticles([]);
    }, [searchValue]);

    return <div className="dark:text-white">

        <Header>Статьи - Найдено - {articles?.length ?? 0}</Header>

        <div className="flex">
            <Link href="/articles/new"
                  className="block w-fit mx-4 mt-4 p-2 bg-neutral-800 text-white rounded-[8px] hover:bg-neutral-700 transition-all">
                Создать новую статью
            </Link>

            <SearchBar/>
        </div>

        <div
            className="m-4 border border-slate-300 dark:border-austrian-red-border bg-neutral-200 dark:bg-neutral-700 rounded-[8px] w-fit">
            <ArticleList>
                {articles?.map((article: any) =>
                    <ArticleItem key={article.article_id}
                                 article={article}/>)}
            </ArticleList>
        </div>
    </div>
}

async function search(searchValue: string) {
    const res = await fetch(`${process.env.API_URL}/admin/articles/search?search=${searchValue}`, {cache: 'no-store'})
    return res.json();
}
