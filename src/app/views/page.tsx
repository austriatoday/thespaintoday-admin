"use client";

import {Header} from "@/app/Header";
import React, {useEffect, useState} from "react";
import {ArticleList} from "@/app/articles/ArticleList";
import {ArticleItem} from "@/app/articles/ArticleItem";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {format} from "date-fns";

export default function Views() {
    const [articles, setArticles] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        getTop100Views().then((res) => {
            setArticles(res)
        });

        getChartData().then((res) => {
            setChartData(res)
            console.log(res);
        });

        return () => setArticles([]);
    }, []);

    const data = [{
        name: 'Page A',
        uv: 400,
        pv: 2400,
        amt: 2400
    }, {name: 'Page B', uv: 4400, pv: 3400, amt: 1400}];


    return <div>
        <Header>Просмотры</Header>

        <h2 className="mt-4 pl-4 font-bold text-[28px]">
            Общее количество просмотров за последние 7 дней
        </h2>

        <div className="mb-10 mt-4">
            <LineChart width={900} height={300} data={chartData}>
                <Line type="monotone" dataKey="views" stroke="#8884d8"
                      strokeWidth={2}/>
                <CartesianGrid stroke="#ccc"/>
                <Tooltip
                    formatter={(value, name, props) => formatter(value, name)}
                    labelFormatter={(label) => format(label, 'dd/MM/yyyy')}
                />
                <XAxis dataKey="day"
                       tickFormatter={(tickItem) => format(tickItem, 'dd/MM/yyyy')}/>
                <YAxis dataKey="views"/>
            </LineChart>
        </div>

        <h2 className="pl-4 font-bold text-[28px]">Топ 100 статей по
            просмотрам</h2>

        <div
            className="m-4 border border-slate-300 dark:border-austrian-red-border bg-neutral-200 dark:bg-neutral-700 rounded-[8px] w-fit">
            <ArticleList>
                {articles.map((article: any) =>
                    <ArticleItem key={article.article_id}
                                 article={article}/>)}
            </ArticleList>
        </div>
    </div>
}

const formatter = (value: any, name: any) => {
    // props.payload.day = format(props.payload.day, 'dd/MM/yyyy')
    name = 'Просмотры'
    return [value, name];
}

async function getTop100Views() {
    let res;

    res = await fetch(`${process.env.API_URL}/admin/views`, {
        cache: 'no-store',
    })

    return res.json();
}

async function getChartData() {
    let res;

    res = await fetch(`${process.env.API_URL}/admin/chartData`, {
        cache: 'no-store',
    })

    return res.json();
}
