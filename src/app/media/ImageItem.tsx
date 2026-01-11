"use client"

import Image from "next/image";

export function ImageItem({image}: { image?: any }) {
    return <>
        <tr className={`hover:bg-gray-200 dark:hover:bg-neutral-800 bg-neutral-100 dark:bg-neutral-700 text-left dark:border-austrian-red-border border-b border-neutral-300`}>
            <td className="max-w-[400px] py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                {/*{JSON.stringify(image, null, 2)}*/}
                <Image src={image.image_url} width={300} height={300} alt={image.image_file_name} />
                <div className="mt-2">{image.image_file_name}</div>
            </td>

            <td className="max-w-[250px] text-gray-500 dark:text-gray-400">
                {image.image_width} x {image.image_height}
            </td>

            <td className="py-4 px-6 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {formatBytes(image.image_file_size)}
            </td>
        </tr>
    </>
}

function formatBytes(bytes: any, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
