"use client";

import React from 'react';
import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { Monitor, Timeline, Visibility, TrendingUp } from '@mui/icons-material';

export default function MonitoringPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="text-warning text-3xl" />
            <h1 className="text-3xl font-bold text-foreground">Panel de Monitoreo</h1>
            <Chip color="warning" variant="flat" size="sm">
              MONITORING
            </Chip>
          </div>
          <p className="text-foreground-500">
            Supervisión y monitoreo del sistema en tiempo real
          </p>
        </div>

        {/* System Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Estado del Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-500">CPU</p>
                  <p className="text-2xl font-bold text-success">45%</p>
                </div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-500">Memoria</p>
                  <p className="text-2xl font-bold text-warning">72%</p>
                </div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-500">Disco</p>
                  <p className="text-2xl font-bold text-success">38%</p>
                </div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-500">Red</p>
                  <p className="text-2xl font-bold text-success">Normal</p>
                </div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Real-time Monitoring */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Visibility className="text-warning" />
                <h3 className="text-lg font-semibold">Monitoreo en Tiempo Real</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Supervisión continua de todos los componentes del sistema.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Estado de servicios</li>
                <li>• Rendimiento del sistema</li>
                <li>• Conexiones activas</li>
                <li>• Alertas automáticas</li>
              </ul>
            </CardBody>
          </Card>

          {/* Performance Analytics */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-success" />
                <h3 className="text-lg font-semibold">Análisis de Rendimiento</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Métricas detalladas de rendimiento y uso de recursos.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Gráficos de tendencias</li>
                <li>• Métricas históricas</li>
                <li>• Comparativas temporales</li>
                <li>• Predicciones de carga</li>
              </ul>
            </CardBody>
          </Card>

          {/* Activity Logs */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Timeline className="text-primary" />
                <h3 className="text-lg font-semibold">Logs de Actividad</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-foreground-600 mb-4">
                Registro detallado de todas las actividades del sistema.
              </p>
              <ul className="space-y-2 text-sm text-foreground-500">
                <li>• Logs de sistema</li>
                <li>• Eventos de seguridad</li>
                <li>• Actividad de usuarios</li>
                <li>• Errores y excepciones</li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Alertas Recientes</h2>
          <Card>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-warning-50 dark:bg-warning-950 rounded-lg border-l-4 border-warning">
                  <div>
                    <p className="font-medium text-warning-700 dark:text-warning-300">Uso de memoria elevado</p>
                    <p className="text-sm text-foreground-500">Servidor principal - 72% de uso</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 15 min</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-50 dark:bg-success-950 rounded-lg border-l-4 border-success">
                  <div>
                    <p className="font-medium text-success-700 dark:text-success-300">Servicio restaurado</p>
                    <p className="text-sm text-foreground-500">Base de datos - Conexión restablecida</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 1 hora</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-950 rounded-lg border-l-4 border-primary">
                  <div>
                    <p className="font-medium text-primary-700 dark:text-primary-300">Actualización completada</p>
                    <p className="text-sm text-foreground-500">Sistema - Versión 2.1.3 instalada</p>
                  </div>
                  <span className="text-xs text-foreground-400">Hace 2 horas</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 hover:bg-warning-50 dark:hover:bg-warning-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Monitor className="text-warning mx-auto mb-2" />
                <p className="text-sm font-medium">Dashboard</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-success-50 dark:hover:bg-success-950 cursor-pointer transition-colors">
              <div className="text-center">
                <TrendingUp className="text-success mx-auto mb-2" />
                <p className="text-sm font-medium">Métricas</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-primary-50 dark:hover:bg-primary-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Timeline className="text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Logs</p>
              </div>
            </Card>
            <Card className="p-4 hover:bg-danger-50 dark:hover:bg-danger-950 cursor-pointer transition-colors">
              <div className="text-center">
                <Visibility className="text-danger mx-auto mb-2" />
                <p className="text-sm font-medium">Alertas</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}