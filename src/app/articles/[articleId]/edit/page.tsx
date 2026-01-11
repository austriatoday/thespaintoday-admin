"use client";
import {useParams} from "next/navigation";
import {Suspense, useEffect, useRef, useState} from "react";
import Editor from "@/app/Editor";

export default function ArticleEditPage() {
    const {articleId} = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<any>({});

    useEffect(() => {
        getArticle(articleId).then((a) => {
            setArticle(a)
        });

        return () => setArticle({});
    }, [articleId])

    const quillRef = useRef(null);

    return <Suspense fallback={'Загрузка...'}>
        {article.article_content && <Editor
            ref={quillRef}
            // readOnly={readOnly}
            //@ts-ignore
            defaultValue={article}
            // onSelectionChange={setRange}
            // onTextChange={setLastChange}
        />}

        {/*<pre className="">{JSON.stringify(article, null, 2)}</pre>*/}
    </Suspense>
}

async function getArticle(articleId: string) {
    const res = await fetch(`${process.env.API_URL}/admin/articles/${articleId}`, {cache: 'no-store'})
    return res.json();
}
