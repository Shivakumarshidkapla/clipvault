import type { Clipboard } from "@/types/clipboard";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditClipboardDialog from "@/components/clipboard/EditClipboardDialog";
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

        <Card className="p-6 space-y-4">

            <h2 className="text-xl font-bold">

                {clipboard.title}

            </h2>

            <p className="text-gray-600">

                {clipboard.content}

            </p>

            <div className="flex gap-2">

            <EditClipboardDialog
    clipboard={clipboard}
    onUpdated={onUpdated}
/>

                <Button
    variant="destructive"
    onClick={() => onDelete(clipboard.id)}
>
    Delete
</Button>

            </div>

        </Card>

    );

}