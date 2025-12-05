"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useMemo, useEffect, useState, useRef, forwardRef } from "react";

// Forward ref to ReactQuill to fix type error
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill-new");
        return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
    },
    { ssr: false }
);

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    uploadType?: "blog" | "case-study";
}

export function RichTextEditor({ value, onChange, uploadType = "blog" }: RichTextEditorProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const registerModules = async () => {
            // Register the image resize module on the client side only
            if (typeof window !== "undefined") {
                try {
                    const { default: ReactQuill } = await import("react-quill-new");
                    const Quill = ReactQuill.Quill;
                    const { default: BlotFormatter } = await import("quill-blot-formatter");

                    // Only register if not already registered
                    if (Quill && !Quill.imports["modules/blotFormatter"]) {
                        Quill.register("modules/blotFormatter", BlotFormatter);
                    }
                    setIsLoaded(true);
                } catch (error) {
                    console.error("Failed to load Quill modules:", error);
                    // Even if it fails, we should load the editor without the module
                    setIsLoaded(true);
                }
            }
        };
        registerModules();
    }, []);

    // Custom image handler
    const imageHandler = useMemo(() => {
        return () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
                const file = input.files?.[0];
                if (file) {
                    try {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("type", uploadType);

                        // We need to dynamically import axios here or pass it as a prop if we want to avoid dependency
                        // But since this is a client component, importing axios is fine
                        const { default: axios } = await import("axios");
                        const response = await axios.post("/api/upload", formData);
                        const url = response.data.url;

                        // Insert the image into the editor
                        // We need to access the Quill instance. Since we don't have a ref here easily accessible in this scope without refactoring,
                        // we can use a slightly different approach or assume the user will click the button which triggers this.
                        // However, the standard way in react-quill is to use a ref.
                        // Let's use a document selector as a fallback or refactor to use a ref.
                        // Better approach: The handler is called by Quill, so 'this' context might be available if not using arrow function,
                        // but with functional components and useMemo, we need the quill instance.

                        // Actually, let's use a ref for the ReactQuill component to get the editor instance.
                        const quill = (document.querySelector(".rich-text-editor .ql-editor") as any)?.__quill;
                        // Or better, let's add a ref to the component.

                        // Since we can't easily change the component structure in this single replace block to add a ref and pass it to useMemo 
                        // (because useMemo dependency would change), let's try to get the quill instance from the DOM for now 
                        // or rely on the fact that we can find the editor.

                        // A more robust way without refactoring the whole component to use forwardRef:
                        // We can find the quill instance via the class name if there is only one, or we need to add an ID.
                        // But wait, 'this' in the handler refers to the toolbar module if defined correctly.
                        // Let's try to use the quill instance from the ref which we will add.
                    } catch (error) {
                        console.error("Image upload failed:", error);
                        alert("Failed to upload image");
                    }
                }
            };
        };
    }, [uploadType]);

    // We need a ref to access the Quill instance
    // Since we are inside the component, we can't easily add the ref to the return statement in this block 
    // without replacing the whole return. 
    // Let's rewrite the component slightly to include the ref.

    // WAIT: The previous code didn't have a ref. I will add it.

    // Custom toolbar configuration
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    // Heading levels
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    // Font size
                    [{ size: ["small", false, "large", "huge"] }],

                    // Text formatting
                    ["bold", "italic", "underline", "strike"],

                    // Text color and background
                    [{ color: [] }, { background: [] }],

                    // Lists
                    [{ list: "ordered" }, { list: "bullet" }],

                    // Indentation
                    [{ indent: "-1" }, { indent: "+1" }],

                    // Text alignment
                    [{ align: [] }],

                    // Links and images
                    ["link", "image"],

                    // Code block and blockquote
                    ["blockquote", "code-block"],

                    // Clear formatting
                    ["clean"],
                ],
                handlers: {
                    image: () => {
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.click();

                        input.onchange = async () => {
                            const file = input.files?.[0];
                            if (file) {
                                try {
                                    const formData = new FormData();
                                    formData.append("file", file);
                                    formData.append("type", uploadType);

                                    const { default: axios } = await import("axios");
                                    const response = await axios.post("/api/upload", formData);
                                    const url = response.data.url;

                                    // Find the editor instance
                                    // This is a bit hacky but works without refactoring the whole parent/child ref flow
                                    // ideally we use a ref, but let's try to find the focused editor or the one containing this toolbar
                                    const editors = document.querySelectorAll(".rich-text-editor");
                                    // We assume the active one or the one this toolbar belongs to. 
                                    // Since the toolbar is part of the editor in Snow theme, we can find it.
                                    // But actually, 'this' context in the handler IS the toolbar, and this.quill is the editor!
                                    // We just need to use a non-arrow function or bind it? 
                                    // ReactQuill modules definition might not bind 'this' correctly if we use arrow function here.
                                    // Let's use a closure variable if we can capture the quill instance, but we can't easily.

                                    // Let's use the document query selector for the active editor or just the first one if only one exists.
                                    // A better way is to use the `useRef` hook and pass it to ReactQuill.
                                } catch (error) {
                                    console.error("Image upload failed:", error);
                                    alert("Failed to upload image");
                                }
                            }
                        };
                    }
                }
            },
            // Only include blotFormatter if we are sure it's registered (though we wait for isLoaded anyway)
            blotFormatter: {},
            clipboard: {
                matchVisual: false,
            },
        }),
        [uploadType]
    );

    // We need to define the handler properly to access the quill instance.
    // The issue is that inside useMemo, we can't easily access the quill instance ref that is defined in the component body 
    // unless we use a ref that is stable.

    // Let's add a ref for the ReactQuill component.
    const quillRef = useRef<any>(null);

    // Re-define modules to use the ref
    const modulesWithHandler = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ size: ["small", false, "large", "huge"] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    [{ align: [] }],
                    ["link", "image"],
                    ["blockquote", "code-block"],
                    ["clean"],
                ],
                handlers: {
                    image: () => {
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.click();

                        input.onchange = async () => {
                            const file = input.files?.[0];
                            if (file) {
                                try {
                                    const formData = new FormData();
                                    formData.append("file", file);
                                    formData.append("type", uploadType);

                                    const { default: axios } = await import("axios");
                                    const response = await axios.post("/api/upload", formData);
                                    const url = response.data.url;

                                    const quill = quillRef.current?.getEditor();
                                    if (quill) {
                                        const range = quill.getSelection(true);
                                        quill.insertEmbed(range.index, "image", url);
                                    }
                                } catch (error) {
                                    console.error("Image upload failed:", error);
                                    alert("Failed to upload image");
                                }
                            }
                        };
                    },
                },
            },
            blotFormatter: {},
            clipboard: {
                matchVisual: false,
            },
        }),
        [uploadType]
    );

    const formats = [
        "header",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "list",
        "indent",
        "align",
        "link",
        "image",
        "blockquote",
        "code-block",
    ];

    if (!isLoaded) {
        return (
            <div className="flex h-[300px] w-full items-center justify-center rounded-lg border border-gray-300 bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-300">
            <ReactQuill
                forwardedRef={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modulesWithHandler}
                formats={formats}
                className="rich-text-editor"
                placeholder="Start writing your content here..."
            />
            <style jsx global>{`
                .rich-text-editor .ql-container {
                    min-height: 300px;
                    font-size: 16px;
                }
                
                .rich-text-editor .ql-editor {
                    min-height: 300px;
                }
                
                .rich-text-editor .ql-toolbar {
                    background-color: #f9fafb;
                    border-bottom: 1px solid #e5e7eb;
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                }
                
                .rich-text-editor .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                }
                
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                }
                
                /* Ensure images are responsive */
                .rich-text-editor .ql-editor img {
                    max-width: 100%;
                    height: auto;
                    cursor: pointer;
                }
                
                /* Image resize handles */
                .rich-text-editor .ql-editor img.img-resizing {
                    cursor: nwse-resize;
                }
            `}</style>
        </div>
    );
}
