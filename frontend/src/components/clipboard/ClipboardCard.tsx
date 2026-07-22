import type { Clipboard } from "@/types/clipboard";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditClipboardDialog from "@/components/clipboard/EditClipboardDialog";
import ShareClipboardDialog from "@/components/clipboard/ShareClipboardDialog";


type Props = {

    clipboard: Clipboard;
    onDelete: (id: string) => void;
    onUpdated: () => void;

};

export default function ClipboardCard({

    clipboard,
    onDelete,
    onUpdated,

}: Props) {

    return (

        <Card className="flex flex-col h-72 p-6 transition-shadow hover:shadow-lg">

            <h2 className="text-xl font-bold mb-3">

                {clipboard.title}

            </h2>

            <p className="text-muted-foreground line-clamp-4 flex-1">

                {clipboard.content}

            </p>
            <div className="flex justify-end gap-2 mt-6">
            <div className="mt-auto flex justify-end gap-2 pt-4">

            <EditClipboardDialog
    clipboard={clipboard}
    onUpdated={onUpdated}
    
/>
<ShareClipboardDialog
        clipboardId={clipboard.id}
    />

<Button
    variant="destructive"
    onClick={() => onDelete(clipboard.id)}
>
    Delete
</Button>

</div>
                

            </div>

        </Card>

    );

}