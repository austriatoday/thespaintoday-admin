"use client";

import React, {memo, useRef} from "react";
import Editor from "@/app/Editor";

const EditorWrapper = memo(() => {
    const quillRef = useRef(null);

    // @ts-ignore
    return <Editor ref={quillRef} defaultValue={{}}/>
});

export default EditorWrapper;
