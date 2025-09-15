import { Button } from "@heroui/react";
import { usePageRouter } from "../_hooks/usePageRouter";
import { Header } from "./Header";
import { Login } from "@mui/icons-material";
import { ThemeSwitch } from "./ThemeSwitch";

/**
 * Header variants for specific pages
 */
export const HomeHeader = () => {
    const router = usePageRouter();

    return (
        <Header
            className="backdrop-blur-md"
            components={[
                <ThemeSwitch key="theme-swicth" />,
                <Button
                    key="login"
                    variant="light"
                    size="sm"
                    color="default"
                    className="font-medium hover:bg-primary/5 transition-colors"
                    startContent={<Login sx={{ fontSize: 18 }} />}
                    onPress={() => router.goTo('AUTH')}
                >
                    Iniciar sesión
                </Button>,
            ]}
        />
    );
};