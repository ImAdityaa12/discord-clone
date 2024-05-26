"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";
import InviteModal from "../modals/invite-modal";

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
    </div>
  );
};
