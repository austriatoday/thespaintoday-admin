import {Header} from "@/app/Header";

import {ArticleList} from "@/app/articles/ArticleList";
import {ArticleItem} from "@/app/articles/ArticleItem";

export default async function CategoryPage({params}: any) {
    const {slug} = await params;
    const category = await getCategory(slug);
    const articles = await getArticlesByCategory(slug)

    // const [articles, setArticles] = useState([]);
    // const [articlesCount, setArticlesCount] = useState();
    //
    // const searchParams = useSearchParams();
    // const year = searchParams.get("year");

    // useEffect(() => {
    //     if (year) {
    //         getArticles(year)
    //             .then(res => setArticles(res));
    //         getArticlesCount(year)
    //             .then(res => setArticlesCount(res.count));
    //     } else {
    //         getArticles()
    //             .then(res => setArticles(res));
    //         getArticlesCount()
    //             .then(res => setArticlesCount(res.count));
    //     }
    // return () => setArticles([]);
    // }, [year]);

    return <div className="dark:text-white">

        <Header>Категория - {category.category_name}</Header>

        {/*<Header>Статьи - {articlesCount}</Header>*/}

        <div className="overflow-auto w-full m-4 border border-slate-300 dark:border-austrian-red-border bg-neutral-200 dark:bg-neutral-700 rounded-[8px]">

            <ArticleList>
                {articles.map((article: any) =>
                    <ArticleItem key={article.article_id}
                                 article={article}/>)}
            </ArticleList>
        </div>
    </div>
}

async function getCategory(slug: string) {
    const res = await fetch(`${process.env.API_URL}/categories/${slug}`, {cache: 'no-store'})
    return res.json();
}

async function getArticlesByCategory(slug: string) {
    const res = await fetch(`${process.env.API_URL}/admin/categories/${slug}/articles`, {cache: 'no-store'})
    return res.json();
}
