import {Header} from "@/app/Header";
import Link from "next/link";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return <div className="dark:text-white">

        <Header>Категории</Header>

        {/*<pre>{JSON.stringify(categories, null, 2)}</pre>*/}

        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-4 gap-4">
            {
                categories.map((c: any) => {
                    return <Link
                        key={c.category_id}
                        href={`/categories/${c.category_slug}`}
                        className="bg-neutral-700 text-white ring-1 ring-austrian-red-border rounded-[8px] p-4 group hover:bg-austrian-red transition-all flex justify-between items-center"
                    >
                        {c.category_name}
                        <div
                            className="ml-1 py-[2px] px-[5px] bg-neutral-500 rounded-[4px] group-hover:bg-neutral-900 transition-all h-fit">{c.count}</div>

                    </Link>
                })
            }
        </div>


    </div>
}

async function getCategories() {
    const res = await fetch(`${process.env.API_URL}/admin/categories`, {cache: 'no-store'})
    return res.json();
}
