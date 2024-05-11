"use client";

import { cn } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  name: string;
  imageUrl: string;
  id: string;
};
const NavigationItem = ({ name, imageUrl, id }: Props) => {
  const params = useParams();
  const router = useRouter();
  return (
    <ActionTooltip label={name} side="right" align="center">
      <button
        onClick={() => {
          router.push(`/servers/${id}`);
        }}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params.serverId !== id && "group-hover:h-[20px]",
            params.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex m-3 h-[48px] w-[48px] rounded-[28px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image
            src={imageUrl}
            alt={name}
            className="rounded-[16px] group-hover:rounded-[28px] transition-all"
            fill
          />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
