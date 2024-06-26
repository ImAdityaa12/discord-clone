import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initalProfile";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const page = async () => {
  const profile = await initialProfile();
  const server = db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div>
      <InitialModal />
      {/* <UserButton /> */}
    </div>
  );
};

export default page;
