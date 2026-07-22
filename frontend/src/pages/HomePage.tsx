import { useState } from "react";

import ClipboardSuccess from "@/components/clipboard/ClipboardSuccess";
import OpenClipboardCard from "@/components/clipboard/OpenClipboardCard";
import ShareClipboardCard from "@/components/clipboard/ShareClipboardCard";

export default function HomePage() {

  const [shareCode, setShareCode] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-2xl space-y-6">

        <h1 className="text-5xl font-extrabold text-center">
          ClipVault
        </h1>

        <p className="text-center text-muted-foreground">
          Secure clipboard sharing with optional accounts.
        </p>

        <ShareClipboardCard
          onShareSuccess={setShareCode}
        />

        <ClipboardSuccess
          shareCode={shareCode}
        />

        <OpenClipboardCard />

      </div>

    </div>
  );
}