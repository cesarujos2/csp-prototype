import { usePageRouter } from "@/app/_hooks/usePageRouter";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import { Logout, Person } from "@mui/icons-material";
import { Role } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";

export const UserDropdown = () => {
    const { data: session } = useSession();
    const router = usePageRouter();

    const getRoleDisplayName = (role: Role): string => {
        const roleNames: Record<Role, string> = {
            "OWNER": "Propietario",
            "ADMIN": "Administrador",
            "MONITORING": "Monitoreo",
            "OFFICER": "Oficial",
            "USER": "Usuario"
        };
        return roleNames[role] || "Usuario";
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: router.getPath("AUTH") });
    };

    const handleProfile = () => {
        // Navigate to profile settings when implemented
        router.goTo("DASHBOARD");
    };

    const getFirstName = (name: string) => {
        return name.split(' ').slice(0, 2).filter(x => !!x).join(" ")
    }

    const userRole = typeof session?.user?.role === 'string' ? session.user.role : "USER";


    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <User
                    avatarProps={{
                        isBordered: true,
                        src: session?.user?.image || undefined
                    }}
                    name={getFirstName(session?.user?.name || session?.user?.email || "Usuario")}
                    className="transition-transform cursor-pointer"
                    description={
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success" />
                            {getRoleDisplayName(userRole)}
                        </div>
                    }
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
                <DropdownItem
                    key="profile"
                    startContent={<Person className="w-4 h-4" />}
                    onPress={handleProfile}
                >
                    Mi Perfil
                </DropdownItem>
                <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<Logout className="w-4 h-4" />}
                    onPress={handleSignOut}
                >
                    Cerrar Sesión
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}