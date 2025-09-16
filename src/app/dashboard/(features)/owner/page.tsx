"use client";

import React from 'react';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { Security, Settings, People, Analytics } from '@mui/icons-material';

export default function OwnerPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Security className="text-danger text-3xl" />
            <h1 className="text-3xl font-bold text-foreground">Panel de Propietario</h1>
            <Chip color="danger" variant="flat" size="sm">
              OWNER
            </Chip>
          </div>
          <p className="text-foreground-500">
            Acceso completo al sistema con privilegios de propietario
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Settings className="text-primary" />
                <h3 className="text-lg font-semibold">Gestión del Sistema</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Configuración completa del sistema, parámetros globales y ajustes avanzados.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Configuración de seguridad</li>
                <li>• Parámetros del sistema</li>
                <li>• Respaldos y restauración</li>
                <li>• Logs del sistema</li>
              </ul>
            </CardBody>
          </Card>

          {/* User Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <People className="text-secondary" />
                <h3 className="text-lg font-semibold">Gestión de Usuarios</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Control total sobre usuarios, roles y permisos del sistema.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Crear y eliminar usuarios</li>
                <li>• Asignar roles y permisos</li>
                <li>• Auditoría de actividades</li>
                <li>• Gestión de sesiones</li>
              </ul>
            </CardBody>
          </Card>

          {/* Analytics & Reports */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Analytics className="text-success" />
                <h3 className="text-lg font-semibold">Análisis y Reportes</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Análisis completo del sistema y generación de reportes ejecutivos.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Métricas del sistema</li>
                <li>• Reportes de uso</li>
                <li>• Análisis de rendimiento</li>
                <li>• Estadísticas globales</li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 hover:bg-primary-50 dark:hover:bg-primary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Settings className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Configuración</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <People className="text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">Usuarios</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-success-50 dark:hover:bg-success-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Analytics className="text-success mx-auto mb-2" />
                <p className="text-sm font-medium">Reportes</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-danger-50 dark:hover:bg-danger-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Security className="text-danger mx-auto mb-2" />
                <p className="text-sm font-medium">Seguridad</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}