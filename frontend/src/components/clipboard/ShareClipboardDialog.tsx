import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { shareClipboard } from "@/services/clipboardService";

type Props = {
    clipboardId: string;
};

export default function ShareClipboardDialog({
    clipboardId,
}: Props) {

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [shareCode, setShareCode] = useState("");

    async function handleShare() {

        setLoading(true);

        try {

            const result =
                await shareClipboard(clipboardId);

                setShareCode(result.share_code);

        } finally {

            setLoading(false);

        }

    }

    function copyCode() {

        navigator.clipboard.writeText(shareCode);

    }

    return (

        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger
                render={
                    <Button variant="outline">
                        Share
                    </Button>
                }
                onClick={handleShare}
            />

            <DialogContent className="space-y-6">

                <DialogTitle>

                    Share Clipboard

                </DialogTitle>

                {
                    loading ? (

                        <p>Generating share code...</p>

                    ) : (

                        <>

                            <div className="rounded-lg border p-6 text-center">

                                <p className="text-sm text-muted-foreground">

                                    Share Code

                                </p>

                                <p className="text-3xl font-bold tracking-widest mt-2">

                                    {shareCode}

                                </p>

                            </div>

                            <Button
                                className="w-full"
                                onClick={copyCode}
                            >
                                Copy Code
                            </Button>

                        </>

                    )
                }

            </DialogContent>

        </Dialog>

    );

}