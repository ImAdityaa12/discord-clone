"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounded] = useState(false);
  useEffect(() => {
    setIsMounded(true);
  }, []);

  if (!isMounted) return false;

  return (
    <div>
      <CreateServerModal />
    </div>
  );
};
