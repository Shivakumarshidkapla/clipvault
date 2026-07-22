import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import CreateClipboardDialog from "@/components/clipboard/CreateClipboardDialog";
import ClipboardCard from "@/components/clipboard/ClipboardCard";

import {
    getClipboards,
    deleteClipboard,
} from "@/services/clipboardService";

import type { Clipboard } from "@/types/clipboard";

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

        <>

            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex items-center justify-between mb-10">

                    <div>

                        <h1 className="text-4xl font-bold tracking-tight">

                            Dashboard

                        </h1>

                        <p className="text-muted-foreground mt-2">

                            Manage your personal clipboards.

                        </p>

                    </div>

                    <CreateClipboardDialog
                        onCreated={loadClipboards}
                    />

                </div>

                {
                    clipboards.length === 0 ? (

                        <div className="border rounded-xl p-12 text-center">

                            <h2 className="text-xl font-semibold">

                                No clipboards yet

                            </h2>

                            <p className="text-muted-foreground mt-2">

                                Click <strong>New Clipboard</strong> to create your first clipboard.

                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {
                                clipboards.map((clipboard) => (

                                    <ClipboardCard
                                        key={clipboard.id}
                                        clipboard={clipboard}
                                        onDelete={handleDelete}
                                        onUpdated={loadClipboards}
                                    />

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </>

    );

}