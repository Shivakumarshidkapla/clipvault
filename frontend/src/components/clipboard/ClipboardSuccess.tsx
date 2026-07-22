import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  shareCode: string;
};

export default function ClipboardSuccess({
  shareCode,
}: Props) {

  if (!shareCode) return null;

  async function copyCode() {
    await navigator.clipboard.writeText(shareCode);
  }

  return (
    <Card className="p-6 space-y-4">

      <h2 className="text-xl font-semibold text-green-700">
        Clipboard Shared
      </h2>

      <div className="rounded-lg border p-4">

        <p className="text-sm text-gray-500">
          Share Code
        </p>

        <p className="text-3xl font-bold tracking-widest">
          {shareCode}
        </p>

      </div>

      <Button
        className="w-full"
        onClick={copyCode}
      >
        Copy Code
      </Button>

    </Card>
  );
}