import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OpenClipboardCard() {

  const [code, setCode] = useState("");

  const navigate = useNavigate();

  function handleOpen() {

    if (!code.trim()) return;

    navigate(
      `/public/${code.trim().toUpperCase()}`
    );

  }

  return (
    <Card className="p-6 space-y-4">

      <p className="font-medium">
        Already have a code?
      </p>

      <div className="flex gap-2">

        <Input
          value={code}
          onChange={(e) =>
            setCode(e.target.value)
          }
          placeholder="Enter Share Code"
        />

        <Button onClick={handleOpen}>
          Open
        </Button>

      </div>

    </Card>
  );
}