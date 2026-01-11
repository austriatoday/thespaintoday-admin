export default async function Sitemaps() {
    const urls = await getUrls()

    // console.log(urls);

    const sitemapUrls = urls.map((d: any) => ({
        loc: `https://thespaintoday.com/${d.year}/${d.month}/${d.article_slug}`,
        lastmod: new Date().toISOString(),
        priority: 0.80
    }))

    return <div>
        <pre className="bg-black text-green-400 whitespace-pre-line">{JSON.stringify(sitemapUrls, null, 2)}</pre>
    </div>
}

async function getUrls() {
    const res = await fetch(`${process.env.API_URL}/admin/urls`, {cache: 'no-store'})
    return res.json();
}
