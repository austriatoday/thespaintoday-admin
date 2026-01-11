import {Header} from "@/app/Header";
import Link from "next/link";

const menu = [
    {
        name: "SEO",
        link: "/seo"
    },
    {
        name: "Медиафайлы",
        link: "/media"
    },
    {
        name: "Статьи",
        link: "/articles"
    },
    {
        name: "Категории",
        link: "/categories"
    },
]

export default async function Home() {
    // const config = await getGeneralConfig();
    // const reviews = await getReviews();
    // const articles = await getArticles();
    // grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3

    return <div className="">
        <Header>Панель управления</Header>

        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-4 gap-4">
            {menu.map((m: any) => {
                return <Link
                    key={m.name}
                    href={m.link}
                    className="bg-neutral-700 text-white ring-1 ring-austrian-red-border rounded-[8px] p-4 group hover:bg-austrian-red transition-all flex justify-between items-center"
                >
                    {m.name}
                </Link>
            })}
        </div>

    </div>


    {/*<div className="container mx-auto grid md:grid-rows-2 grid-flow-col gap-4">*/
    }
    {/*    <div className="col-span-2 ...">*/
    }
    {/*        <TopArticle/>*/
    }
    {/*    </div>*/
    }

    {/*    <div className="row-span-2 col-span-2 ...">03</div>*/
    }

    {/*    <div className="row-span-3 ...">*/
    }
    {/*        <TopArticle/>*/
    }
    {/*    </div>*/
    }
    {/*</div>*/
    }

    {/*<Start/>*/
    }

    {/*<About/>*/
    }

    {/*<Suspense fallback={'Загрузка...'}>*/
    }
    {/*    <Reviews reviews={reviews} config={config}/>*/
    }
    {/*</Suspense>*/
    }

    {/*<HowItWorks/>*/
    }

    {/*<Suspense fallback={'Загрузка...'}>*/
    }
    {/*    <ModalForm config={config}/>*/
    }
    {/*</Suspense>*/
    }

    {/*<Suspense fallback={'Загрузка...'}>*/
    }
    {/*    {articles.length > 0 && <Articles articles={articles}/>}*/
    }
    {/*</Suspense>*/
    }
}

async function getGeneralConfig() {
    const res = await fetch(`${process.env.API_URL}/generalConfig`, {cache: 'no-store'})
    return res.json();
}

async function getReviews() {
    const res = await fetch(`${process.env.API_URL}/reviews`, {cache: 'no-store'})
    return res.json();
}

async function getArticles() {
    const res = await fetch(`${process.env.API_URL}/articles/last`, {cache: 'no-store'})
    return res.json();
}
