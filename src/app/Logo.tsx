import Link from "next/link";

export default function Logo() {
    return <Link
        className="block p-4 border-b border-solid border-austrian-red-border"
        href="/">
        <div className="text-2xl font-bold">thespaintoday.com</div>
        <div className="text-md">Панель управления</div>
    </Link>

}
