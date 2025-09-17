"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { SwapHoriz } from '@mui/icons-material';
import { usePageRouter } from '@/app/_hooks/usePageRouter';
import { PageRoute } from '@/app/_types/route.type';

type Role = "OWNER" | "ADMIN" | "MONITORING" | "OFFICER" | "USER";

interface RoleChangerProps {
  onRoleChange?: (newRole: Role) => void;
}

export const RoleChanger: React.FC<RoleChangerProps> = ({ onRoleChange }) => {
  const { data: session, update } = useSession();
  const [isChanging, setIsChanging] = useState(false);
  const router = usePageRouter();

  const roles: { key: Role; label: string; color: string; activeColor: string }[] = [
    { 
      key: "OWNER", 
      label: "Propietario", 
      color: "text-purple-600 dark:text-purple-400",
      activeColor: "text-purple-950 dark:text-purple-100 font-semibold"
    },
    { 
      key: "ADMIN", 
      label: "Administrador", 
      color: "text-red-600 dark:text-red-400",
      activeColor: "text-red-800 dark:text-red-200 font-semibold"
    },
    { 
      key: "MONITORING", 
      label: "Monitoreo", 
      color: "text-blue-600 dark:text-blue-400",
      activeColor: "text-blue-800 dark:text-blue-200 font-semibold"
    },
    { 
      key: "OFFICER", 
      label: "Oficial", 
      color: "text-green-600 dark:text-green-400",
      activeColor: "text-green-800 dark:text-green-200 font-semibold"
    },
    { 
      key: "USER", 
      label: "Usuario", 
      color: "text-gray-600 dark:text-gray-400",
      activeColor: "text-gray-800 dark:text-gray-200 font-semibold"
    },
  ];

  const currentRole = typeof session?.user?.role === 'string' ? session.user.role as Role : "USER";

  const getRoleBasedRoute = (role: Role): PageRoute => {
    const roleRouteMap: Record<Role, PageRoute> = {
      OWNER: 'OWNER',
      ADMIN: 'ADMIN', 
      MONITORING: 'MONITORING',
      OFFICER: 'OFFICER',
      USER: 'USER'
    };
    return roleRouteMap[role];
  };

  const handleRoleChange = async (newRole: Role) => {
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

        // Redirect to the appropriate dashboard for the new role
        const targetRoute = getRoleBasedRoute(newRole);
        router.goTo(targetRoute);
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
          className="min-w-0 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
        >
          <SwapHoriz className="w-4 h-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Change Role"
        onAction={(key) => handleRoleChange(key as Role)}
        disabledKeys={[currentRole]}
      >
        {roles.map((role) => (
          <DropdownItem
            key={role.key}
            className={`
              ${role.key === currentRole ? role.activeColor : role.color}
              ${role.key === currentRole 
                ? 'bg-gray-200 dark:bg-gray-800' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }
              transition-all duration-200 px-3 py-2
            `}
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