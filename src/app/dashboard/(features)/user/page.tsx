"use client";

import React from 'react';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { Person, Dashboard, Notifications, Help } from '@mui/icons-material';

export default function UserPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Person className="text-default-500 text-3xl" />
            <h1 className="text-3xl font-bold text-foreground">Panel de Usuario</h1>
            <Chip color="default" variant="flat" size="sm">
              USER
            </Chip>
          </div>
          <p className="text-foreground-500">
            Acceso a funcionalidades básicas del sistema
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Personal Dashboard */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Dashboard className="text-primary" />
                <h3 className="text-lg font-semibold">Mi Dashboard</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Vista personalizada de tu información y actividades.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Resumen de actividades</li>
                <li>• Tareas pendientes</li>
                <li>• Notificaciones recientes</li>
                <li>• Accesos rápidos</li>
              </ul>
            </CardBody>
          </Card>

          {/* Notifications */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Notifications className="text-warning" />
                <h3 className="text-lg font-semibold">Notificaciones</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Mantente al día con las últimas actualizaciones.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Mensajes del sistema</li>
                <li>• Recordatorios</li>
                <li>• Actualizaciones importantes</li>
                <li>• Configuración de alertas</li>
              </ul>
            </CardBody>
          </Card>

          {/* Help & Support */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Help className="text-secondary" />
                <h3 className="text-lg font-semibold">Ayuda y Soporte</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Recursos de ayuda y contacto con soporte técnico.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Guías de usuario</li>
                <li>• Preguntas frecuentes</li>
                <li>• Contactar soporte</li>
                <li>• Tutoriales</li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
          <Card>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-950 rounded-lg">
                  <div>
                    <p className="font-medium">Perfil actualizado</p>
                    <p className="text-sm text-foreground-500">Información de contacto modificada</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 2 horas</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-50 dark:bg-success-950 rounded-lg">
                  <div>
                    <p className="font-medium">Sesión iniciada</p>
                    <p className="text-sm text-foreground-500">Acceso desde navegador web</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 4 horas</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning-50 dark:bg-warning-950 rounded-lg">
                  <div>
                    <p className="font-medium">Notificación recibida</p>
                    <p className="text-sm text-foreground-500">Actualización del sistema disponible</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 1 día</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Resumen</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-sm text-foreground-500">Notificaciones</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">12</p>
                <p className="text-sm text-foreground-500">Tareas Completadas</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">3</p>
                <p className="text-sm text-foreground-500">Pendientes</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">28</p>
                <p className="text-sm text-foreground-500">Días Activo</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:bg-primary-50 dark:hover:bg-primary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Dashboard className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Mi Dashboard</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-warning-50 dark:hover:bg-warning-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Notifications className="text-warning mx-auto mb-2" />
                <p className="text-sm font-medium">Notificaciones</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Help className="text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">Ayuda</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}