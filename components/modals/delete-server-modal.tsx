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
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { server } = data || {};

  const isModalOpen = isOpen && type === "deleteServer";
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}/delete`);
      setIsLoading(false);
      onClose();
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you should want to Delete this{" "}
            <span className="text-indigo-500 font-bold">{server?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant={"primary"} onClick={onDelete}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
