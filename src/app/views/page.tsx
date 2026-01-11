"use client";

import {Header} from "@/app/Header";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ArticleList} from "@/app/articles/ArticleList";
import {ArticleItem} from "@/app/articles/ArticleItem";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import type {ValueType, NameType} from "recharts/types/component/DefaultTooltipContent";
import {format} from "date-fns";

interface Article {
    article_id: string;
    title: string;
    views: number;
}

interface ChartDataPoint {
    day: string;
    views: number;
}

export default function Views() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [articlesRes, chartRes] = await Promise.all([
                    getTop100Views(),
                    getChartData()
                ]);
                
                if (articlesRes) setArticles(articlesRes);
                if (chartRes) setChartData(chartRes);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            setArticles([]);
            setChartData([]);
        };
    }, []);

    const tooltipFormatter = useCallback((value: ValueType, name: NameType) => {
        return [value, 'Просмотры'];
    }, []);

    const labelFormatter = useCallback((label: string) => {
        return format(label, 'dd/MM/yyyy');
    }, []);

    const tickFormatter = useCallback((tickItem: string) => {
        return format(tickItem, 'dd/MM/yyyy');
    }, []);

    const articlesList = useMemo(() => (
        articles.map((article) => (
            <ArticleItem key={article.article_id} article={article}/>
        ))
    ), [articles]);

    if (isLoading) {
        return (
            <div>
                <Header>Просмотры</Header>
                <div className="flex justify-center items-center h-64">
                    <span className="text-lg">Загрузка...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header>Просмотры</Header>

            <h2 className="mt-4 pl-4 font-bold text-[28px]">
                Общее количество просмотров за последние 7 дней
            </h2>

            <div className="mb-10 mt-4 w-full max-w-[900px]">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <Line 
                            type="monotone" 
                            dataKey="views" 
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                        <CartesianGrid stroke="#ccc"/>
                        <Tooltip
                            formatter={tooltipFormatter}
                            labelFormatter={labelFormatter}
                        />
                        <XAxis dataKey="day" tickFormatter={tickFormatter}/>
                        <YAxis dataKey="views"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <h2 className="pl-4 font-bold text-[28px]">
                Топ 100 статей по просмотрам
            </h2>

            <div className="m-4 border border-slate-300 dark:border-austrian-red-border bg-neutral-200 dark:bg-neutral-700 rounded-[8px] w-fit">
                <ArticleList>
                    {articlesList}
                </ArticleList>
            </div>
        </div>
    );
}

async function getTop100Views(): Promise<Article[] | null> {
    try {
        const res = await fetch(`${process.env.API_URL}/admin/views`, {
            cache: 'no-store',
        });
        
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

async function getChartData(): Promise<ChartDataPoint[] | null> {
    try {
        const res = await fetch(`${process.env.API_URL}/admin/chartData`, {
            cache: 'no-store',
        });
        
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}
