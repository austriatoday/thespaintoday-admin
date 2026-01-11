"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";

export function SearchBar() {
    const {register, handleSubmit} = useForm<any>({
        defaultValues: {
            search: ''
        }
    })

    const router = useRouter();

    const onSubmit = async (data: any) => {
        if (!data.search.length) {
            return;
        }

        router.push(`/articles/search-result?search=${data.search}`);
    }

    return <form onSubmit={handleSubmit(onSubmit)}
                 className="flex mt-4 ml-4 w-s"
    >
        <input
            autoComplete="off"
            className="border-slate-400 w-[500px] dark:bg-neutral-600 dark:border-slate-600"
            {...register("search", {required: true})}
        />
        <button
            className="bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-30"
        >Найти
        </button>
    </form>
}
