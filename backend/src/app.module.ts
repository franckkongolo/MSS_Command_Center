import { Module } from '@nestjs/common';
import { HealthController } from './common/health.controller';
import { MissionsModule } from './modules/missions/missions.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { FuelModule } from './modules/fuel/fuel.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
@Module({imports:[MissionsModule,ClientsModule,DashboardModule,VehiclesModule,DriversModule,MaintenanceModule,FuelModule,NotificationsModule],controllers:[HealthController]})
export class AppModule{}