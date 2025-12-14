"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function RestartExamButton({
  onRestart,
}: {
  onRestart: () => void;
}) {
  return (
    <Button onClick={onRestart} variant={"secondary"} className="w-1/2">
      <RotateCcw />
      Restart
    </Button>
  );
}
