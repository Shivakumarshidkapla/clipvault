import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createClipboard } from "@/services/clipboardService";

type Props = {
    onCreated: () => void;
};

export default function CreateClipboardDialog({
    onCreated,
}: Props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleCreate() {

        if (!title.trim() || !content.trim()) {
            return;
        }

        setLoading(true);

        try {

            await createClipboard(
                title,
                content,
            );

            setTitle("");
            setContent("");

            onCreated();

        } finally {

            setLoading(false);

        }

    }

    return (

        <Card className="p-6 space-y-4">

            <h2 className="text-2xl font-bold">
                New Clipboard
            </h2>

            <Input
                placeholder="Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <Textarea
                placeholder="Content"
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
            />

            <Button
                className="w-full"
                onClick={handleCreate}
                disabled={loading}
            >
                {
                    loading
                        ? "Creating..."
                        : "Create Clipboard"
                }
            </Button>

        </Card>

    );

}