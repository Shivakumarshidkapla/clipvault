import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { SharedClipboard } from "@/types/sharedClipboard";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    clipboard: SharedClipboard | null;
    onImport: () => void;
};

export default function OpenSharedClipboardDialog({
    open,
    onOpenChange,
    clipboard,
    onImport,
}: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-2xl">

                <DialogHeader>
                    <DialogTitle>
                        Shared Clipboard
                    </DialogTitle>
                </DialogHeader>

                {clipboard && (
                    <>
                        <div className="space-y-6">

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Title
                                </p>

                                <h2 className="text-2xl font-bold">
                                    {clipboard.title}
                                </h2>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Content
                                </p>

                                <div className="rounded-lg border p-4 whitespace-pre-wrap min-h-[250px]">
                                    {clipboard.content}
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 pt-4">

                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>

                            <Button onClick={onImport}>
                                Import Clipboard
                            </Button>

                        </div>
                    </>
                )}

            </DialogContent>
        </Dialog>
    );
}