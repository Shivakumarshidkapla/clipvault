import { useEffect, useState } from "react";


import CreateClipboardDialog from "@/components/clipboard/CreateClipboardDialog";

import { getClipboards } from "@/services/clipboardService";

import type { Clipboard } from "@/types/clipboard";
import ClipboardCard from "@/components/clipboard/ClipboardCard";
import { deleteClipboard } from "@/services/clipboardService";

export default function DashboardPage() {

    const [clipboards, setClipboards] =
        useState<Clipboard[]>([]);

    async function loadClipboards() {

        const data = await getClipboards();

        setClipboards(data);

    }

    async function handleDelete(id: string) {

        await deleteClipboard(id);
    
        loadClipboards();
    
    }

    useEffect(() => {

        loadClipboards();

    }, []);

    return (

        <div className="max-w-5xl mx-auto p-8 space-y-8">

            <h1 className="text-4xl font-bold">

                My Clipboards

            </h1>

            <CreateClipboardDialog
                onCreated={loadClipboards}
            />

            {
                clipboards.length === 0 ? (

                    <p className="text-gray-500">

                        No clipboards found.

                    </p>

                ) : (

                    clipboards.map((clipboard) => (

                        <ClipboardCard
    key={clipboard.id}
    clipboard={clipboard}
    onDelete={handleDelete}
    onUpdated={loadClipboards}
/>

                    ))

                )
            }

        </div>

    );

}