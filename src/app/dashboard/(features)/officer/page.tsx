"use client";

import React from 'react';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { Badge, Assignment, Gavel, Description } from '@mui/icons-material';

export default function OfficerPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="text-secondary text-3xl" />
            <h1 className="text-3xl font-bold text-foreground">Panel de Oficial</h1>
            <Chip color="secondary" variant="flat" size="sm">
              OFFICER
            </Chip>
          </div>
          <p className="text-foreground-500">
            Gestión operativa y supervisión de procesos
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Case Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Assignment className="text-secondary" />
                <h3 className="text-lg font-semibold">Gestión de Casos</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Administración y seguimiento de casos asignados.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Casos activos</li>
                <li>• Asignación de tareas</li>
                <li>• Seguimiento de progreso</li>
                <li>• Reportes de estado</li>
              </ul>
            </CardBody>
          </Card>

          {/* Documentation */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Description className="text-primary" />
                <h3 className="text-lg font-semibold">Documentación</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Gestión de documentos y expedientes oficiales.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Expedientes digitales</li>
                <li>• Documentos oficiales</li>
                <li>• Archivo y búsqueda</li>
                <li>• Control de versiones</li>
              </ul>
            </CardBody>
          </Card>

          {/* Compliance */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Gavel className="text-warning" />
                <h3 className="text-lg font-semibold">Cumplimiento</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Supervisión del cumplimiento normativo y regulatorio.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Auditorías internas</li>
                <li>• Verificación de procesos</li>
                <li>• Reportes de cumplimiento</li>
                <li>• Acciones correctivas</li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Active Cases */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Casos Activos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardBody>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Caso #2024-001</h3>
                  <Chip color="warning" size="sm" variant="flat">En Progreso</Chip>
                </div>
                <p className="text-sm text-foreground-600 mb-2">
                  Revisión de cumplimiento normativo - Departamento A
                </p>
                <div className="flex justify-between text-xs text-foreground-500">
                  <span>Asignado: 15 Ene 2024</span>
                  <span>Vence: 30 Ene 2024</span>
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Caso #2024-002</h3>
                  <Chip color="success" size="sm" variant="flat">Completado</Chip>
                </div>
                <p className="text-sm text-foreground-600 mb-2">
                  Auditoría de procesos - Sistema de gestión
                </p>
                <div className="flex justify-between text-xs text-foreground-500">
                  <span>Asignado: 10 Ene 2024</span>
                  <span>Completado: 20 Ene 2024</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
          <Card>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-950 rounded-lg">
                  <div>
                    <p className="font-medium">Documento actualizado</p>
                    <p className="text-sm text-foreground-500">Expediente #2024-001 - Anexo C</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 1 hora</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-950 rounded-lg">
                  <div>
                    <p className="font-medium">Caso asignado</p>
                    <p className="text-sm text-foreground-500">Nuevo caso #2024-003 recibido</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 3 horas</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-50 dark:bg-success-950 rounded-lg">
                  <div>
                    <p className="font-medium">Reporte enviado</p>
                    <p className="text-sm text-foreground-500">Informe mensual de cumplimiento</p>
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
            <Card className="p-4 hover:bg-secondary-50 dark:hover:bg-secondary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Assignment className="text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">Mis Casos</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-primary-50 dark:hover:bg-primary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Description className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Documentos</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-warning-50 dark:hover:bg-warning-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Gavel className="text-warning mx-auto mb-2" />
                <p className="text-sm font-medium">Cumplimiento</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}