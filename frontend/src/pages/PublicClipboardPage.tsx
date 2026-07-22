import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPublicClipboard } from "@/services/publicClipboard";

export default function PublicClipboardPage() {

    const { code } = useParams();

    const [content, setContent] = useState("");

    useEffect(() => {

        async function loadClipboard() {

            if (!code) return;

            const result =
                await getPublicClipboard(code);

            setContent(result.content);

        }

        loadClipboard();

    }, [code]);

    return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="w-full max-w-3xl">

            <div className="rounded-xl bg-white border shadow-sm p-8">

                <h1 className="text-4xl font-bold text-center">

                    Shared Clipboard

                </h1>

                <p className="text-center text-muted-foreground mt-3 mb-8">

                    View-only shared clipboard

                </p>

                <textarea
                    readOnly
                    value={content}
                    className="min-h-[350px] resize-none"
                />

            </div>

        </div>

    </div>
);

}