"use client"

import {useEffect, useState} from "react";
import {Bounce, toast} from "react-toastify";

export function DragDrop() {
    const [dragging, setDragging] = useState<boolean>(false)
    const [uploadForm, setUploadForm] = useState<any>(null);

    useEffect(() => {
        setUploadForm(document.getElementById('uploadFile'));
    }, []);

    const onChange = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        const files = uploadForm.files

        handleFiles(files)
            .then(() =>
                toast("Файлы загружены", {
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
            .catch(() => toast("Ошибка сервера", {
                position: "top-right",
                type: "error",
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

    const onDragEnter = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        setDragging(false)
    }

    const onDragOver = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        setDragging(true)
    }

    const onDragLeave = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        setDragging(false)
    }

    const onDrop = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        setDragging(false);

        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files)
            .then(() =>
                toast("Файлы загружены", {
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
            .catch(() => toast("Ошибка сервера", {
                position: "top-right",
                type: "error",
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

    return <div
        id="dropBox"
        className={`border-4 border-dashed border-gray-200 p-8 flex flex-col items-center ${dragging ? '!border-gray-500 bg-white' : ''}`}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
    >

        <div className="text-[18px]">
            Перетащите файлы сюда
        </div>

        <div className="mt-2 text-[16px] text-gray-500">или</div>

        <button
            className="mt-2 border border-solid border-gray-400 bg-gray-200 py-2 px-4 hover:bg-gray-300"
            onClick={() => {
                uploadForm.click()
            }}
        >
            <input
                id="uploadFile"
                accept=".png,.jpg,.jpeg,image/png"
                className="hidden"
                type="file"
                onChange={onChange}
                multiple
            />
            Выберите файлы
        </button>

        <div className="mt-4 text-[14px] text-gray-500">
            Форматы: .jpg, .jpeg, .png
        </div>
    </div>
}

function handleFiles(files: any) {
    const data = new FormData();

    for (const file of files) {
        data.append('files[]', file, file.name);
    }

    return fetch(`${process.env.API_URL}/admin/upload`, {
        method: 'POST',
        body: data,
    });
}
