import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createPublicClipboard } from "@/services/publicClipboard";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
    const [content, setContent] = useState("");

const [shareCode, setShareCode] = useState("");
const [loading, setLoading] = useState(false);
const [code, setCode] = useState("");
const navigate = useNavigate();
async function handleShare() {

    if (!content.trim()) return;

    setLoading(true);

    try {

        const result =
            await createPublicClipboard(content);

        setShareCode(result.code);

        setContent("");

    } finally {

        setLoading(false);

    }
}

async function copyCode() {
    await navigator.clipboard.writeText(shareCode);

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-2xl p-8 space-y-6">

      <h1 className="text-5xl font-extrabold text-center text-black">
    ClipVault
</h1>

        <p className="text-center text-muted-foreground">
        Secure clipboard sharing with optional accounts.
        </p>

        <Textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Paste your text here..."
/>

<Button
    className="w-full"
    onClick={handleShare}
    disabled={loading}
>
    {
        loading
            ? "Sharing..."
            : "Share Clipboard"
    }
</Button>
{
    
        shareCode && (
          <Card className="mt-6 p-6 bg-green-50 border-green-200">
      
            <h2 className="text-xl font-semibold text-green-700">
              🎉 Clipboard Shared
            </h2>
      
            <p className="mt-4 text-gray-600">
              Share this code with anyone.
            </p>
      
            <div className="mt-4 rounded-lg bg-white border p-4">
      
              <p className="text-sm text-gray-500">
                Share Code
              </p>
      
              <p className="text-3xl font-bold tracking-widest">
                {shareCode}
              </p>
      
            </div>
            <Button
    className="mt-4 w-full"
    onClick={copyCode}
>
    Copy Code
</Button>
          </Card>
        )
    
}

        <div className="space-y-2">
          <p>Already have a code?</p>

          <div className="flex gap-2">
            <Input value={code}
    onChange={(e) =>
        setCode(e.target.value)
    } placeholder="Enter Code" />

            <Button onClick={() => {
    if (!code.trim()) return;

    navigate(
      `/public/${code.trim().toUpperCase()}`
    );
  }} >
              Open
            </Button>
          </div>
        </div>

      </Card>
    </div>
  );
  
}

