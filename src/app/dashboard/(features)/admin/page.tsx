"use client";

import React from 'react';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { AdminPanelSettings, People, Settings, Assessment } from '@mui/icons-material';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AdminPanelSettings className="text-primary text-3xl" />
            <h1 className="text-3xl font-bold text-foreground">Panel de Administrador</h1>
            <Chip color="primary" variant="flat" size="sm">
              ADMIN
            </Chip>
          </div>
          <p className="text-foreground-500">
            Gestión administrativa del sistema y usuarios
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Administration */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <People className="text-primary" />
                <h3 className="text-lg font-semibold">Administración de Usuarios</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Gestión de usuarios del sistema, roles y permisos.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Crear y editar usuarios</li>
                <li>• Asignar roles</li>
                <li>• Gestionar permisos</li>
                <li>• Activar/desactivar cuentas</li>
              </ul>
            </CardBody>
          </Card>

          {/* System Configuration */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="text-secondary" />
                <h3 className="text-lg font-semibold">Configuración</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Configuración general del sistema y parámetros operativos.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Parámetros generales</li>
                <li>• Configuración de módulos</li>
                <li>• Políticas de seguridad</li>
                <li>• Notificaciones</li>
              </ul>
            </CardBody>
          </Card>

          {/* Reports & Analytics */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Assessment className="text-success" />
                <h3 className="text-lg font-semibold">Reportes</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Generación de reportes administrativos y análisis de datos.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Reportes de usuarios</li>
                <li>• Estadísticas de uso</li>
                <li>• Logs de actividad</li>
                <li>• Métricas del sistema</li>
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
                    <p className="font-medium">Nuevo usuario registrado</p>
                    <p className="text-sm text-foreground-500">usuario@ejemplo.com</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 2 horas</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-950 rounded-lg">
                  <div>
                    <p className="font-medium">Configuración actualizada</p>
                    <p className="text-sm text-foreground-500">Parámetros de seguridad</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 4 horas</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-50 dark:bg-success-950 rounded-lg">
                  <div>
                    <p className="font-medium">Reporte generado</p>
                    <p className="text-sm text-foreground-500">Estadísticas mensuales</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 1 día</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:bg-primary-50 dark:hover:bg-primary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <People className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Gestionar Usuarios</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Settings className="text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">Configuración</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-success-50 dark:hover:bg-success-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Assessment className="text-success mx-auto mb-2" />
                <p className="text-sm font-medium">Ver Reportes</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}