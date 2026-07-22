import { useState } from "react";

import type { Clipboard } from "@/types/clipboard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateClipboard } from "@/services/clipboardService";



import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
    clipboard: Clipboard;
    onUpdated: () => void;
};

export default function EditClipboardDialog({
    clipboard,
    onUpdated,
}: Props) {
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState(clipboard.title);

    const [content, setContent] = useState(clipboard.content);

    const [loading, setLoading] = useState(false);
    async function handleUpdate() {

        if (!title.trim() || !content.trim()) {
            return;
        }
    
        setLoading(true);
    
        try {
    
            await updateClipboard(
                clipboard.id,
                title,
                content,
            );
    
            onUpdated();
    
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
    render={<Button />}
>
    Edit
</DialogTrigger>

            <DialogContent className="space-y-4">

<h2 className="text-2xl font-bold">

    Edit Clipboard

</h2>

<Input
    value={title}
    onChange={(e) =>
        setTitle(e.target.value)
    }
/>

<Textarea
    value={content}
    onChange={(e) =>
        setContent(e.target.value)
    }
/>

<Button
    className="w-full"
    onClick={handleUpdate}
    disabled={loading}
>
    {
        loading
            ? "Saving..."
            : "Save Changes"
    }
</Button>

</DialogContent>

        </Dialog>

    );

}