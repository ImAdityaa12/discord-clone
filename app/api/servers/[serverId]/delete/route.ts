import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const { serverId } = params;
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });

    return new NextResponse(JSON.stringify(server), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
