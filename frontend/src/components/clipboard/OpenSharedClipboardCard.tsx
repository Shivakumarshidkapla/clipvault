import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import OpenSharedClipboardDialog from "./OpenSharedClipboardDialog";

import { getSharedClipboard } from "@/services/sharedClipboardService";
import { createClipboard } from "@/services/clipboardService";

import type { SharedClipboard } from "@/types/sharedClipboard";

type Props = {
    onImported: () => void;
};

export default function OpenSharedClipboardCard({
    onImported,
}: Props) {

    const [code, setCode] = useState("");

const [loading, setLoading] = useState(false);

const [open, setOpen] = useState(false);

const [clipboard, setClipboard] =
    useState<SharedClipboard | null>(null);

    async function handleOpen() {

        if (!code.trim()) return;
    
        setLoading(true);
    
        try {
    
            const result =
                await getSharedClipboard(code);
    
            setClipboard(result);
    
            setOpen(true);
    
        } finally {
    
            setLoading(false);
    
        }
    
    }
    async function handleImport() {

        if (!clipboard) return;
    
        await createClipboard(
    
            clipboard.title,
    
            clipboard.content,
    
        );
    
        setOpen(false);
    
        setCode("");
    
        onImported();
    
    }

    return (

        <>
    
            <Card className="p-6 space-y-4">
    
                <h2 className="text-xl font-semibold">
    
                    Open Shared Clipboard
    
                </h2>
    
                <p className="text-muted-foreground">
    
                    Enter a share code from another ClipVault user.
    
                </p>
    
                <div className="flex gap-3">
    
                    <Input
                        placeholder="Share Code"
                        value={code}
                        onChange={(e) =>
                            setCode(e.target.value.toUpperCase())
                        }
                    />
    
                    <Button
                        onClick={handleOpen}
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Opening..."
                                : "Open"
                        }
                    </Button>
    
                </div>
    
            </Card>
    
            <OpenSharedClipboardDialog
                open={open}
                onOpenChange={setOpen}
                clipboard={clipboard}
                onImport={handleImport}
            />
    
        </>
    
    );

}