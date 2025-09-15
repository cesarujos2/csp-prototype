"use client";

import { useSession } from "next-auth/react";
import { Avatar } from "@heroui/react";
import { Person } from "@mui/icons-material";

interface UserProfileDisplayProps {
  className?: string;
}

export function UserProfileDisplay({ className = "" }: UserProfileDisplayProps) {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const { name, email, image } = session.user;

  return (
    <div className={`flex flex-row items-center space-x-3 ${className}`}>
      {/* User Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar
          src={image || undefined}
          name={name || email || "Usuario"}
          size="lg"
          className="w-12 h-12 md:w-16 md:h-16 text-large"
          fallback={
            <Person className="w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 text-default-400" />
          }
        />
      </div>

      {/* User Info */}
      <div className="text-left space-y-0.5 flex-1 min-w-0">
        {name && (
          <h2 className="text-sm font-semibold text-foreground truncate">
            {name}
          </h2>
        )}
        <p className="text-sm text-default-500 truncate">
          {email}
        </p>
      </div>
    </div>
  );
}