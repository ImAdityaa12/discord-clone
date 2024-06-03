import { ServerWithMembersWithProfiles } from "@/types";
import { create } from "zustand";

export type modalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer";

interface ModalData {
  server?: ServerWithMembersWithProfiles;
}
interface ModalStore {
  data?: ModalData;
  type: modalType | null;
  isOpen: boolean;
  onOpen: (type: modalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));
