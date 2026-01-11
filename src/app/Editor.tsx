import React, {
    forwardRef,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import "quill/dist/quill.snow.css";
import {Header} from "@/app/Header";
import {useForm} from "react-hook-form"
import Quill from "quill";
import {Bounce, toast} from "react-toastify";
import {useParams, usePathname} from "next/navigation";
import {useRouter} from "next/navigation";
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Image from "next/image";
import {images} from "next/dist/build/webpack/config/blocks/images";

interface IFormInput {
    article_title: string
    article_short_description?: string
    category_id: string
}

// Editor is an uncontrolled React component
const Editor = forwardRef(
    // @ts-ignore
    ({readOnly, defaultValue, onTextChange, onSelectionChange}, ref: any) => {
        const pathname = usePathname()
        const containerRef = useRef(null);
        const defaultValueRef = useRef<any>(defaultValue);
        const onTextChangeRef = useRef(onTextChange);
        const onSelectionChangeRef = useRef(onSelectionChange);
        const [htmlContent, setHtmlContent] = useState('');
        const {register, watch, setValue} = useForm<IFormInput>({
            defaultValues: {
                article_title: defaultValueRef.current?.article_title ? defaultValueRef.current?.article_title : "",
                // article_short_description: defaultValueRef.current?.article_content ? defaultValueRef.current?.article_content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').slice(0, 160) : '',
                category_id: defaultValueRef.current.category_id ? defaultValueRef.current.category_id : "",
            }
        })
        const [files, setFiles] = useState([]);
        const [range, setRange] = useState(0);

        const [open, setOpen] = useState(false);
        const [mainPhoto, setMainPhoto] = useState<any>();
        const [modalType, setModalType] = useState<'MAIN_IMAGE' | 'ARTICLE_IMAGE'>('MAIN_IMAGE');

        const onOpenModal = (type: 'MAIN_IMAGE' | 'ARTICLE_IMAGE') => {
            if (type === 'MAIN_IMAGE') {
                setModalType('MAIN_IMAGE');
            } else {
                setModalType('ARTICLE_IMAGE')
            }

            setOpen(true)
        };
        const onCloseModal = () => {
            setOpen(false);
        }

        // setValue('category_id', defaultValueRef.current.category_id)

        // console.log(defaultValueRef.current.category_id)


        const [categories, setCategories] = useState([]);

        const articleTitle = watch("article_title");
        const articleShortDescription = watch("article_short_description");
        const articleCategories = watch("category_id");

        const router = useRouter();

        useEffect(() => {
            const container: any = containerRef.current;
            const editorContainer = container.appendChild(
                container?.ownerDocument.createElement('div'),
            );

            const toolbarOptions = [
                [{'header': [2, 3, 4, false]}],
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote'],
                ['link', 'video'],

                ['undo'],
                ['redo'],
                // ['link', 'image', 'video'],

                [{'header': 2}, {'header': 3}, {'header': 4}],               // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            ];

            let icons: any = Quill.import("ui/icons");
            icons["undo"] = `<svg viewbox="0 0 18 18" id="undo">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
            icons["redo"] = `<svg viewbox="0 0 18 18" id="redo">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

            const quill = new Quill(editorContainer, {
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                },
                // formats: [''],
            });

            ref.current = quill;

            const undoEl = document.getElementById("undo")!;
            const redoEl = document.getElementById("redo")!;

            undoEl.addEventListener("click", () => quill.history.undo());
            redoEl.addEventListener("click", () => quill.history.redo());


            // console.log(defaultValueRef.current)

            if (defaultValueRef.current.article_content) {
                // quill.setContents(defaultValueRef.current);
                quill.root.innerHTML = defaultValueRef.current.article_content ?? '';
            }

            quill.on(Quill.events.TEXT_CHANGE, (...args: any) => {
                onTextChangeRef.current?.(...args);
                // console.log(quill.root.innerHTML);
                // console.log(...args)

                // const spaceRegex = /<p>\s*<\/p>/gi;
                // const regex = /<p>(\s|&nbsp;)?<\/p>/gi;

                setHtmlContent(quill.root.innerHTML)
                // setRange(args.retain)
            });

            quill.on(Quill.events.SELECTION_CHANGE, (...args: any) => {
                onSelectionChangeRef.current?.(...args);
                setRange(args.index)
                // console.log(...args);
                console.log(...args)
            });

            return () => {
                ref.current = null;
                container.innerHTML = '';
            };
        }, [ref]);

        useLayoutEffect(() => {
            onTextChangeRef.current = onTextChange;
            onSelectionChangeRef.current = onSelectionChange;
        });

        useEffect(() => {
            getCategories().then(c => {
                setCategories(c)

                if (!defaultValue.category_id) {
                    setValue('category_id', c[0].category_id);
                } else {
                    setValue('category_id', defaultValue.category_id);
                }

            })

            // getFiles("2024", "06")
            //     .then((f) => setFiles(f));

            getImages()
                .then((f) => setFiles(f));
        }, []);

        // useEffect(() => {
        //     ref.current?.enable(!readOnly);
        // }, [ref, readOnly]);


        const saveArticle = async () => {
            const isEdit = pathname.includes('edit');
            const messageText = isEdit ? 'Изменения сохранены' : 'Черновик создан';

            const body = {
                article_title: articleTitle.trim(),
                article_short_description: articleShortDescription,
                article_content: htmlContent,
                article_categories: articleCategories,
                article_main_image: mainPhoto?.image_id ? mainPhoto.image_id : JSON.parse(defaultValue?.article_image_url)[0]?.image_id,
            }

            console.log(body)

            if (isEdit) {
                const articleId = pathname.split('/')[2];

                await updateArticle(body, articleId)
                    .then(() => router.push('/articles'))
                    .then(() => toast(messageText, {
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
                    .catch(() => toast("Ошибка при редактировании", {
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

            } else {
                await createArticle(body)
                    .then(() => router.push('/articles'))
                    .then(() => toast(messageText, {
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
                    .catch(() => toast("Ошибка при создании", {
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
        }

        return <div>
            <style>
                {
                    `
                        .ql-editor {
                            min-height: 400px;
                        }
                    `
                }
            </style>

            <Header className="flex items-center justify-between">
                {/*{(defaultValueRef.current?.article_title && !articleTitle.length) &&*/}
                {/*    <div>{defaultValueRef.current?.article_title}</div>}*/}

                {
                    articleTitle?.length > 0 &&
                    <div>{articleTitle}</div>
                }


                {!articleTitle?.length && 'Создание новой статьи'}

                <button
                    onClick={saveArticle}
                    className="ring-1 ring-neutral-900 bg-neutral-900 px-4 py-2 rounded-[4px] text-sm text-white disabled:opacity-30"
                    disabled={!articleTitle || !htmlContent}
                >
                    Сохранить
                </button>
            </Header>

            <div className="mx-2 mt-4">
                <div
                    className="rounded-[8px] border border-solid border-slate-300 bg-neutral-200 dark:border-slate-700 dark:bg-neutral-800 mx-2 p-4">

                    <div className="flex flex-col">
                        {/*<pre>{JSON.stringify(defaultValue, null, 2)}</pre>*/}
                        <label className="mr-3"><span
                            className="font-bold dark:text-white">Главное изображение статьи:</span>
                        </label>
                        {defaultValue?.article_image_url && articleCategories !== "5da8cf54-7c2a-4b26-8934-a13a8bbe116f" && !mainPhoto &&
                            <Image
                                className="mt-2 w-full h-screen max-w-[600px] max-h-[340px] object-cover bg-at-border object-top transition-all border-b border-at-border"
                                alt={"11"}
                                src={defaultValue?.article_image_url.length > 0 ? JSON.parse(defaultValue?.article_image_url)[0]?.image_url : ''}
                                width={600} height={340}/>

                        }
                        {defaultValue?.article_image_url && articleCategories === "5da8cf54-7c2a-4b26-8934-a13a8bbe116f" &&
                            <Image
                                className="mt-2 h-[180px] object-cover bg-at-border object-top transition-all border-b border-at-border"
                                alt={"11"}
                                src={defaultValue?.article_image_url.length > 0 ? JSON.parse(defaultValue?.article_image_url)[0]?.image_url :  ''}
                                width={130} height={180}/>
                        }
                        {
                            !defaultValue?.article_image_url && !mainPhoto?.image_url &&
                            <div
                                className="cursor-pointer bg-gray-300 hover:text-gray-400 hover:border-gray-400 transition-all mt-4 text-[100px] text-gray-500 border-4 border-dashed rounded-[18px] max-h-[340px] max-w-[600px] h-screen border-gray-500 flex items-center justify-center"
                                onClick={() => onOpenModal('MAIN_IMAGE')}
                            >
                                +
                            </div>
                        }
                        {
                            mainPhoto?.image_url && <Image
                                className="mt-2 w-full max-w-[600px] max-h-[340px] object-cover object-top bg-at-border group-hover:opacity-80 transition-all"
                                width={600}
                                height={340}
                                alt={modalType}
                                src={mainPhoto?.image_url}/>
                        }
                        {
                            (!defaultValue?.article_image_url && mainPhoto?.image_url || defaultValue?.article_image_url) &&
                            <div
                                onClick={() => onOpenModal('MAIN_IMAGE')}
                                className="text-blue-500 text-[18px] mt-2 underline cursor-pointer">Выбрать
                                другое изображение</div>
                        }
                    </div>

                    <div className="mt-4 flex flex-col">
                        <label className="mr-3"><span
                            className="font-bold dark:text-white">Заголовок статьи &lt;h1&gt;</span>
                            <span className="text-red-500">*</span>:</label>
                        <input
                            className="mt-2 rounded-[8px] border-slate-200 dark:bg-neutral-600 dark:border-slate-600" {...register("article_title", {required: true})} />
                    </div>

                    <div className="mt-4 flex flex-col">
                        <label className="mr-3 dark:text-white"><span
                            className="font-bold">Выбор категории</span>
                            <span className="text-red-500">*</span>:</label>
                        <select value={articleCategories}
                                className="mt-2 rounded-[8px] border-slate-200 dark:bg-neutral-600 dark:border-slate-600" {...register("category_id", {required: true})}>
                            {
                                categories.map((c: any) =>
                                    <option
                                        key={c.category_id}
                                        value={c.category_id}>{c.category_name}</option>)
                            }
                        </select>
                    </div>

                    {/*<div className="mt-4 flex flex-col">*/}
                    {/*    <label className="mr-3"><span*/}
                    {/*        className="font-bold">Короткое описание статьи (150-160 символов) (опционально)</span>:</label>*/}

                    {/*    <div className="relative">*/}
                    {/*        <textarea*/}
                    {/*            className="mt-2 rounded-[8px] border-slate-200 w-full dark:bg-neutral-600 dark:border-slate-600"*/}
                    {/*            rows={3}*/}
                    {/*            maxLength={160}*/}
                    {/*            {...register("article_short_description", {*/}
                    {/*                required: false,*/}
                    {/*                maxLength: 160*/}
                    {/*            })} />*/}

                    {/*        <span*/}
                    {/*            className="absolute right-[10px] bottom-[10px] text-neutral-400">{articleShortDescription.length}/160</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                    {/*<div*/}
                    {/*    className="w-[153px] 2xl:w-[220px] relative my-4">*/}
                    {/*    {defaultValueRef.current?.article_image_url && <Image*/}
                    {/*        className="object-cover rounded-[8px]"*/}
                    {/*        src={defaultValueRef.current.article_image_url}*/}
                    {/*        alt={defaultValueRef.current.article_title}*/}
                    {/*        sizes="240px"*/}
                    {/*        fill*/}
                    {/*    />}*/}
                    {/*</div>*/}

                    <div className="mt-4 flex flex-col">
                        <label className="mr-3"><span
                            className="font-bold dark:text-white">Основное содержание статьи <span
                            className="text-red-500">*</span></span>:</label>

                        <button
                            className="mt-4 w-fit bg-neutral-800 text-white p-2 rounded-[8px]"
                            onClick={() => onOpenModal('ARTICLE_IMAGE')}>Добавить
                            изображение в статью
                        </button>

                        <div
                            className="mt-2 bg-white dark:bg-neutral-400 qe-editor relative"
                            ref={containerRef}/>
                    </div>
                </div>


                {/*Вторая колонка*/}
                {/*<div className="mx-2 mt-4">*/}
                {/*    <pre*/}
                {/*        className="whitespace-pre-wrap bg-neutral-800 text-green-light p-4 rounded-[8px] break-words">{JSON.stringify({*/}
                {/*        article_title: articleTitle,*/}
                {/*        article_categories: articleCategories,*/}
                {/*        article_short_description: articleShortDescription,*/}
                {/*        article_content: htmlContent*/}
                {/*    }, null, 2)}</pre>*/}
                {/*</div>*/}
            </div>

            <Modal
                classNames={{modal: 'rounded-[8px] min-w-[375px]'}}
                open={open}
                onClose={onCloseModal}
                center
            >
                <h2>Выбор изображения</h2>

                <div
                    className="m-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
                    {
                        files.map((file: any, i: number, files: any[]) => {
                            // console.log(file.path);
                            // return <pre>{JSON.stringify(files, null, 2)}</pre>
                            return <div>
                                <Image
                                    onClick={
                                        () => {
                                            if (modalType === 'ARTICLE_IMAGE') {
                                                ref.current.insertEmbed(range, 'image', file.image_url)
                                            } else {
                                                setMainPhoto(file)
                                            }

                                            onCloseModal()
                                        }
                                    }
                                    className="object-contain"
                                    key={i}
                                    src={file.image_url} alt={file.image_url}
                                    width={160} height={160}/>

                                {file.image_width} x {file.image_height}
                            </div>
                        })
                    }
                </div>
            </Modal>
        </div>
    },
);

// Editor.displayName = 'Editor';
export default Editor;

async function createArticle(body: any) {
    const res = await fetch(`${process.env.API_URL}/admin/articles`, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    return res.json();
}

async function updateArticle(body: any, articleId: string) {
    const res = await fetch(`${process.env.API_URL}/admin/articles/${articleId}`, {
        method: 'PATCH',
        cache: 'no-store',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    return res.json();
}

async function getCategories() {
    const res = await fetch(`${process.env.API_URL}/admin/categories`, {cache: 'no-store'})
    return res.json();
}

async function getImages() {
    const res = await fetch(`${process.env.API_URL}/admin/images`, {cache: 'no-store'})
    return res.json();
}

async function getFiles(year?: string | null, month?: string | null) {
    const res = await fetch(`${process.env.API_URL}/admin/files${year ? `?year=${year}` : ''}${month ? `&month=${month}` : ''}`, {cache: 'no-store'})
    return res.json();
}
