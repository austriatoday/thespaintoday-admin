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

const limit = 30;
let offsetValue = 0;


export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [total, setTotal] = useState(0);

    const searchParams = useSearchParams();
    const year = searchParams.get("year")!;
    const page = searchParams.get("page")!;

    // if (!searchParams.year) {
    //     return redirect('/articles?year=2024', RedirectType.push)
    // }


    const router = useRouter();

    // const {
    //     articles,
    //     total
    // } = await getArticles(searchParams.year, limit, offsetValue);


useEffect(() => {
    if (!year) {
        const currentYear = new Date().getFullYear();
        router.push(`/articles?year=${currentYear}`);
        return;
    }

    offsetValue = +page > 1 ? +page * limit - limit : 0;

    getArticles(year, limit, offsetValue).then((res) => {
        setArticles(res.articles);
        setTotal(res.total);
    });

    return () => setArticles([]);
}, [year, page]);

    return <div className="dark:text-white">

        <Header>Статьи</Header>

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
                {articles.map((article: any) =>
                    <ArticleItem key={article.article_id}
                                 article={article}/>)}
            </ArticleList>
        </div>

        <Pagination url={`/articles?year=${year}`}
                    page={+page} limit={limit} total={total}
                    offset={offsetValue}/>
    </div>
}

async function getArticles(year?: string, limit?: number, offset?: number) {
    let res;

    res = await fetch(`${process.env.API_URL}/admin/articles?year=${year}&limit=${limit}&offset=${offset}`, {
        cache: 'no-store',
    })

    return res.json();
}
