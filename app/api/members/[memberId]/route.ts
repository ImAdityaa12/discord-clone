import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  //   const { searchParams } = new URL(req.url);
  const { role, serverId } = await req.json();
  //   const serverId = searchParams.get("serverId");
  if (!serverId) {
    return new NextResponse("ServerId missing", { status: 400 });
  }

  if (!role) {
    return new NextResponse("Role missing", { status: 400 });
  }
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(server), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
