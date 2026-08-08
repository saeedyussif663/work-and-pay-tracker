import type { User } from "@/types";
import { Navii } from "@usenavii/react";

export function UserChip({ user }: { user: User | null }) {
  if (!user) return;

  return (
    <Navii
      seed={String(user.id)}
      size={100}
      title={user.name}
      animated
      className="rounded-full w-full h-full border border-border"
    />
  );
}
