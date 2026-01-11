import {MetadataForm} from "@/app/seo/MetadataForm";
import {Suspense} from "react";
import {Header} from "@/app/Header";

export default async function SeoPage() {
    const metadata = await getMetadata()

    return <div className="">
        <Header>SEO</Header>

        <Suspense fallback={'Загрузка...'}>
            <MetadataForm metadata={metadata}/>
        </Suspense>
    </div>
}

async function getMetadata() {
    const res = await fetch(`${process.env.API_URL}/metadata`, {
        cache: 'no-store',
    });

    return res.json();
}
