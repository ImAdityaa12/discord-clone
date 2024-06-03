"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";
import InviteModal from "../modals/invite-modal";
import EditServerModal from "../modals/edit-server-modal";
import MembersModal from "../modals/members-modal";
import CreateChannelModal from "../modals/create-channel";

export const ModalProvider = () => {
  const [isMounted, setIsMounded] = useState(false);
  useEffect(() => {
    setIsMounded(true);
  }, []);

  if (!isMounted) return false;

  return (
    <div>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
    </div>
  );
};
