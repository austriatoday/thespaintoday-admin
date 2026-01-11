'use client';

import dynamic from "next/dynamic";

const EditorRenderPage = dynamic(() => import("@/app/EditorWrapper"), {
    ssr: false,
    loading: () => <div>Загрузка...</div>,
})

export default async function NewArticle() {
    return <EditorRenderPage/>
};
