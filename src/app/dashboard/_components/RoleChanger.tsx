"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { SwapHoriz } from '@mui/icons-material';

type UserRole = "OWNER" | "ADMIN" | "MONITORING" | "OFFICER" | "USER";

interface RoleChangerProps {
  onRoleChange?: (newRole: UserRole) => void;
}

export const RoleChanger: React.FC<RoleChangerProps> = ({ onRoleChange }) => {
  const { data: session, update } = useSession();
  const [isChanging, setIsChanging] = useState(false);

  const roles: { key: UserRole; label: string; color: string }[] = [
    { key: "OWNER", label: "Propietario", color: "text-purple-600" },
    { key: "ADMIN", label: "Administrador", color: "text-red-600" },
    { key: "MONITORING", label: "Monitoreo", color: "text-blue-600" },
    { key: "OFFICER", label: "Oficial", color: "text-green-600" },
    { key: "USER", label: "Usuario", color: "text-gray-600" },
  ];

  const currentRole = typeof session?.user?.role === 'string' ? session.user.role as UserRole : "USER";

  const handleRoleChange = async (newRole: UserRole) => {
    if (newRole === currentRole || isChanging) return;

    setIsChanging(true);
    
    try {
      const response = await fetch('/api/user/change-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        // Update the session with the new role
        await update({
          ...session,
          user: {
            ...session?.user,
            role: newRole,
          },
        });

        // Call the optional callback
        onRoleChange?.(newRole);
      } else {
        console.error('Failed to change role');
      }
    } catch (error) {
      console.error('Error changing role:', error);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="flat"
          size="sm"
          isLoading={isChanging}
          className="min-w-0"
        >
          <SwapHoriz className="w-4 h-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Change Role"
        onAction={(key) => handleRoleChange(key as UserRole)}
        disabledKeys={[currentRole]}
      >
        {roles.map((role) => (
          <DropdownItem
            key={role.key}
            className={`${role.color} ${role.key === currentRole ? 'bg-default-100' : ''}`}
            description={role.key === currentRole ? "Rol actual" : undefined}
          >
            {role.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default RoleChanger;