import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { createPublicClipboard } from "@/services/publicClipboard";

type Props = {
  onShareSuccess: (code: string) => void;
};

export default function ShareClipboardCard({
  onShareSuccess,
}: Props) {

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleShare() {

    if (!content.trim()) return;

    setLoading(true);

    try {

      const result = await createPublicClipboard(content);

      onShareSuccess(result.code);

      setContent("");

    } finally {

      setLoading(false);

    }
  }

  return (
    <Card className="p-6 space-y-4">

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your text here..."
        className="min-h-48"
      />

      <Button
        className="w-full"
        onClick={handleShare}
        disabled={loading}
      >
        {loading ? "Sharing..." : "Share Clipboard"}
      </Button>

    </Card>
  );
}
