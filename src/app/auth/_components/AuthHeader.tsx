import { Header } from "@/app/_components/Header";
import { ThemeSwitch } from "@/app/_components/ThemeSwitch";
import { usePageRouter } from "@/app/_hooks/usePageRouter";
import { Button } from "@heroui/react";
import { ArrowBack } from "@mui/icons-material";

export const AuthHeader = () => {
    const router = usePageRouter();

    return (
        <Header
            components={[
                <ThemeSwitch key="theme-swicth" />,
                <Button
                    key="back"
                    variant="light"
                    size="sm"
                    color="default"
                    className="font-medium hover:bg-primary/5 transition-colors"
                    startContent={<ArrowBack sx={{ fontSize: 18 }} />}
                    onPress={() => router.goTo('HOME')}
                >
                    Volver al inicio
                </Button>,
            ]}
        />
    );
};