"use client";

import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {Bounce, toast} from "react-toastify";

interface IFormInput {
    meta_title: string
    meta_description: string
    meta_keywords: string
}

export function MetadataForm({metadata}: any) {
    const {register, handleSubmit, setValue, reset} = useForm<IFormInput>({
        defaultValues: metadata,
    })

    useEffect(() => {
        setValue('meta_title', metadata.meta_title)
        setValue('meta_description', metadata.meta_description)

        return () => reset()
    }, [metadata]);

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        updateMetadata(metadata.general_id, data)
            .then(() => toast('Метатеги обновлены', {
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
    }

    return <form onSubmit={handleSubmit(onSubmit)}
                 className="rounded-[8px] border border-solid border-slate-300 bg-neutral-200 m-4 p-4">
        {/*<pre>{JSON.stringify(metadata, null, 2)}</pre>*/}

        {/*<Heading2 className="!text-[24px]" title="SEO"/>*/}
        {/*<Header>SEO</Header>*/}

        <div className="mt-4 flex flex-col">
            <label className="mr-3"><span
                className="font-bold">Основной тэг &lt;title&gt;</span>:</label>
            <input
                className="mt-2 rounded-[8px] border-slate-200" {...register("meta_title", {required: true})} />
        </div>

        <div className="mt-4 flex flex-col">
            <label className="mr-3"><span
                className="font-bold">Метатег &lt;description&gt;</span>:</label>
            <textarea rows={3}
                      className="mt-2 rounded-[8px] border-slate-200" {...register("meta_description", {required: true})} />
        </div>

        <div className="mt-4 flex flex-col">
            <label className="mr-3"><span
                className="font-bold">Метатег &lt;keywords&gt;</span>:</label>
            <textarea rows={3}
                      className="mt-2 rounded-[8px] border-slate-200" {...register("meta_keywords", {required: true})} />
        </div>

        <input
            className="px-4 py-2 bg-blue-700 text-white mt-4 cursor-pointer hover:bg-blue-500 rounded-[4px] transition-all"
            type="submit"
            value="Сохранить"/>
    </form>
}

async function updateMetadata(generalId: string, data: any) {
    const res = await fetch(`${process.env.API_URL}/admin/metadata/${generalId}`, {
        method: 'PUT',
        cache: 'no-store',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    return res.json();
}
