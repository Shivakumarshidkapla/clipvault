import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createClipboard } from "@/services/clipboardService";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
    onCreated: () => void;
};

export default function CreateClipboardDialog({
    onCreated,
}: Props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

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
            setOpen(false);

        } finally {

            setLoading(false);

        }

    }

    return (

        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
    
            <DialogTrigger
                render={
                    <Button>
                        + New Clipboard
                    </Button>
                }
            />
    
            <DialogContent className="space-y-6">
    
                <DialogTitle className="text-2xl">
    
                    New Clipboard
    
                </DialogTitle>
    
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
    
            </DialogContent>
    
        </Dialog>
    
    );

}