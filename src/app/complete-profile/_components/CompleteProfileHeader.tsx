import { Header } from "@/app/_components/Header";
import { ThemeSwitch } from "@/app/_components/ThemeSwitch";
import { usePageRouter } from "@/app/_hooks/usePageRouter";
import { Button } from "@heroui/react";
import { LogoutRounded } from "@mui/icons-material";
import { signOut } from "next-auth/react";

export const CompleteProfileHeader = () => {
    const router = usePageRouter();
    
    const handleSignOut = async () => {
        await signOut({ callbackUrl: router.getPath("HOME") });
    };
    
    return (
        <Header
            components={[
                <ThemeSwitch key="theme-switch" />,
                <Button
                    key="back"
                    variant="light"
                    size="sm"
                    color="danger"
                    className="font-medium hover:bg-primary/5 transition-colors"
                    startContent={<LogoutRounded />}
                    onPress={() => handleSignOut()}
                >
                    Cerrar sesión
                </Button>,
            ]}
        />
    );
};