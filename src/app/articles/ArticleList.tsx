import {ReactNode} from "react";

export function ArticleList({children}: { children: ReactNode }) {
    return <table className="table-auto">
        <thead
            className="border-b border-slate-300 dark:border-austrian-red-border">
        <tr className="text-left">
            <th className="p-4 px-6" scope="col">Дата</th>
            {/*<th className="p-4 px-6" scope="col">Изображение</th>*/}
            <th className="p-4 px-6" scope="col">Заголовок</th>
            <th className="p-4 px-6" scope="col">Категория</th>
            <th className="p-4 px-6" scope="col">Просмотры</th>
            <th className="p-4 px-6" scope="col">Статус</th>
            <th className="p-4 px-6" scope="col">Действия</th>
        </tr>
        </thead>

        <tbody>
        {children}
        </tbody>
    </table>


}
