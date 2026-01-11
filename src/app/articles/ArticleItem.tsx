"use client"

import {format} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {SubmitHandler} from "react-hook-form";
import {Bounce, toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {
    MdDeleteForever,
    MdEdit,
    MdLabelImportantOutline, MdPublish,
    MdSend, MdUnpublished
} from "react-icons/md";
import React from "react";
import {IoMdStar} from "react-icons/io";
import {FaExternalLinkAlt, FaEye} from "react-icons/fa";
import {FaCircleArrowLeft, FaCircleArrowRight} from "react-icons/fa6";

export function ArticleItem({article}: { article?: any }) {
    const router = useRouter();

    const year = format(article.published_at ?? article.created_at, 'yyyy');
    const month = format(article.published_at ?? article.created_at, 'MM');

    const onUpdate = () => {
        updateArticle(article.article_id)
            .then(() => toast(`Главная статья установлена - «${article.article_title}»`, {
                position: "top-right",
                type: "success",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }))
            .then(() => router.push('/articles'))
    }

    const onPublish = () => {
        publishArticle(article.article_id)
            .then(() => toast(`Статья опубликована - «${article.article_title}»`, {
                position: "top-right",
                type: "success",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }))
            .then(() => router.push('/articles'))
    }

    const onUnPublish = () => {
        unpublishArticle(article.article_id)
            .then(() => toast(`Статья снята с публикации - «${article.article_title}»`, {
                position: "top-right",
                type: "success",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            }))
            .then(() => router.push('/articles'))
    }

    return <>
        <tr className={`hover:bg-gray-200 dark:hover:bg-neutral-800 bg-neutral-100 dark:bg-neutral-700 text-left dark:border-austrian-red-border border-b border-neutral-300 ${article.article_is_main ? "!bg-purple-200 dark:!bg-neutral-800" : null} ${article.article_status === 'draft' ? "!bg-gray-200 dark:!bg-neutral-500" : null}`}>
            {/*<pre>{JSON.stringify(article, null, 2)}</pre>*/}
            <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                {article.created_at && <div>
                    <div>Дата создания:</div>
                    {format(article.created_at, 'dd.MM.yyyy HH:mm:ss')}
                </div>}

                {article.published_at && <div className="mt-2">
                    <div>Дата публикации:</div>
                    {format(article.published_at, 'dd.MM.yyyy HH:mm:ss')}
                </div>}
            </td>
            {/*<td className="py-4 px-6">*/}
            {/*<div className="w-[153px] 2xl:w-[220px] h-[120px] relative">*/}
            {/*    {article.article_image_url && <Image*/}
            {/*        className="object-cover object-top rounded-[8px]"*/}
            {/*        src={JSON.parse(article.article_image_url)[0]}*/}
            {/*        alt={article.article_image_alt ?? article.article_title}*/}
            {/*        sizes="240px"*/}
            {/*        fill*/}
            {/*    />}*/}
            {/*</div>*/}
            {/*</td>*/}

            <td className="max-w-[250px]">
                <Link
                    className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white underline hover:text-[#4041ff] hover:dark:text-blue-500 block"
                    href={`/articles/${article.article_id}/edit`}
                >
                    {article.article_title ?? 'Нет заголовка'}
                </Link>
            </td>

            <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                <div className="flex flex-col gap-1">
                    {JSON.parse(article?.category_name)?.map((c: any) => <span
                        className="bg-neutral-900 text-white rounded-[4px] px-2 w-fit">{c}</span>)}
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 dark:text-white whitespace-nowrap">
                {article?.article_views ?? 0}
            </td>
            <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap">
                {/*<div className="my-2">28.05.2024 в 11:31</div>*/}
                <div className="flex flex-col gap-2">
                    {
                        article.article_status === 'publish' && <div
                            className="py-1 px-2 text-xs bg-green-50 text-green-700 ring-1 ring-green-600 dark:bg-green-200 dark:text-green-800 rounded-md w-fit">Опубликовано
                        </div>
                    }
                    {
                        article.article_status === 'draft' && <div
                            className="py-1 px-2 text-xs bg-gray-50 text-gray-700 ring-1 ring-gray-600 dark:bg-neutral-200 dark:text-gray-800 rounded-md w-fit">Черновик
                        </div>
                    }
                    {
                        article.article_status === 'trash' && <div
                            className="py-1 px-2 text-xs bg-red-50 text-red-700 ring-1 ring-red-600 dark:bg-neutral-200 dark:text-red-800 rounded-md w-fit">Корзина
                        </div>
                    }
                    {
                        article.article_is_main && <div
                            className="py-1 px-2 text-xs bg-gray-50 text-indigo-700 ring-1 ring-indigo-600 dark:bg-neutral-200 dark:text-gray-800 rounded-md w-fit">
                            Главная статья
                        </div>
                    }
                    {
                        article.article_status === 'future' && <div
                            className="py-1 px-2 text-xs bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600 dark:bg-neutral-200 dark:text-gray-800 rounded-md w-fit">Отложенная
                            публикация
                        </div>
                    }
                </div>
            </td>
            <td className="py-4 px-6">
                <div className="flex gap-2">

                    {!article.article_is_main && article.article_status === 'publish' &&
                        <button
                            onClick={onUpdate}
                            className="text-neutral-800 group block ring-1 ring-neutral-400 bg-neutral-300 rounded-[4px] h-fit p-1">

                            <IoMdStar
                                className="group-hover:text-yellow-500"
                                size={24}
                                title="Выбрать главной статьей"
                            />

                        </button>}


                    {
                        (article.article_status === 'draft' || article.article_status === 'future') &&
                        <button
                            onClick={onPublish}
                            className="text-neutral-800 group block ring-1 ring-neutral-400 bg-neutral-300 rounded-[4px] h-fit p-1">
                            <FaCircleArrowRight
                                className="group-hover:text-blue-700"
                                size={24}
                                title="Опубликовать"
                            />
                        </button>
                    }

                    {
                        article.article_status === 'publish' &&
                        <button
                            onClick={onUnPublish}
                            className="text-neutral-800 group block ring-1 ring-neutral-400 bg-neutral-300 rounded-[4px] h-fit p-1">
                            <FaCircleArrowLeft
                                className="group-hover:text-blue-700"
                                size={24}
                                title="Снять с публикации"
                            />
                        </button>
                    }

                    <a
                        className="text-neutral-800 group block ring-1 ring-neutral-400 bg-neutral-300 rounded-[4px] h-fit p-1"
                        href={`https://thespaintoday.com/${year}/${month}/${article.article_slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaEye
                            className="group-hover:text-blue-700"
                            size={24}
                            title="Просмотр"
                        />
                    </a>


                    {!article.article_is_main &&
                        <button
                            onClick={
                                () => {
                                    let result = confirm(`Вы действительно хотите удалить статью: \n «${article.article_title}»`);

                                    if (result) {
                                        return deleteArticle(article.article_id)
                                            .then(() => toast("Статья удалена", {
                                                position: "top-right",
                                                type: "success",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "colored",
                                                transition: Bounce,
                                            }))
                                            // .then(() => setTimeout(() => location.reload(),1000))
                                            .then(() => location.reload())
                                            .catch(() => toast("Ошибка при удалении", {
                                                    position: "top-right",
                                                    type: "error",
                                                    autoClose: 5000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "colored",
                                                    transition: Bounce
                                                })
                                            );
                                    } else {
                                        return;
                                    }
                                }
                            }
                            className="ring-1 ring-neutral-400 bg-neutral-300 rounded-[4px] h-fit p-1">
                            <MdDeleteForever
                                className="text-red-500"
                                size={24}
                                title="Удалить"
                            />
                        </button>
                    }
                </div>
            </td>
        </tr>


        {/*<pre>{JSON.stringify(article, null, 2)}</pre>*/}
    </>
}

async function deleteArticle(articleId: string) {
    const res = await fetch(`${process.env.API_URL}/admin/articles/${articleId}`, {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    return res.json();
}

async function publishArticle(articleId: string) {
    const res = await fetch(`${process.env.API_URL}/admin/articles/${articleId}/publish`, {
        method: 'PATCH',
        cache: 'no-store',
        body: JSON.stringify({}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    return res.json();
}

async function unpublishArticle(articleId: string) {
    const res = await fetch(`${process.env.API_URL}/admin/articles/${articleId}/unpublish`, {
        method: 'PATCH',
        cache: 'no-store',
        body: JSON.stringify({}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    return res.json();
}

async function updateArticle(articleId: string) {
    const res = await fetch(`${process.env.API_URL}/admin/articles/top/${articleId}`, {
        method: 'PATCH',
        cache: 'no-store',
        body: JSON.stringify({}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    return res.json();
}
