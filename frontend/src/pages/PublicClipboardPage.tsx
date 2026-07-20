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

        <div className="min-h-screen flex items-center justify-center">

            <div className="max-w-xl w-full">

            <div
  style={{
    color: "red",
    fontWeight: 900,
    fontSize: "48px",
  }}
>
  Shared Clipboard
</div>

                <textarea
                    readOnly
                    value={content}
                    className="w-full border rounded-lg p-4 h-80"
                />

            </div>

        </div>

    );

}