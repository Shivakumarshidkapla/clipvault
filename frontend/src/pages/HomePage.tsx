import { useState } from "react";

import ClipboardSuccess from "@/components/clipboard/ClipboardSuccess";
import OpenClipboardCard from "@/components/clipboard/OpenClipboardCard";
import ShareClipboardCard from "@/components/clipboard/ShareClipboardCard";
import AuthCard from "@/components/home/AuthCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const [shareCode, setShareCode] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const TOKEN_KEY = "clipvault_token";

const token = localStorage.getItem(TOKEN_KEY);

    

    if (token) {
        navigate("/dashboard");
    }

}, [navigate]);

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
        <AuthCard />

        <OpenClipboardCard />

      </div>

    </div>
  );
}