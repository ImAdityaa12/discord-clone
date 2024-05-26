"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { useModal } from "@/hooks/use-modal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";

const InviteModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const origin = useOrigin();
  const { server } = data || {};
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const isModalOpen = isOpen && type === "invite";
  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite to {server?.name}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Share this link with your friends to invite them to your server
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs uppercase font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button size={"icon"} onClick={onCopy} disabled={isLoading}>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant={"link"}
            size={"sm"}
            className="text-xs text-zinc-500 mt-4"
            onClick={onNew}
            disabled={isLoading}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
