import CreateServerModal from "@/components/modals/create-server-modals";
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
      <CreateServerModal />
      {/* <UserButton /> */}
    </div>
  );
};

export default page;
