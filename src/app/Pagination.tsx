"use client";
import Link from "next/link";

export function Pagination({url, limit, total, offset, page}: any) {
    const pages = [];
    const totalPages = Math.ceil(total / limit);

    if (!page) {
        page = 1
    }

    // console.log(totalPages)

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return <div
        className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-neutral-600 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            {
                page > 1 && <Link
                    href={`${url}&page=${page - 1}`}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${offset === 0 ? 'opacity-0 pointer-events-none' : null}`}>Предыдущая</Link>
            }
            {
                page < pages.length && <Link
                    href={`${url}&page=${page + 1}`}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Следующая</Link>
            }
        </div>
        <div
            className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between md:justify-center">

            <div>
                <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination">
                    {
                        page > 1 && <Link
                            href={`${url}&page=${page - 1}`}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Предыдущая</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                      clipRule="evenodd"/>
                            </svg>
                        </Link>
                    }
                    {/*Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"*/}

                    {pages.map((p) => {
                        return <Link
                            key={p}
                            href={`${url}&page=${p}`}
                            className={`dark:text-white relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-500 focus:z-20 focus:outline-offset-0 md:inline-flex ${+page === p ? '!bg-neutral-500 text-white' : null}`}>{p}</Link>
                    }).slice(page <= 6 ? 0 : page - 6, page + 5)}

                    {
                        page < pages.length && <Link
                            href={`${url}&page=${page + 1}`}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Следующая</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                      clipRule="evenodd"/>
                            </svg>
                        </Link>
                    }
                </nav>
            </div>
        </div>
    </div>
}
