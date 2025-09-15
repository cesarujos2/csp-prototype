"use client";

import {
  Button,
  Card,
  CardBody,
  Chip
} from "@heroui/react";
import { HomeHeader } from "./_components/HomeHeader";
import { usePageRouter } from "./_hooks/usePageRouter";
import {
  Security as Shield,
  People as Users,
  Monitor,
  PhoneAndroid as Phone,
  KeyboardArrowRight
} from "@mui/icons-material";
import { PageRoute } from "./_types/route.type";

export default function Home() {
  const router = usePageRouter();

  const handleNavigation = (routeKey: PageRoute) => {
    router.goTo(routeKey)
  };

  const userInterfaces = [
    {
      title: "Ciudadanos",
      description: "Reporte de incidentes a través de aplicación móvil/web.",
      icon: <Phone sx={{ fontSize: 28 }} />,
      color: "primary" as const
    },
    {
      title: "Guardias de Seguridad",
      description: "Aplicación móvil para recibir y registrar incidentes, y seguir rutas.",
      icon: <Shield sx={{ fontSize: 28 }} />,
      color: "secondary" as const
    },
    {
      title: "Administración Municipal",
      description: "Gestión de recursos y programación.",
      icon: <Users sx={{ fontSize: 28 }} />,
      color: "success" as const
    },
    {
      title: "Centro de Vigilancia",
      description: "Panel de monitoreo con incidentes en tiempo real y planes de patrullaje.",
      icon: <Monitor sx={{ fontSize: 28 }} />,
      color: "warning" as const
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <HomeHeader />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px)] grid items-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Chip color="primary" variant="flat" size="md">
              🎯 Prototipo
            </Chip>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Sistema de Seguridad
            <br />
            <span className="text-primary">Potenciado por IA</span>
          </h1>
          <p className="text-md text-foreground-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Desarrollo de un prototipo de sistema municipal para guardias de seguridad con soporte de inteligencia artificial (IA)
            orientado a optimizar rutas de patrullaje, gestionar recursos y responder eficientemente a incidentes ciudadanos.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              color="primary"
              size="lg"
              className="font-semibold"
              endContent={<KeyboardArrowRight sx={{ fontSize: 20 }} />}
              onPress={() => handleNavigation('AUTH')}
            >
              Comenzar
            </Button>
          </div>
        </div>
      </section>

      {/* User Interfaces */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">💻 Interfaces de Usuario</h2>
            <p className="text-lg text-foreground-600 max-w-2xl mx-auto">
              Interfaces adaptadas para diferentes roles de usuario en el ecosistema de seguridad
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userInterfaces.map((ui, index) => (
              <Card key={index} className="text-center hover:scale-105 transition-transform duration-200">
                <CardBody className="p-6">
                  <div className={`inline-flex p-3 rounded-full mb-4`}>
                    <div className={`text-${ui.color}`}>{ui.icon}</div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{ui.title}</h3>
                  <p className="text-sm text-foreground-600">{ui.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-xs text-foreground-300">
          Sistema CSP ©{new Date().getFullYear()}. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
