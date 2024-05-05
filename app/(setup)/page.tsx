import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initalProfile";
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
  console.log(server);
  return <div>Create a Server</div>;
};

export default page;
