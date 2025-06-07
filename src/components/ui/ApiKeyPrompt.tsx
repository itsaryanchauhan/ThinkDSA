import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiKeyPromptProps {
  open: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
}

const ApiKeyPrompt = ({ open, onClose, onSave }: ApiKeyPromptProps) => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!key.trim()) {
      setError("API key is required");
      return;
    }
    localStorage.setItem("geminiApiKey", key.trim());
    onSave(key.trim());
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Gemini API Key</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Paste your Gemini API key here"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyPrompt;
